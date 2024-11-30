import { UseFormReturn } from "react-hook-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";
import { Button } from "@thetis/ui/button";
import { Copy, Trash } from "lucide-react";
import Select from "@/components/Select";
import Input from "@/components/Input";
import NumberCell from "@/components/NumberCell";
import ItemTypeSelect from "@/components/ItemTypeSelect";
import { ItemType, StockItemFormData, StockItemQuantities } from "../types";

interface StockItemsFormFieldsProps {
    name: string;
    fields: any[];
    items: Array<{ item_id: string; item_name: string; item_type: string }>;
    form: UseFormReturn<any>;
    getItemQuantities: (itemId: string) => StockItemQuantities;
    onCopy: (index: number) => void;
    onRemove: (index: number) => void;
    allowedTypes?: ItemType[];
}

const StockItemsFormFields = ({
    name,
    fields,
    items,
    form,
    getItemQuantities,
    onCopy,
    onRemove,
    allowedTypes = [],
}: StockItemsFormFieldsProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {allowedTypes.length > 0 && <TableHead>Type</TableHead>}
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Before</TableHead>
                    <TableHead>After</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fields.map((field, index) => {
                    const quantities = getItemQuantities(
                        form.watch(`${name}.${index}.item_id`),
                    );
                    return (
                        <TableRow key={field.id}>
                            {allowedTypes.length > 1 && (
                                <TableCell>
                                    <ItemTypeSelect
                                        name={`${name}.${index}.item_type`}
                                    />
                                </TableCell>
                            )}
                            <TableCell>
                                <Select
                                    name={`${name}.${index}.item_id`}
                                    options={items
                                        ?.filter(
                                            (item) =>
                                                item.item_type ===
                                                form.watch(
                                                    `${name}.${index}.item_type`,
                                                ),
                                        )
                                        .map((item) => ({
                                            label: item.item_name,
                                            value: String(item.item_id),
                                        })) || []}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    name={`${name}.${index}.quantity_change`}
                                    type="number"
                                />
                            </TableCell>
                            <TableCell>
                                <NumberCell value={quantities.before} />
                            </TableCell>
                            <TableCell>
                                <NumberCell value={quantities.after} />
                            </TableCell>
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
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default StockItemsFormFields;
