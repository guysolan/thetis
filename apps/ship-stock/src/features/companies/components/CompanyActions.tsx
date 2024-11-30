import { Company } from '../types'
import { Button } from "@thetis/ui/button";
import Sheet from "@/components/Sheet";
import AddressForm from "../../stockpiles/components/AddressForm";
import CompanyContactForm from "../../contacts/components/CompanyContactForm";

interface CompanyActionsProps {
    company: Company['Row'];
}

const CompanyActions = ({ company }: CompanyActionsProps) => (
    <div className="flex flex-row flex-wrap gap-4">
        <Sheet
            trigger={<Button variant="outline">Add Address</Button>}
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
            trigger={<Button variant="outline">Add Contact</Button>}
            title="New Contact"
            description={`Add a new contact for ${company.name}`}
        >
            <CompanyContactForm
                contact={null}
                operation="insert"
                companyId={company.id}
            />
        </Sheet>
    </div>
);

export default CompanyActions; 