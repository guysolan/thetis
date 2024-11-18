import { Database } from "@/database.types";
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
export type Order = Database["public"]["Tables"]["orders"];
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
export type OrderView = Database["public"]["Views"]["orders_view"]["Row"] & {
    order_id: number;
    items: OrderItemInView[];
    order_type: OrderType;
    from_address: Address["Row"];
    to_address: Address["Row"];
    from_company: Company["Row"];
    to_company: Company["Row"];
    from_contact: Contact["Row"];
    to_contact: Contact["Row"];
    currency: Currency;
};
