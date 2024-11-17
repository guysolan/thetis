import { UseFormReturn } from "react-hook-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Item } from "@/features/items/types";

interface StockItemsSummaryProps {
    name: string;
    fields: any[];
    items: Item[];
    form: UseFormReturn<any>;
    getItemQuantities: (
        itemId: string,
    ) => { before: number; after: number } | undefined;
}

const StockItemsSummary = ({
    name,
    fields,
    items,
    form,
    getItemQuantities,
}: StockItemsSummaryProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Before</TableHead>
                    <TableHead>After</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fields.map((field, index) => {
                    const itemId = form.watch(`${name}.${index}.item_id`);
                    const item = items.find((i) =>
                        String(i.item_id) === itemId
                    );
                    const quantities = getItemQuantities(itemId);
                    const quantityChange = form.watch(
                        `${name}.${index}.quantity_change`,
                    );

                    return (
                        <TableRow key={field.id}>
                            <TableCell className="font-medium">
                                {item?.item_name || "Not selected"}
                            </TableCell>
                            <TableCell>{quantityChange || 0}</TableCell>
                            <TableCell>{quantities?.before ?? 0}</TableCell>
                            <TableCell>{quantities?.after ?? 0}</TableCell>
                        </TableRow>
                    );
                })}
                {fields.length === 0 && (
                    <TableRow>
                        <TableCell
                            colSpan={4}
                            className="text-center text-muted-foreground"
                        >
                            No items added
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default StockItemsSummary;
