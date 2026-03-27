import type { InventoryHistoryRecord } from "./StockHistoryTable";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// Extend dayjs with the isSameOrBefore plugin
dayjs.extend(isSameOrBefore);

interface StockHistoryRow {
  item_id: number;
  item_name: string;
  quantity: number;
  change: number;
}

interface ItemInfo {
  id: number;
  name: string;
  type: string;
}

/** Address for a history line: prefer item.address_id, else row-level address (matches API mapping). */
export function resolvedItemAddressId(
  item: { address_id?: number | null },
  record: Pick<InventoryHistoryRecord, "address_id">,
): number | null {
  if (item.address_id != null && String(item.address_id) !== "") {
    const n = Number(item.address_id);
    return Number.isNaN(n) ? null : n;
  }
  if (record.address_id != null && String(record.address_id) !== "") {
    const n = Number(record.address_id);
    return Number.isNaN(n) ? null : n;
  }
  return null;
}

/** Formatted start/end labels for a delivery window; null if no bounds. */
export function getDeliveryWindowParts(
  deliveryStart: string | null | undefined,
  deliveryEnd: string | null | undefined,
): { start: string | null; end: string | null } | null {
  if (deliveryStart == null && deliveryEnd == null) return null;
  const start = deliveryStart ? dayjs(deliveryStart).format("D MMM YYYY") : null;
  const end = deliveryEnd ? dayjs(deliveryEnd).format("D MMM YYYY") : null;
  if (start == null && end == null) return null;
  return { start, end };
}

/**
 * Whether this row's effective transaction date aligns with outbound (first) or inbound (second)
 * delivery bound, matching inventory_history_by_address logic.
 */
export function getDeliveryBoundUsedLabel(
  transactionDate: string,
  deliveryStart: string | null | undefined,
  deliveryEnd: string | null | undefined,
): "outbound" | "inbound" | null {
  if (deliveryStart == null && deliveryEnd == null) return null;
  const t = dayjs(transactionDate).startOf("day");
  const start = deliveryStart ? dayjs(deliveryStart).startOf("day") : null;
  const end = deliveryEnd ? dayjs(deliveryEnd).startOf("day") : null;
  if (start && t.isSame(start)) return "outbound";
  if (end && t.isSame(end)) return "inbound";
  return null;
}

/** In/out from line change: negative → first delivery date, positive → second (matches the view). */
export function getDeliveryBoundFromItemChange(change: number): "outbound" | "inbound" | null {
  if (change < 0) return "outbound";
  if (change > 0) return "inbound";
  return null;
}

// Helper function to determine badge variant based on order type
export function getOrderTypeBadgeVariant(orderType: string): string {
  switch (orderType) {
    case "build":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "sell":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "ship":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "count":
      return "bg-orange-100 text-orange-800 hover:bg-orange-200";
    case "current":
      return "bg-rose-500 text-white hover:bg-rose-600";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
}

export const formatStockHistoryRows = (
  records: InventoryHistoryRecord[],
  addressId?: number,
): StockHistoryRow[] => {
  if (!records.length) return [];

  const stockMap = new Map<number, StockHistoryRow>();

  // Process each record
  records.forEach((record) => {
    record.items
      .filter((item) =>
        addressId ? resolvedItemAddressId(item, record) === Number(addressId) : true,
      )
      .forEach((item) => {
        if (!stockMap.has(Number(item.id))) {
          stockMap.set(Number(item.id), {
            item_id: Number(item.id),
            item_name: item.name,
            quantity: Math.round(item.quantity),
            change: Math.round(item.change),
          });
        }
      });
  });

  return Array.from(stockMap.values()).sort((a, b) => a.item_id - b.item_id);
};

export const getCurrentStockLevels = (
  history: InventoryHistoryRecord[],
  addressId?: number,
): StockHistoryRow[] => {
  if (!history.length) return [];

  const stockMap = new Map<number, StockHistoryRow>();

  // Process history in reverse to get the most recent quantities
  [...history].reverse().forEach((record) => {
    record.items.forEach((item) => {
      if (addressId ? resolvedItemAddressId(item, record) === Number(addressId) : true) {
        if (!stockMap.has(Number(item.id))) {
          stockMap.set(Number(item.id), {
            item_id: Number(item.id),
            item_name: item.name,
            quantity: Math.round(item.quantity),
            change: 0, // Current stock has no change
          });
        }
      }
    });
  });

  return Array.from(stockMap.values()).sort((a, b) => a.item_id - b.item_id);
};

// Helper to filter out packages and services
export const filterNonInventoryItems = (rows: StockHistoryRow[]): StockHistoryRow[] => {
  return rows.filter(
    (row) =>
      !row.item_name.toLowerCase().includes("package") &&
      !row.item_name.toLowerCase().includes("service"),
  );
};

// Get unique items from inventory history
export const getUniqueItems = (
  inventoryHistory: InventoryHistoryRecord[],
  addressId?: number,
): Map<number, ItemInfo> => {
  const uniqueItems = new Map<number, ItemInfo>();
  const v_addressId = addressId ? Number(addressId) : null;

  inventoryHistory.forEach((record) => {
    record.items.forEach((item) => {
      // Only consider items that match the current address ID
      if (v_addressId ? resolvedItemAddressId(item, record) === v_addressId : true) {
        if (!uniqueItems.has(Number(item.id))) {
          uniqueItems.set(Number(item.id), {
            id: Number(item.id),
            name: item.name,
            type: item.type,
          });
        }
      }
    });
  });

  return uniqueItems;
};

// Filter items based on type and active tab
export const filterItemsByType = (items: ItemInfo[], activeTab: string): ItemInfo[] => {
  return items
    .filter((item) => {
      const itemType = item.type.toLowerCase();
      if (itemType === "package" || itemType === "service") return false;
      if (activeTab === "all") return true;
      if (activeTab === "products") return itemType === "product";
      if (activeTab === "parts") return itemType === "part";
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
};

// Get the latest quantity for each item up to a given date, excluding future orders.
// asOfDate: when provided (e.g. stocktake order_date), return stock as of that date; otherwise use today.
export const getCurrentQuantity = (
  itemId: number,
  inventoryHistory: InventoryHistoryRecord[],
  addressId?: number,
  asOfDate?: string | Date | null,
): number => {
  if (!inventoryHistory.length) return 0;

  const v_addressId = addressId ? Number(addressId) : null;
  const cutoff = asOfDate ? dayjs(asOfDate).startOf("day") : dayjs().startOf("day");

  // Find the most recent record up to cutoff that mentions this item with the matching address_id
  for (const record of inventoryHistory) {
    const recordDate = dayjs(record.transaction_date).startOf("day");
    if (recordDate.isAfter(cutoff)) continue;

    const itemEntry = record.items.find(
      (item) =>
        Number(item.id) === Number(itemId) &&
        (v_addressId == null || resolvedItemAddressId(item, record) === v_addressId),
    );

    if (itemEntry) {
      return itemEntry.quantity;
    }
  }

  return 0;
};

/**
 * Quantity after a slice minus ledger as of end of previous calendar day.
 * For scheduled rows, use this for +/- so it matches “stock before this movement → after”, using the same
 * rules as getCurrentQuantity (raw slice `change` alone is easy to misread for future-dated rows).
 */
export function sliceDeltaVersusPriorCalendarDay(
  itemId: number,
  inventoryHistory: InventoryHistoryRecord[],
  addressId: number,
  transactionDate: string,
  quantityAfterSlice: number,
): number {
  const dayBefore = dayjs(transactionDate).startOf("day").subtract(1, "day").format("YYYY-MM-DD");
  const beforeQty = getCurrentQuantity(itemId, inventoryHistory, addressId, dayBefore);
  return quantityAfterSlice - beforeQty;
}

// Create current stock record
export const createCurrentStockRecord = (
  inventoryHistory: InventoryHistoryRecord[],
  visibleItems: ItemInfo[],
  addressId?: number,
): InventoryHistoryRecord | null => {
  if (!inventoryHistory.length) return null;

  return {
    ...inventoryHistory[0],
    delivery_start: null,
    delivery_end: null,
    items: visibleItems.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      quantity: getCurrentQuantity(item.id, inventoryHistory, addressId),
      change: 0,
      address_id: addressId,
    })),
    transaction_date: dayjs().format("YYYY-MM-DD"), // Use current date
    order_id: 0,
    order_type: "current",
  } as InventoryHistoryRecord;
};

// Get table data with current stock
export const getTableData = (
  inventoryHistory: InventoryHistoryRecord[],
  visibleItems: ItemInfo[],
  addressId?: number,
): InventoryHistoryRecord[] => {
  const currentStockRecord = createCurrentStockRecord(inventoryHistory, visibleItems, addressId);

  return currentStockRecord ? [currentStockRecord, ...inventoryHistory] : inventoryHistory;
};

// Get all items that have ever been in stock for a specific address
export const getAllItemsForAddress = (
  inventoryHistory: InventoryHistoryRecord[],
  addressId?: number,
): ItemInfo[] => {
  const uniqueItems = new Map<number, ItemInfo>();
  const v_addressId = addressId ? Number(addressId) : null;

  // Collect all items that have ever been in stock for this address
  inventoryHistory.forEach((record) => {
    record.items.forEach((item) => {
      if (v_addressId ? resolvedItemAddressId(item, record) === v_addressId : true) {
        if (!uniqueItems.has(Number(item.id))) {
          uniqueItems.set(Number(item.id), {
            id: Number(item.id),
            name: item.name,
            type: item.type,
          });
        }
      }
    });
  });

  return Array.from(uniqueItems.values());
};

// Get the quantity of an item at a specific point in time
export const getItemQuantityAtTime = (
  itemId: number,
  inventoryHistory: InventoryHistoryRecord[],
  date: string,
  addressId?: number,
): number => {
  if (!inventoryHistory.length) return 0;

  const v_addressId = addressId ? Number(addressId) : null;
  const targetDate = dayjs(date);

  // Find the most recent record before or on the target date
  for (const record of inventoryHistory) {
    const recordDate = dayjs(record.transaction_date);
    if (recordDate.isSameOrBefore(targetDate)) {
      const itemEntry = record.items.find(
        (item) =>
          Number(item.id) === Number(itemId) &&
          (v_addressId == null || resolvedItemAddressId(item, record) === v_addressId),
      );

      if (itemEntry) {
        return itemEntry.quantity;
      }
    }
  }

  return 0;
};

// Get the change of an item at a specific point in time
export const getItemChangeAtTime = (
  itemId: number,
  inventoryHistory: InventoryHistoryRecord[],
  date: string,
  addressId?: number,
): number => {
  if (!inventoryHistory.length) return 0;

  const v_addressId = addressId ? Number(addressId) : null;
  const targetDate = dayjs(date);

  // Find the record on the target date
  for (const record of inventoryHistory) {
    const recordDate = dayjs(record.transaction_date);
    if (recordDate.isSame(targetDate)) {
      const itemEntry = record.items.find(
        (item) =>
          Number(item.id) === Number(itemId) &&
          (v_addressId == null || resolvedItemAddressId(item, record) === v_addressId),
      );

      if (itemEntry) {
        return itemEntry.change;
      }
    }
  }

  return 0;
};
