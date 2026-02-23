import { createFileRoute } from "@tanstack/react-router";
import { selectOrderViewByIdQueryOptions } from "../../../../features/orders/features/order-history/api/selectOrderViewById";
import Document from "../../../../features/orders/features/order-documents/documents/Document";
import DocumentControls from "../../../../features/documents/components/DocumentControls";
import { documentOptionsSchema } from "../../../../features/documents/schema";

const defaultQuoteOptions = documentOptionsSchema.parse({
	shippingDetails: {},
	from: {},
	to: {},
});

const QuotePage = () => {
	const { order } = Route.useLoaderData();

	return (
		<>
			<DocumentControls
				documentType="quote"
				orderNumber={String(order.order_id)}
				currency={order.quote?.currency ?? order.currency}
			/>
			<Document
				order={order}
				options={defaultQuoteOptions}
				title="Quote"
				documentType="quote"
			/>
		</>
	);
};

export const Route = createFileRoute("/documents/orders/$orderId/quote")({
	component: QuotePage,
	loader: async ({ context, params }) => {
		const order = await context.queryClient.ensureQueryData(
			selectOrderViewByIdQueryOptions(params.orderId),
		);
		return { order };
	},
});
