import React from "react";
import { OrderView } from "../../../types";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import ShippingItems from "../components/ShippingItems";

const StocktakeReport = ({ order }: { order: OrderView }) => {
    return (
        <>
            <OrderTitle title="Stocktake Report" />
            <OrderDescription
                currency={order.currency}
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />

            <ShippingItems
                orderItems={order.items}
            />
        </>
    );
};

export default StocktakeReport;
