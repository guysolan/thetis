import React from "react";
import { AddressRow } from "../../../../stockpiles/types";
import { CompanyRow } from "../../../../companies/types";
import ShippingAddress from "../components/ShippingAddress";

interface ShippingLabelProps {
    deliveryAddress: AddressRow;
    deliveryCompany: CompanyRow;
    returnAddress: AddressRow;
    returnCompany: CompanyRow;
}

const ShippingLabel = ({
    deliveryAddress,
    deliveryCompany,
    returnAddress,
    returnCompany,
}: ShippingLabelProps) => {
    return (
        <div className="relative p-20 min-h-[800px]">
            <div className="flex ml-auto w-[200px]">
                <ShippingAddress
                    title="Return Address"
                    address={returnAddress}
                    company={returnCompany}
                    size="small"
                />
            </div>

            {/* Delivery Address - Large, centered */}
            <div className="mx-auto mt-24 w-[400px]">
                <ShippingAddress
                    title="Delivery Address"
                    address={deliveryAddress}
                    company={deliveryCompany}
                    size="large"
                />
            </div>
        </div>
    );
};

export default ShippingLabel;
