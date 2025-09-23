import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";
import { useSelectInventoryHistory } from "@/features/stock-history/api/selectInventoryHistory";
import { getCurrentQuantity } from "@/features/stock-history/utils";

export const useStocktakeForm = (name: string, address_name: string) => {
    const form = useFormContext();

    // Guard against null form in production
    if (!form?.control) {
        return {
            selectedAddress: null,
            stockpileItems: null,
        };
    }

    const { data: stockpileItems } = useSelectItemsByAddress();
    const { data: inventoryHistory } = useSelectInventoryHistory();

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
        if (!items?.length || !inventoryHistory || !selectedAddress) {
            return;
        }

        // Update quantities for each item
        items.forEach((item, index) => {
            if (!item.item_id) return;

            // Use the same method as stock history to get current quantity
            const currentQuantity = getCurrentQuantity(
                Number(item.item_id),
                inventoryHistory,
                Number(selectedAddress),
            );

            // Get the current form values to avoid unnecessary updates
            const currentQuantityBefore = form.getValues(
                `${name}.${index}.quantity_before`,
            );
            const currentQuantityAfter = form.getValues(
                `${name}.${index}.quantity_after`,
            );

            // Set quantity_before to current stock level
            if (currentQuantityBefore !== currentQuantity) {
                form.setValue(
                    `${name}.${index}.quantity_before`,
                    currentQuantity,
                );
            }

            // Set quantity_after to current stock level only if it hasn't been manually set yet
            // (only when first selecting an item and quantity_after is unset/undefined)
            // Don't override if user has manually set it to 0
            if (
                currentQuantityAfter === undefined ||
                (currentQuantityAfter === 0 && currentQuantityBefore === 0)
            ) {
                form.setValue(
                    `${name}.${index}.quantity_after`,
                    currentQuantity,
                );
            }

            // Recalculate quantity_change
            const quantityAfter = form.getValues(
                `${name}.${index}.quantity_after`,
            );
            const quantityChange = Number(quantityAfter) - currentQuantity;
            form.setValue(`${name}.${index}.quantity_change`, quantityChange);
        });
    }, [
        items,
        itemsValues,
        inventoryHistory,
        selectedAddress,
        name,
        form.setValue,
    ]);

    return {
        selectedAddress,
        stockpileItems,
    };
};
