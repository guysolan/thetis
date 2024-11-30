import { UseFormReturn } from "react-hook-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";
import Select from "@/components/Select";
import Input from "@/components/Input";
import ItemTypeSelect from "@/components/ItemTypeSelect";

interface StocktakeItemsFormFieldsProps {
    name: string;
    fields: any[];
    items: Array<{ item_id: string; item_name: string; item_type: string }>;
    form: UseFormReturn<any>;
}

const StocktakeItemsFormFields = ({
    name,
    fields,
    items,
    form,
}: StocktakeItemsFormFieldsProps) => {
    const allowedTypes = ["part", "product"];

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {allowedTypes.length > 0 && <TableHead>Type</TableHead>}
                    <TableHead className='min-w-32'>Item</TableHead>
                    <TableHead className='min-w-24'>Old Quantity</TableHead>
                    <TableHead className='min-w-24'>Change</TableHead>
                    <TableHead className='min-w-24'>New Quantity</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fields.map((field, index) => (
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
                                        label: item.item_name,
                                        value: String(item.item_id),
                                    })) || []}
                            />
                        </TableCell>
                        <TableCell>
                            <Input
                                name={`${name}.${index}.quantity_before`}
                                type="number"
                                disabled={true}
                            />
                        </TableCell>
                        <TableCell>
                            <Input
                                name={`${name}.${index}.quantity_change`}
                                type="number"
                                disabled={true}
                            />
                        </TableCell>
                        <TableCell>
                            <Input
                                name={`${name}.${index}.quantity_after`}
                                type="number"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default StocktakeItemsFormFields;
