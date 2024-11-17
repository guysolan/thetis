import React from "react";
import { AddressRow } from "../../../../stockpiles/types";
import { CompanyRow } from "../../../../companies/types";

const ShippingAddress = (
    { address, company, title, size = "large" }: {
        address: AddressRow;
        company: CompanyRow;
        title?: string;
        size?: "small" | "large";
    },
) => {
    const textSize = size === "small" ? "text-sm" : "text-[2rem]";
    const headerSize = size === "small" ? "text-lg" : "text-lg";

    return (
        <div className={`mb-4 text-neutral-600 ${textSize}`}>
            <h2 className={`mb-2 font-semibold text-neutral-800 ${headerSize}`}>
                {title}
            </h2>
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
