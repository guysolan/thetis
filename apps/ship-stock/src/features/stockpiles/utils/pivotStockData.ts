import type { StockpileView } from "../types";
import type { InventoryHistoryRecord } from "../../stock-history/StockHistoryTable";
import { getCurrentQuantity, getAllItemsForAddress } from "../../stock-history/utils";

interface AmazonStockpileData {
  name: string;
  asin?: string;
  sellerSku?: string;
  /** Available (fulfillable) + inbound + fcTransfer; table shows this sum */
  total?: number;
  available: number;
  inbound: number;
  fcTransfer?: number;
}

/** Map Amazon seller SKU to internal product row name (for Night Splint variants) */
const AMAZON_SKU_TO_INTERNAL_NAME: Record<string, string> = {
  "TM-ATRNS-LL": "Night Splint - Large Left (Bag)",
  "TM-ATRNS-LR": "Night Splint - Large Right (Bag)",
  "TM-ATRNS-SL": "Night Splint - Small Left (Bag)",
  "TM-ATRNS-SR": "Night Splint - Small Right (Bag)",
};

/** API returns "Amazon US", "Amazon CA", "Amazon DE", "Amazon UK" */
interface AmazonInventory {
  "Amazon US"?: AmazonStockpileData[];
  "Amazon CA"?: AmazonStockpileData[];
  "Amazon DE"?: AmazonStockpileData[];
  "Amazon UK"?: AmazonStockpileData[];
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

/** Region keys as returned by the amazon-inventory edge function */
const AMAZON_REGION_KEYS = ["Amazon US", "Amazon CA", "Amazon DE", "Amazon UK"] as const;

/** Row names that are Amazon listing titles; exclude so we only show internal/DB item names */
const AMAZON_TITLE_PREFIXES = [
  "Achilles Tendon RUPTURE Night Splint, ONLY for COMPLETE Achilles tear - BEFORE PURCHASE:",
  "Thetis Medical Nachtschiene für Achillessehnenruptur, NUR für VOLLSTÄNDIGE Achillessehnenruptur - VOR DEM KAUF:",
];
function isAmazonListingTitle(itemName: string): boolean {
  const n = itemName.trim();
  return AMAZON_TITLE_PREFIXES.some((p) => n.startsWith(p));
}

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
    for (const label of AMAZON_REGION_KEYS) {
      const regionData = amazonInventory[label];
      if (regionData && regionData.length > 0) {
        const key = `amz_${label.replace(/\s+/g, "_")}`;
        amazonColumns.push({
          key,
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
    const itemsAtAddress = getAllItemsForAddress(history, addressId).filter((item) => {
      const t = item.type.toLowerCase();
      return t !== "service" && t !== "package";
    });

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
    for (const label of AMAZON_REGION_KEYS) {
      const regionData = amazonInventory[label];
      if (!regionData?.length) continue;
      const locationKey = `amz_${label.replace(/\s+/g, "_")}`;

      for (const amazonItem of regionData as AmazonStockpileData[]) {
        // Prefer SKU mapping so Amazon "Small Right" etc. matches internal "Night Splint - Small Right (Bag)"
        const targetName =
          amazonItem.sellerSku && AMAZON_SKU_TO_INTERNAL_NAME[amazonItem.sellerSku];
        const matchedEntry = targetName
          ? (findEntryByItemName(itemMap, targetName) ?? findMatchingItem(itemMap, amazonItem.name))
          : findMatchingItem(itemMap, amazonItem.name);

        // Only add Amazon qty to existing DB rows; show sum of available + inbound + fcTransfer
        if (matchedEntry) {
          const sum =
            (amazonItem.total ?? 0) ||
            (amazonItem.available ?? 0) + (amazonItem.inbound ?? 0) + (amazonItem.fcTransfer ?? 0);
          matchedEntry.locations[locationKey] = (matchedEntry.locations[locationKey] ?? 0) + sum;
        }
      }
    }
  }

  // 5. Convert map to rows, exclude Amazon listing titles, compute totals
  const rows: StockRow[] = Array.from(itemMap.entries())
    .filter(([, entry]) => !isAmazonListingTitle(entry.itemName))
    .map(([itemId, entry]) => {
      const total = Object.values(entry.locations).reduce((sum, qty) => sum + qty, 0);
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

/** Find an entry by exact item name (case-insensitive). Used for SKU-mapped internal names. */
function findEntryByItemName(
  itemMap: Map<number, { itemName: string; itemType: string; locations: Record<string, number> }>,
  itemName: string,
): { locations: Record<string, number> } | null {
  const normalised = itemName.toLowerCase().trim();
  for (const entry of itemMap.values()) {
    if (entry.itemName.toLowerCase().trim() === normalised) {
      return entry;
    }
  }
  return null;
}

/** Case-insensitive name matching between Amazon product names and internal items */
function findMatchingItem(
  itemMap: Map<number, { itemName: string; itemType: string; locations: Record<string, number> }>,
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
