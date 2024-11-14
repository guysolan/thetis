import { createFileRoute } from "@tanstack/react-router";
import {
  selectOrderByIdQueryOptions,
} from "@/features/orders/order-history/api/selectOrderById";
import BuildForm from "../../features/orders/order-forms/components/BuildForm";
import BuildOrderDocument from "../../features/orders/order-documents/BuildOrderDocument";
import SaleDocument from '../../features/orders/order-documents/SaleDocument';
import CommercialInvoice from '../../features/orders/order-documents/CommercialInvoice';

const OrdersPage = () => {
  const { order } = Route.useLoaderData();

  switch (order.order_type) {
    case ("build"):
      return <BuildOrderDocument order={order} />;
    case ("sale"):
      return <SaleDocument order={order} />
        case ("shipment"):
      return <CommercialInvoice order={order}/>
  }
  return (
    <>
      <h1 className="mb-6 font-bold text-3xl">Order Invoice</h1>

      <div className="gap-8 grid grid-cols-2 mb-8">
        <div>
          <h2 className="mb-2 font-semibold text-xl">From</h2>
          <p>{order.from_address.name}</p>
          <p>{order.from_address.line_1}</p>
          <p>{order.from_address.line_2}</p>
          <p>{order.from_address.city}</p>
          <p>{order.from_address.code}</p>
          <p>{order.from_address.country}</p>
        </div>
        <div>
          <h2 className="mb-2 font-semibold text-xl">To</h2>
          <p>{order.to_address.name}</p>
          <p>{order.to_address.line_1}</p>
          <p>{order.to_address.line_2}</p>
          <p>{order.to_address.city}</p>
          <p>{order.to_address.code}</p>
          <p>{order.to_address.country}</p>
        </div>
      </div>

      <div className="mb-8">
        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.order_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Order Number:</strong>{" "}
          #{order.order_id.toString().padStart(4, "0")}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-xl">Products</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-zinc-100">
              <th className="p-2 text-left">Name</th>
              <th className="text-right p-2">Price</th>
              <th className="text-right p-2">Tax</th>
              <th className="text-right p-2">Quantity</th>
              <th className="text-right p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item: any) => (
              <tr key={`${order.id}-${item.item_name}`}>
                <td className="p-2">{item.item_name}</td>
                <td className="text-right p-2">
                  ${item.price?.toFixed(2)}
                </td>
                <td className="text-right p-2">{(item.tax) * 100}%</td>
                <td className="text-right p-2">{Math.abs(item.quantity)}</td>
                <td className="text-right p-2">
                  ${item.total?.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right">
        <p className="font-bold text-xl">
          Total Cost: ${Number(order.total_value).toFixed(2)}
        </p>
      </div>
    </>
  );
};
export const Route = createFileRoute("/documents/orders/$orderId")({
  component: OrdersPage,
  loader: async ({ context, params }) => {
    const order = await context.queryClient.ensureQueryData(
      selectOrderByIdQueryOptions(params.orderId),
    );
    return { order };
  },
});
