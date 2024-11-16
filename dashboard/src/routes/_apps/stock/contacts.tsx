import { createFileRoute } from "@tanstack/react-router";
import Sheet from "@/components/Sheet";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyContactForm from "@/features/contacts/components/CompanyContactForm";
import ContactTable from "@/features/contacts/components/ContactTable";
import { useSelectContacts } from "@/features/contacts/api/selectContacts";

const ContactsPage = () => {
  const { data: contacts = [] } = useSelectContacts();

  return (
    <>
      <PageTitle title="Contacts">
        <Sheet
          trigger={<Button>New Contact</Button>}
          title="New Contact"
          description="Add a new contact to your system."
        >
          <CompanyContactForm
            contact={null}
            operation="insert"
          />
        </Sheet>
      </PageTitle>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Contacts</TabsTrigger>
          <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ContactTable
            contacts={contacts}
          />
        </TabsContent>

        <TabsContent value="unassigned">
          <ContactTable
            contacts={contacts.filter((contact) => !contact.companies)}
            companyId={0}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export const Route = createFileRoute("/_apps/stock/contacts")({
  component: ContactsPage,
});
