import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderById";
import CommercialInvoice from "../../../../features/orders/features/order-documents/documents/CommercialInvoice";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();

  return <CommercialInvoice order={order} />;
};
export const Route = createFileRoute(
  "/documents/orders/$orderId/commercial-invoice",
)({
  component: OrdersPage,
  loader: async ({ context, params }) => {
    const order = await context.queryClient.ensureQueryData(
      selectOrderByIdQueryOptions(params.orderId),
    );
    return { order };
  },
});
