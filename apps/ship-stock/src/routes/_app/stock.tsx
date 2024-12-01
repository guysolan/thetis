import { createFileRoute } from "@tanstack/react-router";
import Sheet from "@/components/Sheet";
import { selectStockpilesQueryOptions } from "@/features/stockpiles/api/selectStockpiles";
import { Button } from "@thetis/ui/button";
import PageTitle from "@/components/PageTitle";
import AddressForm from "@/features/stockpiles/components/AddressForm";
import AmazonStock from "@/features/stockpiles/components/AmazonWarehouses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import Stockpiles from "@/features/stockpiles/components/Stockpiles";
import StocktakeForm from "../../features/orders/features/order-forms/features/stocktake-form/StocktakeForm";
import TabsHeader from "@/components/TabsHeader";

const ItemsPage = () => {
  return (
    <>
      <Tabs defaultValue="stockpiles">
        <TabsHeader
          tabsList={
            <>
              <TabsTrigger value="stockpiles">Stockpiles</TabsTrigger>
              <TabsTrigger value="amazon">Amazon</TabsTrigger>
            </>
          }
          actionButtons={
            <Sheet
              trigger={<Button>New Stocktake</Button>}
              title="New Stocktake"
              description="Update the stock at one of your addresses."
            >
              <StocktakeForm />
            </Sheet>
          }
        />
        <TabsContent value="stockpiles">
          <Stockpiles />
        </TabsContent>

        <TabsContent value="amazon">
          <AmazonStock />
        </TabsContent>
      </Tabs>
    </>
  );
};

export const Route = createFileRoute("/_app/stock")({
  component: ItemsPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(selectStockpilesQueryOptions());
  },
});
