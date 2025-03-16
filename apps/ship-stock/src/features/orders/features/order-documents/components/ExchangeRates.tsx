import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
const ExchangeRates = () => {
  return (
    <Table>
      <TableCaption>Exchange Rates</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-neutral-800 dark:text-neutral-200">
            Base Currency
          </TableHead>
          <TableHead className="text-neutral-800 dark:text-neutral-200">
            Target Currency
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1.27 GBP</TableCell>
          <TableCell>1 USD</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2.01 GBP</TableCell>
          <TableCell>1 AUD</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>1.14 GBP</TableCell>
          <TableCell>1 EUR</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>1.50 GBP</TableCell>
          <TableCell>1 CAD</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ExchangeRates;
