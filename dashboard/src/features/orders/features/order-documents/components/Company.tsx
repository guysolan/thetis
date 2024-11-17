import React from "react";
import { CompanyRow } from "../../../../companies/types";

type Props = {
    title: string;
    company: CompanyRow;
};

const Company = ({ title, company }: Props) => {
    return (
        <div className="mb-4 text-neutral-700 text-sm">
            <h2 className="mb-4 font-semibold text-lg text-neutral-900">
                {title}
            </h2>
            {company
                ? (
                    <>
                        <p>{company.name}</p>
                        <p>VAT: {company.tax_number}</p>
                        <p>Company No: {company.company_number}</p>
                    </>
                )
                : <p>-</p>}
        </div>
    );
};

export default Company;
