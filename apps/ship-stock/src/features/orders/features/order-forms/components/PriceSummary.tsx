import React from "react";
import { useFormContext } from "react-hook-form";
import { useOrderItemsTotal } from "../hooks/useOrderItemsTotal";
import NumberFlow from "@number-flow/react";
import { defaultCurrency } from "../../../../../constants/currencies";
import { Table, TableBody, TableRow, TableCell } from "@thetis/ui/table";

const PriceSummary = () => {
  const form = useFormContext();
  const total = useOrderItemsTotal();

  return (
    <Table className="border-0 ml-auto w-1/2">
      <TableBody>
        <TableRow>
          <TableCell>Carriage:</TableCell>
          <TableCell className="text-right">
            <NumberFlow
              value={form.watch("carriage") ?? 0}
              format={{
                style: "currency",
                currency: form.watch("currency") ?? defaultCurrency,
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="">Total:</TableCell>
          <TableCell className="text-right text-lg">
            <NumberFlow
              value={total + Number(form.watch("carriage"))}
              format={{
                style: "currency",
                currency: form.watch("currency") ?? defaultCurrency,
              }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default PriceSummary;
