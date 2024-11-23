import { UseFormReturn } from "react-hook-form";
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
import Select from "@/components/Select";
import Input from "@/components/Input";
import ItemTypeSelect from "@/components/ItemTypeSelect";
import { Item, ItemType } from "@/features/items/types";

interface PriceItemsFormFieldsProps {
    name: string;
    fields: any[];
    items: Item[];
    form: UseFormReturn<any>;
    onCopy: (index: number) => void;
    onRemove: (index: number) => void;
    showPrice?: boolean;
    grandTotal: () => string;
    itemTotal: (index: number) => string;
    getFilteredItemOptions: (
        itemType: string,
    ) => { label: string; value: string }[];
    allowedTypes: ItemType[];
}

const PriceItemsFormFields = ({
    name,
    fields,
    grandTotal,
    form,
    onCopy,
    onRemove,
    showPrice = false,
    itemTotal,
    getFilteredItemOptions,
    allowedTypes,
}: PriceItemsFormFieldsProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='min-w-32'>Type</TableHead>
                    <TableHead >Item</TableHead>
                    <TableHead className='min-w-20'>Quantity</TableHead>
                    {showPrice && <TableHead className='min-w-20'>Price</TableHead>}
                    {showPrice && <TableHead className='min-w-20'>Tax</TableHead>}
                    {showPrice && <TableHead className='min-w-24'>Total</TableHead>}
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fields.map((field, index) => (
                    <TableRow key={field.id}>
                        <TableCell>
                            <Select
                                name={`${name}.${index}.item_type`}
                                options={allowedTypes.map((type) => ({
                                    label: type.charAt(0).toUpperCase() +
                                        type.slice(1),
                                    value: type,
                                }))}
                            />
                        </TableCell>
                        <TableCell>
                            <Select
                                name={`${name}.${index}.item_id`}
                                options={getFilteredItemOptions(
                                    form.watch(`${name}.${index}.item_type`),
                                )}
                            />
                        </TableCell>
                        <TableCell>
                            <Input
                                name={`${name}.${index}.quantity_change`}
                                type="number"
                            />
                        </TableCell>
                        {showPrice && (
                            <TableCell>
                                <Input
                                    name={`${name}.${index}.item_price`}
                                    type="number"
                                    step="0.01"
                                />
                            </TableCell>
                        )}
                        {showPrice && (
                            <TableCell>
                                <Input
                                    name={`${name}.${index}.item_tax`}
                                    type="number"
                                    step="0.01"
                                />
                            </TableCell>
                        )}
                        {showPrice && <TableCell>{itemTotal(index)}</TableCell>}
                        <TableCell>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    onClick={() => onCopy(index)}
                                    variant="secondary"
                                    className="px-2"
                                >
                                    <Copy size={20} />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => onRemove(index)}
                                    variant="destructive"
                                    className="px-2"
                                >
                                    <Trash size={20} />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                {showPrice && fields.length > 0 && (
                    <TableRow className="font-semibold">
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell>{grandTotal()}</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="px-2"
                                >
                                    <Copy size={20} />
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    className="px-2"
                                >
                                    <Trash size={20} />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default PriceItemsFormFields;
