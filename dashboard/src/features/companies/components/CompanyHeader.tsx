import { Company } from "../types";
import { CardTitle } from "@/components/ui/card";
import CompanyPopover from './CompanyPopover';

interface CompanyHeaderProps {
    company: Company['Row'];

}

const CompanyHeader = ({ company }: CompanyHeaderProps) => (
    <div className="flex flex-row justify-between items-start">
        <div>
            <CardTitle>{company.name}</CardTitle>
            <div className="pt-2 text-sm">
                <p>Company Number: {company.company_number}</p>
                <p>VAT Number: {company.vat_number}</p>
            </div>
        </div>
        <CompanyPopover
            company={company}

        />
    </div>
);

export default CompanyHeader; 