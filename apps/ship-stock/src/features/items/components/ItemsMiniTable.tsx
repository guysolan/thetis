import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";
import { Badge } from "@thetis/ui/badge";
import { ItemView } from "../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@thetis/ui/tabs";

interface Props {
    items: ItemView[];
}

export default function ItemsMiniTable({ items }: Props) {
    // Sort items alphabetically by name
    const sortedItems = [...items].sort((a, b) =>
        a.item_name.localeCompare(b.item_name)
    );

    return (
        <Tabs defaultValue="all" className="w-full">
            <TabsList>
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="part">Parts</TabsTrigger>
                <TabsTrigger value="product">Products</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedItems
                            .filter((wp) => wp.item_quantity !== 0)
                            .map((wp) => (
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
            </TabsContent>

            <TabsContent value="part">
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedItems
                            .filter((wp) =>
                                wp.item_quantity !== 0 &&
                                wp.item_type === "part"
                            )
                            .map((wp) => (
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
            </TabsContent>

            <TabsContent value="product">
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedItems
                            .filter((wp) =>
                                wp.item_quantity !== 0 &&
                                wp.item_type === "product"
                            )
                            .map((wp) => (
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
            </TabsContent>
        </Tabs>
    );
}
