import DatePicker from "../../../../../components/DatePicker";
import DateRangePicker from "../../../../../components/DateRangePicker";
import Select from "../../../../../components/Select";
import { currencyKeys } from "../../../../../constants/currencies";
import { FieldGroup } from "@thetis/ui/field";
import { useFormContext, useWatch } from "react-hook-form";
import AddressSelect from "../../../../stockpiles/components/AddressSelect";

const unitOfMeasurementOptions = [
	{ label: "Metric", value: "metric" },
	{ label: "Imperial", value: "imperial" },
];

const orderTypeOptions = [
	{ label: "Sell", value: "sell" },
	{ label: "Buy", value: "buy" },
	{ label: "Build", value: "build" },
	{ label: "Ship", value: "ship" },
	{ label: "Count (Stocktake)", value: "count" },
];

export function OrderDetailsPage() {
	const form = useFormContext();
	const orderType = useWatch({ control: form.control, name: "order_type" });
	const isStocktake = orderType === "count";

	if (isStocktake) {
		return (
			<div className="space-y-6">
				<div>
					<h2 className="mb-2 font-semibold text-xl">Stocktake Details</h2>
					<p className="text-muted-foreground text-sm">
						Record a stock count at a specific location
					</p>
				</div>

				<FieldGroup>
					<div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
						<Select
							name="order_type"
							label="Order Type"
							options={orderTypeOptions}
						/>
						<DatePicker
							name="order_date"
							label="Count Date"
						/>
						<div className="lg:col-span-2">
							<AddressSelect 
								name="from_shipping_address_id" 
								label="Location"
							/>
						</div>
					</div>
				</FieldGroup>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h2 className="mb-2 font-semibold text-xl">Order Details</h2>
				<p className="text-muted-foreground text-sm">
					Enter the basic information for this order
				</p>
			</div>

			<FieldGroup>
				<div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
					<Select
						name="order_type"
						label="Order Type"
						options={orderTypeOptions}
					/>
					<DatePicker
						name="order_date"
						label="Order Date"
					/>
					<Select
						name="currency"
						label="Currency"
						options={currencyKeys.map((o) => ({
							label: o,
							value: o,
						}))}
					/>
					<Select
						name="unit_of_measurement"
						label="Unit of Measurement"
						options={unitOfMeasurementOptions}
					/>
					<div className="lg:col-span-2">
						<DateRangePicker
							name="delivery_dates"
							label="Delivery Date Range"
						/>
					</div>
				</div>
			</FieldGroup>
		</div>
	);
}
