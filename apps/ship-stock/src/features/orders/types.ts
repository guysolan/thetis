import { Database } from "@thetis/ship-stock-api/types";
import { Company } from "../companies/types";
import { Contact } from "../contacts/types";

export const orderTypes = [
    "sell",
    "buy",
    "build",
    "ship",
    "count",
] as const;

import { Address } from "../stockpiles/types";
import { MultiOrderFormData } from "./features/multi-order-form/schema";
export type Order = Database["public"]["Tables"]["orders"];
export type OrderItemChangeRow =
    Database["public"]["Tables"]["order_item_changes"]["Row"];
export type ItemChange = Database["public"]["Tables"]["item_changes"];
export type ItemChangeRow = ItemChange["Row"];
export type ExtendedOrderItemChange = OrderItemChangeRow & {
    item_changes: ItemChangeRow[];
};
export type ExtendedOrder = OrderRow & {
    order_item_changes: ExtendedOrderItemChange[];
};

export type OrderRow = Order["Row"];
export type OrderItem =
    Database["public"]["Tables"]["order_item_changes"]["Row"];
export type OrderType = Database["public"]["Enums"]["order_type"];
export type OrderItemInView = {
    "tax": number;
    "price": number;
    "total": number;
    "item_id": number;
    "quantity": number;
    "item_name": string;
    "item_type": string;
    "package_item_change_id"?: string;
    address: Address["Row"];
};
export interface OrderView {
    order_form_value: MultiOrderFormData;
    order_id: number;
    order_type: string;
    order_date: string;
    delivery_dates?: string | null;
    total_value?: number;
    carriage?: number;
    currency: string;
    payment_status?: string;
    delivery_status?: string;
    items: OrderItemInView[];
    from_address: Address["Row"];
    to_address: Address["Row"];
    from_company: Company["Row"];
    to_company: Company["Row"];
    from_contact: Contact["Row"];
    to_contact: Contact["Row"];
}
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
