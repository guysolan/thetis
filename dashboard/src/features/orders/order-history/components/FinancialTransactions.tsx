import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { OrderView } from "../../types";

const FinancialTransactions = (
    { orderType, orderItems }: {
        orderType: OrderView["order_type"];
        orderItems: OrderView["items"];
    },
) => {
    return (
        <Table className="text-left">
            <TableHeader
            >
                <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Tax</TableHead>
                    <TableHead className='w-1/6'>Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orderItems.sort((a, b) => a.item_id - b.item_id).filter((
                    item,
                ) => Number(item?.price) !== 0).map((
                    item,
                ) => (
                    <TableRow
                        className="text-left"
                        key={`${item.item_id}-${item.item_name}`}
                    >
                        <TableCell>
                            {item.item_name}
                        </TableCell>
                           <TableCell>
                            {orderType === "sale"
                                ? item.quantity * -1
                                : item.quantity}
                        </TableCell>
                        <TableCell>
                            ${item.price?.toFixed(2) ??
                                0.00}
                        </TableCell>
                              <TableCell>
                            {(item.tax*100)?.toFixed(0) ??
                                0}%
                        </TableCell>
                     
                        <TableCell>
                            ${item.total?.toFixed(2) ??
                                0.00}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default FinancialTransactions;
