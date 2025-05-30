import React from "react";
import type { OrderView } from "../../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import type { Currency } from "../../../../../constants/currencies";

interface ServicesTableProps {
  order: OrderView;
  currency: Currency;
}

interface CombinedService {
  item_id: number;
  item_name: string;
  quantity: number;
  price: number;
  tax: number;
  total: number;
}

const ServicesTable = ({ order, currency }: ServicesTableProps) => {
  // First filter for service items with positive quantity
  const serviceItems = order.items.filter(
    (item) => item.item_type === "service" && item.quantity > 0 && item.address?.id!==order.from_address_id
  );

  console.log('serviceItems', serviceItems);

  // Combine services with same item_id
  const combinedServices = serviceItems.reduce<CombinedService[]>((acc, item) => {
    const existingService = acc.find(
      (service) => service.item_id === Number(item.item_id)
    );

    if (existingService) {
      existingService.quantity += item.quantity;
      existingService.total += item.total;
    } else {
      acc.push({
        item_id: Number(item.item_id),
        item_name: item.item_name,
        quantity: item.quantity,
        price: item.price,
        tax: item.tax,
        total: item.total,
      });
    }

    return acc;
  }, []);

  console.log('combinedServices', combinedServices);

  if (combinedServices.length === 0) {
    return null;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });

  const taxFormatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="mt-8">
      <h2 className="mb-4 font-semibold text-lg">Services</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Service</TableHead>
            <TableHead className="text-black text-right">Quantity</TableHead>
            <TableHead className="text-black text-right">Unit Price</TableHead>
            <TableHead className="text-black text-right">Tax</TableHead>
            <TableHead className="text-black text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {combinedServices.map((item) => (
            <TableRow key={item.item_id}>
              <TableCell className="text-black">{item.item_name}</TableCell>
              <TableCell className="text-black text-right">{item.quantity}</TableCell>
              <TableCell className="text-black text-right">
                {formatter.format(item.price)}
              </TableCell>
              <TableCell className="text-black text-right">
                {taxFormatter.format(item.tax)}
              </TableCell>
              <TableCell className="text-black text-right">
                {formatter.format(item.total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServicesTable; 