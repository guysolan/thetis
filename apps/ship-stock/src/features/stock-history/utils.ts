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

// Helper function to determine badge variant based on order type
export function getOrderTypeBadgeVariant(
    orderType: string,
): string {
    switch (orderType) {
        case "purchase":
            return "bg-blue-100 text-blue-800 hover:bg-blue-200";
        case "sale":
            return "bg-green-100 text-green-800 hover:bg-green-200";
        case "shipment":
            return "bg-purple-100 text-purple-800 hover:bg-purple-200";
        case "stocktake":
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
            .filter((item) => addressId ? item.address_id === addressId : true)
            .forEach((item) => {
                if (!stockMap.has(item.id)) {
                    stockMap.set(item.id, {
                        item_id: item.id,
                        item_name: item.name,
                        quantity: Math.round(item.quantity),
                        change: Math.round(item.change),
                    });
                }
            });
    });

    return Array.from(stockMap.values())
        .sort((a, b) => a.item_id - b.item_id);
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
            if (
                addressId ? item.address_id === addressId : true
            ) {
                if (!stockMap.has(item.id)) {
                    stockMap.set(item.id, {
                        item_id: item.id,
                        item_name: item.name,
                        quantity: Math.round(item.quantity),
                        change: 0, // Current stock has no change
                    });
                }
            }
        });
    });

    return Array.from(stockMap.values())
        .sort((a, b) => a.item_id - b.item_id);
};

// Helper to filter out packages and services
export const filterNonInventoryItems = (
    rows: StockHistoryRow[],
): StockHistoryRow[] => {
    return rows.filter((row) =>
        !row.item_name.toLowerCase().includes("package") &&
        !row.item_name.toLowerCase().includes("service")
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
            if (
                v_addressId ? item.address_id === v_addressId : true
            ) {
                if (!uniqueItems.has(item.id)) {
                    uniqueItems.set(item.id, {
                        id: item.id,
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
export const filterItemsByType = (
    items: ItemInfo[],
    activeTab: string,
): ItemInfo[] => {
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

// Get the latest quantity for each item
export const getCurrentQuantity = (
    itemId: number,
    inventoryHistory: InventoryHistoryRecord[],
    addressId?: number,
): number => {
    if (!inventoryHistory.length) return 0;

    const v_addressId = addressId ? Number(addressId) : null;

    // Find the most recent record that mentions this item with the matching address_id
    for (const record of inventoryHistory) {
        const itemEntry = record.items.find(
            (item) =>
                item.id === itemId &&
                (v_addressId ? item.address_id === v_addressId : true),
        );

        if (itemEntry) {
            // Return the quantity from the first (most recent) record mentioning this item
            return itemEntry.quantity;
        }
    }

    // If no record mentions this item with the matching address_id, return 0
    return 0;
};

// Create current stock record
export const createCurrentStockRecord = (
    inventoryHistory: InventoryHistoryRecord[],
    visibleItems: ItemInfo[],
    addressId?: number,
): InventoryHistoryRecord | null => {
    if (!inventoryHistory.length) return null;

    return {
        ...inventoryHistory[0],
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
    const currentStockRecord = createCurrentStockRecord(
        inventoryHistory,
        visibleItems,
        addressId,
    );

    return currentStockRecord
        ? [currentStockRecord, ...inventoryHistory]
        : inventoryHistory;
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
            if (v_addressId ? item.address_id === v_addressId : true) {
                if (!uniqueItems.has(item.id)) {
                    uniqueItems.set(item.id, {
                        id: item.id,
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
                    item.id === itemId &&
                    (v_addressId ? item.address_id === v_addressId : true),
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
                    item.id === itemId &&
                    (v_addressId ? item.address_id === v_addressId : true),
            );

            if (itemEntry) {
                return itemEntry.change;
            }
        }
    }

    return 0;
};
