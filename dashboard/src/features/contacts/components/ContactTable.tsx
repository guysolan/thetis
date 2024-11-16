import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ActionPopover from "@/components/ActionPopover";
import CompanyContactForm from "./CompanyContactForm";
import { useDeleteContact } from "../api/deleteContact";
import { Contact } from "../types";
import { Badge } from "@/components/ui/badge";
import { Company } from "../../companies/types";

type ContactCompany = Contact["Row"] & { companies: Company["Row"][] };

interface Props {
    contacts: ContactCompany[];
}

const ContactTable = ({ contacts }: Props) => {
    const { mutate: deleteContact } = useDeleteContact();

    if (!contacts.length) {
        return;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Company(s)</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {contacts?.map((contact) => (
                    <TableRow key={contact.id}>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>
                            {contact.companies?.map((company) => (
                                <Badge key={company.id}>{company.name}</Badge>
                            ))}
                        </TableCell>
                        <TableCell>
                            <ActionPopover
                                title="Contact"
                                editForm={
                                    <CompanyContactForm
                                        contact={contact}
                                        operation="upsert"
                                    />
                                }
                                deleteFunction={() => deleteContact(contact.id)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ContactTable;
