import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../../components/ui/table";
const ExchangeRates = () => {
    return (
        <section>
            <Table>
                <TableCaption>Exchange Rates</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Base Currency</TableHead>
                        <TableHead>Target Currency</TableHead>
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
        </section>
    );
};

export default ExchangeRates;
