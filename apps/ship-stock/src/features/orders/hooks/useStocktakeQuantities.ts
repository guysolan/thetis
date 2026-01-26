import { useFormContext, useWatch } from "react-hook-form";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";

export const useStocktakeQuantities = (
    name: string,
    address_name: string,
) => {
    const form = useFormContext();
    const { data: stockpileItems } = useSelectItemsByAddress();

    const selectedAddress = useWatch({
        control: form.control,
        name: address_name,
    });

    const itemChanges = useWatch({
        control: form.control,
        name,
    });

    const getItemQuantities = (itemId: string) => {
        if (!selectedAddress || !stockpileItems) {
            return { before: 0, change: 0, after: 0 };
        }

        const stockpileItem = stockpileItems.find(
            (w) =>
                String(w.address_id) === String(selectedAddress) &&
                String(w.item_id) === String(itemId),
        );

        const currentQuantity = Number(stockpileItem?.item_quantity ?? 0);
        const itemChange = itemChanges?.find((i) =>
            String(i.item_id) === String(itemId)
        );
        const quantityAfter = Number(
            itemChange?.quantity_after ?? currentQuantity,
        );
        const quantityChange = quantityAfter - currentQuantity;

        return {
            before: currentQuantity,
            change: quantityChange,
            after: quantityAfter,
        };
    };

    const updateItemQuantities = (itemId: string) => {
        if (!itemId) return;

        const stockpileItem = stockpileItems?.find(
            (i) => String(i.item_id) === String(itemId),
        );
        const currentQuantity = Number(stockpileItem?.item_quantity ?? 0);

        // Get fields from form context
        const fields = form.getValues(name) || [];

        // Update the form fields
        const fieldIndex = fields.findIndex(
            (field) => String(field.item_id) === String(itemId),
        );

        if (fieldIndex === -1) return;

        const quantityAfter = Number(
            form.watch(`${name}.${fieldIndex}.quantity_after`) ??
                currentQuantity,
        );
        const quantityChange = quantityAfter - currentQuantity;

        form.setValue(`${name}.${fieldIndex}.quantity_before`, currentQuantity);
        form.setValue(`${name}.${fieldIndex}.quantity_change`, quantityChange);
        form.setValue(`${name}.${fieldIndex}.quantity_after`, quantityAfter);
    };

    return {
        getItemQuantities,
        selectedAddress,
        stockpileItems,
        updateItemQuantities,
    };
};
