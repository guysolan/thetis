import React from "react";
import { CompanyRow } from "../../../../companies/types";

type Props = {
  title: string;
  company: CompanyRow;
};

const Company = ({ title, company }: Props) => {
  return (
    <section className="mb-4 text-neutral-700 text-sm dark:text-neutral-300">
      <h2 className="mb-4 font-semibold text-lg text-neutral-900 dark:text-neutral-50">
        {title}
      </h2>
      <div>
        {company ? (
          <>
            <p>{company.name}</p>
            <p>VAT: {company.tax_number}</p>
            <p>Company No: {company.company_number}</p>
          </>
        ) : (
          <p>-</p>
        )}
      </div>
    </section>
  );
};

export default Company;
