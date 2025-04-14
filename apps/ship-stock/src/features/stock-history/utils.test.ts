import { describe, expect, it } from "vitest";
import {
    createCurrentStockRecord,
    filterItemsByType,
    filterNonInventoryItems,
    formatStockHistoryRows,
    getAllItemsForAddress,
    getCurrentQuantity,
    getCurrentStockLevels,
    getItemChangeAtTime,
    getItemQuantityAtTime,
    getTableData,
    getUniqueItems,
} from "./utils";
import type { InventoryHistoryRecord } from "./StockHistoryTable";
import dayjs from "dayjs";

// Test data
const item1 = [
    {
        id: 1,
        name: "Item 1",
        type: "product",
        quantity: 150,
        change: -50,
        address_id: 1,
    },
    {
        id: 1,
        name: "Item 1",
        type: "product",
        quantity: 200,
        change: 200,
        address_id: 1,
    },
    {
        id: 1,
        name: "Item 1",
        type: "product",
        quantity: 0,
        change: 0,
        address_id: 1,
    },
];

const item2 = [
    {
        id: 2,
        name: "Item 2",
        type: "product",
        quantity: 6,
        change: 4,
        address_id: 2,
    },
    {
        id: 2,
        name: "Item 2",
        type: "product",
        quantity: 2,
        change: 2,
        address_id: 2,
    },
    {
        id: 2,
        name: "Item 2",
        type: "product",
        quantity: 0,
        change: 0,
        address_id: 2,
    },
];

const item3 = {
    id: 3,
    name: "Item 3",
    type: "product",
    quantity: 10,
    change: 0,
    address_id: 2,
};

const mockInventoryHistory: InventoryHistoryRecord[] = [
    {
        order_id: 1,
        transaction_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
        order_type: "purchase",
        items: [item1[0], item2[0]],
    },
    {
        order_id: 2,
        transaction_date: dayjs().subtract(2, "day").format("YYYY-MM-DD"),
        order_type: "sale",
        items: [item1[1], item2[1]],
    },
    {
        order_id: 3,
        transaction_date: dayjs().subtract(3, "day").format("YYYY-MM-DD"),
        order_type: "shipment",
        items: [item1[2], item2[2], item3],
    },
];

describe("Stock History Utils", () => {
    it("formats stock history rows correctly", () => {
        const result = formatStockHistoryRows(mockInventoryHistory);

        expect(result).toHaveLength(2);
        expect(result).toEqual([
            {
                item_id: 1,
                item_name: "Item 1",
                quantity: 150,
                change: -50,
            },
            {
                item_id: 2,
                item_name: "Item 2",
                quantity: 6,
                change: 4,
            },
        ]);
    });

    it("formats stock history rows correctly with address filter", () => {
        const result = formatStockHistoryRows(mockInventoryHistory, 1);

        expect(result).toHaveLength(1);
        expect(result).toEqual([
            {
                item_id: 1,
                item_name: "Item 1",
                quantity: 150,
                change: -50,
            },
        ]);
    });

    it("gets current stock levels correctly", () => {
        const result = getCurrentStockLevels(mockInventoryHistory);

        expect(result).toHaveLength(2);
        expect(result).toEqual([
            {
                item_id: 1,
                item_name: "Item 1",
                quantity: 150,
                change: 0,
            },
            {
                item_id: 2,
                item_name: "Item 2",
                quantity: 6,
                change: 0,
            },
        ]);
    });

    it("gets current stock levels correctly with address filter", () => {
        const result = getCurrentStockLevels(mockInventoryHistory, 1);

        expect(result).toHaveLength(1);
        expect(result).toEqual([
            {
                item_id: 1,
                item_name: "Item 1",
                quantity: 150,
                change: 0,
            },
        ]);
    });

    it("filters out non-inventory items", () => {
        const mockRows = [
            { item_id: 1, item_name: "Product A", quantity: 10, change: 0 },
            { item_id: 2, item_name: "Package B", quantity: 5, change: 0 },
            { item_id: 3, item_name: "Service C", quantity: 3, change: 0 },
        ];

        const result = filterNonInventoryItems(mockRows);

        expect(result).toHaveLength(1);
        expect(result[0].item_name).toBe("Product A");
    });

    it("gets unique items correctly", () => {
        const result = getUniqueItems(mockInventoryHistory);

        expect(result.size).toBe(2);
        expect(result.get(1)).toEqual({
            id: 1,
            name: "Item 1",
            type: "product",
        });
        expect(result.get(2)).toEqual({
            id: 2,
            name: "Item 2",
            type: "product",
        });
    });

    it("gets unique items correctly with address filter", () => {
        const result = getUniqueItems(mockInventoryHistory, 1);

        expect(result.size).toBe(1);
        expect(result.get(1)).toEqual({
            id: 1,
            name: "Item 1",
            type: "product",
        });
    });

    it("filters items by type correctly", () => {
        const items = [
            { id: 1, name: "Product A", type: "product" },
            { id: 2, name: "Part B", type: "part" },
            { id: 3, name: "Package C", type: "package" },
            { id: 4, name: "Service D", type: "service" },
        ];

        const allResult = filterItemsByType(items, "all");
        expect(allResult).toHaveLength(2);
        expect(allResult[0].name).toBe("Part B");
        expect(allResult[1].name).toBe("Product A");

        const productsResult = filterItemsByType(items, "products");
        expect(productsResult).toHaveLength(1);
        expect(productsResult[0].name).toBe("Product A");

        const partsResult = filterItemsByType(items, "parts");
        expect(partsResult).toHaveLength(1);
        expect(partsResult[0].name).toBe("Part B");
    });

    it("gets current quantity correctly", () => {
        const result = getCurrentQuantity(1, mockInventoryHistory);
        expect(result).toBe(150);
    });

    it("gets current quantity correctly with address filter", () => {
        const result = getCurrentQuantity(1, mockInventoryHistory, 1);
        expect(result).toBe(150);

        const result2 = getCurrentQuantity(2, mockInventoryHistory, 1);
        expect(result2).toBe(0);
    });

    it("creates current stock record correctly", () => {
        const visibleItems = [
            { id: 1, name: "Item 1", type: "product" },
            { id: 2, name: "Item 2", type: "product" },
        ];

        const result = createCurrentStockRecord(
            mockInventoryHistory,
            visibleItems,
        );

        expect(result).not.toBeNull();
        expect(result?.order_id).toBe(0);
        expect(result?.order_type).toBe("current");
        expect(result?.items).toHaveLength(2);
        expect(result?.items[0].quantity).toBe(150);
        expect(result?.items[1].quantity).toBe(6);
    });

    it("creates current stock record correctly with address filter", () => {
        const visibleItems = [
            { id: 1, name: "Item 1", type: "product" },
            { id: 2, name: "Item 2", type: "product" },
        ];

        const result = createCurrentStockRecord(
            mockInventoryHistory,
            visibleItems,
            1,
        );

        expect(result).not.toBeNull();
        expect(result?.order_id).toBe(0);
        expect(result?.order_type).toBe("current");
        expect(result?.items).toHaveLength(2);
        expect(result?.items[0].quantity).toBe(150);
        expect(result?.items[1].quantity).toBe(0);
    });

    it("gets table data correctly", () => {
        const visibleItems = [
            { id: 1, name: "Item 1", type: "product" },
            { id: 2, name: "Item 2", type: "product" },
        ];

        const result = getTableData(mockInventoryHistory, visibleItems);

        expect(result).toHaveLength(4); // Current + 3 history records
        expect(result[0].order_id).toBe(0); // First record is current
        expect(result[1].order_id).toBe(1); // Then history records
    });

    it("gets table data correctly with address filter", () => {
        const visibleItems = [
            { id: 1, name: "Item 1", type: "product" },
            { id: 2, name: "Item 2", type: "product" },
        ];

        const result = getTableData(mockInventoryHistory, visibleItems, 1);

        expect(result).toHaveLength(4); // Current + 3 history records
        expect(result[0].order_id).toBe(0); // First record is current
        expect(result[0].items[0].quantity).toBe(150);
        expect(result[0].items[1].quantity).toBe(0);
    });

    it("gets all items for address correctly", () => {
        const result = getAllItemsForAddress(mockInventoryHistory);

        expect(result).toHaveLength(3); // Item 1, Item 2, and Item 3
        expect(result.map((item) => item.id).sort()).toEqual([1, 2, 3]);
    });

    it("gets all items for address correctly with address filter", () => {
        const result = getAllItemsForAddress(mockInventoryHistory, 1);

        expect(result).toHaveLength(1); // Only Item 1
        expect(result[0].id).toBe(1);
    });

    it("gets item quantity at time correctly", () => {
        const date1 = dayjs().subtract(1, "day").format("YYYY-MM-DD");
        const date2 = dayjs().subtract(2, "day").format("YYYY-MM-DD");
        const date3 = dayjs().subtract(3, "day").format("YYYY-MM-DD");

        const result1 = getItemQuantityAtTime(1, mockInventoryHistory, date1);
        expect(result1).toBe(150);

        const result2 = getItemQuantityAtTime(1, mockInventoryHistory, date2);
        expect(result2).toBe(200);

        const result3 = getItemQuantityAtTime(1, mockInventoryHistory, date3);
        expect(result3).toBe(0);
    });

    it("gets item quantity at time correctly with address filter", () => {
        const date1 = dayjs().subtract(1, "day").format("YYYY-MM-DD");

        const result1 = getItemQuantityAtTime(
            1,
            mockInventoryHistory,
            date1,
            1,
        );
        expect(result1).toBe(150);

        const result2 = getItemQuantityAtTime(
            2,
            mockInventoryHistory,
            date1,
            1,
        );
        expect(result2).toBe(0);
    });

    it("gets item change at time correctly", () => {
        const date1 = dayjs().subtract(1, "day").format("YYYY-MM-DD");
        const date2 = dayjs().subtract(2, "day").format("YYYY-MM-DD");
        const date3 = dayjs().subtract(3, "day").format("YYYY-MM-DD");

        const result1 = getItemChangeAtTime(1, mockInventoryHistory, date1);
        expect(result1).toBe(-50);

        const result2 = getItemChangeAtTime(1, mockInventoryHistory, date2);
        expect(result2).toBe(200);

        const result3 = getItemChangeAtTime(1, mockInventoryHistory, date3);
        expect(result3).toBe(0);
    });

    it("gets item change at time correctly with address filter", () => {
        const date1 = dayjs().subtract(1, "day").format("YYYY-MM-DD");

        const result1 = getItemChangeAtTime(1, mockInventoryHistory, date1, 1);
        expect(result1).toBe(-50);

        const result2 = getItemChangeAtTime(2, mockInventoryHistory, date1, 1);
        expect(result2).toBe(0);
    });
});
