import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { selectOrderFormValuesById } from "@/features/orders/features/order-history/api/selectOrderViewById";
import { MultiOrderFormData } from "@/features/orders/features/multi-order-form/schema";
import { useMemo } from "react";
import { OrderFormStepper, type Step } from "@/components/OrderFormStepper";
import { OrderFormNavigation } from "@/components/OrderFormNavigation";
import { ItemsPageSimple } from "@/features/orders/features/multi-order-form/pages/ItemsPageSimple";
import { useForm as useTanStackForm } from "@tanstack/react-form";
import { saveOrderItems } from "@/features/orders/api/saveOrderPage";
import { toast } from "sonner";
import { itemsSchema } from "@/features/orders/features/multi-order-form/pages/validationSchemas";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ValidationSummary } from "@/components/ValidationSummary";

const STEPS: Step[] = [
  { number: 1, label: "Details", key: "details" },
  { number: 2, label: "Companies", key: "companies" },
  { number: 3, label: "Items", key: "items" },
  { number: 4, label: "Logistics", key: "logistics" },
];

export const Route = createFileRoute("/home/orders/$orderId/items")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  const navigate = useNavigate();

  const { data: order } = useSuspenseQuery({
    queryKey: ["select-order", orderId],
    queryFn: () => selectOrderFormValuesById(orderId),
  });

  const defaultValues = useMemo(() => {
    if (!order?.order_form_values) {
      return {
        package_items: [],
        order_items: [],
        consumed_items: [],
        produced_items: [],
        from_items: [],
        to_items: [],
        mode: "direct",
      };
    }
    return {
      ...order.order_form_values,
      order_type: order.order_form_values.order_type || "sell",
      package_items: order.order_form_values.package_items || [],
      order_items: order.order_form_values.order_items || [],
      consumed_items: order.order_form_values.consumed_items || [],
      produced_items: order.order_form_values.produced_items || [],
      from_items: order.order_form_values.from_items || [],
      to_items: order.order_form_values.to_items || [],
      mode: order.order_form_values.mode || "direct",
    };
  }, [order?.order_form_values]);

  const form = useTanStackForm({
    defaultValues: defaultValues || {},
    validatorAdapter: zodValidator(),
    validators: {
      onChange: itemsSchema,
    },
    onSubmit: async ({ value: values }) => {
      // Debug: Log addresses being used
      console.log("📍 Addresses in form values:", {
        from_shipping_address_id: values.from_shipping_address_id,
        to_shipping_address_id: values.to_shipping_address_id,
        order_type: values.order_type,
      });

      try {
        await saveOrderItems(Number(orderId), values);
        toast.success("Items saved");
        navigate({ to: `/home/orders/${orderId}/logistics` });
      } catch (error) {
        console.error("Error saving items:", error);
        toast.error(
          `Failed to save: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        );
      }
    },
  });

  const handleNext = async () => {
    form.handleSubmit();
  };

  const handlePrevious = () => {
    navigate({ to: `/home/orders/${orderId}/companies` });
  };

  const handleStepClick = (stepNumber: number) => {
    const routes = ["details", "companies", "items", "logistics"];
    const route = routes[stepNumber - 1];
    if (stepNumber < 3) {
      // Only allow going back
      navigate({ to: `/home/orders/${orderId}/${route}` });
    }
  };

  return (
    <div className="space-y-6">
      <OrderFormStepper
        steps={STEPS}
        currentStep={3}
        onStepClick={handleStepClick}
      />
      <ValidationSummary form={form} />
      <ItemsPageSimple form={form} />
      <OrderFormNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
