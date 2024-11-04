import { useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { useSelectWarehouseItems } from "../../../warehouses/api/selectWarehouseItems";
import { useSelectItemsView } from "../../../items/api/selectItemsView";
import { ItemChange, OrderItem } from "../schema";
import { ItemView } from "../../../items/types";

export const useShipmentForm = (
    control: Control<any>,
    setValue: UseFormSetValue<any>,
) => {
    const { data: items } = useSelectItemsView();
    const { data: warehouseItems } = useSelectWarehouseItems();

    // Watch for changes in relevant form fields
    const orderItems = useWatch({ control, name: "order_items" });

    useEffect(() => {
        if (
            !orderItems?.length || !items
        ) {
            setValue("from_items", []);
            return;
        }

        // Calculate consumed items based on order items
        const { fromItems, toItems } = processOrderItems({
            orderItems,
            items,
        });

        console.log(fromItems);

        setValue("from_items", fromItems);
        setValue("to_items", toItems);
    }, [orderItems, items, warehouseItems]);
};

// Memoize the processing function
const processOrderItems = ({
    orderItems,
    items,
}: {
    orderItems: OrderItem[];
    items: ItemView[];
}): { fromItems: ItemChange[]; toItems: ItemChange[] } => {
    if (!orderItems?.length) return { fromItems: [], toItems: [] };

    const fromItems: ItemChange[] = [];
    const toItems: ItemChange[] = [];

    for (const orderItem of orderItems) {
        const item = items?.find(
            (w) => String(w.item_id) === String(orderItem.item_id),
        );

        fromItems.push({
            item_id: String(orderItem.item_id),
            item_name: item?.item_name,
            item_type: item?.item_type || "product",
            quantity_change: -Number(orderItem.quantity_change),
        });

        toItems.push({
            item_id: String(orderItem.item_id),
            item_name: item?.item_name,
            item_type: item?.item_type || "product",
            quantity_change: Number(orderItem.quantity_change),
        });
    }

    console.log(fromItems);
    console.log(toItems);

    return { fromItems, toItems };
};
