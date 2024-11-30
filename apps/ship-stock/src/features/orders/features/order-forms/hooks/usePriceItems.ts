import { useFieldArray, useFormContext } from "react-hook-form";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { PriceItemFormData } from "../types";
import { useEffect } from "react";

export const usePriceItems = () => {
    const { data: items = [] } = useSelectItemsView();
    const form = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "order_items",
    });

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name?.includes(".item_id") && items) {
                const index = parseInt(name.split(".")[1]);
                const selectedItemId = value.order_items?.[index]?.item_id;
                const selectedItem = items.find((item) =>
                    String(item.item_id) === selectedItemId
                );

                if (selectedItem) {
                    form.setValue(
                        `order_items.${index}.item_price`,
                        selectedItem.item_price,
                    );
                    form.setValue(`order_items.${index}.item_tax`, 0.2);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [form, items]);

    const getFilteredItemOptions = (itemType: string) => {
        return items
            .filter((item) => item.item_type === itemType)
            .map((item) => ({
                label: item.item_name,
                value: String(item.item_id),
            }));
    };

    const itemTotal = (index: number) => {
        const item_price = form.watch(`order_items.${index}.item_price`);
        const item_tax = form.watch(`order_items.${index}.item_tax`);
        const quantity_change = form.watch(
            `order_items.${index}.quantity_change`,
        );

        const price = Number(item_price);
        const tax = Number(item_tax) + 1;
        const quantity = Number(quantity_change);
        const total = price * tax * quantity;

        return Number(total).toFixed(2);
    };

    const copyRow = (index: number) => {
        const itemToCopy = form.getValues(`order_items.${index}`);
        append({ ...itemToCopy });
    };

    const handleAppend = (type: string) => {
        append({
            item_type: type,
            item_id: "",
            quantity_change: 1,
            item_price: 0,
            item_tax: 0.2,
            item_total: "0.00",
        } as PriceItemFormData);
    };

    const grandTotal = () => {
        const orderItems = form.watch("order_items");
        return orderItems.reduce((sum, _, index) => {
            return sum + parseFloat(itemTotal(index));
        }, 0).toFixed(2);
    };

    return {
        items,
        fields,
        form,
        copyRow,
        remove,
        itemTotal,
        grandTotal,
        handleAppend,
        getFilteredItemOptions,
    };
};
