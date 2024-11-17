import React from "react";
import { OrderView } from "../../../types";
import Company from "./Company";
import ShippingAddress from "./ShippingAddress";
import { CompanyRow } from "../../../../companies/types";
import Address from "../components/Address";
import { AddressRow } from "../../../../stockpiles/types";

const BuyerSeller = ({ order }: { order: OrderView }) => {
    return (
        <div className="gap-8 grid grid-cols-2 mb-8 capitalize">
            <div>
                <Company
                    title="Seller"
                    company={order.from_company}
                />
                <ShippingAddress
                    title="Shipping Address"
                    size="small"
                    address={order.from_shipping_address}
                    company={order.from_company}
                />
                <Address
                    title="Billing Address"
                    address={order.from_billing_address}
                />
                <h3 className="mt-4 mb-2 font-medium">Contact</h3>
                <p>{order.from_contact?.name}</p>
                <p>{order.from_contact?.email}</p>
                <p>{order.from_contact?.phone}</p>
            </div>
            <div>
                <Company
                    title="Buyer"
                    company={order.to_company}
                />
                <ShippingAddress
                    title="Shipping Address"
                    size="small"
                    address={order.to_shipping_address}
                    company={order.to_company}
                />
                <Address
                    title="Billing Address"
                    address={order.to_billing_address}
                />
                <h3 className="mt-4 mb-2 font-medium text-sm">Contact</h3>
                <p>{order.to_contact?.name}</p>
                <p>{order.to_contact?.email}</p>
                <p>{order.to_contact?.phone}</p>
            </div>
        </div>
    );
};

export default BuyerSeller;
