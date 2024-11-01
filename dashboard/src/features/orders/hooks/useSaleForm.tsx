import { useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { useSelectWarehouseItems } from "../../warehouses/api/selectWarehouseItems";
import { useSelectItemsView } from "../../items/api/selectItemsView";
import { ItemChange, OrderItem } from "../schema";
import { ItemView } from "../../items/types";

export const useSaleForm = (
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
            setValue("consumed_items", []);
            return;
        }

        // Calculate consumed items based on order items
        const consumedItems = processOrderItems({
            orderItems,
            items,
        });

        console.log(consumedItems);

        // Update form with consumed items
        setValue("consumed_items", consumedItems);
    }, [orderItems, items, warehouseItems]);
};

// Memoize the processing function
const processOrderItems = ({
    orderItems,
    items,
}: {
    orderItems:OrderItem[];
    items: ItemView[];
}) => {
    if (!orderItems?.length) return [];

    const consumedItems: ItemChange[] = [];

    for (const orderItem of orderItems) {
        const item = items?.find(
            (w) => String(w.item_id) === String(orderItem.item_id),
        );

        consumedItems.push({
            item_id: String(orderItem.item_id),
            item_name: item?.item_name,
            item_type: item?.item_type || "product",
            quantity_change: -Number(orderItem.quantity_change),
        });
    }

    console.log(consumedItems);

    return consumedItems;
};
