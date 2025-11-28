import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { selectOrderFormValuesById } from "@/features/orders/features/order-history/api/selectOrderViewById";
import { MultiOrderFormData } from "@/features/orders/features/multi-order-form/schema";
import { useMemo } from "react";
import { OrderFormStepper, type Step } from "@/components/OrderFormStepper";
import { OrderFormNavigation } from "@/components/OrderFormNavigation";
import { PricingSummaryPage } from "@/features/orders/features/multi-order-form/pages/PricingSummaryPage";
import { useForm as useTanStackForm } from "@tanstack/react-form";
import { saveOrderPricing } from "@/features/orders/api/saveOrderPage";
import { toast } from "sonner";
import { pricingSummarySchema } from "@/features/orders/features/multi-order-form/pages/validationSchemas";
import { openDefaultDocument } from "@/features/orders/features/order-documents/utils/openDefaultDocument";
import { selectOrdersQueryKey } from "@/features/orders/features/order-history/api/selectOrders";
import { selectStockpilesQueryKey } from "@/features/stockpiles/api/selectStockpiles";

const STEPS: Step[] = [
  { number: 1, label: "Details", key: "details" },
  { number: 2, label: "Companies", key: "companies" },
  { number: 3, label: "Items", key: "items" },
  { number: 4, label: "Logistics", key: "logistics" },
];

export const Route = createFileRoute("/home/orders/$orderId/logistics")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const handleComplete = async () => {
    const values = form.state.values;

    // Validate
    const validationResult = pricingSummarySchema.safeParse(values);
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
      await saveOrderPricing(Number(orderId), {
        carriage: values.carriage,
        shipment_number: values.shipment_number,
        airwaybill: values.airwaybill,
        mode_of_transport: values.mode_of_transport,
        incoterms: values.incoterms,
        reason_for_export: values.reason_for_export,
        reference_number: values.reference_number,
      });
      toast.success("Order completed successfully");

      // Invalidate queries
      queryClient.invalidateQueries({
        queryKey: selectOrdersQueryKey as unknown as readonly unknown[],
      });
      queryClient.invalidateQueries({
        queryKey: selectStockpilesQueryKey as unknown as readonly unknown[],
      });

      // Open document and navigate
      if (orderId) {
        openDefaultDocument(Number(orderId), values.order_type);
      }
      navigate({ to: "/home/orders" });
    } catch (error) {
      console.error("Error completing order:", error);
      toast.error(
        `Failed to complete order: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  };

  const handlePrevious = () => {
    navigate({ to: `/home/orders/${orderId}/items` });
  };

  const handleStepClick = (stepNumber: number) => {
    const routes = ["details", "companies", "items", "logistics"];
    const route = routes[stepNumber - 1];
    if (stepNumber < 4) {
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
          currentStep={4}
          onStepClick={handleStepClick}
        />

        <div className="flex flex-col gap-y-4">
          <PricingSummaryPage form={form} />
          <OrderFormNavigation
            onPrevious={handlePrevious}
            onNext={handleComplete}
            nextLabel="Complete Order"
          />
        </div>
      </div>
    </div>
  );
}
