import ActionPopover from "@/components/ActionPopover";
import CompanyContactForm from "./CompanyContactForm";
import { Contact } from "../types"; // You'll need to create this type if not already exists
import { useDeleteContact } from '../api/deleteContact';

interface ContactActionsProps {
    contact: Contact;
}

export const ContactActions = ({ contact }: ContactActionsProps) => {
    const { mutate: deleteContact } = useDeleteContact();

    return <ActionPopover
        title="Contact"
        editForm={
            <CompanyContactForm
                contact={contact}
                operation="upsert"
            />
        }
        deleteFunction={() => deleteContact(contact.id)}
    />
}; 