import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelectItemsByAddress } from "../../../../../stockpiles/api/selectItemsByAddress";
import { useSelectItemsView } from "../../../../../items/api/selectItemsView";
import { processOrderItems } from "./processOrderItems";

// TODO
/**
 * Custom hook to handle build form logic
 *
 * @description
 * Processes the form in the following steps:
 * 1. Processes each `package`:
 *    - For each component:
 *      - Add to a `package_items` array
 *      - For all package_items with the same `item_id`, sum the `quantity`
 * 2. Determines stock level for each item at selected addresses
 * 3. Sets form values for to_items and from_items based on stock levels and package_items quantites
 *
 * @returns void
 */

export const useShipmentForm = () => {
    const { control, setValue } = useFormContext();
    const { data: items } = useSelectItemsView();
    const { data: stockpileItems } = useSelectItemsByAddress();

    const orderItems = useWatch({ control, name: "order_items" });
    const fromShippingAddressId = useWatch({
        control,
        name: "from_shipping_address_id",
    });
    const toShippingAddressId = useWatch({
        control,
        name: "to_shipping_address_id",
    });

    useEffect(() => {
        if (!orderItems?.length || !items || !fromShippingAddressId) {
            setValue("from_items", []);
            setValue("to_items", []);
            setValue("display_items", []);
            return;
        }

        const fromStockLevels = stockpileItems?.[fromShippingAddressId] || {};

        const { fromItems, toItems, displayItems } = processOrderItems({
            orderItems,
            items,
            fromStockLevels,
            fromShippingAddressId,
            toShippingAddressId,
        });

        setValue("from_items", fromItems);
        setValue("to_items", toItems);
        setValue("display_items", displayItems);
    }, [
        orderItems,
        items,
        stockpileItems,
        fromShippingAddressId,
        toShippingAddressId,
        setValue,
    ]);
};
