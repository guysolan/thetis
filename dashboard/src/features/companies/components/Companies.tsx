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
import CompanyContactForm from "../../contacts/components/CompanyContactForm";
import {
    useSetDefaultBilling,
    useSetDefaultContact,
    useSetDefaultShipping,
} from "../api/defaultMutations";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Companies = () => {
    const { data: companies = [] } = useSelectCompanies();
    const { mutate: deleteCompany } = useDeleteCompany();
    const { mutate: setDefaultShipping } = useSetDefaultShipping();
    const { mutate: setDefaultBilling } = useSetDefaultBilling();
    const { mutate: setDefaultContact } = useSetDefaultContact();

    const handleSetDefaultShipping = (companyId: number, addressId: number) => {
        setDefaultShipping({ companyId, addressId });
    };

    const handleSetDefaultBilling = (companyId: number, addressId: number) => {
        setDefaultBilling({ companyId, addressId });
    };

    const handleSetDefaultContact = (companyId: number, contactId: number) => {
        setDefaultContact({ companyId, contactId });
    };

    return (
        <section className="flex flex-col gap-4">
            {companies?.map((company) => (
                <Card key={company?.id}>
                    <CardHeader className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between items-start">
                            <div>
                                <CardTitle>{company?.name}</CardTitle>
                                <div className="pt-2 text-sm">
                                    <p>
                                        Company Number:{" "}
                                        {company?.company_number}
                                    </p>
                                    <p>VAT Number: {company?.vat_number}</p>
                                </div>
                            </div>
                            <ActionPopover
                                title={company.name}
                                editForm={<CompanyForm company={company} />}
                                deleteFunction={() => deleteCompany(company.id)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-row gap-4">
                        <div className="flex flex-col flex-grow gap-2">
                            <Label>
                                Default Contact
                            </Label>
                            <Select
                                value={company.contacts.find((c) =>
                                    c.is_default
                                )?.id?.toString()}
                                onValueChange={(value) =>
                                    handleSetDefaultContact(
                                        company.id,
                                        parseInt(value),
                                    )}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select default contact" />
                                </SelectTrigger>
                                <SelectContent>
                                    {company.contacts.map((cont) => (
                                        <SelectItem
                                            key={cont.id}
                                            value={cont.id
                                                .toString()}
                                        >
                                            {cont?.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col flex-grow gap-2">
                            <Label>
                                Default Shipping Address
                            </Label>
                            <Select
                                value={company.addresses.find((a) =>
                                    a.is_default_shipping
                                )?.id?.toString()}
                                onValueChange={(value) =>
                                    handleSetDefaultShipping(
                                        company.id,
                                        parseInt(value),
                                    )}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select default shipping" />
                                </SelectTrigger>
                                <SelectContent>
                                    {company.addresses.map((addr) => (
                                        <SelectItem
                                            key={addr.id}
                                            value={addr.id
                                                .toString()}
                                        >
                                            {addr.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col flex-grow gap-2">
                            <Label>
                                Default Billing Address
                            </Label>
                            <Select
                                value={company.addresses.find((a) =>
                                    a.is_default_billing
                                )?.id?.toString()}
                                onValueChange={(value) =>
                                    handleSetDefaultBilling(
                                        company.id,
                                        parseInt(value),
                                    )}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select default billing" />
                                </SelectTrigger>
                                <SelectContent>
                                    {company.addresses.map((addr) => (
                                        <SelectItem
                                            key={addr.id}
                                            value={addr.id
                                                .toString()}
                                        >
                                            {addr.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-row flex-wrap gap-4">
                        <Sheet
                            trigger={
                                <Button variant="outline">
                                    Add Address
                                </Button>
                            }
                            title="New Address"
                            description={`Add a new address for ${company?.name}`}
                        >
                            <AddressForm
                                address={null}
                                operation="insert"
                                companyId={company?.id}
                            />
                        </Sheet>
                        <Sheet
                            trigger={
                                <Button variant="outline">
                                    Add Contact
                                </Button>
                            }
                            title="New Contact"
                            description={`Add a new contact for ${company?.name}`}
                        >
                            <CompanyContactForm
                                contact={null}
                                operation="insert"
                                companyId={company?.id}
                            />
                        </Sheet>
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
};

export default Companies;
