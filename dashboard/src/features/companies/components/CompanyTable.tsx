import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useSelectCompanies } from "../api/selectCompanies";
import DefaultContactSelect from "./DefaultContactSelect";
import DefaultAddressSelect from "./DefaultAddressSelect";
import CompanyPopover from './CompanyPopover';

const CompanyTable = () => {
    const { data: companies = [] } = useSelectCompanies();

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>Tax</TableHead>
                        <TableHead>Default Contact</TableHead>
                        <TableHead>Default Shipping</TableHead>
                        <TableHead>Default Billing</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companies.map((company) => (
                        <TableRow key={company.id}>
                            <TableCell>
                                {company.name}
                            </TableCell>
                            <TableCell>
                                {company.company_number}
                            </TableCell>
                            <TableCell>
                                {company.tax_number}
                            </TableCell>
                            <TableCell>
                                <DefaultContactSelect
                                    company={company}
                                    showLabel={false}
                                />
                            </TableCell>
                            <TableCell>
                                <DefaultAddressSelect
                                    company={company}
                                    type="shipping"
                                    showLabel={false}
                                />

                            </TableCell>
                            <TableCell>
                                <DefaultAddressSelect
                                    company={company}
                                    type="billing"
                                    showLabel={false}
                                />
                            </TableCell>
                            <TableCell>
                                <CompanyPopover company={company} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompanyTable; 