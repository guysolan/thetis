import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";

export function useBaseOrderForm(control: Control<any>) {
    const { data: items } = useSelectItemsView();
    const { data: stockpileItems } = useSelectItemsByAddress();

    const orderItems = useWatch({ control, name: "order_items" });
    const fromAddress = useWatch({ control, name: "from_shipping_address_id" });
    const toAddress = useWatch({ control, name: "to_shipping_address_id" });

    return {
        items,
        stockpileItems,
        orderItems,
        fromAddress,
        toAddress,
    };
}
