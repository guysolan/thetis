import { createFileRoute } from "@tanstack/react-router";
import { selectOrderViewByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderViewById";
import StocktakeReport from "../../../../features/orders/features/order-documents/documents/StocktakeReport";

const OrdersPage = () => {
  const { order } = Route.useLoaderData();

  return <StocktakeReport order={order} />;
};
export const Route = createFileRoute(
  "/documents/orders/$orderId/stocktake-report",
)({
  component: OrdersPage,
  loader: async ({ context, params }) => {
    const order = await context.queryClient.ensureQueryData(
      selectOrderViewByIdQueryOptions(params.orderId),
    );
    return { order };
  },
});
