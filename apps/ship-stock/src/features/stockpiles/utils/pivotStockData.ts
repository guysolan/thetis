import type { StockpileView } from "../types";
import type { InventoryHistoryRecord } from "../../stock-history/StockHistoryTable";
import { getCurrentQuantity, getAllItemsForAddress } from "../../stock-history/utils";

interface AmazonStockpileData {
	name: string;
	total: number;
	available: number;
	inbound: number;
}

interface AmazonInventory {
	UsInventory: AmazonStockpileData[];
	CaInventory: AmazonStockpileData[];
	DeInventory: AmazonStockpileData[];
	UkInventory: AmazonStockpileData[];
}

export interface LocationColumn {
	key: string;
	label: string;
	addressId: number | null;
	isAmazon: boolean;
}

export interface StockRow {
	itemId: number;
	itemName: string;
	itemType: string;
	/** Map of locationKey -> quantity */
	locations: Record<string, number>;
	total: number;
}

const AMAZON_REGION_LABELS: Record<string, string> = {
	UsInventory: "Amazon US",
	CaInventory: "Amazon CA",
	DeInventory: "Amazon DE",
	UkInventory: "Amazon UK",
};

/**
 * Pivot inventory history + amazon inventory into a single table structure
 * where each row is an item and columns are locations.
 *
 * Uses inventory_history as the source of truth for quantities (same as the history page).
 */
export function pivotStockData(
	inventoryHistory: InventoryHistoryRecord[] | undefined,
	stockpiles: StockpileView[] | undefined,
	amazonInventory: AmazonInventory | undefined,
): { rows: StockRow[]; columns: LocationColumn[] } {
	// 1. Build location columns from stockpiles
	const stockpileColumns: LocationColumn[] = (stockpiles ?? [])
		.filter((s) => s.stockpile_id != null)
		.map((s) => ({
			key: `sp_${s.stockpile_id}`,
			label: s.stockpile_name ?? `Location ${s.stockpile_id}`,
			addressId: s.stockpile_id,
			isAmazon: false,
		}));

	// 2. Build Amazon location columns (only for regions that have data)
	const amazonColumns: LocationColumn[] = [];
	if (amazonInventory) {
		for (const [regionKey, label] of Object.entries(AMAZON_REGION_LABELS)) {
			const regionData =
				amazonInventory[regionKey as keyof AmazonInventory];
			if (regionData && regionData.length > 0) {
				amazonColumns.push({
					key: `amz_${regionKey}`,
					label,
					addressId: null,
					isAmazon: true,
				});
			}
		}
	}

	const allColumns = [...stockpileColumns, ...amazonColumns];

	// 3. Build item map from inventory history (source of truth)
	// Collect all unique items across all stockpile addresses
	const itemMap = new Map<
		number,
		{ itemName: string; itemType: string; locations: Record<string, number> }
	>();

	const history = inventoryHistory ?? [];

	for (const col of stockpileColumns) {
		if (col.addressId == null) continue;
		const addressId = col.addressId;

		// Get all items that have ever existed at this address (exclude services and packages)
		const itemsAtAddress = getAllItemsForAddress(history, addressId).filter(
			(item) => {
				const t = item.type.toLowerCase();
				return t !== "service" && t !== "package";
			},
		);

		for (const item of itemsAtAddress) {
			let entry = itemMap.get(item.id);
			if (!entry) {
				entry = {
					itemName: item.name,
					itemType: item.type,
					locations: {},
				};
				itemMap.set(item.id, entry);
			}

			// Get the current quantity from inventory history (same logic as history page)
			const qty = getCurrentQuantity(item.id, history, addressId);
			if (qty !== 0) {
				entry.locations[col.key] = qty;
			}
		}
	}

	// 4. Merge Amazon inventory into the item map
	if (amazonInventory) {
		for (const [regionKey, regionData] of Object.entries(amazonInventory)) {
			if (!AMAZON_REGION_LABELS[regionKey]) continue;
			const locationKey = `amz_${regionKey}`;

			for (const amazonItem of regionData as AmazonStockpileData[]) {
				const matchedEntry = findMatchingItem(itemMap, amazonItem.name);

				if (matchedEntry) {
					matchedEntry.locations[locationKey] =
						(matchedEntry.locations[locationKey] ?? 0) +
						amazonItem.total;
				} else {
					// Create a new entry for unmatched Amazon items
					const syntheticId = -(
						hashString(amazonItem.name + regionKey) % 1000000
					);
					let entry = itemMap.get(syntheticId);
					if (!entry) {
						entry = {
							itemName: amazonItem.name,
							itemType: "product",
							locations: {},
						};
						itemMap.set(syntheticId, entry);
					}
					entry.locations[locationKey] =
						(entry.locations[locationKey] ?? 0) + amazonItem.total;
				}
			}
		}
	}

	// 5. Convert map to rows and compute totals
	const rows: StockRow[] = Array.from(itemMap.entries())
		.map(([itemId, entry]) => {
			const total = Object.values(entry.locations).reduce(
				(sum, qty) => sum + qty,
				0,
			);
			return {
				itemId,
				itemName: entry.itemName,
				itemType: entry.itemType,
				locations: entry.locations,
				total,
			};
		})
		.filter((row) => row.total !== 0)
		.sort((a, b) => a.itemName.localeCompare(b.itemName));

	return { rows, columns: allColumns };
}

/** Case-insensitive name matching between Amazon product names and internal items */
function findMatchingItem(
	itemMap: Map<
		number,
		{ itemName: string; itemType: string; locations: Record<string, number> }
	>,
	amazonName: string,
): { locations: Record<string, number> } | null {
	const normalised = amazonName.toLowerCase().trim();

	for (const entry of itemMap.values()) {
		if (entry.itemName.toLowerCase().trim() === normalised) {
			return entry;
		}
	}

	// Partial match: check if one contains the other
	for (const entry of itemMap.values()) {
		const entryNorm = entry.itemName.toLowerCase().trim();
		if (entryNorm.includes(normalised) || normalised.includes(entryNorm)) {
			return entry;
		}
	}

	return null;
}

/** Simple string hash for generating synthetic IDs */
function hashString(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0;
	}
	return Math.abs(hash);
}
