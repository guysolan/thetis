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
};

type GroupedItem = OrderView["items"][number] &
  ItemDetails & {
    totalQuantity: number;
    totalPrice: number;
  };

const ShippingItems = ({
  orderItems,
  currency,
}: { orderItems: OrderView["items"]; currency: Currency }) => {
  const { data: items } = useSelectItemsView();

  // Group items by item_id and sum their quantities and totals
  const groupedItems = orderItems
    .filter((orderItem) => orderItem.quantity > 0)
    .reduce(
      (acc, orderItem) => {
        const itemDetails = items.find(
          (item) => item.item_id === orderItem.item_id,
        );

        if (!acc[orderItem.item_id]) {
          acc[orderItem.item_id] = {
            ...orderItem,
            ...itemDetails,
            totalQuantity: orderItem.quantity,
            totalPrice: orderItem.quantity * (orderItem.price ?? 0),
          } as GroupedItem;
        } else {
          acc[orderItem.item_id].totalQuantity += orderItem.quantity;
          acc[orderItem.item_id].totalPrice +=
            orderItem.quantity * (orderItem.price ?? 0);
        }
        return acc;
      },
      {} as Record<string, GroupedItem>,
    );

  const invoiceItems = Object.values(groupedItems);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-black">Description</TableHead>
          <TableHead className="text-black">SKU</TableHead>
          <TableHead className="text-black">Country of Origin</TableHead>
          <TableHead className="text-black">HS Code</TableHead>
          <TableHead className="text-black text-right">Quantity</TableHead>
          <TableHead className="text-black text-right">Unit Price</TableHead>
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
              <NumberFlow
                value={item.totalPrice}
                format={{ style: "currency", currency: currency }}
              />
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="font-semibold">
          <TableCell className="text-black">Total</TableCell>
          <TableCell colSpan={5} />
          <TableCell className="text-black text-right">
            <NumberFlow
              value={invoiceItems.reduce(
                (sum, item) => sum + item.totalPrice,
                0,
              )}
              format={{ style: "currency", currency: currency }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ShippingItems;
