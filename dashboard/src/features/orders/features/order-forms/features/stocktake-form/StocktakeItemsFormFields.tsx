import { UseFormReturn } from "react-hook-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Select from "@/components/Select";
import Input from "@/components/Input";
import NumberCell from "@/components/NumberCell";
import ItemTypeSelect from "@/components/ItemTypeSelect";
import { ItemType, StockItemQuantities } from "../../types";

interface StocktakeItemsFormFieldsProps {
    name: string;
    fields: any[];
    items: Array<{ item_id: string; item_name: string; item_type: string }>;
    form: UseFormReturn<any>;
    getItemQuantities: (itemId: string) => StockItemQuantities;
}

const StocktakeItemsFormFields = ({
    name,
    fields,
    items,
    form,
    getItemQuantities,
}: StocktakeItemsFormFieldsProps) => {
    const allowedTypes = ["part", "product"];
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {allowedTypes.length > 0 && <TableHead>Type</TableHead>}
                    <TableHead>Item</TableHead>
                    <TableHead>Old Quantity</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>New Quantity</TableHead>
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
                                <NumberCell value={quantities.before} />
                            </TableCell>
                            <TableCell>
                                <NumberCell value={quantities.change} />
                            </TableCell>
                            <TableCell>
                                <Input
                                    name={`${name}.${index}.quantity_change`}
                                    type="number"
                                    defaultValue={quantities.before}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default StocktakeItemsFormFields;