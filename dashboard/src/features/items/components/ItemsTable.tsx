import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ItemView } from "../types";
interface Props {
    items: ItemView[];
}
export default function ItemsTable({ items }: Props) {
    return (
        <Table className="mt-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items
                    ?.filter((item: any) => item.item_quantity > 0)
                    ?.map((wp: any) => (
                        <TableRow
                            key={`item-${wp.item_id}`}
                        >
                            <TableCell>
                                <Badge
                                    className="capitalize"
                                    variant="default"
                                >
                                    {wp.item_type}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {wp.item_name}
                            </TableCell>
                            <TableCell>
                                {wp.item_quantity}
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}
