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
    if (!order?.order_form_values) return undefined;
    return {
      ...order.order_form_values,
      order_type: order.order_form_values.order_type || "sale",
    };
  }, [order?.order_form_values]);

  const form = useTanStackForm({
    defaultValues: defaultValues || {},
  });

  const handleNext = async () => {
    const values = form.state.values;

    // Debug: Log addresses being used
    console.log("📍 Addresses in form values:", {
      from_shipping_address_id: values.from_shipping_address_id,
      to_shipping_address_id: values.to_shipping_address_id,
      order_type: values.order_type,
    });

    // Validate
    const validationResult = itemsSchema.safeParse(values);
    if (!validationResult.success) {
      const errorMessages = validationResult.error?.errors
        .map((e) => e.message)
        .join(", ");
      toast.error(
        `Please fix validation errors: ${errorMessages || "Invalid data"}`,
      );
      return;
    }

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
    <div className="mx-auto">
      <h1 className="mb-6 font-bold text-2xl">Edit Order</h1>

      <div className="flex flex-col gap-y-6 w-full">
        <OrderFormStepper
          steps={STEPS}
          currentStep={3}
          onStepClick={handleStepClick}
        />

        <div className="flex flex-col gap-y-4">
          <ItemsPageSimple form={form} />
          <OrderFormNavigation
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
