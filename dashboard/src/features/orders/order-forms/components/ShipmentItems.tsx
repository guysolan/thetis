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
import { Copy, HelpCircle, Package, Plus, Trash } from "lucide-react";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import Select from "@/components/Select";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Input from "@/components/Input";

import ComponentsTable from "@/features/items/components/ComponentsTable";

const ShipmentItems = () => {
    const { data: items } = useSelectItemsView();
    const form = useFormContext();

    // Watch for changes to all order_items
    const orderItems = form.watch("order_items");

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "order_items",
    });

    const getFilteredItemOptions = (itemType: string) => {
        return items?.filter((item) => item.item_type === itemType)
            .map((item) => ({
                label: item.item_name,
                value: String(item.item_id),
            })) || [];
    };

    const getSelectedItem = (itemId: string) => {
        return items?.find((item) => String(item.item_id) === itemId);
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Package</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Dimensions</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>
                            <span className="sr-only">Help</span>
                        </TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.map((field, index) => {
                        // Use the watched value to get the current item_id
                        const selectedItem = getSelectedItem(
                            orderItems[index]?.item_id,
                        );
                        return (
                            <HoverCard key={field.id}>
                                <TableRow>
                                    <TableCell>
                                        <Select
                                            name={`order_items.${index}.item_id`}
                                            options={getFilteredItemOptions(
                                                "package",
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            name={`order_items.${index}.quantity_change`}
                                            type="number"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {selectedItem?.height}x{selectedItem
                                            ?.width}x{selectedItem
                                            ?.depth}
                                    </TableCell>
                                    <TableCell>
                                        {selectedItem?.weight} kg
                                    </TableCell>

                                    <TableCell>
                                        <HoverCardTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="px-0"
                                            >
                                                <HelpCircle size={20} />
                                            </Button>
                                        </HoverCardTrigger>
                                    </TableCell>

                                    <TableCell className="">
                                        <div className="flex gap-2 pl-2 border-l">
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    const itemToCopy = form
                                                        .getValues(
                                                            `order_items.${index}`,
                                                        );
                                                    append({
                                                        ...itemToCopy,
                                                    });
                                                }}
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
                                <HoverCardContent className="w-[600px]">
                                    {selectedItem?.components && (
                                        <ComponentsTable
                                            components={selectedItem.components}
                                        />
                                    )}
                                </HoverCardContent>
                            </HoverCard>
                        );
                    })}
                </TableBody>
            </Table>
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                        append({
                            item_type: "package",
                            item_id: "",
                            quantity_change: 1,
                        })}
                >
                    <Package className="mr-2 w-4 h-4" />
                    Add Package
                </Button>
            </div>
        </div>
    );
};

export default ShipmentItems;
