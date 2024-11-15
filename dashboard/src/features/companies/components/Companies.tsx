import { useSelectCompanies } from "../api/selectCompanies";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import Sheet from "@/components/Sheet";
import { CompanyForm } from "./CompanyForm";
import CompanyAddressForm from "./CompanyAddressForm";
import DeleteDialog from "@/components/DeleteDialog";
import { useDeleteCompany } from "../api/deleteCompany";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AddressForm } from "../../stockpiles/components/AddressForm";
import useDeleteAddress from "../../stockpiles/api/deleteAddress";
import ActionPopover from "@/components/ActionPopover";

const Companies = () => {
    const { data: companies = [] } = useSelectCompanies();
    const { mutate: deleteCompany } = useDeleteCompany();
    const { mutate: deleteAddress } = useDeleteAddress();

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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                Name
                                            </TableHead>
                                            <TableHead>
                                                Address
                                            </TableHead>
                                            <TableHead>
                                                City
                                            </TableHead>
                                            <TableHead>
                                                Region
                                            </TableHead>
                                            <TableHead>
                                                Stock
                                            </TableHead>
                                            <TableHead className="w-[100px]">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {company.addresses?.map((
                                            address,
                                        ) => (
                                            <TableRow
                                                key={address.id}
                                            >
                                                <TableCell>
                                                    {address.name}
                                                </TableCell>
                                                <TableCell>
                                                    {address.line_1}
                                                </TableCell>
                                                <TableCell>
                                                    {address.city}
                                                </TableCell>
                                                <TableCell>
                                                    {address.region}
                                                </TableCell>
                                                <TableCell>
                                                    {address
                                                            .holds_stock
                                                        ? "Yes"
                                                        : "No"}
                                                </TableCell>
                                                <TableCell>
                                                    <ActionPopover
                                                        title="Address"
                                                        editForm={
                                                            <AddressForm
                                                                address={address}
                                                                operation="upsert"
                                                                companyId={company
                                                                    .id}
                                                            />
                                                        }
                                                        deleteFunction={() =>
                                                            deleteAddress(
                                                                address.id,
                                                            )}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
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
