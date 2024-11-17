import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";

export const useStocktakeForm = (name: string, address_name: string) => {
    const form = useFormContext();
    const { data: stockpileItems } = useSelectItemsByAddress();

    // Watch for changes in relevant fields
    const items = useWatch({
        control: form.control,
        name,
    });

    const itemsValues = useWatch({
        control: form.control,
        name: items?.map((_, index) => [
            `${name}.${index}.item_id`,
            `${name}.${index}.quantity_after`,
        ]).flat() ?? [],
    });

    const selectedAddress = useWatch({
        control: form.control,
        name: address_name,
    });

    useEffect(() => {
        if (!items?.length || !stockpileItems || !selectedAddress) {
            return;
        }

        // Get current stock levels at selected address
        const addressStock = stockpileItems.filter(
            (item) => String(item.address_id) === String(selectedAddress),
        );

        // Update quantities for each item
        items.forEach((item, index) => {
            if (!item.item_id) return;

            const stockpileItem = addressStock.find(
                (s) => String(s.item_id) === String(item.item_id),
            );
            const currentQuantity = Number(stockpileItem?.item_quantity ?? 0);
            const quantityAfter = Number(
                item.quantity_after ?? currentQuantity,
            );
            const quantityChange = quantityAfter - currentQuantity;

            form.setValue(`${name}.${index}.quantity_before`, currentQuantity);
            form.setValue(`${name}.${index}.quantity_change`, quantityChange);
        });
    }, [
        items,
        itemsValues,
        stockpileItems,
        selectedAddress,
        name,
        form.setValue,
    ]);

    return {
        selectedAddress,
        stockpileItems,
    };
};
