import React from "react";
import FinancialTransactions from "../order-history/components/FinancialTransactions";
import { OrderView } from "../types";
import Company from "./Address";
import OrderDescription from "./OrderDescription";
import OrderTitle from "./OrderTitle";
import OrderTotal from "./OrderTotal";
import PaymentDetails from "./PaymentDetails";

const SaleDocument = ({ order }: { order: OrderView }) => {
    return (
        <>
            <OrderTitle orderType={order.order_type} />
            <OrderDescription
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />
            <div className="gap-8 grid grid-cols-2 mb-8">
                <Company
                    title="Seller"
                    address={order.from_address}
                />
                <Company
                    title="Buyer"
                    address={order.to_address}
                />
            </div>

            <FinancialTransactions
                orderItems={order.items}
                orderType={order.order_type}
            />
            <OrderTotal order={order} />
            <PaymentDetails />
        </>
    );
};

export default SaleDocument;
