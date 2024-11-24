import { createFileRoute } from "@tanstack/react-router";
import Sheet from "@/components/Sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyContactForm from "@/features/contacts/components/CompanyContactForm";
import AddressForm from "@/features/stockpiles/components/AddressForm";
import CompanyForm from "@/features/companies/components/CompanyForm";
import LayoutPopover from '../../../components/LayoutPopover';
import Companies from '../../../features/companies/components/Companies';
import Contacts from '../../../features/contacts/components/Contacts';
import Addresses from '../../../features/stockpiles/components/Addresses';
import TabsHeader from '@/components/TabsHeader';

const DirectoryPage = () => {
    const tabsList = (
        <>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </>
    );

    const optionButtons = <LayoutPopover />;

    const actionButtons = (
        <>
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
                    <CompanyContactForm contact={null} operation="insert" />
                </Sheet>
            </TabsContent>

            <TabsContent value="addresses" className="m-0">
                <Sheet
                    trigger={<Button>New Address</Button>}
                    title="New Address"
                    description="Add a new address to your system."
                >
                    <AddressForm operation="insert" address={null} />
                </Sheet>
            </TabsContent>
        </>
    );

    return (
        <>
            <Tabs defaultValue="companies" className="w-full">
                <TabsHeader
                    tabsList={tabsList}
                    optionButtons={optionButtons}
                    actionButtons={actionButtons}
                />

                <TabsContent value="companies">
                    <Companies />
                </TabsContent>

                <TabsContent value="contacts">
                    <Contacts />
                </TabsContent>

                <TabsContent value="addresses">
                    <Addresses />
                </TabsContent>
            </Tabs>
        </>
    );
};

export const Route = createFileRoute("/_apps/stock/directory")({
    component: DirectoryPage,
});
