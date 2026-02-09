import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { selectOrderFormValuesById } from "@/features/orders/features/order-history/api/selectOrderViewById";
import { MultiOrderFormData } from "@/features/orders/features/multi-order-form/schema";
import { useEffect, useMemo } from "react";
import { OrderFormStepper, type Step } from "@/components/OrderFormStepper";
import { OrderFormNavigation } from "@/components/OrderFormNavigation";
import { OrderDetailsPage } from "@/features/orders/features/multi-order-form/pages/OrderDetailsPage";
import { useForm as useTanStackForm } from "@tanstack/react-form";
import { saveOrderDetails } from "@/features/orders/api/saveOrderPage";
import { toast } from "sonner";
import { orderDetailsSchema } from "@/features/orders/features/multi-order-form/pages/validationSchemas";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ValidationSummary } from "@/components/ValidationSummary";

const STEPS: Step[] = [
  { number: 1, label: "Details", key: "details" },
  { number: 2, label: "Companies", key: "companies" },
  { number: 3, label: "Items", key: "items" },
  { number: 4, label: "Logistics", key: "logistics" },
];

const getDefaultNewOrder = (): MultiOrderFormData => ({
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

  const form = useTanStackForm({
    defaultValues,
    validatorAdapter: zodValidator(),
    validators: {
      onChange: orderDetailsSchema,
    },
    onSubmit: async ({ value: values }) => {
      try {
        const savedOrderId = await saveOrderDetails({
          order_type: values.order_type,
          order_date: values.order_date,
          currency: values.currency,
          delivery_dates: values.delivery_dates,
          unit_of_measurement: values.unit_of_measurement,
          orderId: isNewOrder ? undefined : Number(orderId),
        });
        toast.success("Order details saved");
        navigate({ to: `/home/orders/${savedOrderId}/companies` });
      } catch (error) {
        console.error("Error saving order details:", error);
        toast.error(
          `Failed to save: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        );
      }
    },
  });

  // Update form when order data changes
  useEffect(() => {
    if (defaultValues && order?.order_form_values) {
      // Set all values including nested ones
      Object.entries(defaultValues).forEach(([key, value]) => {
        form.setFieldValue(key as any, value as never, { dontValidate: true });
      });
    }
  }, [order?.order_form_values, form]);

  const handleNext = async () => {
    form.handleSubmit();
  };

  return (
    <div className="space-y-6">
      <OrderFormStepper
        steps={STEPS}
        currentStep={1}
        onStepClick={undefined}
      />
      <ValidationSummary form={form} />
      <OrderDetailsPage form={form} />
      <OrderFormNavigation onNext={handleNext} />
    </div>
  );
}
