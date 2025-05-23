import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderViewById";
import CommercialInvoice from "../../../../features/orders/features/order-documents/documents/CommercialInvoice";
import { commercialInvoiceSchema } from "../../../../features/documents/schema";
import DocumentControls from "../../../../features/documents/components/DocumentControls";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();
  const search = Route.useSearch();
  return (
    <>
      <DocumentControls
        orderNumber={order.order_id}
        documentType="commercialInvoice"
      />
      <CommercialInvoice order={order} options={search} />
    </>
  );
};
export const Route = createFileRoute(
  "/documents/orders/$orderId/commercial-invoice",
)({
  component: OrdersPage,
  validateSearch: commercialInvoiceSchema,
  loader: async ({ context, params }) => {
    const order = await context.queryClient.ensureQueryData(
      selectOrderByIdQueryOptions(params.orderId),
    );
    return { order };
  },
});
