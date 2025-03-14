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
type Schema = z.infer<typeof schema>;

interface MultiOrderFormProps {
  defaultOrderType: Schema["order_type"];
}

export function MultiOrderForm({ defaultOrderType }: MultiOrderFormProps) {
  const companyId = useMyCompanyId();
  const { data: companies = [] } = useSelectCompanies();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      company_id: companyId,
      order_date: dayjs().toDate(),
      order_type: defaultOrderType,
      currency: defaultCurrency,
      order_items: [],
      carriage: 0,
      item_type: "part",
      mode: "package",
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
      // processMultiOrderFormData(data);
      await createOrder(data);
    } catch (error) {
      console.error("Form submission failed:", error);
      scrollToTop();
    }
  };

  return (
    <Form {...form}>
      <form
        id="order-form"
        className="flex flex-col gap-y-4 px-1 w-full"
        onSubmit={form.handleSubmit(handleSubmit, () => scrollToTop())}
      >
        <Select
          label="Company"
          name="company_id"
          options={companies.map((company) => ({
            label: company.name,
            value: company.id.toString(),
          }))}
        />
        <div className="flex flex-row gap-x-4">
          <Select
            label="Order Type"
            name="order_type"
            options={["purchase", "sale", "shipment"].map((type) => ({
              label: type,
              value: type,
            }))}
          />
          {orderType === "purchase" ? (
            <Select
              label="Item Type"
              name="item_type"
              options={["product", "part"].map((type) => ({
                label: type,
                value: type,
              }))}
            />
          ) : (
            <Select
              label="Package Items?"
              description="If you need a commercial invoice, you must use package mode to describe the size and contents of the box being shipped."
              name="mode"
              options={[
                { label: "Package Mode", value: "package" },
                { label: "Direct Items", value: "direct" },
              ]}
            />
          )}
        </div>

        <OrderDetails />
        <BuyerSeller isShipment={orderType === "shipment"} />

        {orderType === "purchase" && <BuyFormFields />}
        {orderType === "sale" && <SellFormFields />}
        {orderType === "shipment" && <ShipmentFormFields />}
        <PriceSummary />

        <FormErrors />
        <Button type="submit">Submit</Button>
        {/* <MultiOrderFormButton /> */}
      </form>
    </Form>
  );
}
