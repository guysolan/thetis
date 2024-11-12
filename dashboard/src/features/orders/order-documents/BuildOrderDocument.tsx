import React from "react";
import FinancialTransactions from "../order-history/components/FinancialTransactions";
import { OrderView } from "../types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import Company from "./Company";
import OrderDescription from "./OrderDescription";
import OrderTitle from "./OrderTitle";

const BuildOrderDocument = ({ order }: { order: OrderView }) => {
    return (
        <>
            <OrderTitle orderType={order.order_type} />
            <div className="gap-8 grid grid-cols-2 mb-8">
                <Company
                    title="Buyer"
                    name={order.seller_name}
                    address={order.seller_address}
                    email={order.seller_contact}
                />
                <Company
                    title="Seller"
                    name={order.seller_name}
                    address={order.seller_address}
                    email={order.seller_contact}
                />
            </div>

            <OrderDescription
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />

            <FinancialTransactions
                orderItems={order.items}
                orderType={order.order_type}
            />
            <Table>
                <TableBody>
                    <TableRow>
                        <TableHead>Carriage</TableHead>
                        <TableCell className="text-right">
                            {order.carriage}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-lg text-neutral-900">
                            Total
                        </TableHead>
                        <TableCell className="text-right text-lg text-neutral-900">
                            {order.total_value}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
};

export default BuildOrderDocument;
