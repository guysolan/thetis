import React from "react";
import FinancialTransactions from "../../order-history/components/FinancialTransactions";
import { Currency, OrderView } from "../../../types";
import Company from "../components/Address";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import OrderTotal from "../components/OrderTotal";
import PaymentDetails from "../components/PaymentDetails";
import BuyerSeller from "../components/BuyerSeller";
import Heading from "../components/Heading";

const Invoice = ({ order }: { order: OrderView }) => {
    return (
        <>
            <Heading />
            <OrderTitle title="Invoice" />
            <OrderDescription
                currency={order.currency}
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />

            <BuyerSeller order={order} />

            <FinancialTransactions
                orderItems={order.items}
                orderType={order.order_type}
                currency={order.currency as Currency}
            />

            <OrderTotal order={order} />

            <PaymentDetails
                orderId={order.order_id}
                currency={order.currency}
            />
        </>
    );
};

export default Invoice;
