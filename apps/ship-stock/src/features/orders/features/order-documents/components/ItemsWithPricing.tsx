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
import NumberFlow from "@number-flow/react";
import type { Currency } from "../../../../../constants/currencies";

type ItemDetails = {
  item_name?: string;
  sku?: string;
  country_of_origin?: string;
  hs_code?: string;
  tax?: number;
};

type GroupedItem =
  & OrderView["items"][number]
  & ItemDetails
  & {
    totalQuantity: number;
    totalPrice: number;
  };

const ItemsWithPricing = ({
  orderItems,
  currency,
  order,
}: {
  orderItems: OrderView["items"];
  currency: Currency;
  order: OrderView;
}) => {
  const { data: items } = useSelectItemsView();

  // For shipment orders, show only items being shipped (positive quantities)
  // For other orders, group items by item_id and sum their quantities and totals
  // Filter out services and items with no pricing
  const filteredItems = orderItems.filter(
    (item) => item.quantity > 0 && item.item_type !== "service",
  );

  const groupedItems = filteredItems.reduce(
    (acc, orderItem) => {
      const itemDetails = items.find(
        (item) => item.item_id === orderItem.item_id,
      );

      if (!acc[orderItem.item_id]) {
        const price = orderItem.price ?? 0;
        const quantity = orderItem.quantity;
        const taxRate = orderItem?.tax ?? 0;
        const totalPrice = quantity * price * (1 + taxRate);

        acc[orderItem.item_id] = {
          ...orderItem,
          ...itemDetails,
          totalQuantity: quantity,
          totalPrice,
        } as GroupedItem;
      } else {
        const price = orderItem.price ?? 0;
        const quantity = orderItem.quantity;
        const taxRate = orderItem?.tax ?? 0;
        const itemTotal = quantity * price * (1 + taxRate);

        acc[orderItem.item_id].totalQuantity += quantity;
        acc[orderItem.item_id].totalPrice += itemTotal;
      }
      return acc;
    },
    {} as Record<string, GroupedItem>,
  );

  const invoiceItems = Object.values(groupedItems).filter(
    (item) => item.totalQuantity > 0,
  );

  // If no items with pricing, show placeholder
  if (invoiceItems.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="mb-4 font-semibold text-lg">Items with Costing</h2>
        <div className="bg-muted/50 p-8 border border-border rounded-lg text-center">
          <p className="text-muted-foreground text-sm">
            No items with pricing available for this order
          </p>
        </div>
      </div>
    );
  }

  // Calculate totals
  const itemTotal = invoiceItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
  );
  const carriageAmount = order.carriage ?? 0;
  const grandTotal = itemTotal + carriageAmount;

  return (
    <div className="mt-8">
      <h2 className="mb-4 font-semibold text-lg">Items with Costing</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Description</TableHead>
            <TableHead className="text-black">SKU</TableHead>
            <TableHead className="text-black">Country of Origin</TableHead>
            <TableHead className="text-black">HS Code</TableHead>
            <TableHead className="text-black text-right">Quantity</TableHead>
            <TableHead className="text-black text-right">Unit Price</TableHead>
            <TableHead className="text-black text-right">Tax Rate</TableHead>
            <TableHead className="text-black text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoiceItems.map((item) => (
            <TableRow key={item.item_id}>
              <TableCell className="text-black">{item.item_name}</TableCell>
              <TableCell className="text-black">{item.sku}</TableCell>
              <TableCell className="text-black">
                {item.country_of_origin}
              </TableCell>
              <TableCell className="text-black">{item.hs_code}</TableCell>
              <TableCell className="text-black text-right">
                {item.totalQuantity}
              </TableCell>
              <TableCell className="text-black text-right">
                <NumberFlow
                  value={item.price ?? 0}
                  format={{ style: "currency", currency: currency }}
                />
              </TableCell>
              <TableCell className="text-black text-right">
                {(item.tax ?? 0) * 100}%
              </TableCell>
              <TableCell className="text-black text-right">
                <NumberFlow
                  value={item.totalPrice}
                  format={{ style: "currency", currency: currency }}
                />
              </TableCell>
            </TableRow>
          ))}
          {carriageAmount > 0 && (
            <TableRow className="border-t text-neutral-800">
              <TableCell className="text-black">Carriage</TableCell>
              <TableCell colSpan={6} />
              <TableCell className="text-black text-right">
                <NumberFlow
                  value={carriageAmount}
                  format={{ style: "currency", currency: currency }}
                />
              </TableCell>
            </TableRow>
          )}
          <TableRow className="border-t">
            <TableCell className="font-semibold text-black">Total</TableCell>
            <TableCell colSpan={6} />
            <TableCell className="font-semibold text-black text-right">
              <NumberFlow
                value={grandTotal}
                format={{ style: "currency", currency: currency }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ItemsWithPricing;
