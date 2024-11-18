import React from "react";
import FinancialTransactions from "../../order-history/components/FinancialTransactions";
import { OrderView } from "../../../types";
import Company from "../components/Address";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import OrderTotal from "../components/OrderTotal";
import PaymentDetails from "../components/PaymentDetails";
import BuyerSeller from "../components/BuyerSeller";

const PurchaseOrder = ({ order }: { order: OrderView }) => {
    return (
        <>
            <OrderTitle title="Purchase Order" />

            <OrderDescription
                orderId={order.order_id}
                orderDate={order.order_date as string}
                currency={order.currency}
            />
            <BuyerSeller order={order} />
            <FinancialTransactions
                currency={order.currency}
                orderItems={order.items}
                orderType={order.order_type}
            />
            <OrderTotal order={order} />
        </>
    );
};

export default PurchaseOrder;
