import { useFieldArray, useFormContext } from "react-hook-form";
import React from "react";
import { Button } from "@/components/ui/button";
import { Package, Trash, Box, Weight, BoxIcon } from "lucide-react";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import Select from "@/components/Select";

import Input from "@/components/Input";
import { PackageForm } from "../../../../../items/components/PackageForm";
import ShipmentItemComponents from './ShipmentItemComponents';
import ActionPopover from "@/components/ActionPopover";
import PopoverOption from '../../../../../../components/PopoverOption';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../components/ui/card';
import { Badge } from '../../../../../../components/ui/badge';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import Sheet from '../../../../../../components/Sheet';

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
            {fields.map((field, index) => {
                const selectedItem = getSelectedItem(orderItems[index]?.item_id);

                return (
                    <Card key={field.id} >
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>Package {index + 1}</CardTitle>
                            <ActionPopover
                                title="Package Template"
                                editForm={<PackageForm item={selectedItem} />}
                                onDuplicate={() => {
                                    const itemToCopy = form.getValues(`order_items.${index}`);
                                    append({ ...itemToCopy });
                                }}
                            >
                                <Sheet
                                    trigger={<PopoverOption  >
                                        <BoxIcon size={20} />
                                        New
                                    </PopoverOption>}
                                    title="New Package"
                                    description="Create a new package with the selected template."
                                >
                                    <PackageForm item={null} />
                                </Sheet>
                                <PopoverOption disabled={orderItems.length < 2} variant="destructive" onClick={() => remove(index)}>
                                    <Trash size={20} />
                                    Delete
                                </PopoverOption>
                            </ActionPopover>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Package</TableHead>
                                        <TableHead className="w-16">Quantity</TableHead>
                                        <TableHead className="w-32">Dimensions</TableHead>
                                        <TableHead className="w-20">Weight</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Select
                                                name={`order_items.${index}.item_id`}
                                                options={getFilteredItemOptions("package")}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                name={`order_items.${index}.quantity_change`}
                                                type="number"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="w-full text-center">
                                                {selectedItem?.height} × {selectedItem?.width} × {selectedItem?.depth}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="w-full text-center">
                                                {selectedItem?.weight} kg
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <ShipmentItemComponents itemId={orderItems[index]?.item_id} />
                        </CardContent>
                    </Card>
                );
            })}

            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => append({
                        item_type: "package",
                        item_id: "",
                        quantity_change: 1,
                    })}
                >
                    <Package className="mr-2 w-4 h-4" />
                    Add Package
                </Button>
            </div>
        </div >
    );
};

export default ShipmentItems;
