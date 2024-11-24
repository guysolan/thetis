import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ContactActions } from "./ContactActions";
import { useDeleteContact } from "../api/deleteContact";
import { Badge } from "@/components/ui/badge";
import { useSelectContacts } from "../api/selectContacts";

const ContactCards = () => {
    const { data: contacts = [] } = useSelectContacts();

    return (
        <section className="gap-4 grid lg:grid-cols-2">
            {contacts?.map((contact) => (
                <Card key={contact.id} className="flex flex-col">
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="font-semibold text-lg truncate">
                            {contact.name}
                        </CardTitle>
                        <ContactActions
                            contact={contact}
                        />
                    </CardHeader>
                    <CardContent>
                        <div className="text-muted-foreground text-sm">
                            <div>Email: {contact.email}</div>
                            <div>Phone: {contact.phone}</div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Badge>{contact.companies?.name}</Badge>
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
};

export default ContactCards;
