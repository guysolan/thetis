import { Database } from "@/types/supabase";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderView = Database["public"]["Views"]["orders_view"]["Row"];
