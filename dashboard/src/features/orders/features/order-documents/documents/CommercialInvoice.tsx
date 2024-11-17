import React from "react";
import { OrderView } from "../../../types";
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
    return (
        <>
            <OrderTitle orderType={order.order_type} />
            <OrderDescription
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />
            <BuyerSeller order={order} />

            <ShippingItems
                orderItems={order.items.filter((item) =>
                    item.item_type !== "package"
                ).map((i) => ({ ...i, quantity: Math.abs(i.quantity) }))}
            />

            <PackageSummary items={order.items} />

            <FDADetails />

            <ExporterDetails />
        </>
    );
};

export default CommercialInvoice;
