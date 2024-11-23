import { useFieldArray, useFormContext } from "react-hook-form";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Package, Trash, Box, Weight, BoxIcon, Edit, Copy, Check, Pencil, CheckCheck } from "lucide-react";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import Select from "@/components/Select";

import Input from "@/components/Input";
import { PackageForm } from "../../../../../../items/components/PackageForm";
import ActionPopover from "@/components/ActionPopover";
import PopoverOption from '../../../../../../../components/PopoverOption';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../../../../../components/ui/card';
import { Badge } from '../../../../../../../components/ui/badge';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import SellPackageItems from './SellPackageItems';
import { Dialog, DialogContent, DialogTrigger } from '../../../../../../../components/ui/dialog';
import { Separator } from '../../../../../../../components/ui/separator';
import { useState } from 'react';
import PackageSummary from './PackageSummary';
import SellPackageItemSummary from './SellPackageItemSummary';
const SellPackages = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const { data: items } = useSelectItemsView();
    const form = useFormContext();
    const { control, setValue, watch } = form;

    const { fields, append, remove } = useFieldArray({
        control: control,
        name: "order_items",
    });

    const orderItems = watch("order_items");


    const getFilteredItemOptions = (itemType: string) => {
        return items?.filter((item) => item.item_type === itemType)
            .map((item) => ({
                label: item.item_name,
                value: String(item.item_id),
            })) || [];
    };

    return (
        <div className="space-y-4">
            {fields.map((field, index) => {
                const selectedItem = items?.find(item =>
                    String(item.item_id) === String(orderItems[index]?.package_id)
                );

                return (
                    <Card key={field.id}>
                        <CardHeader className="border-b">
                            <div className='flex flex-row justify-between items-center'>

                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="w-5 h-5" />
                                        Package {index + 1}
                                    </CardTitle>
                                    {isExpanded && <p className="mt-1 text-muted-foreground text-sm">
                                        Select a package template or create a new one
                                    </p>}
                                </div>
                                {isExpanded ?
                                    <ActionPopover
                                        title="Package Template"
                                        description="Manage package templates"

                                    >
                                        <PopoverOption onClick={() => {
                                            setIsExpanded(false);
                                        }}>
                                            <Check size={20} />
                                            Done
                                        </PopoverOption>
                                        <Separator />
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <PopoverOption disabled={!selectedItem}>
                                                    <Edit size={20} />
                                                    Edit Package
                                                </PopoverOption>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <PackageForm showComponents={false} item={selectedItem} />
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <PopoverOption>
                                                    <BoxIcon size={20} />
                                                    New Package
                                                </PopoverOption>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <PackageForm showComponents={false} item={null} />
                                            </DialogContent>
                                        </Dialog>
                                        <Separator />
                                        <PopoverOption onClick={() => {
                                            const itemToCopy = form.getValues(`order_items.${index}`);
                                            append({ ...itemToCopy });
                                        }}>
                                            <Copy size={20} />
                                            Duplicate
                                        </PopoverOption>
                                        <PopoverOption
                                            disabled={orderItems.length < 2}
                                            variant="destructive"
                                            onClick={() => remove(index)}

                                        >
                                            <Trash size={20} />
                                            Delete
                                        </PopoverOption>
                                    </ActionPopover> :
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsExpanded(true)}
                                    >
                                        <Pencil size={20} />
                                    </Button>
                                }
                            </div>


                            <div className="flex gap-4 full">
                                {isExpanded ? <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead className="w-32">Quantity</TableHead>
                                            <TableHead className="w-40">Dimensions</TableHead>
                                            <TableHead className="w-24">Weight</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Select
                                                    name={`order_items.${index}.package_id`}
                                                    options={getFilteredItemOptions("package")}
                                                    className="flex-grow w-full min-w-[250px]"
                                                />
                                            </TableCell>
                                            <TableCell>

                                                <Input
                                                    name={`order_items.${index}.package_quantity`}
                                                    type="number"
                                                    className="w-24"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Badge className='flex gap-x-2 px-3 py-1.5'>
                                                    <BoxIcon size={16} />
                                                    {selectedItem?.height && selectedItem?.width && selectedItem?.depth ? `${selectedItem?.height} × ${selectedItem?.width} × ${selectedItem?.depth}` : "N/A"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className='flex gap-x-2 px-3 py-1.5' variant="outline"><Weight size={16} />{selectedItem?.weight} kg</Badge>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table> :
                                    <PackageSummary index={index} />
                                }

                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {isExpanded ?
                                <>
                                    {selectedItem ? (
                                        <div className="border-gray-200 pl-4 border-l-2">

                                            <h4 className="mb-2 font-medium text-sm">Package Contents</h4>
                                            <SellPackageItems packageIndex={index} />
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center text-muted-foreground">
                                            Select a package template to configure contents
                                        </div>
                                    )}</> : <SellPackageItemSummary packageIndex={index} />}
                        </CardContent>
                        {isExpanded && <CardFooter>
                            <Button onClick={() => setIsExpanded(false)} type="button" className="flex gap-x-1">Done</Button>
                        </CardFooter>}
                    </Card>
                );
            })}

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
                Add Another Package
            </Button>
        </div>
    );
};

export default SellPackages;
