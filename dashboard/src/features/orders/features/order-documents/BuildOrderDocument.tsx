import React from "react";
import FinancialTransactions from "../order-history/components/FinancialTransactions";
import { OrderView } from "../../types";
import Company from "./Address";
import OrderDescription from "./OrderDescription";
import OrderTitle from "./OrderTitle";
import OrderTotal from "./OrderTotal";
import BuyerSeller from "./BuyerSeller";

const BuildOrderDocument = ({ order }: { order: OrderView }) => {
    return (
        <>
            <OrderTitle orderType={order.order_type} />
            <BuyerSeller order={order} />

            <OrderDescription
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />

            <FinancialTransactions
                orderItems={order.items}
                orderType={order.order_type}
            />
            <OrderTotal order={order} />
        </>
    );
};

export default BuildOrderDocument;
