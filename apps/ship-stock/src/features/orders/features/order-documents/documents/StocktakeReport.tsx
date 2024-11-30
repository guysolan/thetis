import React from "react";
import type { OrderView } from "../../../types";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import StockMovements from '../../order-history/components/StockMovements';

const StocktakeReport = ({ order }: { order: OrderView }) => {
    return (
        <>
            <OrderTitle title="Stocktake Report" />
            <OrderDescription
                currency={order.currency}
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />

            <StockMovements
                orderItems={order.items}
                from={order.from_shipping_address}
                to={order.to_shipping_address}
            />

        </>
    );
};

export default StocktakeReport;
