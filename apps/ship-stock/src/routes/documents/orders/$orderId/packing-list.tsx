import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderViewById";
import Document from "../../../../features/orders/features/order-documents/documents/Document";
import {
  packingListSchema,
  type DocumentOptions,
} from "../../../../features/documents/schema";
import DocumentControls from "../../../../features/documents/components/DocumentControls";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();
  const search = Route.useSearch();

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
        orderNumber={order.order_id}
        documentType="packingList"
      />
      <Document order={order} options={documentOptions} title="Packing List" />
    </>
  );
};
export const Route = createFileRoute("/documents/orders/$orderId/packing-list")(
  {
    component: OrdersPage,
    validateSearch: packingListSchema,
    loader: async ({ context, params }) => {
      const order = await context.queryClient.ensureQueryData(
        selectOrderByIdQueryOptions(params.orderId),
      );
      return { order };
    },
  },
);
