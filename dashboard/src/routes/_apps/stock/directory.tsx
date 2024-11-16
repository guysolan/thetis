import { createFileRoute } from "@tanstack/react-router";
import Sheet from "@/components/Sheet";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyContactForm from "@/features/contacts/components/CompanyContactForm";
import ContactTable from "@/features/contacts/components/ContactTable";
import { useSelectContacts } from "@/features/contacts/api/selectContacts";
import Companies from "@/features/companies/components/Companies";
import AddressForm from "@/features/stockpiles/components/AddressForm";
import AddressBook from "@/features/stockpiles/components/AddressBook";
import CompanyForm from "@/features/companies/components/CompanyForm";

const DirectoryPage = () => {
    const { data: contacts = [] } = useSelectContacts();

    return (
        <>
            <PageTitle title="Directory">
            </PageTitle>

            <Tabs defaultValue="companies" className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="companies">
                            Companies
                        </TabsTrigger>
                        <TabsTrigger value="contacts">Contacts</TabsTrigger>
                        <TabsTrigger value="addresses">
                            Addresses
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="companies" className="m-0">
                        <Sheet
                            trigger={<Button>New Company</Button>}
                            title="New Company"
                            description="Add a new company to your system."
                        >
                            <CompanyForm />
                        </Sheet>
                    </TabsContent>

                    <TabsContent value="contacts" className="m-0">
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
                    </TabsContent>

                    <TabsContent value="addresses" className="m-0">
                        <Sheet
                            trigger={<Button>New Address</Button>}
                            title="New Address"
                            description="Add a new address to your system."
                        >
                            <AddressForm
                                operation="insert"
                                address={null}
                            />
                        </Sheet>
                    </TabsContent>
                </div>

                <TabsContent value="companies">
                    <Companies />
                </TabsContent>

                <TabsContent value="contacts">
                    <ContactTable contacts={contacts} />
                </TabsContent>

                <TabsContent value="addresses">
                    <AddressBook />
                </TabsContent>
            </Tabs>
        </>
    );
};

export const Route = createFileRoute("/_apps/stock/directory")({
    component: DirectoryPage,
});
