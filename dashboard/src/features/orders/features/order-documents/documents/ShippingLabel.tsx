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
        <div className="p-20 min-h-[800px]">
            <div className="flex mb-8 ml-auto w-[200px]">
                <ShippingAddress
                    title="Return Address"
                    address={returnAddress}
                    company={returnCompany}
                    size="small"
                />
            </div>

            {/* Delivery Address - Large, centered */}
            <div className="flex justify-center items-center mx-auto mt-24 pt-8 scale-150">
                <ShippingAddress
                    title="Delivery Address"
                    address={deliveryAddress}
                    company={deliveryCompany}
                    size="lg"
                />
            </div>
        </div>
    );
};

export default ShippingLabel;
