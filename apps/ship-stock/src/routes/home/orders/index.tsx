import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@thetis/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@thetis/ui/tabs";
import TabsHeader from "@/components/TabsHeader";
import PageHeader from "@/components/PageHeader";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { OrderHistory } from "@/features/orders/components/OrderHistory";
import { useSelectOrders } from "@/features/orders/features/order-history/api/selectOrders";
import { features } from "@/features/navigation/content";

const tabConfig = features.orders.tabs;

type OrderTab = (typeof tabConfig)[number]["value"];

export type { OrderTab };

export const Route = createFileRoute("/home/orders/")({
  component: OrdersPage,
  validateSearch: (search: Record<string, unknown>): { tab: OrderTab } => ({
    tab: (tabConfig.some((t) => t.value === search.tab)
      ? search.tab
      : "all") as OrderTab,
  }),
});

function OrdersPage() {
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: orders } = useSelectOrders();

  const handleTabChange = (value: string | null) => {
    if (value) {
      navigate({ search: { tab: value as OrderTab }, replace: true });
    }
  };

  const tabsList = tabConfig.map(({ value, label, icon: Icon }) => (
    <TabsTrigger key={value} value={value}>
      <Icon size={16} className="shrink-0" />
      <span>{label}</span>
    </TabsTrigger>
  ));

  return (
    <>
      <PageHeader title="Orders">
        <Link to="/home/orders/$orderId" params={{ orderId: "new" }}>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span className="hidden sm:inline">New Order</span>
          </Button>
        </Link>
      </PageHeader>

      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsHeader tabsList={tabsList} />

        {tabConfig.map(({ value }) => (
          <TabsContent
            className="flex flex-col gap-4 w-full"
            key={value}
            value={value}
          >
            <OrderHistory
              orders={orders?.filter((order) =>
                value === "all" ? true : order.order_type === value
              )}
            />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
