import { OrderItem } from "./schema";
import { ItemView } from "../../../items/types";

export type ItemType = "part" | "product" | "service" | "package";
export type StockItemName =
    | "order_items"
    | "produced_items"
    | "consumed_items"
    | "from_items"
    | "to_items";
export type AddressName =
    | "address_id"
    | "to_shipping_address_id"
    | "from_shipping_address_id";

export interface StockItemFormData {
    item_type: ItemType;
    item_id: string;
    quantity_change: number;
}

export interface StockItemQuantities {
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

export interface PriceItemFormData {
    item_type: string;
    item_id: string;
    quantity_change: number;
    item_price: number;
    item_tax: number;
    item_total: string;
}
