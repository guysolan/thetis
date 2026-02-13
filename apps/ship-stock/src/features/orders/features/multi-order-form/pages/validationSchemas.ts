import { z } from "zod";
import { currencyKeys } from "../../../../../constants/currencies";

// Page 1: Order Details validation
export const orderDetailsSchema = z.object({
	order_type: z.enum(["sell", "buy", "build", "ship", "count"]),
	order_date: z.union([z.string(), z.date()]),
	currency: z.enum(currencyKeys as [string, ...string[]]).optional(),
	unit_of_measurement: z.enum(["metric", "imperial"]).optional(),
	delivery_dates: z
		.tuple([
			z.union([z.string(), z.date()]).nullable(),
			z.union([z.string(), z.date()]).nullable(),
		])
		.optional()
		.nullable(),
	// For stocktakes
	from_shipping_address_id: z.string().optional(),
}).superRefine((data, ctx) => {
	// For non-stocktake orders, require delivery dates
	if (data.order_type !== "count") {
		if (!data.delivery_dates || !Array.isArray(data.delivery_dates) || data.delivery_dates.length !== 2) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Please select both start and end dates for the delivery date range",
				path: ["delivery_dates"],
			});
			return;
		}
		const [start, end] = data.delivery_dates;
		const hasStart = start !== null && start !== undefined;
		const hasEnd = end !== null && end !== undefined;
		if (!hasStart || !hasEnd) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Please select both start and end dates for the delivery date range",
				path: ["delivery_dates"],
			});
		}
	}
	
	// For stocktakes, require address
	if (data.order_type === "count" && !data.from_shipping_address_id) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Please select a location for the stocktake",
			path: ["from_shipping_address_id"],
		});
	}
});

// Page 2: Companies & Addresses validation
export const companiesAddressesSchema = z.object({
	from_company_id: z.string().min(1, "From company is required"),
	to_company_id: z.string().min(1, "To company is required"),
	from_billing_address_id: z.string().min(
		1,
		"From billing address is required",
	),
	from_shipping_address_id: z
		.string()
		.min(1, "From shipping address is required"),
	to_billing_address_id: z.string().min(1, "To billing address is required"),
	to_shipping_address_id: z.string().min(
		1,
		"To shipping address is required",
	),
	company_id: z.string().min(1, "Company is required"),
	from_contact_id: z.string().optional(),
	to_contact_id: z.string().optional(),
});

// Page 3: Items validation (minimal - just check order_type exists).
// .passthrough() keeps package_items, to_items, from_items, addresses, etc. in the
// validated output so saveOrderItems receives full form state.
export const itemsSchema = z
	.object({
		order_type: z.enum(["sell", "buy", "build", "ship", "count"]),
		mode: z.enum(["package", "direct"]).optional(),
	})
	.passthrough();

// Page 4: Pricing & Summary validation (all optional)
export const pricingSummarySchema = z.object({
	carriage: z.coerce.number().min(0).default(0),
	shipment_number: z.string().optional().nullable(),
	airwaybill: z.string().optional().nullable(),
	mode_of_transport: z.string().optional().nullable(),
	incoterms: z.string().optional().nullable(),
	reason_for_export: z.string().optional().nullable(),
	reference_number: z.string().optional().nullable(),
});
