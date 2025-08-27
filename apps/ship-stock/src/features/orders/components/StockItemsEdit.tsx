import { useFieldArray, useFormContext } from "react-hook-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";
import { Button } from "@thetis/ui/button";
import { Copy, Pencil, Trash } from "lucide-react";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import Select from "@/components/Select";
import Input from "@/components/Input";
import NumberCell from "@/components/NumberCell";
import ItemTypeSelect from "@/components/ItemTypeSelect";
import { useStockQuantities } from "../hooks/useStockQuantities";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { useSelectAddresses } from "../../stockpiles/api/selectAddresses";

interface StockItemProps {
    name: "produced_items" | "consumed_items" | "from_items" | "to_items";
    address_name?: "to_shipping_address_id" | "from_shipping_address_id";
    allowedTypes?: Array<"part" | "product">;
    title?: string;
}

const StockItems = (
    {
        name,
        address_name = "from_shipping_address_id",
        allowedTypes = ["part", "product"],
        title,
    }: StockItemProps,
) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { data: items } = useSelectItemsView();
    const form = useFormContext();
    const { data: addresses } = useSelectAddresses();

    const address = addresses?.find((a) =>
        String(a.id) === form.watch(address_name)
    );
    const { fields, append, remove } = useFieldArray({
        name,
    });

    console.log(address);

    const { getItemQuantities } = useStockQuantities(name, address_name);

    const copyRow = (index: number) => {
        const rowToCopy = form.getValues(`${name}.${index}`);
        append({ ...rowToCopy });
    };

    const ReadOnlyView = () => (
        <Table>
            <TableHeader>
                <TableRow>
                    {allowedTypes.length > 1 && <TableHead>Type</TableHead>}
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Before</TableHead>
                    <TableHead>After</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fields.map((field, index) => {
                    const quantities = getItemQuantities(
                        form.watch(`${name}.${index}.item_id`),
                    );
                    const item = items?.find((i) =>
                        String(i.item_id) ===
                            form.watch(`${name}.${index}.item_id`)
                    );
                    return (
                        <TableRow key={field.id}>
                            {allowedTypes.length > 1 && (
                                <TableCell>
                                    {form.watch(`${name}.${index}.item_type`)}
                                </TableCell>
                            )}
                            <TableCell>{item?.item_name || "-"}</TableCell>
                            <TableCell>
                                {form.watch(`${name}.${index}.quantity_change`)}
                            </TableCell>
                            <TableCell>
                                <NumberCell value={quantities.before} />
                            </TableCell>
                            <TableCell>
                                <NumberCell value={quantities.after} />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                <CardTitle className="font-medium text-base">
                    Stock Consumed at {address?.name}
                </CardTitle>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {isExpanded
                    ? (
                        <div className="space-y-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {allowedTypes.length > 1 && (
                                            <TableHead>Type</TableHead>
                                        )}
                                        <TableHead>Item</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Before</TableHead>
                                        <TableHead>After</TableHead>
                                        <TableHead>
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fields.map((field, index) => {
                                        const quantities = getItemQuantities(
                                            form.watch(
                                                `${name}.${index}.item_id`,
                                            ),
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
                                                            ?.filter((item) =>
                                                                item.item_type ===
                                                                    form.watch(
                                                                        `${name}.${index}.item_type`,
                                                                    )
                                                            )
                                                            .map((item) => ({
                                                                label:
                                                                    item.item_name,
                                                                value: String(
                                                                    item.item_id,
                                                                ),
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
                                                    <NumberCell
                                                        value={quantities
                                                            .before}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <NumberCell
                                                        value={quantities.after}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                copyRow(index)}
                                                            variant="secondary"
                                                            className="px-2"
                                                        >
                                                            <Copy size={20} />
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                remove(index)}
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
                                {allowedTypes.map((type) => (
                                    <Button
                                        key={type}
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        onClick={() =>
                                            append({
                                                item_type: type,
                                                item_id: "",
                                                quantity_change: 1,
                                            })}
                                    >
                                        Add {type.charAt(0).toUpperCase() +
                                            type.slice(1)}
                                    </Button>
                                ))}
                                <Button
                                    variant="secondary"
                                    type="button"
                                    onClick={() => setIsExpanded(false)}
                                >
                                    Done
                                </Button>
                            </div>
                        </div>
                    )
                    : <ReadOnlyView />}
            </CardContent>
        </Card>
    );
};

export default StockItems;
