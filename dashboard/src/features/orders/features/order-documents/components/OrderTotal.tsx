import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { OrderView } from "../../../types";
import { Currency } from '../../../../../components/Currency';
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
                        <TableRow className="border-t text-neutral-800">
                            <TableHead>Carriage</TableHead>
                            <TableCell className="w-1/6 font-medium">
                                <Currency
                                    amount={order.carriage ?? 0}
                                    currency={order.currency as Currency}
                                />
                            </TableCell>
                        </TableRow>
                    )}
                <TableRow>
                    <TableHead className="text-lg text-neutral-900">
                        Total
                    </TableHead>
                    <TableCell className="w-1/6 font-medium text-lg text-neutral-900">
                        <Currency
                            amount={order.total_value ?? 0}
                            currency={order.currency as Currency}
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default OrderTotal;
