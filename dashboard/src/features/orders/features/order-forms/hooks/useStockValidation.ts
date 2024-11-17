import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { StockValidationResult } from "../types";
import { useStockQuantities } from "./useStockQuantities";

interface StockValidationConfig {
    itemsFieldName?: string;
    addressFieldName?: string;
}

export const useStockValidation = (config?: StockValidationConfig) => {
    const {
        itemsFieldName = "from_items",
        addressFieldName = "from_shipping_address_id",
    } = config || {};

    const { control } = useFormContext();
    const items = useWatch({ control, name: itemsFieldName });
    const { getItemQuantities } = useStockQuantities(
        itemsFieldName,
        addressFieldName,
    );

    const negativeStockItems = useMemo((): StockValidationResult[] => {
        if (!items) return [];

        return items
            .filter((item) => {
                const quantities = getItemQuantities(item.item_id);
                return quantities.after < 0;
            })
            .map((item) => ({
                ...item,
                item_quantity: getItemQuantities(item.item_id).after,
            }));
    }, [items, getItemQuantities]);

    return {
        hasNegativeStock: negativeStockItems.length > 0,
        negativeStockItems,
    };
};
