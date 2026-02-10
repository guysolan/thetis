import { DatePickerField } from "../../../../../components/tanstack-form/DatePickerField";
import { DateRangePickerField } from "../../../../../components/tanstack-form/DateRangePickerField";
import { SelectField } from "../../../../../components/tanstack-form/SelectField";
import { currencyKeys } from "../../../../../constants/currencies";
import { FieldGroup } from "@thetis/ui/field";

const unitOfMeasurementOptions = [
	{ label: "Metric", value: "metric" },
	{ label: "Imperial", value: "imperial" },
];

const orderTypeOptions = [
	{ label: "Sell", value: "sell" },
	{ label: "Buy", value: "buy" },
	{ label: "Build", value: "build" },
	{ label: "Ship", value: "ship" },
	{ label: "Count", value: "count" },
];

type OrderDetailsPageProps = {
	form: any;
};

export function OrderDetailsPage({ form }: OrderDetailsPageProps) {
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
					<SelectField
						name="order_type"
						label="Order Type"
						form={form}
						options={orderTypeOptions}
					/>
					<DatePickerField
						name="order_date"
						label="Order Date"
						form={form}
					/>
					<SelectField
						name="currency"
						label="Currency"
						form={form}
						options={currencyKeys.map((o) => ({
							label: o,
							value: o,
						}))}
					/>
					<SelectField
						name="unit_of_measurement"
						label="Unit of Measurement"
						form={form}
						options={unitOfMeasurementOptions}
					/>
					<div className="lg:col-span-2">
						<DateRangePickerField
							name="delivery_dates"
							label="Delivery Date Range"
							form={form}
						/>
					</div>
				</div>
			</FieldGroup>
		</div>
	);
}
