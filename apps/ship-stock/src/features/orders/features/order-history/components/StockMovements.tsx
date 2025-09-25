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

const StockMovements = ({ orderItems }: { orderItems: OrderView["items"] }) => {
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
        lot_number: item.lot_number,
      }));

    // Group by item_id and aggregate quantities properly
    const itemTransfers = mappedItems.reduce(
      (acc, item) => {
        const key = item.item_id;
        if (!acc[key]) {
          acc[key] = {
            item_id: item.item_id,
            item_name: item.item_name,
            item_type: item.item_type,
            positive_quantity: 0,
            negative_quantity: 0,
            from_locations: [],
            to_locations: [],
            lot_number: item.lot_number,
          };
        }

        // Accumulate quantities and locations
        if (item.quantity < 0) {
          acc[key].negative_quantity += Math.abs(item.quantity);
          if (!acc[key].from_locations.includes(item.warehouse_name)) {
            acc[key].from_locations.push(item.warehouse_name);
          }
        } else {
          acc[key].positive_quantity += item.quantity;
          if (!acc[key].to_locations.includes(item.warehouse_name)) {
            acc[key].to_locations.push(item.warehouse_name);
          }
        }

        return acc;
      },
      {} as Record<string, any>,
    );

    // Convert to final format
    const finalTransfers = Object.values(itemTransfers).map((item) => ({
      item_id: item.item_id,
      item_name: item.item_name,
      item_type: item.item_type,
      quantity: Math.max(item.positive_quantity, item.negative_quantity), // Use the higher quantity
      from_location: item.from_locations.join(", ") || "-",
      to_location: item.to_locations.join(", ") || "-",
      lot_number: item.lot_number,
    }));

    return finalTransfers;
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
            <TableCell>
              {item.item_name}{" "}
              {item?.lot_number && (
                <span className="text-gray-500 text-xs">
                  (LOT {item.lot_number})
                </span>
              )}
            </TableCell>
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
