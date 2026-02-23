import React from "react";
import { formatCurrency } from "@/constants/currencies";
import type { Currency } from "@/constants/currencies";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@thetis/ui/table";

const QuotePriceBands = ({
	priceBands,
	currency,
}: {
	priceBands: Record<string, number>;
	currency: Currency;
}) => {
	const fmt = (amount: number) => {
		const result = formatCurrency(amount, currency);
		return typeof result === "string" ? result : amount.toFixed(2);
	};

	const rows = Object.entries(priceBands)
		.filter(([, price]) => price > 0)
		.map(([qtyStr, price]) => ({
			qty: parseInt(qtyStr, 10) || 0,
			unitPriceFmt: fmt(price),
		}))
		.sort((a, b) => a.qty - b.qty);

	if (rows.length === 0) return null;

	return (
		<section className="mb-6">
			<h2 className="mb-3 font-semibold text-lg">Price Bands</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[120px]">Quantity</TableHead>
						<TableHead className="text-right">Unit Price</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.map(({ qty, unitPriceFmt }) => (
						<TableRow key={qty}>
							<TableCell className="font-medium">{qty} units</TableCell>
							<TableCell className="text-right tabular-nums">
								{unitPriceFmt}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
};

export default QuotePriceBands;
