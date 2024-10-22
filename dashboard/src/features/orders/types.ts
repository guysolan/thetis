import { Database } from "@/database.types";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItem =
    Database["public"]["Tables"]["order_item_changes"]["Row"];

export type OrderItemInView = {
    "tax": number;
    "price": number;
    "total": number;
    "item_id": number;
    "quantity": number;
    "item_name": string;
    "item_type": string;
};
export type OrderView = Database["public"]["Views"]["orders_view"]["Row"] & {
    items: OrderItemInView[];
};
