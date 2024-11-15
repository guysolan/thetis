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

const Companies = () => {
    const { data: companies = [] } = useSelectCompanies();
    const { mutate: deleteCompany } = useDeleteCompany();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Companies</h1>
                <Sheet
                    trigger={<Button>New Company</Button>}
                    title="New Company"
                    description="Add a new company to the system"
                >
                    <CompanyForm company={null} />
                </Sheet>
            </div>

            <section className="flex flex-col gap-4">
                {companies.map((company) => (
                    <Card key={company.id}>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>{company.name}</CardTitle>

                            <ActionPopover
                                title={company.name}
                                editForm={<CompanyForm company={company} />}
                                deleteFunction={() => deleteCompany(company.id)}
                            />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <AddressTable
                                    addresses={company.addresses}
                                    companyId={company.id}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Sheet
                                trigger={
                                    <Button>
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
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </div>
    );
};

export default Companies;
