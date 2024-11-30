import { Company } from "../types";
import DefaultContactSelect from "./DefaultContactSelect";
import DefaultAddressSelect from "./DefaultAddressSelect";

interface CompanyDefaultsSectionProps {
    company: Company['Row'];
    onSetDefaultContact: (companyId: number, contactId: number) => void;
    onSetDefaultShipping: (companyId: number, addressId: number) => void;
    onSetDefaultBilling: (companyId: number, addressId: number) => void;
}

const CompanyDefaultsSection = ({
    company,
    onSetDefaultContact,
    onSetDefaultShipping,
    onSetDefaultBilling,
}: CompanyDefaultsSectionProps) => (
    <div className="flex flex-row gap-4">
        <DefaultContactSelect
            company={company}
            onSetDefault={onSetDefaultContact}
        />
        <DefaultAddressSelect
            company={company}
            type="shipping"
            onSetDefault={onSetDefaultShipping}
        />
        <DefaultAddressSelect
            company={company}
            type="billing"
            onSetDefault={onSetDefaultBilling}
        />
    </div>
);

export default CompanyDefaultsSection; 