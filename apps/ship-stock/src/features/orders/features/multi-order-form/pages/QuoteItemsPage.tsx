import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@thetis/ui/table";
import { PRICE_BAND_QUANTITIES } from "@/features/quotes/types";
import {
	currencyKeys,
	defaultCurrency,
	type Currency,
} from "@/constants/currencies";
import Select from "@/components/Select";
import NumberFlowCell from "@/features/orders/components/NumberFlowCell";

export function QuoteItemsPage() {
	const form = useFormContext();
	const currency = (useWatch({ control: form.control, name: "currency" }) ||
		defaultCurrency) as Currency;

	// Ensure quote_quantity and quote_price fields are numbers (coerce "" from persisted form values)
	useEffect(() => {
		for (const qty of PRICE_BAND_QUANTITIES) {
			const priceVal = form.getValues(`quote_price_${qty}`);
			if (priceVal === "" || priceVal === undefined || priceVal === null) {
				form.setValue(`quote_price_${qty}`, 0, { shouldDirty: false });
			}
			const qtyVal = form.getValues(`quote_quantity_${qty}`);
			if (qtyVal === "" || qtyVal === undefined || qtyVal === null) {
				form.setValue(`quote_quantity_${qty}`, qty, { shouldDirty: false });
			}
		}
	}, [form]);

	const currencyFormat = {
		style: "currency" as const,
		currency,
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="mb-2 font-semibold text-xl">Quote Price Bands</h2>
				<p className="text-muted-foreground text-sm">
					Set unit prices by quantity. Enter at least one price to continue.
				</p>
			</div>

			<div className="space-y-2 max-w-xs">
				<Select
					name="currency"
					label="Currency"
					options={currencyKeys.map((o) => ({ label: o, value: o }))}
				/>
			</div>

			<div className="border rounded-md overflow-x-auto">
				<Table className="table-fixed">
					<TableHeader>
						<TableRow>
							<TableHead className="w-1/2 text-center">Qty</TableHead>
							<TableHead className="w-1/2 text-center">Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{PRICE_BAND_QUANTITIES.map((qty) => (
							<TableRow key={qty}>
								<NumberFlowCell
									name={`quote_quantity_${qty}`}
									step={1}
									min={1}
									format={{ style: "decimal", maximumFractionDigits: 0 }}
									suffix=" units"
									editable
								/>
								<NumberFlowCell
									name={`quote_price_${qty}`}
									step={0.01}
									format={currencyFormat}
									editable
								/>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
