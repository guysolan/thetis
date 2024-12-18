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
          <TableHead>Description</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Country of Origin</TableHead>
          <TableHead>HS Code</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Unit Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoiceItems.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.item_name}</TableCell>
            <TableCell>{item.sku}</TableCell>
            <TableCell>{item.country_of_origin}</TableCell>
            <TableCell>{item.hs_code}</TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
            <TableCell className="text-right">
              <NumberFlow
                value={item.item_price ?? 0}
                format={{ style: "currency", currency: currency }}
              />
            </TableCell>
            <TableCell className="text-right">
              <NumberFlow
                value={item.quantity * (item.item_price ?? 0)}
                format={{ style: "currency", currency: currency }}
              />
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="font-semibold">
          <TableCell>Total</TableCell>
          <TableCell colSpan={5} />
          <TableCell className="text-right">
            <NumberFlow
              value={invoiceItems.reduce(
                (sum, item) => sum + item.quantity * (item.item_price ?? 0),
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
