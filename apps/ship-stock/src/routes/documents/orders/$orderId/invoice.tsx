import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderViewById";
import Document from "../../../../features/orders/features/order-documents/documents/Document";
import { invoiceOptionsSchema } from "../../../../features/documents/schema";
import DocumentControls from "../../../../features/documents/components/DocumentControls";
import { useDocumentOptions } from "../../../../features/documents/hooks/useDocumentOptions";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();
  const documentOptions = useDocumentOptions("invoice");

  return (
    <>
      <DocumentControls documentType="invoice" orderNumber={order.order_id} />
      <Document
        order={order}
        options={documentOptions}
        title="Invoice"
        documentType="invoice"
      />
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
