import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderViewById";
import Document from "../../../../features/orders/features/order-documents/documents/Document";
import {
  purchaseOrderOptionsSchema,
  type DocumentOptions,
} from "../../../../features/documents/schema";
import DocumentControls from "../../../../features/documents/components/DocumentControls";

const OrdersPage = () => {
  const search = Route.useSearch();
  const { order } = Route.useLoaderData();

  // Extract only the base DocumentOptions from the extended search params
  const documentOptions: DocumentOptions = {
    shippingDetails: search.shippingDetails,
    from: search.from,
    to: search.to,
    payment: search.payment,
    carriage: search.carriage,
    total: search.total,
    showSignature: search.showSignature,
    showPackages: search.showPackages,
    showShippingItems: search.showShippingItems,
  };

  return (
    <>
      <DocumentControls
        documentType="purchaseOrder"
        orderNumber={order.order_id}
      />
      <Document
        order={order}
        options={documentOptions}
        title="Purchase Order"
      />
    </>
  );
};
export const Route = createFileRoute(
  "/documents/orders/$orderId/purchase-order",
)({
  component: OrdersPage,
  validateSearch: purchaseOrderOptionsSchema,
  loader: async ({ context, params }) => {
    const order = await context.queryClient.ensureQueryData(
      selectOrderByIdQueryOptions(params.orderId),
    );
    return { order };
  },
});
