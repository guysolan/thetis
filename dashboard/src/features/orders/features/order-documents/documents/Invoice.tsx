import React from "react";
import FinancialTransactions from "../../order-history/components/FinancialTransactions";
import { OrderView } from "../../../types";
import Company from "../components/Address";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import OrderTotal from "../components/OrderTotal";
import PaymentDetails from "../components/PaymentDetails";
import BuyerSeller from "../components/BuyerSeller";

const Invoice = ({ order }: { order: OrderView }) => {
    return (
        <>
            <OrderTitle title="Invoice" />

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

export default Invoice;
