import { Database } from "../../database.types";

export type Address = Database["public"]["Tables"]["addresses"];
export type AddressRow = Address["Row"];
export type InsertAddress = Database["public"]["Tables"]["addresses"]["Insert"];
export type Stockpile = Database["public"]["Views"]["stockpiles"];

export type ItemsByAddress =
    Database["public"]["Views"]["items_by_address"]["Row"];

export type StockpileView = Database["public"]["Views"]["stockpiles"]["Row"];
