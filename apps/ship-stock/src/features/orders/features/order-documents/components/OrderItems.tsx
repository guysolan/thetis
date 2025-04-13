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
const OrderItems = ({
  orderItems,
  currency,
}: { orderItems: OrderView["items"]; currency: Currency }) => {
  const { data: items } = useSelectItemsView();

  const invoiceItems = orderItems
    .filter((orderItem) => orderItem.quantity > 0)
    .map((orderItem) => {
      const itemDetails = items.find(
        (item) => item.item_id === orderItem.item_id,
      );
      return {
        ...orderItem,
        ...itemDetails,
      };
    });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-black">Description</TableHead>
          <TableHead className="text-black">SKU</TableHead>
          <TableHead className="text-black text-right">Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoiceItems.map((item) => (
          <TableRow key={item.item_id}>
            <TableCell className="text-black">{item.item_name}</TableCell>
            <TableCell className="text-black">{item.sku}</TableCell>
            <TableCell className="text-black text-right">
              {item.quantity}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderItems;
