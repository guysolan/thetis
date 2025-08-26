import { useForm, useWatch } from "react-hook-form";
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
import SellPreview from "./SellPreview";
import BuyPreview, { OrderItem, PackageItem } from "./BuyPreview";
import ShipmentPreview from "./ShipmentPreview";
import { useEffect, useRef } from "react";
import { usePublicUser } from "../../../auth/hooks/usePublicUser";
import { useUserCompany } from "../../../companies/hooks/useUserCompany";

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
  const { data: publicUser, isLoading: isLoadingUser } = usePublicUser();
  const { data: companyUser, isLoading: isLoadingCompany } = useUserCompany(
    publicUser?.id,
  );

  // Wait for user and company data to load before initializing form
  const isLoading = isLoadingUser || isLoadingCompany;
  const effectiveCompanyId = companyUser?.company_id?.toString() ?? "";

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultOrderFormValues ?? {
      order_date: new Date().toISOString().split("T")[0], // Use string format to avoid hydration issues
      unit_of_measurement: "metric",
      currency: defaultCurrency,
      order_type: defaultOrderType ?? "sale",
      order_items: [],
      consumed_items: [],
      produced_items: [],
      package_items: [],
      to_company_id: effectiveCompanyId,
      from_company_id: effectiveCompanyId,
      mode: "package",
      carriage: 0,
    },
  });

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 border-gray-900 border-b-2 rounded-full w-8 h-8 animate-spin" />
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  // Use useWatch to prevent infinite loops - consolidate multiple watches
  const watchedValues = useWatch({
    control: form.control,
    name: [
      "order_type",
      "mode",
      "order_items",
      "package_items",
      "consumed_items",
      "produced_items",
      "from_items",
      "to_items",
    ],
  });

  const [
    orderType,
    mode,
    orderItems,
    packageItems,
    consumedItems,
    producedItems,
    fromItems,
    toItems,
  ] = watchedValues || [];

  // Provide safe defaults for watched values
  const safeOrderType = orderType || defaultOrderType || "sale";
  const safeMode = mode || "package";
  const safeOrderItems = orderItems || [];
  const safePackageItems = packageItems || [];
  const safeConsumedItems = consumedItems || [];
  const safeProducedItems = producedItems || [];
  const safeFromItems = fromItems || [];
  const safeToItems = toItems || [];

  const previousOrderTypeRef = useRef<Schema["order_type"] | null>(null);

  // Update company IDs when company data loads
  useEffect(() => {
    if (effectiveCompanyId && !defaultOrderFormValues) {
      form.setValue("to_company_id", effectiveCompanyId);
      form.setValue("from_company_id", effectiveCompanyId);
    }
  }, [effectiveCompanyId, form, defaultOrderFormValues]);

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

  const { mutate: createOrder } = useCreateOrder(safeOrderType);

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
    switch (safeOrderType) {
      case "sale":
        return (
          <SellPreview
            orderItems={safeOrderItems as OrderItem[]}
            packageItems={safePackageItems as PackageItem[]}
            mode={safeMode}
          />
        );
      case "purchase":
        return (
          <BuyPreview
            orderItems={safeOrderItems as OrderItem[]}
            producedItems={safeProducedItems}
            consumedItems={safeConsumedItems}
            packageItems={safePackageItems as PackageItem[]}
            mode={safeMode}
          />
        );
      case "shipment":
        return (
          <ShipmentPreview
            fromItems={safeFromItems as OrderItem[]}
            toItems={safeToItems as OrderItem[]}
            packageItems={safePackageItems as PackageItem[]}
            mode={safeMode}
          />
        );
      default:
        return <div className="text-gray-600 text-sm">Order items</div>;
    }
  };

  // Get the appropriate form fields based on order type
  const getFormFields = () => {
    switch (safeOrderType) {
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
        <BuyerSeller isShipment={safeOrderType === "shipment"} />

        <EditCard
          title={`${
            safeOrderType?.charAt(0).toUpperCase() + safeOrderType?.slice(1)
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
              {safeOrderType !== "sale" && (
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
