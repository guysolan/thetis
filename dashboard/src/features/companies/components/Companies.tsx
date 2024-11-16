import { useSelectCompanies } from "../api/selectCompanies";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sheet from "@/components/Sheet";
import CompanyForm from "./CompanyForm";
import { useDeleteCompany } from "../api/deleteCompany";
import AddressForm from "../../stockpiles/components/AddressForm";
import ActionPopover from "@/components/ActionPopover";
import AddressTable from "../../stockpiles/components/AddressTable";
import ContactTable from "../../contacts/components/ContactTable";
import CompanyContactForm from "../../contacts/components/CompanyContactForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyAddressBook from "../../stockpiles/components/CompanyAddressBook";
import { Separator } from "@/components/ui/separator";
const Companies = () => {
    const { data: companies = [] } = useSelectCompanies();
    const { mutate: deleteCompany } = useDeleteCompany();

    return (
        <section className="flex flex-col gap-4">
            {companies.map((company) => (
                <Card key={company.id}>
                    <CardHeader className="flex flex-row justify-between items-start">
                        <div>
                            <CardTitle>{company.name}</CardTitle>
                            <div className="pt-2 text-sm">
                                <p>Company Number: {company.company_number}</p>
                                <p>VAT Number: {company.vat_number}</p>
                            </div>
                        </div>
                        <ActionPopover
                            title={company.name}
                            editForm={<CompanyForm company={company} />}
                            deleteFunction={() => deleteCompany(company.id)}
                        />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                        <CompanyAddressBook
                            addresses={company.addresses}
                        />
                        <ContactTable
                            contacts={company.contacts}
                        />
                    </CardContent>
                    <CardFooter className="flex flex-row flex-wrap gap-4">
                        <Sheet
                            trigger={
                                <Button variant="outline">
                                    Add Address
                                </Button>
                            }
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
                            trigger={
                                <Button variant="outline">
                                    Add Contact
                                </Button>
                            }
                            title="New Contact"
                            description={`Add a new contact for ${company.name}`}
                        >
                            <CompanyContactForm
                                contact={null}
                                operation="insert"
                                companyId={company.id}
                            />
                        </Sheet>
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
};

export default Companies;
