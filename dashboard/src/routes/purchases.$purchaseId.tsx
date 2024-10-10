import { createFileRoute } from "@tanstack/react-router";
import {
	selectPurchaseByIdQueryOptions,
	useSelectPurchaseById,
} from "../features/purchases/api/selectPurchaseById";

const PurchasesPage = () => {
	const { purchase } = Route.useLoaderData();
	return (
		<div className="bg-white shadow-lg mx-auto p-8 max-w-4xl">
			<h1 className="mb-6 font-bold text-3xl">Purchase Invoice</h1>

			<div className="gap-8 grid grid-cols-2 mb-8">
				<div>
					<h2 className="mb-2 font-semibold text-xl">Buyer</h2>
					<p>Name: {purchase.buyer_name}</p>
					<p>Address: {purchase.buyer_address}</p>
					<p>Contact: {purchase.buyer_contact}</p>
				</div>
				<div>
					<h2 className="mb-2 font-semibold text-xl">Seller</h2>
					<p>Name: {purchase.seller_name}</p>
					<p>Address: {purchase.seller_address}</p>
					<p>Contact: {purchase.seller_contact}</p>
				</div>
			</div>

			<div className="mb-8">
				<p>
					<strong>Date:</strong>{" "}
					{new Date(purchase.purchase_date).toLocaleDateString()}
				</p>
				<p>
					<strong>Order Number:</strong> #
					{purchase.id.toString().padStart(4, "0")}
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
						{purchase.purchase_products.map((item) => (
							<tr key={`${purchase.id}-${item.product.name}`}>
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
				<h2 className="mb-4 font-semibold text-xl">Parts</h2>
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
						{purchase.purchase_parts.map((item) => (
							<tr key={`${purchase.id}-${item.part.name}`}>
								<td className="p-2">{item.part.name}</td>
								<td className="text-right p-2">
									${item.part.price.toFixed(2)}
								</td>
								<td className="text-right p-2">{item.quantity}</td>
								<td className="text-right p-2">
									${(item.part.price * item.quantity).toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="text-right">
				<p className="font-bold text-xl">
					Total Cost: $
					{purchase.purchase_products.reduce(
						(total, item) => total + item.product.price * item.quantity,
						0,
					) +
						purchase.purchase_parts.reduce(
							(total, item) => total + item.part.price * item.quantity,
							0,
						)}
				</p>
			</div>
		</div>
	);
};
export const Route = createFileRoute("/purchases/$purchaseId")({
	component: PurchasesPage,
	loader: async ({ context, params }) => {
		const purchase = await context.queryClient.ensureQueryData(
			selectPurchaseByIdQueryOptions(params.purchaseId),
		);
		return { purchase };
	},
});
