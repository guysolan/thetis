import React from "react";
import { OrderItem, OrderView } from "../../../types";
import Company from "../components/Company";
import Address from "../components/Address";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import OrderTotal from "../components/OrderTotal";
import StockMovements from "../../order-history/components/StockMovements";
import FDADetails from "../components/FDADetails";
import ExporterDetails from "../components/ExporterDetails";
import type { CompanyRow } from "../../../../companies/types";
import { AddressRow } from "../../../../stockpiles/types";
import ShippingItems from "../components/ShippingItems";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../../components/ui/table";
import PackageSummary from "../components/PackageSummary";
import ShippingAddress from "../components/ShippingAddress";
import BuyerSeller from "../components/BuyerSeller";

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
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />
            <BuyerSeller order={order} />

            <ShippingItems
                orderItems={prepareOrderItems(order)}
            />

            <PackageSummary items={order.items} />

            <FDADetails />

            <ExporterDetails />
        </>
    );
};

export default CommercialInvoice;
