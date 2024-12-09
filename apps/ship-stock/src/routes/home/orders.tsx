import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@thetis/ui/button";
import Sheet from "@/components/Sheet";
import { useSelectOrders } from "@/features/orders/features/order-history/api/selectOrders";
import { Tabs, TabsContent, TabsTrigger } from "@thetis/ui/tabs";
import TabsHeader from "@/components/TabsHeader";

import { OrderHistory } from "@/features/orders/components/OrderHistory";
import { MultiOrderForm } from "../../features/orders/features/multi-order-form/MultiOrderForm";

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
            <Sheet
              trigger={<Button>New Order</Button>}
              title="Create Order"
              description="Enter the details for your new Order."
            >
              {tabs?.map((tabValue) => (
                <TabsContent
                  className="flex flex-col gap-4 w-full"
                  key={tabValue}
                  value={tabValue}
                >
                  <MultiOrderForm defaultOrderType={tabValue} />
                  {/* <OrderForm defaultTab={tabValue} /> */}
                </TabsContent>
              ))}
            </Sheet>
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

export const Route = createFileRoute("/home/orders")({
  component: OrdersPage,
});
