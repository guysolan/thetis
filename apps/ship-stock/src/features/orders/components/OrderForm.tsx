import { Tabs, TabsContent, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import BuyForm from "../features/order-forms/features/buy-form/BuyForm";
import { Banknote, Info, ShoppingCart, Truck } from "lucide-react";
import ShipmentForm from "../features/order-forms/features/shipment-form/ShipmentForm";
import { Alert, AlertDescription, AlertTitle } from "@thetis/ui/alert";
import SellForm from "../features/order-forms/features/sell-form/components/SellForm";
import type { OrderTab } from "../../../routes/home/orders";
import SaleForm from "../features/order-forms/features/sale-form/SaleForm";
import { OrderSettings } from "../features/order-forms/features/order-settings/components/OrderSettings";

export const OrderForm: React.FC = ({
  defaultTab,
}: { defaultTab: OrderTab }) => {
  return (
    <Tabs
      className=""
      defaultValue={defaultTab === "all" ? "purchase" : defaultTab}
    >
      <div className="flex justify-between items-center w-full">
        <TabsList className="my-2">
          <TabsTrigger className="flex flex-row gap-2" value="purchase">
            <ShoppingCart size={16} />
            Buy
          </TabsTrigger>
          <TabsTrigger className="flex flex-row gap-2" value="sale">
            <Banknote size={16} />
            Sell
          </TabsTrigger>
          <TabsTrigger className="flex flex-row gap-2" value="shipment">
            <Truck size={16} />
            Ship
          </TabsTrigger>
        </TabsList>
        <OrderSettings />
      </div>
      <TabsContent value="purchase">
        <Alert className="mb-4" variant="info">
          <Info size={20} />
          <AlertTitle>Purchase Order</AlertTitle>
          <AlertDescription>
            Purchase forms are for buying stock from a supplier.
          </AlertDescription>
        </Alert>
        <BuyForm />
      </TabsContent>
      <TabsContent value="sale">
        <Alert className="mb-4" variant="info">
          <Info size={20} />

          <AlertTitle>Sale Order</AlertTitle>
          <AlertDescription>
            Sale forms are for selling stock to a customer.
          </AlertDescription>
        </Alert>
        {/* TODO - Use SellForm not Sales form to include packages */}
        <SellForm />
        {/* <SaleForm /> */}
      </TabsContent>

      <TabsContent value="shipment">
        <Alert className="mb-4" variant="info">
          <Info size={20} />

          <AlertTitle>Shipment Order</AlertTitle>
          <AlertDescription>
            Shipment forms are for moving packages of stock between addresses
            where you keep stock.
          </AlertDescription>
        </Alert>
        <ShipmentForm />
      </TabsContent>
    </Tabs>
  );
};
