import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderById";
import Invoice from "../../../../features/orders/features/order-documents/documents/Invoice";
import { invoiceOptionsSchema } from "../../../../features/documents/schema";
import DocumentControls from "../../../../features/documents/components/DocumentControls";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();
  const search = Route.useSearch();
  return (
    <>
      <DocumentControls documentType="invoice" orderNumber={order.order_id} />
      <Invoice order={order} options={search} />
    </>
  );
};
export const Route = createFileRoute("/documents/orders/$orderId/invoice")({
  component: OrdersPage,
  validateSearch: invoiceOptionsSchema,
  loader: async ({ context, params }) => {
    const order = await context.queryClient.ensureQueryData(
      selectOrderByIdQueryOptions(params.orderId),
    );
    return { order };
  },
});
