import React from "react";
import { AddressRow } from "../../../../stockpiles/types";
import { CompanyRow } from "../../../../companies/types";

const ShippingAddress = ({
  address,
  company,
  title,
  contactName,
  size = "large",
}: {
  address: AddressRow;
  company: CompanyRow;
  title?: string;
  size?: "small" | "large";
  contactName?: string;
}) => {
  const textSize = size === "small" ? "text-sm" : "text-[2rem]";
  const headerSize = size === "small" ? "text-sm" : "text-lg";

  return (
    <section className={`mb-4 ${textSize}`}>
      <h3 className={`font-medium mb-2 ${headerSize}`}>{title}</h3>
      <div className="space-y-1">
        {address ? (
          <>
            <p>{company?.name}</p>
            {contactName && <p>Care of: {contactName}</p>}
            <p>{address.line_1}</p>
            {address.line_2 && <p>{address.line_2}</p>}
            <p>{address.city}</p>
            <p>{address.code}</p>
            <p>{address.country}</p>
          </>
        ) : (
          <p>-</p>
        )}
      </div>
    </section>
  );
};

export default ShippingAddress;
