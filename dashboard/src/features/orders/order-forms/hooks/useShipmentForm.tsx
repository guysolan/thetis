import { useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { useSelectItemsByAddress } from "../../../stockpiles/api/selectItemsByAddress";
import { useSelectItemsView } from "../../../items/api/selectItemsView";
import { ItemChange, OrderItem } from "../schema";
import { ItemView } from "../../../items/types";

export const useShipmentForm = (
    control: Control<any>,
    setValue: UseFormSetValue<any>,
) => {
    const { data: items } = useSelectItemsView();
    const { data: stockpileItems } = useSelectItemsByAddress();

    // Watch for changes in relevant form fields
    const orderItems = useWatch({ control, name: "order_items" });
    const fromShippingAddressId = useWatch({ 
        control, 
        name: "from_shipping_address_id" 
    });
    const toShippingAddressId = useWatch({ 
        control, 
        name: "to_shipping_address_id" 
    });

    useEffect(() => {
        if (!orderItems?.length || !items || !fromShippingAddressId) {
            setValue("from_items", []);
            setValue("to_items", []);
            return;
        }

        // Get stock levels for the from address
        const fromStockLevels = stockpileItems?.[fromShippingAddressId] || {};

        // Calculate items based on order items
        const { fromItems, toItems } = processOrderItems({
            orderItems,
            items,
            fromStockLevels,
        });

        setValue("from_items", fromItems);
        setValue("to_items", toItems);
    }, [orderItems, items, stockpileItems, fromShippingAddressId, toShippingAddressId]);
};

// Updated processing function
const processOrderItems = ({
    orderItems,
    items,
    fromStockLevels,
}: {
    orderItems: OrderItem[];
    items: ItemView[];
    fromStockLevels: Record<string, number>;
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
