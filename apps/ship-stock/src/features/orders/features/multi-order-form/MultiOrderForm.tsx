import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Form } from "@thetis/ui/form";

import FormErrors from "../../../../components/FormErrors";
import { useCreateOrder } from "../../api/createOrder";

import { multiOrderFormSchema as schema } from "./schema";
import BuyerSeller from "../../../companies/components/BuyerSeller";
import OrderDetails from "../../components/OrderDetails";
import Select from "../../../../components/Select";
import SellFormFields from "./SellFormFields";
import { defaultCurrency } from "../../../../constants/currencies";
import BuyFormFields from "./BuyFormFields";
import PriceSummary from "../../components/PriceSummary";
import ShipmentFormFields from "./ShipmentFormFields";
import { Button } from "@thetis/ui/button";
import useMyCompanyId from "../../../companies/hooks/useMyCompanyId";
import OrderCarriage from "../../components/OrderCarriage";
import EditCard from "../../../../components/EditCard";
import SellPreview from "./SellPreview";
import BuyPreview from "./BuyPreview";
import ShipmentPreview from "./ShipmentPreview";
import { useEffect, useRef, useState } from "react";

type Schema = z.infer<typeof schema>;

interface MultiOrderFormProps {
  orderId?: string;
  defaultOrderType: Schema["order_type"];
  defaultOrderFormValues?: Partial<Schema>;
}

export function MultiOrderForm({
  orderId,
  defaultOrderType,
  defaultOrderFormValues,
}: MultiOrderFormProps) {
  const companyId = useMyCompanyId();
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="mx-auto mb-4 border-b-2 border-blue-600 rounded-full w-8 h-8 animate-spin">
          </div>
          <p className="text-gray-600">Loading order form...</p>
        </div>
      </div>
    );
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultOrderFormValues ?? {
      order_date: new Date(),
      unit_of_measurement: "metric",
      currency: defaultCurrency,
      order_type: defaultOrderType ?? "sale",
      order_items: [],
      consumed_items: [],
      produced_items: [],
      package_items: [],
      to_company_id: companyId,
      from_company_id: companyId,
      mode: "package",
      carriage: 0,
      delivery_dates: [
        new Date(),
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ],
    },
  });

  // Use useWatch to prevent infinite loops
  const orderType = useWatch({
    control: form.control,
    name: "order_type",
    defaultValue: defaultOrderType || "sale",
  });

  const previousOrderTypeRef = useRef<Schema["order_type"] | null>(null);

  useEffect(() => {
    // Only clear arrays if orderType actually changed and is different from the previous value
    const previousOrderType = previousOrderTypeRef.current;
    if (orderType !== previousOrderType) {
      form.setValue("from_items", []);
      form.setValue("to_items", []);
      form.setValue("order_items", []);
      form.setValue("package_items", []);
      form.setValue("consumed_items", []);
      form.setValue("produced_items", []);
      previousOrderTypeRef.current = orderType;
    }
  }, [orderType, form]);

  const mode = useWatch({
    control: form.control,
    name: "mode",
    defaultValue: "package",
  });
  const orderItems = useWatch({ control: form.control, name: "order_items" }) ||
    [];
  const packageItems =
    useWatch({ control: form.control, name: "package_items" }) || [];
  const consumedItems =
    useWatch({ control: form.control, name: "consumed_items" }) || [];
  const producedItems =
    useWatch({ control: form.control, name: "produced_items" }) || [];
  const fromItems = useWatch({ control: form.control, name: "from_items" }) ||
    [];
  const toItems = useWatch({ control: form.control, name: "to_items" }) || [];

  const { mutate: createOrder } = useCreateOrder(orderType);

  // Guard against null form control in production
  if (!form?.control) {
    return <div>Loading form...</div>;
  }

  const scrollToTop = () => {
    document.getElementById("order-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (data: Schema) => {
    console.log("🚀 MultiOrderForm - handleSubmit - RAW data:", data);
    console.log(data);
    console.log("Data OVer");
    console.log(
      "🚀 MultiOrderForm - handleSubmit - order_items:",
      JSON.stringify(data.order_items, null, 2),
    );
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

  // Get the appropriate preview component based on order type
  const getPreviewContent = () => {
    const safeMode = mode || "direct";

    switch (orderType) {
      case "sale":
        return (
          <SellPreview
            orderItems={orderItems}
            packageItems={packageItems}
            mode={safeMode}
          />
        );
      case "purchase":
        return (
          <BuyPreview
            orderItems={orderItems}
            producedItems={producedItems}
            consumedItems={consumedItems}
            packageItems={packageItems}
            mode={safeMode}
          />
        );
      case "shipment":
        return (
          <ShipmentPreview
            fromItems={fromItems}
            toItems={toItems}
            packageItems={packageItems}
            mode={safeMode}
          />
        );
      default:
        return <div className="text-gray-600 text-sm">Order items</div>;
    }
  };

  // Get the appropriate form fields based on order type
  const getFormFields = () => {
    switch (orderType) {
      case "purchase":
        return <BuyFormFields />;
      case "sale":
        return <SellFormFields />;
      case "shipment":
        return <ShipmentFormFields />;
      default:
        return null;
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

        <EditCard
          title={`${
            orderType?.charAt(0).toUpperCase() + orderType?.slice(1)
          } Order`}
          previewContent={getPreviewContent()}
        >
          <div className="space-y-4">
            <div className="flex flex-row gap-x-4">
              <Select
                label="Order Type"
                name="order_type"
                options={["purchase", "sale", "shipment"].map((type) => ({
                  label: type,
                  value: type,
                }))}
              />
              {orderType !== "sale" && (
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

            {getFormFields()}
          </div>
        </EditCard>
        <OrderCarriage />

        <PriceSummary />

        <FormErrors />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
