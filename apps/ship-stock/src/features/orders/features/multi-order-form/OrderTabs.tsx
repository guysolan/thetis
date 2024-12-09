import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@thetis/ui/tabs";
import { OrderSettings } from "../order-forms/features/order-settings/components/OrderSettings";

const OrderTabs = ({ children }: { children: React.ReactNode }) => {
  const { watch, setValue } = useFormContext();
  const orderType = watch("order_type");

  const handleTabChange = (value: string) => {
    setValue("order_type", value);
  };

  return (
    <Tabs
      defaultValue={orderType}
      className="flex flex-col gap-4"
      value={orderType}
      onValueChange={handleTabChange}
    >
      <div className="flex flex-row justify-between">
        <TabsList>
          <TabsTrigger value="sale">Sell</TabsTrigger>
          <TabsTrigger value="purchase">Buy</TabsTrigger>
          <TabsTrigger value="shipment">Ship</TabsTrigger>
        </TabsList>
        <OrderSettings />
      </div>
      {children}
    </Tabs>
  );
};

export default OrderTabs;
