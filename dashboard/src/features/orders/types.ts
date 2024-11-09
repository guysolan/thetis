import { Database } from "@/database.types";

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
};
export type OrderView = Database["public"]["Views"]["orders_view"]["Row"] & {
    order_id: number;
    items: OrderItemInView[];
    order_type: OrderType;
};
