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
type Schema = z.infer<typeof schema>;

interface MultiOrderFormProps {
  defaultOrderType: Schema["order_type"];
  order?: OrderView;
}

export function MultiOrderForm({
  defaultOrderType,
  order,
}: MultiOrderFormProps) {
  const companyId = useMyCompanyId();
  const { data: companies = [] } = useSelectCompanies();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      company_id: order?.company_id ?? companyId,
      order_date: order?.order_date
        ? dayjs(order?.order_date).toDate()
        : dayjs().toDate(),
      order_type: order?.order_type ?? defaultOrderType,
      currency: order?.currency ?? defaultCurrency,
      carriage: order?.carriage ?? 0,
      item_type: "part",

      mode: order?.items?.filter((i) => i.item_type === "package")?.length
        ? "package"
        : "direct",

      to_company_id: String(order?.to_company.id),
      to_shipping_address_id: String(order?.to_shipping_address.id),
      to_billing_address_id: String(order?.to_billing_address.id),
      from_company_id: String(order?.from_company.id),
      from_shipping_address_id: String(order?.from_shipping_address.id),
      from_billing_address_id: String(order?.from_billing_address.id),
      // Additional
      reason_for_export: order?.reason_for_export,
      shipment_number: order?.shipment_number,
      airwaybill: order?.airwaybill,
      mode_of_transport: order?.mode_of_transport,
      incoterms: order?.incoterms,
      unit_of_measurement: order?.unit_of_measurement,

      // Items
      order_items:
        order?.items
          .filter((i) => i.price > 0)
          ?.map((i) => ({ ...i, item_id: String(i.id) })) ?? [],
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

        <AdditionalFormFields />

        <FormErrors />
        <Button type="submit">Submit</Button>
        {/* <MultiOrderFormButton /> */}
      </form>
    </Form>
  );
}
