import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import Sheet from "@/components/Sheet";
import { useSelectOrders } from "@/features/orders/features/order-history/api/selectOrders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { OrderForm } from "@/features/orders/components/OrderForm";
import { OrderHistory } from "@/features/orders/components/OrderHistory";

export type OrderTab = "sale" | "purchase" | "shipment" | "all"
const tabs: OrderTab[] = ['all', 'purchase', 'sale', 'shipment']

const OrdersPage = () => {
  const { data: orders } = useSelectOrders();

  return (
    <>
      {/* <PageTitle title="Orders">
        <Sheet
          trigger={<Button>Create New Order</Button>}
          title="Create Order"
          description="Enter the details for your new Order."
        >
          <OrderForm />
        </Sheet>
      </PageTitle> */}

      <Tabs defaultValue="all" className="w-full">
        <div className='flex justify-between items-center'>
          <TabsList className="my-2">
            {tabs.map((tab) => (<TabsTrigger className="capitalize" key={tab} value={tab}>{tab}</TabsTrigger>))}
          </TabsList>

          <Sheet
            trigger={<Button>Create New Order</Button>}
            title="Create Order"
            description="Enter the details for your new Order."
          >
            {tabs?.map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue}>

                <OrderForm defaultTab={tabValue} />
              </TabsContent>

            ))}

          </Sheet>
        </div>
        {tabs?.map((tabValue) => (
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

export const Route = createFileRoute("/_apps/stock/orders")({
  component: OrdersPage,
});
