import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { useSelectParts } from "@/features/parts/api/selectParts";
import { z } from "zod";

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
                                <FormField
                                    control={form.control}
                                    name={`order_items.${index}.type`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="product">
                                                        Product
                                                    </SelectItem>
                                                    <SelectItem value="part">
                                                        Part
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <FormField
                                    control={form.control}
                                    name={`order_items.${index}.id`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={`Select ${
                                                                form.watch(
                                                                        `order_items.${index}.type`,
                                                                    ) ===
                                                                        "product"
                                                                    ? "product"
                                                                    : "part"
                                                            }`}
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {form.watch(
                                                            `order_items.${index}.type`,
                                                        ) ===
                                                            "product"
                                                        ? products.map((
                                                            product,
                                                        ) => (
                                                            <SelectItem
                                                                key={product.id}
                                                                value={String(
                                                                    product.id,
                                                                )}
                                                            >
                                                                {product.name}
                                                            </SelectItem>
                                                        ))
                                                        : parts.map((part) => (
                                                            <SelectItem
                                                                key={part.id}
                                                                value={String(
                                                                    part.id,
                                                                )}
                                                            >
                                                                {part.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <FormField
                                    control={form.control}
                                    name={`order_items.${index}.quantity`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        )}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                {
                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        variant="destructive"
                                        className="px-2"
                                    >
                                        <Trash size={20} />
                                    </Button>
                                }
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
