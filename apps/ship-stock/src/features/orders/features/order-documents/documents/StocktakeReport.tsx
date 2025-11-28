import React from "react";
import type { OrderView } from "../../../types";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import ItemsManifest from "../components/ItemsManifest";

const StocktakeReport = ({ order }: { order: OrderView }) => {
    return (
        <>
            <OrderTitle title="Stocktake Report" />
            <OrderDescription
                currency={order.currency}
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />
            <ItemsManifest orderItems={order.items} />
        </>
    );
};

export default StocktakeReport;
