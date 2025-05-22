import { Database } from "@thetis/ship-stock-api/types";
import { Company } from "../companies/types";
import { Contact } from "../contacts/types";

export const orderTypes = [
    "sale",
    "shipment",
    "build",
    "purchase",
    "stocktake",
] as const;

import { Address } from "../stockpiles/types";
import { MultiOrderFormData } from "./features/multi-order-form/schema";
export type Order = Database["public"]["Tables"]["orders"];
export type OrderItemChange =
    Database["public"]["Tables"]["order_item_changes"];
export type OrderItemChangeRow = OrderItemChange["Row"];
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
    address: Address;
};
export interface OrderView {
    order_form_value: MultiOrderFormData;
    order_id: number;
    order_type: string;
    order_date: string;
    total_value?: number;
    carriage?: number;
    currency: string;
    payment_status?: string;
    items: OrderItemInView[];
    from_address: Address["Row"];
    to_address: Address["Row"];
    from_company: Company["Row"];
    to_company: Company["Row"];
    from_contact: Contact["Row"];
    to_contact: Contact["Row"];
}
