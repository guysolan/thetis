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
import SelectItemType from "@/components/SelectItem";

interface ItemsTableProps {
    name: "produced_items" | "consumed_items" | "from_items" | "to_items";
    warehouse_name?: "warehouse_id" | "from_warehouse_id" | "to_warehouse_id";
}

const ItemsTable = (
    { name, warehouse_name = "warehouse_id" }: ItemsTableProps,
) => {
    const { data: items } = useSelectItemsView();
    const { data: warehouseItems } = useSelectWarehouseItems();
    const form = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: name,
    });

    const selectedWarehouse = useWatch({
        control: form.control,
        name: warehouse_name,
    });

    // Watch the produced items to calculate quantities
    const itemChanges = useWatch({
        control: form.control,
        name: name,
    });

    const getItemQuantities = (itemId: string) => {
        if (!selectedWarehouse || !warehouseItems) {
            return { before: 0, after: 0 };
        }

        const warehouseItem = warehouseItems.find(
            (w) =>
                String(w.warehouse_id) === String(selectedWarehouse) &&
                String(w.item_id) === String(itemId),
        );

        const currentQuantity = warehouseItem?.item_quantity ?? 0;
        const addedQuantity =
            itemChanges?.find((i) => String(i.item_id) === String(itemId))
                ?.quantity_change || 0;
        const quantityAfter = currentQuantity + addedQuantity;

        return {
            before: Number(currentQuantity),
            after: Number(quantityAfter),
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
                        const quantities = getItemQuantities(
                            form.watch(`${name}.${index}.item_id`),
                        );
                        return (
                            <TableRow key={field.id}>
                                <TableCell>
                                    <SelectItemType
                                        name={`${name}.${index}.item_type`}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        name={`${name}.${index}.item_id`}
                                        options={items
                                            ?.filter((item) =>
                                                item.item_type ===
                                                    form.watch(
                                                        `${name}.${index}.item_type`,
                                                    )
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
                    onClick={() =>
                        append({
                            item_type: "product",
                            item_id: "",
                            quantity_change: 1,
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
                            item_type: "part",
                            item_id: "",
                            quantity_change: 1,
                        })}
                >
                    Add Part
                </Button>
            </div>
        </>
    );
};

export default ItemsTable;
