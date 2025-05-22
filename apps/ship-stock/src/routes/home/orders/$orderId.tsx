import { createFileRoute } from "@tanstack/react-router";
import { MultiOrderForm } from "@/features/orders/features/multi-order-form/MultiOrderForm";
import { useQuery } from "@tanstack/react-query";
import {
  selectOrderById,
  useSelectOrderById,
} from "../../../features/orders/features/order-history/api/selectOrderViewById";
export const Route = createFileRoute("/home/orders/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  const isNewOrder = orderId === "new";
  const { data: order } = useQuery({
    queryKey: ["select-order", orderId],
    queryFn: () => {
      if (isNewOrder) {
        return undefined;
      }
      return selectOrderById(orderId);
    },
  });
  return (
    <div className="mx-auto">
      <h1 className="mb-6 font-bold text-2xl">
        {isNewOrder ? "Create New Order" : "Edit Order"}
      </h1>
      <MultiOrderForm
        defaultOrderType="sale"
        order={isNewOrder ? undefined : order}
      />
    </div>
  );
}
