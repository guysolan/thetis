import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderViewById";
import { CompanyRow } from "../../../../features/companies/types";
import { AddressRow } from "../../../../features/stockpiles/types";
import ShippingLabel from "../../../../features/orders/features/order-documents/documents/ShippingLabel";
import DocumentControls from "../../../../features/documents/components/DocumentControls";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();

  return (
    <>
      <DocumentControls
        orderNumber={order.order_id}
        documentType="shippingLabel"
      />
      <ShippingLabel
        deliveryCompany={order.to_company as CompanyRow}
        deliveryAddress={order.to_shipping_address as AddressRow}
        returnAddress={order.from_shipping_address as AddressRow}
        returnCompany={order.from_company as CompanyRow}
        returnContactName={order.from_contact?.name}
        deliveryContactName={order.to_contact?.name}
      />
    </>
  );
};
export const Route = createFileRoute(
  "/documents/orders/$orderId/shipping-label",
)({
  component: OrdersPage,
  loader: async ({ context, params }) => {
    const order = await context.queryClient.ensureQueryData(
      selectOrderByIdQueryOptions(params.orderId),
    );
    return { order };
  },
});
