import { createFileRoute } from "@tanstack/react-router";
import { selectOrderViewByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderViewById";
import Document from "../../../../features/orders/features/order-documents/documents/Document";
import { packingListSchema } from "../../../../features/documents/schema";
import DocumentControls from "../../../../features/documents/components/DocumentControls";
import { useDocumentOptions } from "../../../../features/documents/hooks/useDocumentOptions";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();
  const documentOptions = useDocumentOptions("packingList");

  return (
    <>
      <DocumentControls
        orderNumber={order.order_id}
        documentType="packingList"
      />
      <Document
        order={order}
        options={documentOptions}
        title="Packing List"
        documentType="packingList"
      />
    </>
  );
};
export const Route = createFileRoute("/documents/orders/$orderId/packing-list")(
  {
    component: OrdersPage,
    validateSearch: packingListSchema,
    loader: async ({ context, params }) => {
      const order = await context.queryClient.ensureQueryData(
        selectOrderViewByIdQueryOptions(params.orderId),
      );
      return { order };
    },
  },
);
