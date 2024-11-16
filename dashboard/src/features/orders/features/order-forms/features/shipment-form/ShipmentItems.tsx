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
import { Copy, Package, Pencil, Plus, Trash } from "lucide-react";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import Select from "@/components/Select";

import Input from "@/components/Input";
import TooltipDialog from "@/components/TooltipDialog";
import { PackageForm } from "../../../../../items/components/PackageForm";

const ShipmentItems = () => {
    const { data: items } = useSelectItemsView();
    const form = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "order_items",
    });

    const orderItems = form.watch("order_items");

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
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.map((field, index) => {
                        const selectedItem = getSelectedItem(
                            orderItems[index]?.item_id,
                        );

                        return (
                            <TableRow key={field.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Select
                                            name={`order_items.${index}.item_id`}
                                            options={getFilteredItemOptions(
                                                "package",
                                            )}
                                        />
                                    </div>
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

                                <TableCell className="">
                                    <div className="flex gap-2 pl-2 border-l">
                                        <TooltipDialog
                                            icon={selectedItem
                                                ? <Pencil size={20} />
                                                : <Plus size={20} />}
                                            tooltipText="Edit Package"
                                        >
                                            <PackageForm
                                                item={selectedItem ?? null}
                                            />
                                        </TooltipDialog>
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
