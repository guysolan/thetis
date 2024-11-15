import { OrderItem } from "./schema";
import { ItemView } from "../../../items/types";

export interface StockItem {
    item_id: string;
    item_name: string;
    quantity_after: number;
    address_id: string;
    item_type: string;
    quantity_change: number;
    item_price?: number;
    item_tax?: number;
}

export interface StockQuantityResult {
    before: number;
    after: number;
}

export interface StockValidationResult {
    name: string;
    quantity: number;
}

export interface DisplayItem {
    item_id: string;
    item_name: string;
    quantity_change: number;
    quantity_after?: number;
    item_type: string;
}

export interface OrderItemChange {
    item_id: string;
    quantity_change: number;
    item_price: number;
    item_tax: number;
    item_type: string;
    address_id: string;
    quantity_after?: number;
    item_name?: string;
}

export interface ProcessOrderItemsParams {
    orderItems: OrderItem[];
    items: ItemView[];
    fromStockLevels: Record<string, number>;
    fromShippingAddressId: string;
    toShippingAddressId: string;
}

export interface ProcessedItems {
    fromItems: OrderItemChange[];
    toItems: OrderItemChange[];
    displayItems: DisplayItem[];
}
