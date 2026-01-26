import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { StockValidationResult } from "../types";
import { useSelectItemsView } from "../../items/api/selectItemsView";

export interface StockValidationConfig {
    itemsFieldName?: string;
    addressFieldName?: string;
}

export const useStockValidation = (config?: StockValidationConfig) => {
    const {
        itemsFieldName = "from_items",
    } = config || {};

    const { control } = useFormContext();

    // Watch all relevant fields explicitly
    const items = useWatch({
        control,
        name: itemsFieldName,
        defaultValue: [],
    });

    const { data: itemsView } = useSelectItemsView();

    const negativeStockItems = useMemo((): StockValidationResult[] => {
        if (!items || !itemsView) return [];

        return items
            .filter((item) => {
                // Add more detailed validation
                const quantityAfter = Number(item.quantity_after);
                return !Number.isNaN(quantityAfter) && quantityAfter < 0;
            })
            .map((item) => {
                const itemView = itemsView.find((view) =>
                    String(view.item_id) === String(item.item_id)
                );
                return {
                    item_name: itemView?.item_name || "Unknown Item",
                    quantity_after: item.quantity_after,
                    item_id: item.item_id, // Add this for debugging
                };
            });
    }, [items, itemsView]);

    return {
        hasNegativeStock: negativeStockItems.length > 0,
        negativeStockItems,
    };
};
