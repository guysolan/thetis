import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderById";
import Invoice from "../../../../features/orders/features/order-documents/documents/Invoice";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();

  return <Invoice order={order} />;
};
export const Route = createFileRoute(
  "/documents/orders/$orderId/invoice",
)({
  component: OrdersPage,
  loader: async ({ context, params }) => {
    const order = await context.queryClient.ensureQueryData(
      selectOrderByIdQueryOptions(params.orderId),
    );
    return { order };
  },
});
