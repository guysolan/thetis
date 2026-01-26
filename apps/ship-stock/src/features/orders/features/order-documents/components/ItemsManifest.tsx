import React from "react";
import type { OrderView } from "../../../types";
import { useSelectItemsView } from "../../../../items/api/selectItemsView";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";

type ItemDetails = {
    item_name?: string;
    sku?: string;
    country_of_origin?: string;
    hs_code?: string;
};

type GroupedItem = OrderView["items"][number] & ItemDetails & {
    totalQuantity: number;
};

const ItemsManifest = ({ orderItems }: { orderItems: OrderView["items"] }) => {
    const { data: items } = useSelectItemsView();

    // For shipment orders, show only items being shipped (positive quantities)
    // For other orders, group items by item_id and sum their quantities
    const filteredItems = orderItems.filter((item) => item.quantity > 0);

    const groupedItems = filteredItems.reduce(
        (acc, orderItem) => {
            const itemDetails = items.find(
                (item) => item.item_id === orderItem.item_id,
            );

            if (!acc[orderItem.item_id]) {
                const quantity = orderItem.quantity;

                acc[orderItem.item_id] = {
                    ...orderItem,
                    ...itemDetails,
                    totalQuantity: quantity,
                } as GroupedItem;
            } else {
                const quantity = orderItem.quantity;
                acc[orderItem.item_id].totalQuantity += quantity;
            }
            return acc;
        },
        {} as Record<string, GroupedItem>,
    );

    const contentItems = Object.values(groupedItems).filter(
        (item) => item.totalQuantity > 0,
    );

    return (
        <div className="mt-8">
            <h2 className="mb-4 font-semibold text-lg">Items Manifest</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black">
                            Description
                        </TableHead>
                        <TableHead className="text-black">SKU</TableHead>
                        <TableHead className="text-black">
                            Country of Origin
                        </TableHead>
                        <TableHead className="text-black">HS Code</TableHead>
                        <TableHead className="text-black">Lot Number</TableHead>
                        <TableHead className="text-black text-right">
                            Quantity
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contentItems.map((item) => (
                        <TableRow key={item.item_id}>
                            <TableCell className="text-black">
                                {item.item_name}
                            </TableCell>
                            <TableCell className="text-black">
                                {item.sku}
                            </TableCell>
                            <TableCell className="text-black">
                                {item.country_of_origin}
                            </TableCell>
                            <TableCell className="text-black">
                                {item.hs_code}
                            </TableCell>
                            <TableCell className="text-black">
                                {item.lot_number}
                            </TableCell>
                            <TableCell className="text-black text-right">
                                {item.totalQuantity}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow className="font-semibold">
                        <TableCell className="text-black">
                            Total Items
                        </TableCell>
                        <TableCell colSpan={4} />
                        <TableCell className="text-black text-right">
                            {contentItems.reduce(
                                (sum, item) => sum + item.totalQuantity,
                                0,
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default ItemsManifest;
