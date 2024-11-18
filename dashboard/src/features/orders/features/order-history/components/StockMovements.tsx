import React from "react";
import { useMemo } from "react";
import type { OrderView } from "../../types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const StockMovements = ({ orderItems }: { orderItems: OrderView["items"] }) => {
    const stockChanges = useMemo(() => {
        // First, filter and map the items
        const mappedItems = orderItems
            .filter((item) =>
                item.quantity != null &&
                item.item_type !== "service"
            )
            .map((item) => ({
                item_id: item.item_id,
                item_name: item.item_name,
                quantity: item.quantity,
                warehouse_name: item.address?.name || "Unknown Location",
                item_type: item.item_type,
            }));

        // Then group and sum by item_id and warehouse_name
        const groupedItems = mappedItems.reduce((acc, item) => {
            const key = `${item.item_id}-${item.warehouse_name}`;
            if (!acc[key]) {
                acc[key] = { ...item };
            } else {
                acc[key].quantity += item.quantity;
            }
            return acc;
        }, {} as Record<string, typeof mappedItems[0]>);

        // Convert back to array and filter out zero quantities
        return Object.values(groupedItems)
            .filter((item) => item.quantity !== 0);
    }, [orderItems]);

    return (
        <Table className="mb-6 text-left">
            <TableCaption>Stock Movements</TableCaption>

            <TableHeader>
                <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Quantity</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {stockChanges.map((item) => (
                    <TableRow
                        className="text-left"
                        key={`${item.item_id}-${item.warehouse_name}-${item.quantity}`}
                    >
                        <TableCell>{item.item_name}</TableCell>
                        <TableCell className="capitalize">
                            {item.item_type}
                        </TableCell>
                        <TableCell>{item.warehouse_name}</TableCell>
                        <TableCell>
                            {item.quantity}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default StockMovements;
