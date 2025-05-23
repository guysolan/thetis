import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Form } from "@thetis/ui/form";
import dayjs from "dayjs";

import FormErrors from "../../../../components/FormErrors";
import { useCreateOrder } from "../../api/createOrder";

import { multiOrderFormSchema as schema } from "./schema";
import BuyerSeller from "../../../companies/components/BuyerSeller";
import OrderDetails from "../order-forms/components/OrderDetails";
import Select from "../../../../components/Select";
import SellFormFields from "./SellFormFields";
import MultiOrderFormButton from "./MultiOrderFormButton";
import { defaultCurrency } from "../../../../constants/currencies";
import BuyFormFields from "./BuyFormFields";
import PriceSummary from "../order-forms/components/PriceSummary";
import ShipmentFormFields from "./ShipmentFormFields";
import { Button } from "@thetis/ui/button";
import { useSelectCompanies } from "../../../companies/api/selectCompanies";
import useMyCompanyId from "../../../companies/hooks/useMyCompanyId";
import AdditionalFormFields from "../../components/AdditionalOrderFormFields";
import type { OrderView } from "../../types";
import OrderCarriage from "../order-forms/components/OrderCarriage";
import EditCard from "../../../../components/EditCard";
import { Card, CardContent, CardHeader } from "@thetis/ui/card";
import PackageStockItems from "../order-forms/components/PackageStockItems";

type Schema = z.infer<typeof schema>;

interface MultiOrderFormProps {
  orderId?: string;
  defaultOrderType: Schema["order_type"];
  defaultOrderFormValues?: JSON;
}

export function MultiOrderForm({
  orderId,
  defaultOrderType,
  defaultOrderFormValues,
}: MultiOrderFormProps) {
  console.log(defaultOrderFormValues);

  const companyId = useMyCompanyId();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultOrderFormValues ?? {
      order_date: new Date(),
      unit_of_measurement: "metric",
      currency: defaultCurrency,
      order_type: defaultOrderType ?? "sale",
      order_items: [],
      package_items: [],
      to_company_id: companyId,
      from_company_id: companyId,
      mode: "package",
      carriage: 0,
    },
  });

  const orderType = form.watch("order_type");

  const { mutate: createOrder } = useCreateOrder(orderType);

  const scrollToTop = () => {
    document.getElementById("order-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (data: Schema) => {
    try {
      await createOrder({
        ...data,
        id: orderId ? Number.parseInt(orderId) : undefined,
      });
    } catch (error) {
      console.error("Form submission failed:", error);
      scrollToTop();
    }
  };

  return (
    <Form {...form}>
      <form
        id="order-form"
        className="flex flex-col gap-y-4 px-1 w-full overflow-x-scroll"
        onSubmit={form.handleSubmit(handleSubmit, () => scrollToTop())}
      >
        <OrderDetails />
        <BuyerSeller isShipment={orderType === "shipment"} />
        <Card>
          <CardHeader>Order Items</CardHeader>
          <CardContent>
            <div className="flex flex-row gap-x-4">
              <Select
                label="Order Type"
                name="order_type"
                options={["purchase", "sale", "shipment"].map((type) => ({
                  label: type,
                  value: type,
                }))}
              />
              {orderType === "purchase" && (
                <Select
                  label="Item Type"
                  name="item_type"
                  options={["product", "part"].map((type) => ({
                    label: type,
                    value: type,
                  }))}
                />
              )}
              <Select
                label="Package Items?"
                name="mode"
                options={[
                  { label: "Package Mode", value: "package" },
                  { label: "Direct Items", value: "direct" },
                ]}
              />
            </div>

            {orderType === "purchase" && <BuyFormFields />}
            {orderType === "sale" && <SellFormFields />}
            {orderType === "shipment" && <ShipmentFormFields />}
          </CardContent>
        </Card>
        <OrderCarriage />

        <PriceSummary />

        <FormErrors />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
