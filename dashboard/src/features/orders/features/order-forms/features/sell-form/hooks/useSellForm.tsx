import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelectItemsView } from "../../../../../../items/api/selectItemsView";
import { useOrderItems } from '../../../hooks/useOrderItems';
import { ItemChange } from '../../../schema';

export const useSellForm = () => {
    const form = useFormContext();
    const { data: items } = useSelectItemsView();

    const orderItems = useOrderItems();
    const selectedAddress = form.watch("from_shipping_address_id");

    useEffect(() => {
        if (!orderItems?.length || !items || !selectedAddress) {
            form.setValue("consumed_items", []);
            return;
        }

        const consumedItems: ItemChange[] = orderItems.map((orderItem) => {
            const item = items.find(
                (i) => String(i.item_id) === String(orderItem.item_id),
            );

            return {
                item_id: String(orderItem.item_id),
                item_name: item?.item_name,
                item_type: item?.item_type || "product",
                quantity_change: -Number(orderItem.quantity_change),
            };
        });

        form.setValue("consumed_items", consumedItems);
    }, [orderItems, items, selectedAddress, form]);
};
