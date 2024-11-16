import { useFieldArray, useFormContext } from "react-hook-form";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { ItemType, PriceItemFormData } from "../types";
import PriceItemsFormFields from "./PriceItemsFormFields";
import PriceItemsSummary from "./PriceItemsSummary";
import PriceItemActions from "./PriceItemActions";

interface PriceItemsProps {
    showPrice?: boolean;
    title?: string;
    defaultIsExpanded?: boolean;
    allowedTypes?: ItemType[];
}

const PriceItems = (
    {
        showPrice = false,
        title = "Order Items",
        defaultIsExpanded = false,
        allowedTypes = [],
    }: PriceItemsProps,
) => {
    const [isExpanded, setIsExpanded] = useState(defaultIsExpanded);
    const { data: items = [] } = useSelectItemsView();
    const form = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "order_items",
    });

    React.useEffect(() => {
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

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                <CardTitle className="font-medium text-base">
                    {title}
                </CardTitle>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {isExpanded
                    ? (
                        <div className="space-y-4">
                            <PriceItemsFormFields
                                name="order_items"
                                fields={fields}
                                items={items}
                                form={form}
                                onCopy={copyRow}
                                onRemove={remove}
                                showPrice={showPrice}
                                itemTotal={itemTotal}
                                getFilteredItemOptions={getFilteredItemOptions}
                                allowedTypes={allowedTypes}
                            />
                            <PriceItemActions
                                itemTypes={allowedTypes}
                                onAppend={handleAppend}
                            />
                        </div>
                    )
                    : (
                        <PriceItemsSummary
                            name="order_items"
                            fields={fields}
                            items={items}
                            form={form}
                            showPrice={showPrice}
                            itemTotal={itemTotal}
                        />
                    )}
            </CardContent>
        </Card>
    );
};

export default PriceItems;
