import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderById";
import PackingList from "../../../../features/orders/features/order-documents/documents/PackingList";
import { packingListSchema } from "../../../../features/documents/schema";
import DocumentControls from "../../../../features/documents/components/DocumentControls";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();
  const search = Route.useSearch();
  return (
    <>
      <DocumentControls
        orderNumber={order.order_id}
        documentType="packingList"
      />
      <PackingList order={order} options={search} />
    </>
  );
};
export const Route = createFileRoute(
  "/documents/orders/$orderId/packing-list",
)({
  component: OrdersPage,
  validateSearch: packingListSchema,
  loader: async ({ context, params }) => {
    const order = await context.queryClient.ensureQueryData(
      selectOrderByIdQueryOptions(params.orderId),
    );
    return { order };
  },
});
