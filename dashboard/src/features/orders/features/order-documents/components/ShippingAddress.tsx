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
    const headerSize = size === "small" ? "text-sm" : "text-lg";

    return (
        <section className={textSize}>
            <h3 className={headerSize}>
                {title}
            </h3>
            <div>
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
        </section>
    );
};

export default ShippingAddress;
