import { createFileRoute } from "@tanstack/react-router";
import Sheet from "@/components/Sheet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  selectStockpilesQueryOptions,
  useSelectStockpiles,
} from "@/features/stockpiles/api/selectStockpiles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import { AddressForm } from "@/features/stockpiles/components/AddressForm";
import StocktakeForm from "@/features/orders/order-forms/components/StockForm";
import AmazonStock from "@/features/stockpiles/components/AmazonWarehouses";
import DeleteDialog from "@/components/DeleteDialog";
import useDeleteAddress from "@/features/stockpiles/api/deleteAddress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelectAddresses } from "../../../features/stockpiles/api/selectAddresses";
import { SheetFooter } from "../../../components/ui/sheet";
import AddressStock from "../../../features/stockpiles/components/AddressStock";
import Companies from "../../../features/companies/components/Companies";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ActionPopover from "@/components/ActionPopover";

const ItemsPage = () => {
  const { data: addresses } = useSelectAddresses();
  const { mutate: deleteAddress } = useDeleteAddress();

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

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="stockpiles">Stockpiles</TabsTrigger>
          <TabsTrigger value="amazon">Amazon</TabsTrigger>
        </TabsList>

        <TabsContent value="stockpiles">
          <AddressStock />
        </TabsContent>

        <TabsContent value="amazon">
          <AmazonStock />
        </TabsContent>

        <TabsContent value="all">
          <section className="gap-4 grid lg:grid-cols-2 pt-4">
            {addresses?.map((address) => (
              <Card key={address.id} className="flex flex-col">
                <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                  <CardTitle className="font-semibold text-lg truncate">
                    {address.name}
                  </CardTitle>
                  <ActionPopover
                    title={address.name}
                    editForm={
                      <AddressForm operation="upsert" address={address} />
                    }
                    deleteFunction={() =>
                      deleteAddress(address.id as number)}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground text-sm">
                    {address.line_1}
                    <br />
                    {address.line_2 && (
                      <>
                        {address.line_2}
                        <br />
                      </>
                    )}
                    {address.city}, {address.region} {address.code}
                    <br />
                    {address.country}
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
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