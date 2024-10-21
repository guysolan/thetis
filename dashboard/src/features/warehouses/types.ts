import { Database } from "../../database.types";

export type InsertWarehouse =
    Database["public"]["Tables"]["warehouses"]["Insert"];

export type WarehouseItem =
    Database["public"]["Views"]["warehouse_items"]["Row"];

export type WarehouseView =
    Database["public"]["Views"]["warehouses_view"]["Row"];
