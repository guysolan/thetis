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

export const orderItemSchema = z.object({
	type: z.enum(["product", "part"]),
	id: z.string().min(1, "Please select an item"),
	quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const orderItemsSchema = z.object({order_items: z.array(orderItemSchema)});

export type OrderItem = z.infer<typeof orderItemSchema>;

const OrderItems = () => {
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
                        <TableHead>
                            <span className="sr-only">Delete</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.map((field, index) => (
                        <TableRow key={field.id}>
                            <TableCell>
                                <Select
                                    name={`order_items.${index}.type`}
                                    options={[
                                        { label: "Product", value: "product" },
                                        { label: "Part", value: "part" }
                                    ]}
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    name={`order_items.${index}.id`}
                                    options={items
                                        .filter(item => item.item_type === form.watch(`order_items.${index}.type`))
                                        .map((item) => ({
                                            label: item.item_name,
                                            value: String(item.item_id)
                                        }))}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    name={`order_items.${index}.quantity`}
                                    type="number"
                                />
                            </TableCell>
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
                </TableBody>
            </Table>
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => append({ type: "product", id: "", quantity: 1 })}
                >
                    Add Product
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => append({ type: "part", id: "", quantity: 1 })}
                >
                    Add Part
                </Button>
            </div>
        </>
    );
};

export default OrderItems;
