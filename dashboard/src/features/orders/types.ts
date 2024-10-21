import { Database } from "@/database.types";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItem =
    Database["public"]["Tables"]["order_item_changes"]["Row"];
export type OrderView = Database["public"]["Views"]["orders_view"]["Row"];
