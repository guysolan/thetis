import { Database } from "../../database.types";

export type ItemView = Database["public"]["Views"]["items_view"]["Row"] & {
    components: {
        "quantity": number;
        "component_name": string;
        "component_item_id": number;
    }[];
};

export type ItemComponentInsert =
    Database["public"]["Tables"]["item_components"]["Insert"];
