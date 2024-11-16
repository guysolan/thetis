import React from "react";
import { OrderView } from "../../../orders/types";

const BuyerSeller = ({ order }: { order: OrderView }) => {
    return (
        <div className="gap-8 grid grid-cols-2 mb-8 text-sm">
            <div>
                <h2 className="mb-2 font-semibold text-xl">Buyer</h2>
                <p className="font-medium">{order.from_company.name}</p>
                <p>Tax Number: {order.from_company.tax_number}</p>
                <p>Company Number: {order.from_company.company_number}</p>

                <h3 className="mt-4 mb-2 font-medium">Billing Address</h3>
                <p>{order.from_billing_address?.name}</p>
                <p>{order.from_billing_address?.line_1}</p>
                <p>{order.from_billing_address?.line_2}</p>
                <p>{order.from_billing_address?.city}</p>
                <p>{order.from_billing_address?.code}</p>
                <p>{order.from_billing_address?.country}</p>

                <h3 className="mt-4 mb-2 font-medium">Contact</h3>
                <p>{order.from_contact?.name}</p>
                <p>{order.from_contact?.email}</p>
                <p>{order.from_contact?.phone}</p>
            </div>

            <div>
                <h2 className="mb-2 font-semibold text-xl">Seller</h2>
                <p className="font-medium">{order.to_company.name}</p>
                <p>Tax Number: {order.to_company.tax_number}</p>
                <p>Company Number: {order.to_company.company_number}</p>

                <h3 className="mt-4 mb-2 font-medium">Billing Address</h3>
                <p>{order.to_billing_address?.name}</p>
                <p>{order.to_billing_address?.line_1}</p>
                <p>{order.to_billing_address?.line_2}</p>
                <p>{order.to_billing_address?.city}</p>
                <p>{order.to_billing_address?.code}</p>
                <p>{order.to_billing_address?.country}</p>

                <h3 className="mt-4 mb-2 font-medium">Contact</h3>
                <p>{order.to_contact?.name}</p>
                <p>{order.to_contact?.email}</p>
                <p>{order.to_contact?.phone}</p>
            </div>
        </div>
    );
};

export default BuyerSeller;
