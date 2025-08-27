import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useOrderItemsTotal } from "../hooks/useOrderItemsTotal";
import NumberFlow from "@number-flow/react";
import { defaultCurrency } from "../../../constants/currencies";
import { Table, TableBody, TableCell, TableRow } from "@thetis/ui/table";

const PriceSummary = () => {
  const { control } = useFormContext();
  const total = useOrderItemsTotal();

  // Use useWatch instead of form.watch to prevent infinite loops
  const carriage = useWatch({
    control,
    name: "carriage",
    defaultValue: 0,
  });

  const currency = useWatch({
    control,
    name: "currency",
    defaultValue: defaultCurrency,
  });

  return (
    <Table className="ml-auto border-0 w-1/2">
      <TableBody>
        <TableRow>
          <TableCell>Carriage:</TableCell>
          <TableCell className="text-right">
            <NumberFlow
              value={carriage ?? 0}
              format={{
                style: "currency",
                currency: currency ?? defaultCurrency,
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="">Total:</TableCell>
          <TableCell className="text-lg text-right">
            <NumberFlow
              value={Math.abs(total) + Number(carriage)}
              format={{
                style: "currency",
                currency: currency ?? defaultCurrency,
              }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default PriceSummary;
