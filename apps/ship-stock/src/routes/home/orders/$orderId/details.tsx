import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { selectOrderFormValuesById } from "@/features/orders/features/order-history/api/selectOrderViewById";
import { MultiOrderFormData } from "@/features/orders/features/multi-order-form/schema";
import { useEffect, useMemo } from "react";
import { OrderFormStepper, type Step } from "@/components/OrderFormStepper";
import { OrderFormNavigation } from "@/components/OrderFormNavigation";
import { OrderDetailsPage } from "@/features/orders/features/multi-order-form/pages/OrderDetailsPage";
import { FormProvider, useForm } from "react-hook-form";
import { saveOrderDetails } from "@/features/orders/api/saveOrderPage";
import { PRICE_BAND_QUANTITIES } from "@/features/quotes/types";
import { toast } from "sonner";
import { orderDetailsSchema } from "@/features/orders/features/multi-order-form/pages/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

const STEPS: Step[] = [
  { number: 1, label: "Details", key: "details" },
  { number: 2, label: "Companies", key: "companies" },
  { number: 3, label: "Items", key: "items" },
  { number: 4, label: "Logistics", key: "logistics" },
];

const STOCKTAKE_STEPS: Step[] = [
  { number: 1, label: "Details", key: "details" },
  { number: 2, label: "Items", key: "items" },
];

const getDefaultNewOrder = ():
  & MultiOrderFormData
  & Record<string, unknown> => ({
    order_type: "sell",
    order_date: new Date().toISOString(),
    from_company_id: "",
    from_billing_address_id: "",
    from_shipping_address_id: "",
    to_company_id: "",
    to_billing_address_id: "",
    to_shipping_address_id: "",
    company_id: "",
    unit_of_measurement: "metric",
    currency: "GBP",
    carriage: 0,
    delivery_dates: [null, null],
    package_items: [],
    order_items: [],
    consumed_items: [],
    produced_items: [],
    from_items: [],
    to_items: [],
    reason_for_export: null,
    shipment_number: null,
    airwaybill: null,
    mode_of_transport: null,
    incoterms: null,
    mode: "direct",
    item_type: "product",
    ...Object.fromEntries(
      PRICE_BAND_QUANTITIES.flatMap((q) => [
        [`quote_quantity_${q}`, q],
        [`quote_price_${q}`, 0],
      ]),
    ),
  });

export const Route = createFileRoute("/home/orders/$orderId/details")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  const navigate = useNavigate();
  const isNewOrder = orderId === "new";

  const defaultNewOrder = useMemo(() => getDefaultNewOrder(), []);

  const { data: order } = useSuspenseQuery({
    queryKey: ["select-order", orderId],
    queryFn: () => {
      if (isNewOrder) {
        return { order_form_values: defaultNewOrder };
      }
      return selectOrderFormValuesById(orderId);
    },
  });

  const defaultValues = useMemo(() => {
    if (!order?.order_form_values) return getDefaultNewOrder();

    const formValues = {
      ...order.order_form_values,
      order_type: order.order_form_values.order_type || "sell",
      // Ensure quote_quantity_* exist for quote orders
      ...(order.order_form_values.order_type === "quote"
        ? Object.fromEntries(
            PRICE_BAND_QUANTITIES.map((q) => [
              `quote_quantity_${q}`,
              order.order_form_values?.[`quote_quantity_${q}`] ?? q,
            ]),
          )
        : {}),
    };

    // Parse delivery_dates if it's a JSON string
    if (formValues.delivery_dates) {
      if (typeof formValues.delivery_dates === "string") {
        try {
          formValues.delivery_dates = JSON.parse(formValues.delivery_dates);
        } catch (e) {
          console.error("Failed to parse delivery_dates:", e);
          formValues.delivery_dates = [null, null];
        }
      }

      // Ensure it's an array
      if (!Array.isArray(formValues.delivery_dates)) {
        formValues.delivery_dates = [null, null];
      }
    }

    return formValues;
  }, [order?.order_form_values]);

  const form = useForm({
    defaultValues,
    resolver: zodResolver(orderDetailsSchema),
    mode: "onChange",
  });

  // Update form when order data changes
  useEffect(() => {
    if (defaultValues && order?.order_form_values) {
      form.reset(defaultValues);
    }
  }, [order?.order_form_values]);

  const orderType = form.watch("order_type");
  const isStocktake = orderType === "count";

  const onSubmit = async (values: any) => {
    try {
      let quoteData:
        | { price_bands: Record<string, number>; currency: string }
        | undefined;
      if (values.order_type === "quote") {
        const priceBands: Record<string, number> = {};
        for (const qty of PRICE_BAND_QUANTITIES) {
          const val = values[`quote_price_${qty}`];
          const num = typeof val === "string" ? parseFloat(val) : Number(val);
          if (!Number.isNaN(num) && num > 0) {
            const qtyVal = values[`quote_quantity_${qty}`];
            const quantity = typeof qtyVal === "string"
              ? parseInt(qtyVal, 10)
              : Number(qtyVal);
            const key = !Number.isNaN(quantity) && quantity > 0
              ? String(quantity)
              : String(qty);
            priceBands[key] = num;
          }
        }
        quoteData = {
          price_bands: priceBands,
          currency: values.currency || "GBP",
        };
      }

      const savedOrderId = await saveOrderDetails({
        order_type: values.order_type,
        order_date: values.order_date,
        currency: values.currency,
        delivery_dates: values.delivery_dates,
        unit_of_measurement: values.unit_of_measurement,
        orderId: isNewOrder ? undefined : Number(orderId),
        // For stocktakes, include the address
        from_shipping_address_id: values.order_type === "count"
          ? values.from_shipping_address_id
          : undefined,
        quote: quoteData,
        order_form_values: values,
      });
      toast.success("Order details saved");
      // Stocktakes skip companies and go directly to items
      if (values.order_type === "count") {
        navigate({ to: `/home/orders/${savedOrderId}/items` });
      } else {
        navigate({ to: `/home/orders/${savedOrderId}/companies` });
      }
    } catch (error) {
      console.error("Error saving order details:", error);
      toast.error(
        `Failed to save: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const steps = isStocktake ? STOCKTAKE_STEPS : STEPS;

  return (
    <FormProvider {...form}>
      <div className="space-y-6">
        <OrderFormStepper
          steps={steps}
          currentStep={1}
          onStepClick={undefined}
        />
        <OrderDetailsPage />
        <OrderFormNavigation onNext={handleNext} />
      </div>
    </FormProvider>
  );
}
