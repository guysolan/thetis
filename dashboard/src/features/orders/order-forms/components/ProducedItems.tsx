import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
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
import { useSelectWarehouseItems } from "@/features/warehouses/api/selectWarehouseItems";
import Select from "@/components/Select";
import Input from "@/components/Input";
import NumberCell from "@/components/NumberCell";
import SelectItemType from '../../../../components/SelectItem';

const ProducedItems = () => {
    const { data: items } = useSelectItemsView();
    const { data: warehouseItems } = useSelectWarehouseItems();
    const form = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "produced_items",
    });

    const selectedWarehouse = useWatch({
        control: form.control,
        name: "warehouse_id",
    });

    // Watch the produced items to calculate quantities
    const producedItems = useWatch({
        control: form.control,
        name: "produced_items",
    });

    const getItemQuantities = (itemId: string) => {
        if (!selectedWarehouse || !warehouseItems) return { before: 0, after: 0 };

        const warehouseItem = warehouseItems.find(
            w => String(w.warehouse_id) === String(selectedWarehouse) && 
                String(w.item_id) === String(itemId)
        );
        
        const currentQuantity = warehouseItem?.item_quantity || 0;
        const addedQuantity = producedItems?.find(i => String(i.id) === String(itemId))?.quantity || 0;

        return {
            before: currentQuantity,
            after: currentQuantity + addedQuantity
        };
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Before</TableHead>
                        <TableHead>After</TableHead>
                        <TableHead>
                            <span className="sr-only">Delete</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.map((field, index) => {
                        const quantities = getItemQuantities(form.watch(`produced_items.${index}.id`));
                        return (
                            <TableRow key={field.id}>
                                <TableCell>
                                    <SelectItemType
                                        name={`produced_items.${index}.type`}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        name={`produced_items.${index}.id`}
                                        options={items
                                            ?.filter(item => item.item_type === form.watch(`produced_items.${index}.type`))
                                            .map((item) => ({
                                                label: item.item_name,
                                                value: String(item.item_id)
                                            })) || []
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        name={`produced_items.${index}.quantity`}
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
                        );
                    })}
                </TableBody>
            </Table>
            <div className="flex gap-2 p-2">
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

export default ProducedItems;

