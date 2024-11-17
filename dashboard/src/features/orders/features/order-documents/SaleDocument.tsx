import React from "react";
import FinancialTransactions from "../order-history/components/FinancialTransactions";
import { OrderView } from "../../types";
import Company from "./Address";
import OrderDescription from "./OrderDescription";
import OrderTitle from "./OrderTitle";
import OrderTotal from "./OrderTotal";
import PaymentDetails from "./PaymentDetails";
import BuyerSeller from "./BuyerSeller";

const SaleDocument = ({ order }: { order: OrderView }) => {
    return (
        <>
            <OrderTitle orderType={order.order_type} />
            <OrderDescription
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />
            <BuyerSeller order={order} />
            <FinancialTransactions
                orderItems={order.items}
                orderType={order.order_type}
            />
            <OrderTotal order={order} />
            <PaymentDetails orderId={order.order_id} />
        </>
    );
};

export default SaleDocument;
