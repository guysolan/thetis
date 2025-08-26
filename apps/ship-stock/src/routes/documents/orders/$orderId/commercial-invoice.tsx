import { createFileRoute } from "@tanstack/react-router";
import { selectOrderViewByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderViewById";
import Document from "../../../../features/orders/features/order-documents/documents/Document";
import { commercialInvoiceSchema } from "../../../../features/documents/schema";
import DocumentControls from "../../../../features/documents/components/DocumentControls";
import { useDocumentOptions } from "../../../../features/documents/hooks/useDocumentOptions";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();
  const documentOptions = useDocumentOptions("commercialInvoice");

  return (
    <>
      <DocumentControls
        orderNumber={order.order_id}
        documentType="commercialInvoice"
      />
      <Document
        order={order}
        options={documentOptions}
        title="Commercial Invoice"
        documentType="commercialInvoice"
      />
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
      selectOrderViewByIdQueryOptions(params.orderId),
    );
    return { order };
  },
});
