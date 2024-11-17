import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { OrderView } from "../../../types";

const OrderTotal = ({ order }: { order: OrderView }) => {
    return (
        <Table>
            <TableBody>
                <TableRow className="border-t">
                    <TableHead>Carriage</TableHead>
                    <TableCell className="w-1/6 font-medium text-neutral-600">
                        ${`${
                            order.carriage?.toFixed(2) ??
                                0.00
                        }`}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableHead className="text-lg text-neutral-900">
                        Total
                    </TableHead>
                    <TableCell className="w-1/6 font-medium text-lg text-neutral-900">
                        ${`${
                            order.total_value?.toFixed(2) ??
                                0.00
                        }`}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default OrderTotal;
