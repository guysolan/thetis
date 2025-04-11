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
const ShippingItems = ({
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
          <TableHead className="text-black">Country of Origin</TableHead>
          <TableHead className="text-black">HS Code</TableHead>
          <TableHead className="text-black text-right">Quantity</TableHead>
          <TableHead className="text-black text-right">Unit Price</TableHead>
          <TableHead className="text-black text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoiceItems.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-black">{item.item_name}</TableCell>
            <TableCell className="text-black">{item.sku}</TableCell>
            <TableCell className="text-black">
              {item.country_of_origin}
            </TableCell>
            <TableCell className="text-black">{item.hs_code}</TableCell>
            <TableCell className="text-black text-right">
              {item.quantity}
            </TableCell>
            <TableCell className="text-black text-right">
              <NumberFlow
                value={item.item_price ?? 0}
                format={{ style: "currency", currency: currency }}
              />
            </TableCell>
            <TableCell className="text-black text-right">
              <NumberFlow
                value={item.quantity * (item.price ?? 0)}
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
                (sum, item) => sum + item.quantity * (item.price ?? 0),
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
