import type { InventoryHistoryRecord } from "./StockHistoryTable";
import type { StockpileView } from "../stockpiles/types";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

interface Item {
  id: number;
  price: number;
  name: string;
  type: string;
}

export interface StockValueDataPoint {
  date: string;
  dateFormatted: string;
  total: number;
  // Per-location values
  [locationName: string]: number | string;
}

// Detailed breakdown for the table
export interface ItemValueDetail {
  itemId: number;
  itemName: string;
  itemType: string;
  price: number;
  locations: {
    locationId: number;
    locationName: string;
    quantity: number;
    value: number;
  }[];
  totalQuantity: number;
  totalValue: number;
}

export interface LocationInfo {
  id: number;
  name: string;
  key: string;
}

/**
 * Get unique locations from stockpiles that hold stock
 */
export function getLocationsFromStockpiles(
  stockpiles: StockpileView[] | undefined
): LocationInfo[] {
  if (!stockpiles) return [];

  const seen = new Set<number>();
  return stockpiles
    .filter((s) => {
      if (!s.stockpile_id || seen.has(s.stockpile_id)) return false;
      seen.add(s.stockpile_id);
      return true;
    })
    .map((s) => ({
      id: s.stockpile_id!,
      name: s.stockpile_name ?? `Location ${s.stockpile_id}`,
      key: `loc_${s.stockpile_id}`,
    }));
}

/**
 * Get the quantity of an item at a specific location as of a given date.
 * Looks backwards through history to find the most recent record.
 */
function getItemQuantityAtDate(
  inventoryHistory: InventoryHistoryRecord[],
  itemId: number,
  addressId: number,
  asOfDate: string
): number {
  const cutoff = dayjs(asOfDate).endOf("day");

  // Sort history by date descending to find most recent first
  const sortedHistory = [...inventoryHistory].sort(
    (a, b) => dayjs(b.transaction_date).valueOf() - dayjs(a.transaction_date).valueOf()
  );

  for (const record of sortedHistory) {
    const recordDate = dayjs(record.transaction_date);
    if (recordDate.isAfter(cutoff)) continue;

    const itemEntry = record.items.find(
      (item) => item.id === itemId && item.address_id === addressId
    );

    if (itemEntry) {
      return itemEntry.quantity;
    }
  }

  return 0;
}

/**
 * Get all unique items that have ever appeared in inventory history.
 * Filters out packages and services - only includes parts and products.
 */
function getAllUniqueItems(
  inventoryHistory: InventoryHistoryRecord[]
): Map<number, { id: number; name: string; type: string }> {
  const items = new Map<number, { id: number; name: string; type: string }>();

  for (const record of inventoryHistory) {
    for (const item of record.items) {
      // Only include parts and products, exclude packages and services
      const itemType = item.type?.toLowerCase() ?? "";
      if (itemType === "package" || itemType === "service") {
        continue;
      }

      if (!items.has(item.id)) {
        items.set(item.id, {
          id: item.id,
          name: item.name,
          type: item.type,
        });
      }
    }
  }

  return items;
}

/**
 * Calculate stock value at each transaction date, grouped by location.
 * Returns data points sorted by date ascending for charting.
 */
export function calculateStockValueOverTime(
  inventoryHistory: InventoryHistoryRecord[],
  items: Item[],
  stockpiles: StockpileView[] | undefined
): { data: StockValueDataPoint[]; locations: LocationInfo[] } {
  if (!inventoryHistory.length || !items.length) {
    return { data: [], locations: [] };
  }

  // Create price map: itemId -> price
  const priceMap = new Map<number, number>();
  items.forEach((item) => {
    priceMap.set(item.id, item.price ?? 0);
  });

  // Get locations
  const locations = getLocationsFromStockpiles(stockpiles);
  if (!locations.length) {
    return { data: [], locations: [] };
  }

  // Get all unique items from history
  const uniqueItems = getAllUniqueItems(inventoryHistory);

  // Get unique transaction dates, sorted ascending
  const uniqueDates = [
    ...new Set(inventoryHistory.map((r) => r.transaction_date)),
  ].sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf());

  // For each date, calculate value per location by looking up each item's quantity
  const dataPoints: StockValueDataPoint[] = [];

  for (const date of uniqueDates) {
    const dataPoint: StockValueDataPoint = {
      date,
      dateFormatted: dayjs(date).format("MMM YYYY"),
      total: 0,
    };

    // Initialize all locations to 0
    for (const loc of locations) {
      dataPoint[loc.key] = 0;
    }

    // For each location, sum up the value of all items
    for (const loc of locations) {
      let locationTotal = 0;

      for (const [itemId] of uniqueItems) {
        const quantity = getItemQuantityAtDate(
          inventoryHistory,
          itemId,
          loc.id,
          date
        );
        // Clamp negative quantities to 0
        const clampedQty = Math.max(0, quantity);
        const price = priceMap.get(itemId) ?? 0;
        locationTotal += clampedQty * price;
      }

      dataPoint[loc.key] = locationTotal;
    }

    // Calculate total
    let total = 0;
    for (const loc of locations) {
      total += dataPoint[loc.key] as number;
    }
    dataPoint.total = total;

    dataPoints.push(dataPoint);
  }

  return { data: dataPoints, locations };
}

/**
 * Get detailed item breakdown for a specific date.
 * Used for the interactive table that updates on chart hover.
 */
export function getItemValueDetailsAtDate(
  inventoryHistory: InventoryHistoryRecord[],
  items: Item[],
  locations: LocationInfo[],
  asOfDate: string
): ItemValueDetail[] {
  if (!inventoryHistory.length || !items.length || !locations.length) {
    return [];
  }

  // Create maps for quick lookup
  const priceMap = new Map<number, number>();
  const itemInfoMap = new Map<number, Item>();
  items.forEach((item) => {
    priceMap.set(item.id, item.price ?? 0);
    itemInfoMap.set(item.id, item);
  });

  // Get all unique items from history
  const uniqueItems = getAllUniqueItems(inventoryHistory);

  const details: ItemValueDetail[] = [];

  for (const [itemId, itemInfo] of uniqueItems) {
    const price = priceMap.get(itemId) ?? 0;
    const fullItemInfo = itemInfoMap.get(itemId);

    const locationDetails: ItemValueDetail["locations"] = [];
    let totalQuantity = 0;
    let totalValue = 0;

    for (const loc of locations) {
      const quantity = getItemQuantityAtDate(
        inventoryHistory,
        itemId,
        loc.id,
        asOfDate
      );
      // Clamp negative quantities to 0
      const clampedQty = Math.max(0, quantity);
      const value = clampedQty * price;

      locationDetails.push({
        locationId: loc.id,
        locationName: loc.name,
        quantity: clampedQty,
        value,
      });

      totalQuantity += clampedQty;
      totalValue += value;
    }

    // Only include items that have some quantity
    if (totalQuantity > 0) {
      details.push({
        itemId,
        itemName: itemInfo.name,
        itemType: fullItemInfo?.type ?? itemInfo.type,
        price,
        locations: locationDetails,
        totalQuantity,
        totalValue,
      });
    }
  }

  // Sort by total value descending
  return details.sort((a, b) => b.totalValue - a.totalValue);
}

/**
 * Format currency value for display (no decimal places)
 */
export function formatCurrencyValue(value: number, currency = "GBP"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format unit price with 2 decimal places
 */
export function formatUnitPrice(value: number, currency = "GBP"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
