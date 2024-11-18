import { createFileRoute } from "@tanstack/react-router";
import { selectOrderByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderById";
import { CompanyRow } from "../../../../features/companies/types";
import { AddressRow } from "../../../../features/stockpiles/types";
import ShippingLabel from "../../../../features/orders/features/order-documents/documents/ShippingLabel";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();

  return (
    <ShippingLabel
      deliveryCompany={order.to_company as CompanyRow}
      deliveryAddress={order.to_shipping_address as AddressRow}
      returnAddress={order.from_shipping_address as AddressRow}
      returnCompany={order.from_company as CompanyRow}
    />
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
