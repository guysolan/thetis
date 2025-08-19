import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@thetis/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@thetis/ui/tabs";
import TabsHeader from "@/components/TabsHeader";
import { Link } from "@tanstack/react-router";
import { Grid3X3, Package, Plus, Send, ShoppingCart } from "lucide-react";

import { OrderHistory } from "@/features/orders/components/OrderHistory";
import { useSelectOrders } from "@/features/orders/features/order-history/api/selectOrders";
import { v4 as uuidv4 } from "uuid";

export type OrderTab = "sale" | "purchase" | "shipment" | "all";
const tabs: OrderTab[] = ["all", "purchase", "sale", "shipment"];

// Helper function to get tab icon
const getTabIcon = (tab: OrderTab) => {
  switch (tab) {
    case "all":
      return Grid3X3;
    case "purchase":
      return Package;
    case "sale":
      return ShoppingCart;
    case "shipment":
      return Send;
    default:
      return Grid3X3;
  }
};

// Helper function to get tab label
const getTabLabel = (tab: OrderTab) => {
  return tab.charAt(0).toUpperCase() + tab.slice(1);
};

const OrdersPage = () => {
  const { data: orders } = useSelectOrders();

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsHeader
          tabsList={tabs.map((tab) => {
            const TabIcon = getTabIcon(tab);
            return (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex items-center gap-2 px-4"
              >
                <TabIcon size={16} />
                <span className="hidden sm:inline">{getTabLabel(tab)}</span>
              </TabsTrigger>
            );
          })}
          actionButtons={
            <Link to="/home/orders/$orderId" params={{ orderId: "new" }}>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span className="hidden sm:inline">New Order</span>
              </Button>
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
                tabValue === "all" ? true : order.order_type === tabValue
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
