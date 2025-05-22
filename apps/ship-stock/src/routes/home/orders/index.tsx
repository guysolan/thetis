import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@thetis/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@thetis/ui/tabs";
import TabsHeader from "@/components/TabsHeader";
import { Link } from "@tanstack/react-router";

import { OrderHistory } from "@/features/orders/components/OrderHistory";
import { useSelectOrders } from "@/features/orders/features/order-history/api/selectOrders";
import { v4 as uuidv4 } from "uuid";
export type OrderTab = "sale" | "purchase" | "shipment" | "all";
const tabs: OrderTab[] = ["all", "purchase", "sale", "shipment"];

const OrdersPage = () => {
  const { data: orders } = useSelectOrders();

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsHeader
          tabsList={tabs.map((tab) => (
            <TabsTrigger className="capitalize" key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
          actionButtons={
            <Link to="/home/orders/$orderId" params={{ orderId: "new" }}>
              <Button>New Order</Button>
            </Link>
          }
        />

        {tabs?.map((tabValue) => (
          <TabsContent
            className="flex flex-col gap-4 w-full"
            key={tabValue}
            value={tabValue}
          >
            <OrderHistory
              orders={orders?.filter((order) =>
                tabValue === "all" ? true : order.order_type === tabValue,
              )}
            />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export const Route = createFileRoute("/home/orders/")({
  component: OrdersPage,
});
