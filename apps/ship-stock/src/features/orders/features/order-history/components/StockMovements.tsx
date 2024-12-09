import React from "react";
import { useMemo } from "react";
import type { OrderView } from "@/features/orders/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";

const StockMovements = ({
  orderItems,
  from,
  to,
}: { orderItems: OrderView["items"]; from: string; to: string }) => {
  const stockChanges = useMemo(() => {
    // First, filter and map the items
    const mappedItems = orderItems
      .filter(
        (item) =>
          item.quantity != null &&
          item.item_type !== "service" &&
          item.item_type !== "package",
      )
      .map((item) => ({
        item_id: item.item_id,
        item_name: item.item_name,
        quantity: item.quantity,
        warehouse_name: item.address?.name || "Unknown Location",
        item_type: item.item_type,
      }));

    // Group by item_id first
    const itemTransfers = mappedItems.reduce(
      (acc, item) => {
        const key = item.item_id;
        if (!acc[key]) {
          acc[key] = {
            item_id: item.item_id,
            item_name: item.item_name,
            item_type: item.item_type,
            quantity: Math.abs(item.quantity),
            from_location: item.quantity < 0 ? item.warehouse_name : null,
            to_location: item.quantity > 0 ? item.warehouse_name : null,
          };
        } else {
          // If we find a matching opposite movement, populate the other location
          if (item.quantity < 0) {
            acc[key].from_location = item.warehouse_name;
          } else {
            acc[key].to_location = item.warehouse_name;
          }
        }
        return acc;
      },
      {} as Record<string, any>,
    );

    return Object.values(itemTransfers);
  }, [orderItems]);

  return (
    <Table className="mb-6 text-left">
      <TableCaption>Stock Movements</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Item Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>From Location</TableHead>
          <TableHead>To Location</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stockChanges.map((item) => (
          <TableRow
            className="text-left"
            key={`${item.item_id}-${item.quantity}`}
          >
            <TableCell>{item.item_name}</TableCell>
            <TableCell className="capitalize">{item.item_type}</TableCell>
            <TableCell>{item.from_location || "-"}</TableCell>
            <TableCell>{item.to_location || "-"}</TableCell>
            <TableCell>{item.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StockMovements;
