import { useFormContext, useWatch } from "react-hook-form";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";

export const useStockQuantities = (
    name: string,
    address_name: string,
) => {
    const { control } = useFormContext();
    const { data: stockpileItems } = useSelectItemsByAddress();

    const selectedAddress = useWatch({
        control,
        name: address_name,
    });

    const itemChanges = useWatch({
        control,
        name,
    });

    const getItemQuantities = (itemId: string) => {
        if (!selectedAddress || !stockpileItems) {
            return { before: 0, change: 0, new: 0 };
        }

        const stockpileItem = stockpileItems.find(
            (w) =>
                String(w.address_id) === String(selectedAddress) &&
                String(w.item_id) === String(itemId),
        );

        const currentQuantity = stockpileItem?.item_quantity ?? 0;
        const newQuantity =
            itemChanges?.find((i) => String(i.item_id) === String(itemId))
                ?.quantity_change ?? currentQuantity;
        const quantityChange = newQuantity - currentQuantity;

        return {
            before: Number(currentQuantity),
            change: Number(quantityChange),
            new: Number(newQuantity),
        };
    };

    return {
        getItemQuantities,
        selectedAddress,
        stockpileItems,
    };
};
