import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { selectOrderFormValuesById } from "@/features/orders/features/order-history/api/selectOrderViewById";
import { useMemo } from "react";
import { OrderFormStepper, type Step } from "@/components/OrderFormStepper";
import { OrderFormNavigation } from "@/components/OrderFormNavigation";
import { ItemsPageSimple } from "@/features/orders/features/multi-order-form/pages/ItemsPageSimple";
import { FormProvider, useForm } from "react-hook-form";
import { saveOrderItems } from "@/features/orders/api/saveOrderPage";
import { toast } from "sonner";
import { itemsSchema } from "@/features/orders/features/multi-order-form/pages/validationSchemas";
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

  // Store original quantity changes for stocktakes (to calculate "before" values correctly)
  const originalQuantityChanges = useMemo(() => {
    if (!order?.order_form_values) return {};
    const changes: Record<string, number> = {};
    const items = order.order_form_values.order_items || [];
    items.forEach((item: any, index: number) => {
      if (item?.item_id && item?.quantity_change !== undefined) {
        // Key by item_id and index to handle duplicate items
        changes[`${item.item_id}-${index}`] = item.quantity_change;
      }
    });
    return changes;
  }, [order?.order_form_values]);

  const form = useForm({
    defaultValues,
    resolver: zodResolver(itemsSchema),
    mode: "onChange",
  });

  const orderType = form.watch("order_type");
  const isStocktake = orderType === "count";

  const onSubmit = async (values: any) => {
    try {
      await saveOrderItems(Number(orderId), values);
      toast.success("Items saved");
      // Stocktakes don't have a logistics page, go back to orders list
      if (isStocktake) {
        navigate({ to: "/home/orders", search: { tab: "all" } });
      } else {
        navigate({ to: `/home/orders/${orderId}/logistics` });
      }
    } catch (error) {
      console.error("Error saving items:", error);
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

  const handlePrevious = () => {
    // Stocktakes go back to details, others go to companies
    if (isStocktake) {
      navigate({ to: `/home/orders/${orderId}/details` });
    } else {
      navigate({ to: `/home/orders/${orderId}/companies` });
    }
  };

  const handleStepClick = (stepNumber: number) => {
    if (isStocktake) {
      const routes = ["details", "items"];
      const route = routes[stepNumber - 1];
      if (stepNumber < 2) {
        navigate({ to: `/home/orders/${orderId}/${route}` });
      }
    } else {
      const routes = ["details", "companies", "items", "logistics"];
      const route = routes[stepNumber - 1];
      if (stepNumber < 3) {
        navigate({ to: `/home/orders/${orderId}/${route}` });
      }
    }
  };

  return (
    <FormProvider {...form}>
      <div className="space-y-6">
        <OrderFormStepper
          steps={isStocktake ? STOCKTAKE_STEPS : STEPS}
          currentStep={isStocktake ? 2 : 3}
          onStepClick={handleStepClick}
        />
        <ItemsPageSimple originalQuantityChanges={originalQuantityChanges} />
        <OrderFormNavigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          nextLabel={isStocktake ? "Save Stocktake" : "Save & Continue"}
        />
      </div>
    </FormProvider>
  );
}
