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
import { Copy, Trash } from "lucide-react";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import Select from "@/components/Select";
import Input from "@/components/Input";
import NumberCell from "@/components/NumberCell";
import ItemTypeSelect from "@/components/ItemTypeSelect";
import { useStockQuantities } from "../hooks/useStockQuantities";

interface StockItemProps {
    name: "produced_items" | "consumed_items" | "from_items" | "to_items";
    address_name?: "to_shipping_address_id" | "from_shipping_address_id";
}

const StockItems = (
    { name, address_name = "from_shipping_address_id" }: StockItemProps,
) => {
    const { data: items } = useSelectItemsView();
    const form = useFormContext();

    const { fields, append, remove } = useFieldArray({
        name,
    });

    const { getItemQuantities } = useStockQuantities(name, address_name);

    const copyRow = (index: number) => {
        const rowToCopy = form.getValues(`${name}.${index}`);
        append({ ...rowToCopy });
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
                                <TableCell>
                                    <ItemTypeSelect
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
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            onClick={() => copyRow(index)}
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

export default StockItems;
