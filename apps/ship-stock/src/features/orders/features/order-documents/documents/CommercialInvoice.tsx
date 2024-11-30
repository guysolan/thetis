import React from "react";
import { OrderView } from "../../../types";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import FDADetails from "../components/FDADetails";
import ExporterDetails from "../components/ExporterDetails";
import ShippingItems from "../components/ShippingItems";

import PackageSummary from "../components/PackageSummary";
import BuyerSeller from "../components/BuyerSeller";
import ExchangeRates from "../components/ExchangeRates";

const CommercialInvoice = ({ order }: { order: OrderView }) => {
    const prepareOrderItems = (order: OrderView) => {
        const noPackages = order.items.filter((item) =>
            item.item_type !== "package"
        );
        const noNegatives = noPackages.filter((item) => (
            item.quantity > 0
        ));
        if (order.order_type === "sale") {
            return noPackages.map((item) => ({
                ...item,
                quantity: Math.abs(item.quantity),
            }));
        }
        if (order.order_type === "purchase") {
            return noNegatives;
        }
        return noPackages;
    };
    return (
        <>
            <OrderTitle title="Commercial Invoice" />
            <OrderDescription
                currency={order.currency}
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />

            <ShippingItems
                currency={order.currency}
                orderItems={prepareOrderItems(order)}
            />

            <PackageSummary items={order.items} />

            <BuyerSeller order={order} />

            <FDADetails />
            <ExporterDetails />
            <ExchangeRates />

        </>
    );
};

export default CommercialInvoice;
