import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { Currency, OrderView } from "../../../types";
import { formatCurrency } from "../../../../../constants/currencies";

const OrderTotal = (
    { order, showCarriage = true }: {
        order: OrderView;
        showCarriage?: boolean;
    },
) => {
    return (
        <Table>
            <TableBody>
                {showCarriage &&
                    (
                        <TableRow className="border-t">
                            <TableHead>Carriage</TableHead>
                            <TableCell className="w-1/6 font-medium text-neutral-600">
                                {formatCurrency(
                                    order.carriage ?? 0,
                                    order.currency,
                                )}
                            </TableCell>
                        </TableRow>
                    )}
                <TableRow>
                    <TableHead className="text-lg text-neutral-900">
                        Total
                    </TableHead>
                    <TableCell className="w-1/6 font-medium text-lg text-neutral-900">
                        {formatCurrency(
                            order.total_value ?? 0,
                            order.currency as Currency,
                        )}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default OrderTotal;
