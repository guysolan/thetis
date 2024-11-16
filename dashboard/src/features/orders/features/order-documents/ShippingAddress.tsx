import React from "react";
import { AddressRow } from "../../../stockpiles/types";
import { CompanyRow } from "../../../companies/types";

const ShippingAddress = (
    { address, company }: { address: AddressRow; company: CompanyRow },
) => {
    return (
        <div className="mb-4 text-neutral-600 text-sm">
            <h2 className="font-semibold text-neutral-800">Shipping Address</h2>
            {address
                ? (
                    <>
                        <p>{company?.name}</p>
                        <p>Care of: {address?.name}</p>
                        <p>{address?.line_1}</p>
                        <p>{address?.line_2}</p>
                        <p>{address?.city}</p>
                        <p>{address?.code}</p>
                        <p>{address?.country}</p>
                    </>
                )
                : <p>_</p>}
        </div>
    );
};

export default ShippingAddress;
