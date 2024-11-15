import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";

export const usePurchaseForm = () => {
    const form = useFormContext();
    const { data: items } = useSelectItemsView();

    const orderItems = form.watch("order_items");
    const selectedAddress = form.watch("to_shipping_address_id");

    useEffect(() => {
        if (!orderItems?.length || !items || !selectedAddress) {
            form.setValue("produced_items", []);
            return;
        }

        const producedItems = orderItems.map((orderItem) => {
            const item = items.find(
                (i) => String(i.item_id) === String(orderItem.item_id),
            );

            return {
                item_id: String(orderItem.item_id),
                item_name: item?.item_name,
                item_type: item?.item_type || "product",
                quantity_change: Number(orderItem.quantity_change), // Positive for additions
            };
        });

        form.setValue("produced_items", producedItems);
    }, [orderItems, items, selectedAddress, form]);
};
