import Input from "../../../../../components/Input";
import Select from "../../../../../components/Select";
import { SelectWithInfo } from "../../../../../components/SelectWithInfo";
import { FieldGroup } from "@thetis/ui/field";

const modeOfTransportOptions = [
	{ label: "Sea", value: "sea" },
	{ label: "Air", value: "air" },
	{ label: "Road", value: "road" },
	{ label: "Rail", value: "rail" },
];

const reasonsForExport = [
	{
		name: "Against Sale",
		description:
			"Goods are being exported as part of a sales transaction with a buyer in another country.",
	},
	{
		name: "Return/Exchange",
		description:
			"Goods are sent back to the supplier for an exchange or credit.",
	},
	{
		name: "Repair/Service",
		description:
			"Items are exported for repair or servicing with plans for return after the work is completed.",
	},
	{
		name: "Temporary Export",
		description:
			"Goods are temporarily exported for purposes such as demonstration, exhibition, or trial.",
	},
	{
		name: "Gift",
		description:
			"Items are sent as a gift without a commercial transaction involved.",
	},
	{
		name: "Sample",
		description:
			"Goods are sent as samples for demonstration purposes to encourage future sales.",
	},
	{
		name: "Replacement",
		description:
			"Products are sent to replace items that were previously damaged or defective.",
	},
	{
		name: "Donation",
		description:
			"Items are being exported as a charitable contribution without a commercial transaction.",
	},
	{
		name: "Transfer of Ownership",
		description:
			"Goods are moved between branches or subsidiaries of the same company as an internal transfer.",
	},
];

const incotermsOptions = [
	{
		name: "Ex Works (EXW)",
		description:
			"The seller makes the goods available at their premises. Buyer is responsible for all transportation costs and risks.",
	},
	{
		name: "Free Carrier (FCA)",
		description:
			"Seller delivers goods to carrier nominated by buyer. Risk transfers when goods are delivered to carrier.",
	},
	{
		name: "Carriage Paid To (CPT)",
		description:
			"Seller pays for carriage to destination. Risk transfers when goods are handed to first carrier.",
	},
	{
		name: "Carriage and Insurance Paid To (CIP)",
		description:
			"Like CPT, but seller also provides insurance against loss/damage during transport.",
	},
	{
		name: "Delivered at Terminal (DAT)",
		description:
			"Seller delivers and unloads goods at specified terminal. Risk transfers after unloading.",
	},
	{
		name: "Delivered at Place (DAP)",
		description:
			"Seller delivers goods to specified destination. Buyer handles import duties and unloading.",
	},
	{
		name: "Free Alongside Ship (FAS)",
		description:
			"Seller delivers goods alongside ship at port. Buyer assumes risk and costs thereafter.",
	},
	{
		name: "Free On Board (FOB)",
		description:
			"Seller loads goods onto ship. Risk transfers when goods pass ship's rail.",
	},
	{
		name: "Cost and Freight (CFR)",
		description:
			"Seller pays transport costs to destination port. Risk transfers upon loading onto ship.",
	},
	{
		name: "Cost, Insurance and Freight (CIF)",
		description:
			"Like CFR plus seller provides insurance during transport.",
	},
	{
		name: "Delivered Duty Paid (DDP)",
		description:
			"Seller is responsible for delivering goods to named destination, paying all costs including duties, taxes, and import clearance. Risk transfers at delivery.",
	},
];

export function PricingSummaryPage() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="mb-2 font-semibold text-xl">
					Pricing & Summary
				</h2>
				<p className="text-gray-600 text-sm">
					Review pricing and add shipping details
				</p>
			</div>

			<FieldGroup>
				<div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
					<Input
						type="number"
						name="carriage"
						label="Carriage"
						step="0.01"
					/>
					<Input
						type="text"
						name="shipment_number"
						label="Shipment Number"
					/>
					<Input
						type="text"
						name="airwaybill"
						label="Air Waybill"
					/>
					<Select
						name="mode_of_transport"
						label="Mode of Transport"
						options={modeOfTransportOptions}
					/>
					<SelectWithInfo
						name="incoterms"
						label="Incoterms"
						options={incotermsOptions}
					/>
					<SelectWithInfo
						name="reason_for_export"
						label="Reason for Export"
						options={reasonsForExport}
					/>
					<Input
						type="text"
						name="reference_number"
						label="Reference Number"
					/>
				</div>
			</FieldGroup>
		</div>
	);
}
