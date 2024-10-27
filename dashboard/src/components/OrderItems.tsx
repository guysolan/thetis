import { useFieldArray, useFormContext } from "react-hook-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { z } from "zod";
import Select from "@/components/Select";
import Input from "@/components/Input";
import { Input as InputUi } from "@/components/ui/input";
import SelectItemType from "./SelectItem";

const OrderItems = ({ showPrice = false }: { showPrice?: boolean }) => {
    const { data: items } = useSelectItemsView();

    const form = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "order_items",
    });

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
                                <SelectItemType
                                    name={`order_items.${index}.item_type`}
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    name={`order_items.${index}.item_id`}
                                    options={items
                                        .filter((item) =>
                                            item.item_type ===
                                                form.watch(
                                                    `order_items.${index}.item_type`,
                                                )
                                        )
                                        .map((item) => ({
                                            label: item.item_name,
                                            value: String(item.item_id),
                                        }))}
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
                                    />
                                </TableCell>
                            )}
                            {showPrice && (
                                <TableCell>
                                    <Input
                                        name={`order_items.${index}.item_tax`}
                                        type="number"
                                    />
                                </TableCell>
                            )}
                            {showPrice && (
                                <TableCell>
                                    {(Number(
                                                form.watch(
                                                    `order_items.${index}.item_price`,
                                                ),
                                            ) *
                                            (1 +
                                                Number(
                                                    form.watch(
                                                        `order_items.${index}.quantity_change`,
                                                    ),
                                                )) ?? 0).toFixed(2)}
                                </TableCell>
                            )}
                            <TableCell>
                                <Button
                                    type="button"
                                    onClick={() => remove(index)}
                                    variant="destructive"
                                    className="px-2"
                                >
                                    <Trash size={20} />
                                </Button>
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
                                    {form.watch("order_items").reduce(
                                        (acc, item) =>
                                            acc +
                                            (Number(item.quantity_change) *
                                                Number(item.item_price)),
                                        0,
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                        append({
                            type: "product",
                            item_id: "",
                            quantity_change: 1,
                            item_price: 0,
                            item_tax: 0,
                        })}
                >
                    Add Product
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                        append({
                            type: "part",
                            item_id: "",
                            quantity_change: 1,
                            item_price: 0,
                            item_tax: 0,
                        })}
                >
                    Add Part
                </Button>
            </div>
        </>
    );
};

export default OrderItems;
