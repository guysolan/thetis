import { createFileRoute } from "@tanstack/react-router";
import Sheet from "@/components/Sheet";
import {
  selectStockpilesQueryOptions,
} from "@/features/stockpiles/api/selectStockpiles";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import AddressForm from "@/features/stockpiles/components/AddressForm";
import AmazonStock from "@/features/stockpiles/components/AmazonWarehouses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddressStock from "../../../features/stockpiles/components/AddressStock";
import AddressBook from "../../../features/stockpiles/components/AddressBook";

const ItemsPage = () => {
  return (
    <>
      <PageTitle title="Addresses">
        <Sheet
          trigger={<Button>New Address</Button>}
          title="New address"
          description="Add a new address to your system."
        >
          <AddressForm
            operation="insert"
            address={null}
          />
        </Sheet>
      </PageTitle>

      <Tabs defaultValue="address-book" className="w-full">
        <TabsList>
          <TabsTrigger value="stockpiles">Stockpiles</TabsTrigger>
          <TabsTrigger value="amazon">Amazon</TabsTrigger>
          <TabsTrigger value="address-book">Address Book</TabsTrigger>
        </TabsList>

        <TabsContent value="stockpiles">
          <AddressStock />
        </TabsContent>

        <TabsContent value="amazon">
          <AmazonStock />
        </TabsContent>

        <TabsContent value="address-book">
          <AddressBook />
        </TabsContent>
      </Tabs>
    </>
  );
};

export const Route = createFileRoute("/_apps/stock/addresses")({
  component: ItemsPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(selectStockpilesQueryOptions());
  },
});
