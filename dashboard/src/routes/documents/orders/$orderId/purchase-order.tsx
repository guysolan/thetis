import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderById";
import PurchaseOrder from "../../../../features/orders/features/order-documents/documents/PurchaseOrder";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();

  return <PurchaseOrder order={order} />;
};
export const Route = createFileRoute(
  "/documents/orders/$orderId/purchase-order",
)({
  component: OrdersPage,
  loader: async ({ context, params }) => {
    const order = await context.queryClient.ensureQueryData(
      selectOrderByIdQueryOptions(params.orderId),
    );
    return { order };
  },
});
