import React from "react";
import { OrderView } from "../../types";
import Company from "./Company";
import Address from "./Address";
import OrderDescription from "./OrderDescription";
import OrderTitle from "./OrderTitle";
import OrderTotal from "./OrderTotal";
import StockMovements from "../order-history/components/StockMovements";
import FDADetails from "./FDADetails";
import ExporterDetails from "./ExporterDetails";
import type { CompanyRow } from "../../../companies/types";
import { AddressRow } from "../../../stockpiles/types";
import CommercialInvoiceItems from "./CommercialInvoiceItems";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../components/ui/table";
import PackageSummary from "./PackageSummary";

const CommercialInvoice = ({ order }: { order: OrderView }) => {
    return (
        <>
            <OrderTitle orderType={order.order_type} />
            <OrderDescription
                orderId={order.order_id}
                orderDate={order.order_date as string}
            />
            <div className="gap-8 grid grid-cols-2 mb-8">
                <div>
                    <Company
                        title="Exporter"
                        company={order.from_company as CompanyRow}
                    />
                    <Address
                        title="Shipping Address"
                        address={order.from_shipping_address as AddressRow}
                    />
                    <Address
                        title="Billing Address"
                        address={order.from_billing_address as AddressRow}
                    />
                </div>
                <div>
                    <Company
                        title="Importer"
                        company={order.to_company as CompanyRow}
                    />
                    <Address
                        title="Shipping Address"
                        address={order.to_shipping_address as AddressRow}
                    />
                    <Address
                        title="Billing Address"
                        address={order.to_billing_address as AddressRow}
                    />
                </div>
            </div>

            <CommercialInvoiceItems
                orderItems={order.items.filter((item) =>
                    item.item_type !== "package"
                )}
            />

            <PackageSummary items={order.items} />

            <FDADetails />

            <ExporterDetails />
        </>
    );
};

export default CommercialInvoice;