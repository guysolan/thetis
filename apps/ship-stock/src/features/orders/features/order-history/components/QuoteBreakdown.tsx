import type { OrderView } from "../../../types";
import { formatCurrency } from "@/constants/currencies";

interface QuoteBreakdownProps {
	order: OrderView;
}

const QuoteBreakdown = ({ order }: QuoteBreakdownProps) => {
	const quoteData = order.quote;
	const currency = (quoteData?.currency ?? order.currency ?? "GBP") as "GBP";

	const fmt = (amount: number) => {
		const result = formatCurrency(amount, currency);
		return typeof result === "string" ? result : amount.toFixed(2);
	};

	if (!quoteData?.price_bands) return null;

	const rows = Object.entries(quoteData.price_bands)
		.filter(([, price]) => price > 0)
		.map(([qtyStr, unitPrice]) => {
			const qty = parseInt(qtyStr, 10) || 0;
			const total = unitPrice * qty;
			return { qty, unitPriceFmt: fmt(unitPrice), totalFmt: fmt(total) };
		})
		.sort((a, b) => a.qty - b.qty);

	if (rows.length === 0) return null;

	return (
		<section className="space-y-2">
			<h3 className="font-semibold text-sm">Price Bands</h3>
			<div className="space-y-1.5 text-sm">
				{rows.map(({ qty, unitPriceFmt, totalFmt }) => (
					<div
						key={qty}
						className="flex justify-between tabular-nums"
					>
						<span>{qty} units @ {unitPriceFmt}</span>
						<span className="font-medium">{totalFmt}</span>
					</div>
				))}
			</div>
		</section>
	);
};

export default QuoteBreakdown;
