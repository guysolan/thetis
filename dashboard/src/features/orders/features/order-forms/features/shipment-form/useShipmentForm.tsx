import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelectItemsByAddress } from "../../../../../stockpiles/api/selectItemsByAddress";
import { useSelectItemsView } from "../../../../../items/api/selectItemsView";
import { processOrderItems } from "./processOrderItems";

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
