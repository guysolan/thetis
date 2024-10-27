import { Database } from "../../database.types";
export type ItemType = Database["public"]["Enums"]["item_type"];
export type ItemView = Database["public"]["Views"]["items_view"]["Row"] & {
    item_id: number;
    item_name: string;
    components: {
        "component_quantity": number;
        "component_price": number;
        "component_type": ItemType;
        "component_name": string;
        "component_id": number;
    }[];
};

export type ItemComponentInsert =
    Database["public"]["Tables"]["item_components"]["Insert"];
