import { useFieldArray, useFormContext } from "react-hook-form";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from "lucide-react";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import Select from "@/components/Select";
import Input from "@/components/Input";
import ItemTypeSelect from "../../../../components/ItemTypeSelect";
import { itemTypes } from "../../../items/types";

const PriceItems = ({ showPrice = false }: { showPrice?: boolean }) => {
    const { data: items } = useSelectItemsView();

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

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        {showPrice && <TableHead>Price</TableHead>}
                        {showPrice && <TableHead>Tax</TableHead>}
                        {showPrice && <TableHead>Total</TableHead>}
                        <TableHead>
                            <span className="sr-only">Delete</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.map((field, index) => (
                        <TableRow key={field.id}>
                            <TableCell>
                                <ItemTypeSelect
                                    name={`order_items.${index}.item_type`}
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    name={`order_items.${index}.item_id`}
                                    options={getFilteredItemOptions(
                                        form.watch(
                                            `order_items.${index}.item_type`,
                                        ),
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    name={`order_items.${index}.quantity_change`}
                                    type="number"
                                />
                            </TableCell>
                            {showPrice && (
                                <TableCell>
                                    <Input
                                        name={`order_items.${index}.item_price`}
                                        type="number"
                                        step="0.01"
                                    />
                                </TableCell>
                            )}
                            {showPrice && (
                                <TableCell>
                                    <Input
                                        name={`order_items.${index}.item_tax`}
                                        type="number"
                                        step="0.01"
                                    />
                                </TableCell>
                            )}
                            {showPrice && (
                                <TableCell>
                                    {itemTotal(index)}
                                </TableCell>
                            )}
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        onClick={() => copyRow(index)}
                                        variant="secondary"
                                        className="px-2"
                                    >
                                        <Copy size={20} />
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        variant="destructive"
                                        className="px-2"
                                    >
                                        <Trash size={20} />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {showPrice &&
                        (
                            <TableRow className="font-semibold">
                                <TableCell colSpan={5}>
                                    Total
                                </TableCell>
                                <TableCell>
                                    {fields.reduce(
                                        (sum, _, index) =>
                                            sum + Number(itemTotal(index)),
                                        0,
                                    ).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
            <div className="flex gap-2 p-2">
                {itemTypes.map((type) => (
                    <Button
                        key={type}
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                            append({
                                item_type: type,
                                item_id: "",
                                quantity_change: 1,
                                item_price: 0,
                                item_tax: 0.2,
                                item_total: "0.00",
                            })}
                    >
                        Add {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                ))}
            </div>
        </>
    );
};

export default PriceItems;
