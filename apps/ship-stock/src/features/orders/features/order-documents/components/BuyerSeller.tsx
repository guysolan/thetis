import React from "react";
import { OrderView } from "../../../types";
import Company from "./Company";
import ShippingAddress from "./ShippingAddress";
import Address from "../components/Address";
import Contact from "./Contact";

interface BuyerSellerProps {
  order: OrderView;
  fromOptions: {
    billing: boolean;
    shipping: boolean;
    contact: boolean;
  };
  toOptions: {
    billing: boolean;
    shipping: boolean;
    contact: boolean;
  };
}

const BuyerSeller = ({ order, fromOptions, toOptions }: BuyerSellerProps) => {
  console.log(fromOptions);
  return (
    <div className="gap-8 grid grid-cols-2 capitalize">
      {fromOptions.show && (
        <div>
          <Company title="Seller" company={order.from_company} />
          {fromOptions.shipping && (
            <ShippingAddress
              title="Shipping Address"
              size="small"
              address={order.from_shipping_address}
              contactName={order.from_contact?.name}
              company={order.from_company}
            />
          )}
          {fromOptions.billing && (
            <Address
              title="Billing Address"
              address={order.from_billing_address}
            />
          )}
          {fromOptions.contact && <Contact contact={order.from_contact} />}
        </div>
      )}
      {toOptions.show && (
        <div>
          <Company title="Buyer" company={order.to_company} />
          {toOptions.shipping && (
            <ShippingAddress
              title="Shipping Address"
              size="small"
              address={order.to_shipping_address}
              company={order.to_company}
              contactName={order.to_contact?.name}
            />
          )}
          {toOptions.billing && (
            <Address
              title="Billing Address"
              address={order.to_billing_address}
            />
          )}
          {toOptions.contact && <Contact contact={order.to_contact} />}
        </div>
      )}
    </div>
  );
};

export default BuyerSeller;
