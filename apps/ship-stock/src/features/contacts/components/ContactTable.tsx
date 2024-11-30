import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";
import { ContactActions } from "./ContactActions";
import { useDeleteContact } from "../api/deleteContact";
import { Badge } from "@thetis/ui/badge";
import { useSelectContacts } from "../api/selectContacts";

const ContactTable = () => {
    const { data: contacts = [] } = useSelectContacts();


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
                            <Badge key={contact.companies?.id}>
                                {contact.companies?.name}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <ContactActions
                                contact={contact}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ContactTable;
