import { Database } from "../../database.types";

export type ItemView = Database["public"]["Views"]["items_view"]["Row"];
export type ItemComponentInsert =
    Database["public"]["Tables"]["item_components"]["Insert"];
