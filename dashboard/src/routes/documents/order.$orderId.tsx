import { createFileRoute } from '@tanstack/react-router'
import {
  selectOrderByIdQueryOptions,
} from '@/features/orders/api/selectOrderById'

const OrdersPage = () => {
  const { order } = Route.useLoaderData()
  return (
    <>
      <h1 className="mb-6 font-bold text-3xl">Order Invoice</h1>

      <div className="gap-8 grid grid-cols-2 mb-8">
        <div>
          <h2 className="mb-2 font-semibold text-xl">Buyer</h2>
          <p>Name: {order.buyer_name}</p>
          <p>Address: {order.buyer_address}</p>
          <p>Contact: {order.buyer_contact}</p>
        </div>
        <div>
          <h2 className="mb-2 font-semibold text-xl">Seller</h2>
          <p>Name: {order.seller_name}</p>
          <p>Address: {order.seller_address}</p>
          <p>Contact: {order.seller_contact}</p>
        </div>
      </div>

      <div className="mb-8">
        <p>
          <strong>Date:</strong>{' '}
          {new Date(order.order_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Order Number:</strong> #{order.id.toString().padStart(4, '0')}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-xl">Products</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="text-right p-2">Price</th>
              <th className="text-right p-2">Quantity</th>
              <th className="text-right p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.order_products.map((item: any) => (
              <tr key={`${order.id}-${item.product.name}`}>
                <td className="p-2">{item.product.name}</td>
                <td className="text-right p-2">
                  ${item.product.price.toFixed(2)}
                </td>
                <td className="text-right p-2">{item.quantity}</td>
                <td className="text-right p-2">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-xl">Parts Required</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="text-right p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.order_parts.map((item: any) => (
              <tr key={`${order.id}-${item.part.name}`}>
                <td className="p-2">{item.part.name}</td>
                <td className="text-right p-2">{-item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right">
        <p className="font-bold text-xl">
          Total Cost: ${Number(order.total_cost).toFixed(2)}
        </p>
      </div>
    </>
  )
}
export const Route = createFileRoute('/documents/order/$orderId')({
  component: OrdersPage,
  loader: async ({ context, params }) => {
    const order = await context.queryClient.ensureQueryData(
      selectOrderByIdQueryOptions(params.orderId),
    )
    return { order }
  },
})
