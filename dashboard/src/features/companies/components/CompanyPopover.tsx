import { Company } from "../types";
import ActionPopover from "@/components/ActionPopover";
import CompanyForm from "./CompanyForm";
import AddressForm from '../../stockpiles/components/AddressForm';
import Sheet from '../../../components/Sheet';
import CompanyContactForm from '../../contacts/components/CompanyContactForm';
import PopoverOption from '../../../components/PopoverOption';
import { House, User2 } from 'lucide-react';
import { Separator } from '../../../components/ui/separator';
import { useDeleteCompany } from '../api/deleteCompany';

interface CompanyPopoverProps {
    company: Company['Row'];
}

const CompanyPopover = ({ company }: CompanyPopoverProps) => {
    const { mutate: deleteCompany } = useDeleteCompany();
    return (<ActionPopover
        title={company.name}
        editForm={<CompanyForm company={company} />}
        deleteFunction={() => deleteCompany(company.id)}
    >
        <Separator />
        <Sheet
            trigger={<PopoverOption><House size={20} /> Add Address</PopoverOption>}
            title="New Address"
            description={`Add a new address for ${company.name}`}
        >
            <AddressForm
                address={null}
                operation="insert"
                companyId={company.id}
            />
        </Sheet>
        <Sheet
            trigger={<PopoverOption><User2 size={20} /> Add Contact</PopoverOption>}
            title="New Contact"
            description={`Add a new contact for ${company.name}`}
        >
            <CompanyContactForm
                contact={null}
                operation="insert"
                companyId={company.id}
            />
        </Sheet>
        <Separator />
    </ActionPopover>)
};

export default CompanyPopover; 