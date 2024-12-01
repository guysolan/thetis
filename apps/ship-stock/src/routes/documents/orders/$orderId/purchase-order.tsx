import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderById";
import PurchaseOrder from "../../../../features/orders/features/order-documents/documents/PurchaseOrder";
import { purchaseOrderOptionsSchema } from "../../../../features/documents/schema";
import DocumentOptionsPopover from "../../../../features/documents/components/DocumentOptionsPopover";
import DocumentControls from "../../../../features/documents/components/DocumentControls";

const OrdersPage = () => {
  const search = Route.useSearch();
  const { order } = Route.useLoaderData();

  return (
    <>
      <DocumentControls documentType="purchaseOrder" />
      <PurchaseOrder order={order} options={search} />
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
