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

interface Props {
    contacts: Contact[];
}

const ContactTable = ({ contacts }: Props) => {
    const { mutate: deleteContact } = useDeleteContact();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
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
