import React from "react";
import { OrderView } from "../../../types";
import Company from "./Company";
import ShippingAddress from "./ShippingAddress";
import Address from "../components/Address";
import Contact from "./Contact";

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
                <Contact contact={order.from_contact} />
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
                <Contact contact={order.to_contact} />
            </div>
        </div>
    );
};

export default BuyerSeller;
