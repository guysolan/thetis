import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import Sheet from "@/components/Sheet";
import { useSelectOrders } from "@/features/orders/features/order-history/api/selectOrders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { OrderForm } from "@/features/orders/components/OrderForm";
import { OrderHistory } from "@/features/orders/components/OrderHistory";
import PageTitle from "../../../components/PageTitle";

const OrdersPage = () => {
  const { data: orders } = useSelectOrders();

  return (
    <>
      <PageTitle title="Orders">
        {
          /* <Button asChild>
          <Link to="/stock/orders/new">Create New Order</Link>
        </Button> */
        }

        <Sheet
          trigger={<Button>Create New Order</Button>}
          title="Create Order"
          description="Enter the details for your new Order."
        >
          <OrderForm />
        </Sheet>
      </PageTitle>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="my-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sale">Sales</TabsTrigger>
          <TabsTrigger value="build">Builds</TabsTrigger>
          <TabsTrigger value="purchase">Purchases</TabsTrigger>
          <TabsTrigger value="shipment">Shipments</TabsTrigger>
        </TabsList>

        {["all", "sale", "build", "purchase", "shipment"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <OrderHistory
              orders={orders?.filter((order) =>
                tabValue === "all" ? true : order.order_type === tabValue
              )}
            />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export const Route = createFileRoute("/_apps/stock/orders/")({
  component: OrdersPage,
});
