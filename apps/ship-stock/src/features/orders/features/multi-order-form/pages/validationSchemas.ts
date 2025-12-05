import { z } from "zod";
import { currencyKeys } from "../../../../../constants/currencies";

// Page 1: Order Details validation
export const orderDetailsSchema = z.object({
	order_type: z.enum(["sale", "shipment", "purchase", "stocktake"]),
	order_date: z.union([z.string(), z.date()]),
	currency: z.enum(currencyKeys as [string, ...string[]]),
	unit_of_measurement: z.enum(["metric", "imperial"]),
	delivery_dates: z
		.tuple([
			z.union([z.string(), z.date()]).nullable(),
			z.union([z.string(), z.date()]).nullable(),
		])
		.refine(
			(dates) => {
				// Both dates must be present and non-null
				if (!dates || !Array.isArray(dates) || dates.length !== 2) {
					return false;
				}
				const [start, end] = dates;
				// Both must be non-null and valid
				const hasStart = start !== null && start !== undefined;
				const hasEnd = end !== null && end !== undefined;
				return hasStart && hasEnd;
			},
			{
				message:
					"Please select both start and end dates for the delivery date range",
				path: ["delivery_dates"], // Explicitly set the error path
			},
		),
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

// Page 3: Items validation (minimal - just check order_type exists)
export const itemsSchema = z.object({
	order_type: z.enum(["sale", "shipment", "purchase", "stocktake"]),
	mode: z.enum(["package", "direct"]).optional(),
});

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
