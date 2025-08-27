import { toast } from "sonner";
import { supabase } from "../../../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectOrdersQueryKey } from "../features/order-history/api/selectOrders";
import { selectStockpilesQueryKey } from "../../stockpiles/api/selectStockpiles";
import { openDefaultDocument } from "../features/order-documents/utils/openDefaultDocument";
import { OrderRow as AppOrderType } from "../types";
import {
	baseItemSchema,
	MultiOrderFormData,
	PricedOrderItem,
} from "../features/multi-order-form/schema";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Currency, currencyKeys } from "../../../constants/currencies";
import { ItemType } from "../features/order-forms/types";
import { z } from "zod";

export type FormatOrderItemChanges = {
	item_id: string;
	quantity_change: number;
	item_price: number;
	item_tax: number;
	item_type: ItemType;
	address_id: string;
	package_item_id?: string;
	package_item_change_id: number | null;
	lot_number?: string;
};

export type CreateOrderType = {
	order_id: string | null;
	order_type: string;
	order_date: string;
	order_items: FormatOrderItemChanges[];
	from_company_id: string | null;
	to_company_id: string | null;
	from_billing_address_id: string | null;
	from_shipping_address_id: string | null;
	to_billing_address_id: string | null;
	to_shipping_address_id: string | null;
	to_contact_id: string | null;
	from_contact_id: string | null;
	currency: Currency;
	carriage: number;
	reason_for_export: string | null;
	shipment_number: string | null;
	airwaybill: string | null;
	mode_of_transport: string | null;
	incoterms: string | null;
	unit_of_measurement: string | null;
	company_id?: string | null;
	delivery_dates: [string | null, string | null] | null;
};

// Define a more compatible base for OrderItemWithTotal items from MultiOrderFormData
const formOrderItemSchema = baseItemSchema.extend({
	item_price: z.number().optional(),
	item_tax: z.number().optional(),
	item_total: z.number().optional(),
	package_item_id: z.string().optional(),
	item_type: z.enum(["product", "part", "service", "package"]),
	address_id: z.string().optional(),
});
type FormOrderItem = z.infer<typeof formOrderItemSchema>;

type OrderItemWithTotal = FormOrderItem & {
	components?: {
		unit_price: number;
		component_quantity: number;
		lot_number?: string;
	}[];
	item_total: number; // Ensure item_total is always a number
};

// Type for the different item types we might receive
type AnyOrderItem =
	| (PricedOrderItem & { item_type: ItemType })
	| {
		item_type: "package";
		package_id: string;
		package_items?: PricedOrderItem[];
		package_item_change_id: number | null;
		quantity_change?: number;
		item_price?: number;
		item_tax?: number;
		item_total?: number;
		lot_number?: string;
	}
	| {
		item_type: "product" | "part" | "service" | "stocktake";
		item_id: string;
		quantity_change: number;
		lot_number?: string;
		package_item_change_id: number | null;
		quantity_before?: number;
		quantity_after?: number;
		item_price?: number;
		item_tax?: number;
		item_total?: number;
		package_item_id?: string;
	};

// Only map items with a valid item_type
const isValidOrderItem = (item: { item_type?: string }) =>
	item.item_type === "product" ||
	item.item_type === "part" ||
	item.item_type === "service" ||
	item.item_type === "package" ||
	item.item_type === "stocktake";

export function extractOrderItems(
	orderItems: OrderItemWithTotal[] | undefined,
	mode: "package" | "direct" | undefined,
	order_type?: "sale" | "purchase" | "shipment" | "stocktake",
): OrderItemWithTotal[] {
	console.log("🔍 extractOrderItems - Input:", {
		orderItemsLength: orderItems?.length ?? 0,
		mode,
		order_type,
		orderItems: JSON.stringify(orderItems, null, 2),
	});

	if (!orderItems) {
		console.log(
			"❌ extractOrderItems - No order items provided, returning empty array",
		);
		return [];
	}

	// Just return the items as is, ensuring quantities are numbers and prices are preserved
	const result = orderItems.map((item) => ({
		...item,
		quantity_change: Number(item.quantity_change),
		item_price: Number(item.item_price ?? 0),
		item_tax: Number(item.item_tax ?? 0),
		item_total: item.item_total ?? 0,
	}));

	console.log(
		"📦 extractOrderItems - Result:",
		result.length,
		JSON.stringify(result, null, 2),
	);
	return result;
}

// Updated function to handle the different item types from the schema
const mapToFormOrderItem = (item: Record<string, unknown>): FormOrderItem => {
	console.log(
		"🔍 mapToFormOrderItem - Input item:",
		JSON.stringify(item, null, 2),
	);
	console.log("🔍 mapToFormOrderItem - Item type:", item.item_type);

	// Handle package items which have a different structure
	if (item.item_type === "package" && "package_id" in item) {
		console.log("📦 mapToFormOrderItem - Processing package item");
		// For package items, we need to extract the package_id as item_id
		const result = {
			item_id: String(item.package_id || ""),
			item_type: "package" as ItemType,
			quantity_change: Number(item.quantity_change ?? 0),
			item_price: Number(item.item_price ?? 0),
			item_tax: Number(item.item_tax ?? 0),
			item_total: Number(item.item_total ?? 0),
			package_item_id: undefined,
			package_item_change_id:
				typeof item.package_item_change_id === "number"
					? item.package_item_change_id
					: null,
			lot_number: typeof item.lot_number === "string"
				? item.lot_number
				: undefined,
		};
		console.log("📦 Package item mapped:", JSON.stringify(result, null, 2));
		return result;
	}

	// Handle regular items - preserve price fields if they exist
	const result = {
		item_id: String(item.item_id || ""),
		item_type: (item.item_type || "product") as ItemType,
		quantity_change: Number(item.quantity_change ?? 0),
		item_price: Number(item.item_price ?? 0),
		item_tax: Number(item.item_tax ?? 0),
		item_total: Number(item.item_total ?? 0),
		package_item_id: typeof item.package_item_id === "string"
			? item.package_item_id
			: undefined,
		package_item_change_id: typeof item.package_item_change_id === "number"
			? item.package_item_change_id
			: null,
		lot_number: typeof item.lot_number === "string"
			? item.lot_number
			: undefined,
	};
	console.log("🔍 Regular item mapped:", JSON.stringify(result, null, 2));
	return result;
};

const processBuyFormData = (
	formData: MultiOrderFormData,
): FormatOrderItemChanges[] => {
	console.log(
		"🛒 processBuyFormData - START - formData keys:",
		Object.keys(formData),
	);
	console.log(
		"🛒 processBuyFormData - formData.item_type:",
		formData.item_type,
	);
	console.log(
		"🛒 processBuyFormData - formData.order_items length:",
		formData.order_items?.length ?? 0,
	);

	let item_changes_internal: FormOrderItem[] = [];
	if (formData.item_type === "part") {
		console.log("🛒 Processing part items");
		item_changes_internal = (formData.order_items || [])
			.map((item) => ({ ...item, item_type: "part" }))
			.map(mapToFormOrderItem)
			.map((item) => ({
				...item,
				address_id: formData.to_shipping_address_id,
			}));
		console.log("🛒 Part items processed:", item_changes_internal.length);
	} else {
		console.log(
			"🛒 Processing non-part items (consumed/produced/order items)",
		);

		// Process consumed items (from from_shipping_address_id)
		const consumed = (formData.consumed_items || [])
			.map((item) => ({ ...item, item_type: "product" }))
			.filter(isValidOrderItem)
			.map(mapToFormOrderItem);
		console.log(
			"🛒 Consumed items:",
			consumed.length,
			JSON.stringify(consumed, null, 2),
		);

		// Process order items (need both FROM and TO entries)
		const order_items_mapped = (formData.order_items || [])
			.map((item) => ({
				...item,
				item_type: item.item_type || "product",
			}))
			.filter(isValidOrderItem)
			.map(mapToFormOrderItem);
		console.log(
			"🛒 Order items mapped:",
			order_items_mapped.length,
			JSON.stringify(order_items_mapped, null, 2),
		);

		item_changes_internal = [
			// Consumed items come from from_shipping_address_id
			...consumed.map((item) => ({
				...item,
				address_id: formData.from_shipping_address_id,
			})),
			// Add all order items to to_shipping_address_id
			...order_items_mapped
				.map((item) => ({
					...item,
					address_id: formData.to_shipping_address_id,
					quantity_change: Number(item.quantity_change),
				})),
		];
		console.log(
			"🛒 All item changes combined:",
			item_changes_internal.length,
		);
	}

	const orderItemsResult: FormatOrderItemChanges[] = item_changes_internal
		.map((ic) => ({
			item_id: ic.item_id,
			quantity_change: Number(ic.quantity_change),
			item_price: ic?.item_price ?? 0,
			item_tax: ic?.item_tax ?? 0,
			address_id: ic.address_id ?? "",
			item_type: ic.item_type as ItemType,
			package_item_id: ic.package_item_id,
			package_item_change_id: ic.package_item_change_id,
			lot_number: ic.lot_number,
		}));

	console.log(
		"🛒 processBuyFormData - FINAL RESULT:",
		orderItemsResult.length,
		JSON.stringify(orderItemsResult, null, 2),
	);
	return orderItemsResult;
};

function processSellFormData(
	formData: MultiOrderFormData,
): FormatOrderItemChanges[] {
	console.log(
		"💰 processSellFormData - START - order_items length:",
		formData.order_items?.length ?? 0,
	);
	console.log(
		"💰 processSellFormData - mode:",
		formData.mode,
	);
	console.log(
		"💰 processSellFormData - RAW formData.order_items:",
		JSON.stringify(formData.order_items, null, 2),
	);

	// For sales, process all order_items (including those with package_item_change_id)
	// since we're not processing package_items separately
	const filteredOrderItems = formData.order_items || [];

	console.log(
		"💰 processSellFormData - Processing all order_items for sale:",
		JSON.stringify(filteredOrderItems, null, 2),
	);

	const orderItemsForExtraction: OrderItemWithTotal[] = filteredOrderItems
		.map((item) => {
			console.log(
				"💰 Processing order item:",
				JSON.stringify(item, null, 2),
			);
			const mappedItem = mapToFormOrderItem(item);
			console.log("💰 Mapped item:", JSON.stringify(mappedItem, null, 2));

			// Calculate total based on quantity, price and tax
			const quantity = mappedItem.quantity_change || 0;
			const price = mappedItem.item_price || 0;
			const tax = mappedItem.item_tax || 0;
			const total = quantity * price * (1 + tax / 100); // Convert tax percentage to decimal

			const result = {
				...mappedItem,
				item_total: total,
			};
			console.log(
				"💰 Item with total calculated:",
				JSON.stringify(result, null, 2),
			);
			return result;
		});

	console.log(
		"💰 Order items for extraction:",
		orderItemsForExtraction.length,
		JSON.stringify(orderItemsForExtraction, null, 2),
	);

	const extractedOrderItems = extractOrderItems(
		orderItemsForExtraction,
		formData.mode,
		formData.order_type,
	);
	console.log(
		"💰 Extracted order items:",
		extractedOrderItems.length,
		JSON.stringify(extractedOrderItems, null, 2),
	);

	// For sales, we need to create item changes for both FROM and TO addresses
	// Items leaving the seller's address (negative quantity)
	const fromItemChanges: FormatOrderItemChanges[] = extractedOrderItems.map(
		(i) => ({
			item_id: i.item_id,
			quantity_change: -Math.abs(i.quantity_change), // Make quantity negative for sales (items leaving stock)
			item_price: i.item_price ?? 0,
			item_tax: i.item_tax ?? 0,
			address_id: formData.from_shipping_address_id,
			item_type: i.item_type as ItemType,
			package_item_id: i.package_item_id,
			package_item_change_id: i.package_item_change_id,
			lot_number: i.lot_number,
		}),
	);

	// Items arriving at the buyer's address (positive quantity)
	const toItemChanges: FormatOrderItemChanges[] = extractedOrderItems.map(
		(i) => ({
			item_id: i.item_id,
			quantity_change: Math.abs(i.quantity_change), // Keep quantity positive for items arriving
			item_price: i.item_price ?? 0,
			item_tax: i.item_tax ?? 0,
			address_id: formData.to_shipping_address_id,
			item_type: i.item_type as ItemType,
			package_item_id: i.package_item_id,
			package_item_change_id: i.package_item_change_id,
			lot_number: i.lot_number,
		}),
	);

	const itemChangesResult: FormatOrderItemChanges[] = [
		...fromItemChanges,
		...toItemChanges,
	];

	console.log(
		"💰 processSellFormData - FINAL RESULT:",
		itemChangesResult.length,
		JSON.stringify(itemChangesResult, null, 2),
	);
	return itemChangesResult;
}

const processShipmentFormData = (
	formData: MultiOrderFormData,
): FormatOrderItemChanges[] => {
	console.log(
		"🚢 processShipmentFormData - START",
	);
	console.log(
		"🚢 from_items length:",
		formData.from_items?.length ?? 0,
	);
	console.log(
		"🚢 order_items length:",
		formData.order_items?.length ?? 0,
	);
	console.log(
		"🚢 to_items length:",
		formData.to_items?.length ?? 0,
	);
	console.log(
		"🚢 package_items length:",
		formData.package_items?.length ?? 0,
	);
	console.log(
		"🚢 mode:",
		formData.mode,
	);

	const fromItems = (formData.from_items || []).map((item) => {
		console.log("🚢 Processing from_item:", JSON.stringify(item, null, 2));
		const mapped = mapToFormOrderItem(item);
		const result = {
			...mapped,
			address_id: formData.from_shipping_address_id,
			quantity_change: Number(mapped.quantity_change ?? 0),
		};
		console.log("🚢 From item processed:", JSON.stringify(result, null, 2));
		return result;
	});

	const orderItemsInternal = (formData.order_items || []).map((
		item,
	) => {
		console.log("🚢 Processing order_item:", JSON.stringify(item, null, 2));
		const mapped = mapToFormOrderItem(item);
		const result = {
			...mapped,
			address_id: formData.to_shipping_address_id,
			quantity_change: Number(mapped.quantity_change ?? 0),
		};
		console.log(
			"🚢 Order item processed:",
			JSON.stringify(result, null, 2),
		);
		return result;
	});

	const toItems = (formData.to_items || []).map((item) => {
		console.log("🚢 Processing to_item:", JSON.stringify(item, null, 2));
		const mapped = mapToFormOrderItem(item);
		const result = {
			...mapped,
			address_id: formData.to_shipping_address_id,
			quantity_change: Number(mapped.quantity_change ?? 0),
		};
		console.log("🚢 To item processed:", JSON.stringify(result, null, 2));
		return result;
	});

	const result: FormatOrderItemChanges[] = [
		...fromItems.map((item) => ({
			item_id: item.item_id,
			quantity_change: item.quantity_change,
			item_price: Number(item.item_price ?? 0),
			item_tax: Number(item.item_tax ?? 0),
			address_id: item.address_id,
			item_type: item.item_type as ItemType,
			package_item_id: item.package_item_id,
			package_item_change_id: item.package_item_change_id,
			lot_number: item.lot_number,
		})),
		...toItems.map((item) => ({
			item_id: item.item_id,
			quantity_change: item.quantity_change,
			item_price: Number(item.item_price ?? 0),
			item_tax: Number(item.item_tax ?? 0),
			address_id: item.address_id,
			item_type: item.item_type as ItemType,
			package_item_id: item.package_item_id,
			package_item_change_id: item.package_item_change_id,
			lot_number: item.lot_number,
		})),
		...orderItemsInternal.map((item) => ({
			item_id: item.item_id,
			quantity_change: item.quantity_change,
			item_price: Number(item.item_price ?? 0),
			item_tax: Number(item.item_tax ?? 0),
			address_id: item.address_id,
			item_type: item.item_type as ItemType,
			package_item_id: item.package_item_id,
			package_item_change_id: item.package_item_change_id,
			lot_number: item.lot_number,
		})),
	];
	console.log(
		"🚢 processShipmentFormData - FINAL RESULT:",
		result.length,
		JSON.stringify(result, null, 2),
	);
	return result;
};

const formatCreateOrderArgumentsLocal = (
	orderItems: FormatOrderItemChanges[],
	formData: MultiOrderFormData,
): CreateOrderType => {
	console.log("🏗️ formatCreateOrderArgumentsLocal - START");
	console.log("🏗️ Order items count:", orderItems.length);
	console.log("🏗️ Order items:", JSON.stringify(orderItems, null, 2));

	let validCurrency: Currency = "GBP";
	if (
		formData.currency &&
		(currencyKeys as readonly string[]).includes(formData.currency)
	) {
		validCurrency = formData.currency as Currency;
	}

	const deliveryDates: [string | null, string | null] | null =
		formData.delivery_dates
			? [
				formData.delivery_dates[0]
					? dayjs(formData.delivery_dates[0]).toISOString()
					: null,
				formData.delivery_dates[1]
					? dayjs(formData.delivery_dates[1]).toISOString()
					: null,
			] as [string | null, string | null]
			: null;

	const result = {
		order_id: formData.order_id ?? null,
		order_type: formData.order_type,
		order_date: dayjs(formData.order_date)?.toISOString() ??
			dayjs().toISOString(),
		order_items: orderItems,
		from_company_id: formData.from_company_id ?? null,
		from_billing_address_id: formData.from_billing_address_id ?? null,
		from_shipping_address_id: formData.from_shipping_address_id ?? null,
		to_company_id: formData.to_company_id ?? null,
		to_billing_address_id: formData.to_billing_address_id ?? null,
		to_shipping_address_id: formData.to_shipping_address_id ?? null,
		to_contact_id: formData.to_contact_id ?? null,
		from_contact_id: formData.from_contact_id ?? null,
		currency: validCurrency,
		carriage: formData.carriage ?? 0,
		reason_for_export: formData.reason_for_export ?? null,
		shipment_number: formData.shipment_number ?? null,
		airwaybill: formData.airwaybill ?? null,
		mode_of_transport: formData.mode_of_transport ?? null,
		incoterms: formData.incoterms ?? null,
		unit_of_measurement: formData.unit_of_measurement ?? null,
		company_id: formData.company_id ?? null,
		delivery_dates: deliveryDates,
	};

	console.log(
		"🏗️ formatCreateOrderArgumentsLocal - RESULT:",
		JSON.stringify(result, null, 2),
	);
	return result;
};

const processMultiOrderFormDataLocal = (
	formData: MultiOrderFormData,
): CreateOrderType | MultiOrderFormData => {
	console.log(
		"🔄 processMultiOrderFormDataLocal - START - order_type:",
		formData.order_type,
	);

	let itemChanges: FormatOrderItemChanges[] = [];
	if (formData.order_type === "purchase") {
		console.log("🔄 Processing PURCHASE order");
		itemChanges = processBuyFormData(formData);
	} else if (formData.order_type === "sale") {
		console.log("🔄 Processing SALE order");
		itemChanges = processSellFormData(formData);
	} else if (formData.order_type === "shipment") {
		console.log("🔄 Processing SHIPMENT order");
		itemChanges = processShipmentFormData(formData);
	} else if (formData.order_type === "stocktake") {
		console.log("🔄 Processing STOCKTAKE order - returning formData as-is");
		return formData;
	}

	console.log(
		"🔄 processMultiOrderFormDataLocal - itemChanges count:",
		itemChanges.length,
	);
	const result = formatCreateOrderArgumentsLocal(itemChanges, formData);
	console.log(
		"🔄 processMultiOrderFormDataLocal - FINAL RESULT:",
		JSON.stringify(result, null, 2),
	);
	return result;
};

export const useCreateOrder = (orderTypeParam: string) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (formData: MultiOrderFormData & { id?: number }) => {
			console.log("🚀 =================================");
			console.log("🚀 useCreateOrder - MUTATION START");
			console.log("🚀 =================================");
			console.log(
				"🚀 formData keys:",
				Object.keys(formData),
			);
			console.log(
				"🚀 formData.order_type:",
				formData.order_type,
			);
			console.log(
				"🚀 formData.order_items length:",
				formData.order_items?.length ?? 0,
			);

			console.log("🔄 Calling processMultiOrderFormDataLocal...");
			const processedInputUntyped = processMultiOrderFormDataLocal(
				formData,
			);
			console.log("✅ processMultiOrderFormDataLocal completed");
			console.log(
				"🔍 processedInputUntyped type:",
				typeof processedInputUntyped,
			);

			let processedInput: CreateOrderType;
			if (formData.order_type === "stocktake") {
				console.log("📊 Processing STOCKTAKE order specially");
				const stocktakeFormData =
					processedInputUntyped as MultiOrderFormData;
				console.log(
					"📊 stocktakeFormData.order_items length:",
					stocktakeFormData.order_items?.length ?? 0,
				);

				const stocktakeItems: FormatOrderItemChanges[] =
					(stocktakeFormData.order_items || []).map((item) => {
						console.log(
							"📊 Processing stocktake item:",
							JSON.stringify(item, null, 2),
						);
						const mappedItem = mapToFormOrderItem(item);
						const result = {
							...mappedItem,
							item_price: mappedItem.item_price ?? 0,
							item_tax: mappedItem.item_tax ?? 0,
							address_id:
								stocktakeFormData.to_shipping_address_id,
						};
						console.log(
							"📊 Stocktake item processed:",
							JSON.stringify(result, null, 2),
						);
						return result;
					});
				console.log("📊 stocktakeItems count:", stocktakeItems.length);

				let validCurrencyForStocktake: Currency = "GBP";
				if (
					stocktakeFormData.currency &&
					(currencyKeys as readonly string[]).includes(
						stocktakeFormData.currency,
					)
				) {
					validCurrencyForStocktake = stocktakeFormData
						.currency as Currency;
				}

				// Handle delivery dates for stocktake
				const stocktakeDeliveryDates:
					| [string | null, string | null]
					| null = stocktakeFormData.delivery_dates
						? [
							stocktakeFormData.delivery_dates[0]
								? dayjs(stocktakeFormData.delivery_dates[0])
									.toISOString()
								: null,
							stocktakeFormData.delivery_dates[1]
								? dayjs(stocktakeFormData.delivery_dates[1])
									.toISOString()
								: null,
						] as [string | null, string | null]
						: null;

				processedInput = {
					order_id: null,
					order_type: stocktakeFormData.order_type,
					order_date:
						dayjs(stocktakeFormData.order_date)?.toISOString() ??
							dayjs().toISOString(),
					order_items: stocktakeItems,
					from_company_id: stocktakeFormData.from_company_id ?? null,
					to_company_id: stocktakeFormData.to_company_id ?? null,
					from_billing_address_id:
						stocktakeFormData.from_billing_address_id ?? null,
					from_shipping_address_id:
						stocktakeFormData.from_shipping_address_id ?? null,
					to_billing_address_id:
						stocktakeFormData.to_billing_address_id ?? null,
					to_shipping_address_id:
						stocktakeFormData.to_shipping_address_id ?? null,
					to_contact_id: stocktakeFormData.to_contact_id ?? null,
					from_contact_id: stocktakeFormData.from_contact_id ?? null,
					currency: validCurrencyForStocktake,
					carriage: stocktakeFormData.carriage ?? 0,
					reason_for_export: stocktakeFormData.reason_for_export ??
						null,
					shipment_number: stocktakeFormData.shipment_number ?? null,
					airwaybill: stocktakeFormData.airwaybill ?? null,
					mode_of_transport: stocktakeFormData.mode_of_transport ??
						null,
					incoterms: stocktakeFormData.incoterms ?? null,
					unit_of_measurement:
						stocktakeFormData.unit_of_measurement ?? null,
					company_id: stocktakeFormData.company_id ?? null,
					delivery_dates: stocktakeDeliveryDates,
				};
				console.log(
					"📊 STOCKTAKE processedInput created with order_items count:",
					processedInput.order_items?.length ?? 0,
				);
			} else {
				console.log(
					"🔄 Using processedInputUntyped as CreateOrderType",
				);
				processedInput = processedInputUntyped as CreateOrderType;
			}

			console.log("✅ Final processedInput created");
			console.log(
				"✅ processedInput.order_items length:",
				processedInput.order_items?.length ?? 0,
			);
			console.log(
				"✅ processedInput.order_items:",
				JSON.stringify(processedInput.order_items, null, 2),
			);

			let orderId: number | undefined = formData.id;
			let upsertedOrderData: AppOrderType | null = null;

			// Remove order_id from form values before storing
			const { order_id, ...formValuesWithoutOrderId } = formData;

			if (orderId) {
				console.log("🔄 UPDATING existing order with ID:", orderId);
				// Delete the existing order (this will cascade delete order_item_changes and item_changes)
				const { error: deleteOrderError } = await supabase
					.from("orders")
					.delete()
					.eq("id", orderId);
				if (deleteOrderError) {
					console.error(
						"❌ Error deleting existing order:",
						deleteOrderError,
					);
					throw deleteOrderError;
				}
				console.log("✅ Existing order deleted successfully");

				// Insert new order with the same ID
				const { data: newOrder, error: insertOrderError } =
					await supabase
						.from("orders")
						.insert({
							id: orderId,
							order_type: processedInput.order_type,
							order_date: processedInput.order_date,
							from_company_id: processedInput.from_company_id,
							to_company_id: processedInput.to_company_id,
							from_contact_id: processedInput.from_contact_id,
							to_contact_id: processedInput.to_contact_id,
							from_billing_address_id:
								processedInput.from_billing_address_id,
							from_shipping_address_id:
								processedInput.from_shipping_address_id,
							to_billing_address_id:
								processedInput.to_billing_address_id,
							to_shipping_address_id:
								processedInput.to_shipping_address_id,
							currency: processedInput.currency,
							carriage: processedInput.carriage,
							reason_for_export: processedInput.reason_for_export,
							shipment_number: processedInput.shipment_number,
							airwaybill: processedInput.airwaybill,
							mode_of_transport: processedInput.mode_of_transport,
							incoterms: processedInput.incoterms,
							unit_of_measurement:
								processedInput.unit_of_measurement,
							company_id: processedInput.company_id,
							order_form_values: formValuesWithoutOrderId,
							delivery_dates: processedInput.delivery_dates,
						})
						.select()
						.single<AppOrderType>();

				if (insertOrderError) {
					console.error(
						"❌ Error inserting updated order:",
						insertOrderError,
					);
					throw insertOrderError;
				}
				console.log(
					"✅ Order updated successfully with ID:",
					newOrder?.id,
				);
				upsertedOrderData = newOrder;
			} else {
				console.log("➕ CREATING new order");
				const { data: newOrder, error: insertOrderError } =
					await supabase
						.from("orders")
						.insert({
							order_type: processedInput.order_type,
							order_date: processedInput.order_date,
							from_company_id: processedInput.from_company_id,
							to_company_id: processedInput.to_company_id,
							from_contact_id: processedInput.from_contact_id,
							to_contact_id: processedInput.to_contact_id,
							from_billing_address_id:
								processedInput.from_billing_address_id,
							from_shipping_address_id:
								processedInput.from_shipping_address_id,
							to_billing_address_id:
								processedInput.to_billing_address_id,
							to_shipping_address_id:
								processedInput.to_shipping_address_id,
							currency: processedInput.currency,
							carriage: processedInput.carriage,
							reason_for_export: processedInput.reason_for_export,
							shipment_number: processedInput.shipment_number,
							airwaybill: processedInput.airwaybill,
							mode_of_transport: processedInput.mode_of_transport,
							incoterms: processedInput.incoterms,
							unit_of_measurement:
								processedInput.unit_of_measurement,
							company_id: processedInput.company_id,
							order_form_values: formValuesWithoutOrderId,
							delivery_dates: processedInput.delivery_dates,
						})
						.select()
						.single<AppOrderType>();

				if (insertOrderError) {
					console.error(
						"❌ Error inserting new order:",
						insertOrderError,
					);
					throw insertOrderError;
				}
				console.log(
					"✅ Order created successfully with ID:",
					newOrder?.id,
				);
				upsertedOrderData = newOrder;
				if (newOrder?.id) {
					orderId = newOrder.id;
				} else {
					throw new Error("Failed to create new order: ID missing.");
				}
			}

			console.log("🎯 ===============================");
			console.log(
				"🎯 ORDER PROCESSING COMPLETE - Starting ITEM PROCESSING",
			);
			console.log("🎯 ===============================");
			console.log("🎯 Final orderId:", orderId);
			console.log(
				"🎯 processedInput.order_items exists:",
				!!processedInput.order_items,
			);
			console.log(
				"🎯 processedInput.order_items length:",
				processedInput.order_items?.length ?? 0,
			);
			console.log(
				"🎯 processedInput.order_items content:",
				JSON.stringify(processedInput.order_items, null, 2),
			);

			if (!processedInput.order_items) {
				console.warn(
					"⚠️ No order_items found in processedInput - skipping item processing",
				);
				return upsertedOrderData;
			}

			if (processedInput.order_items.length === 0) {
				console.warn(
					"⚠️ order_items array is empty - skipping item processing",
				);
				return upsertedOrderData;
			}

			console.log("🚀 Starting order items processing...");
			console.log(
				"🚀 Items to process:",
				processedInput.order_items.length,
			);

			// Use formData.package_items directly (not filtered from order_items)
			const packageItems = formData.order_type === "sale"
				? []
				: (formData.package_items || []);
			// All items in processedInput.order_items are regular items
			const regularItems = processedInput.order_items;

			console.log("📦 Package items to process:", packageItems.length);
			console.log("📋 Regular items to process:", regularItems.length);

			// First, insert package items with their package_item_change_id as the ID
			if (packageItems.length > 0) {
				console.log("📦 Processing package items first...");
				const packageItemPromises = packageItems.map(
					async (packageItem, index: number) => {
						console.log(
							`📦 ============== Processing package item ${
								index + 1
							}/${packageItems.length} ==============`,
						);
						console.log(
							`📦 Package item ${index + 1} details:`,
							JSON.stringify(packageItem, null, 2),
						);

						// Generate a new ID if package_item_change_id is null
						const itemChangeId =
							packageItem.package_item_change_id ||
							Math.floor(Math.random() * 1000000);
						console.log(
							`📦 Using item_change_id ${itemChangeId} for package item ${
								index + 1
							}`,
						);

						console.log(
							`📦 Upserting package item_change with ID ${itemChangeId}...`,
						);
						const { data: itemChange, error: itemChangeError } =
							await supabase
								.from("item_changes")
								.upsert({
									id: itemChangeId,
									item_id: String(packageItem.package_id),
									quantity_change: 1, // Default quantity for packages
									address_id: String(
										formData.from_shipping_address_id,
									), // Use form data address
								}, { onConflict: "id" })
								.select("id")
								.single();

						if (itemChangeError) {
							console.error(
								`❌ Error upserting package item_change for package item ${
									index + 1
								}:`,
								itemChangeError,
							);
							throw itemChangeError;
						}

						console.log(
							`✅ Created/Updated package item_change with ID ${itemChange.id} for package item ${
								index + 1
							}`,
						);

						console.log(
							`📦 Upserting package order_item_change for package item ${
								index + 1
							}...`,
						);
						const { error: orderItemChangeError } = await supabase
							.from("order_item_changes")
							.upsert({
								order_id: orderId,
								item_change_id: itemChange.id,
								price: 0, // Packages typically have no price in this context
								tax: 0,
								package_item_id: undefined,
								package_item_change_id: itemChangeId, // Use the same ID we generated/used
								lot_number: undefined, // Package items don't have lot numbers
							}, { onConflict: "order_id,item_change_id" });

						if (orderItemChangeError) {
							console.error(
								`❌ Error upserting package order_item_change for package item ${
									index + 1
								}:`,
								orderItemChangeError,
							);
							throw orderItemChangeError;
						}

						console.log(
							`✅ Created/Updated package order_item_change for package item ${
								index + 1
							}`,
						);
						return { item_change_id: itemChange.id };
					},
				);

				await Promise.all(packageItemPromises);
				console.log("✅ All package items processed successfully!");
			}

			// Then, insert regular items with auto-generated IDs
			if (regularItems.length > 0) {
				console.log("📋 Processing regular items...");
				const regularItemPromises = regularItems.map(
					async (item: FormatOrderItemChanges, index: number) => {
						console.log(
							`📋 ============== Processing regular item ${
								index + 1
							}/${regularItems.length} ==============`,
						);
						console.log(
							`📋 Regular item ${index + 1} details:`,
							JSON.stringify(item, null, 2),
						);

						if (!item.item_id) {
							console.error(
								`❌ Regular item ${index + 1} has no item_id:`,
								item,
							);
							throw new Error(
								`Regular item ${index + 1} is missing item_id`,
							);
						}

						if (!item.address_id) {
							console.error(
								`❌ Regular item ${
									index + 1
								} has no address_id:`,
								item,
							);
							throw new Error(
								`Regular item ${
									index + 1
								} is missing address_id`,
							);
						}

						// Generate a unique ID for this item change
						const itemChangeId = Math.floor(
							Math.random() * 1000000,
						);

						console.log(
							`📋 Upserting regular item_change for item ${
								index + 1
							}...`,
						);
						const { data: itemChange, error: itemChangeError } =
							await supabase
								.from("item_changes")
								.upsert({
									id: itemChangeId,
									item_id: String(item.item_id),
									quantity_change: item.quantity_change,
									address_id: String(item.address_id),
								}, { onConflict: "id" })
								.select("id")
								.single();

						if (itemChangeError) {
							console.error(
								`❌ Error upserting regular item_change for item ${
									index + 1
								}:`,
								itemChangeError,
							);
							throw itemChangeError;
						}
						if (!itemChange?.id) {
							console.error(
								`❌ No ID returned for regular item_change ${
									index + 1
								}`,
							);
							throw new Error(
								`regular item_change ID is missing for item ${
									index + 1
								}`,
							);
						}

						console.log(
							`✅ Created/Updated regular item_change with ID ${itemChange.id} for item ${
								index + 1
							}`,
						);

						console.log(
							`📋 Upserting regular order_item_change for item ${
								index + 1
							}...`,
						);
						const { error: orderItemChangeError } = await supabase
							.from("order_item_changes")
							.upsert({
								order_id: orderId,
								item_change_id: itemChange.id,
								price: item.item_price,
								tax: item.item_tax,
								package_item_id: item.package_item_id,
								package_item_change_id:
									item.package_item_change_id,
								lot_number: item.lot_number,
							}, { onConflict: "order_id,item_change_id" });

						if (orderItemChangeError) {
							console.error(
								`❌ Error upserting regular order_item_change for item ${
									index + 1
								}:`,
								orderItemChangeError,
							);
							throw orderItemChangeError;
						}

						console.log(
							`✅ Created/Updated regular order_item_change for item ${
								index + 1
							}`,
						);
						return { item_change_id: itemChange.id };
					},
				);

				await Promise.all(regularItemPromises);
				console.log("✅ All regular items processed successfully!");
			}

			console.log("🎉 ===============================");
			console.log("🎉 MUTATION COMPLETED SUCCESSFULLY");
			console.log("🎉 ===============================");

			return upsertedOrderData;
		},
		onSuccess: (data, variables) => {
			const typeOfOrder = variables.id ? "updated" : "created";
			toast.success(`Order ${typeOfOrder} successfully`);
			if (data?.id) {
				openDefaultDocument(data.id, orderTypeParam);
			} else {
				console.warn(
					"Order data or ID is missing after success, cannot open document.",
				);
			}
			navigate({ to: "/home/orders" });
		},
		onError: (error, variables) => {
			const action = variables.id ? "updating" : "creating";
			console.error(`Error ${action} order:`, error);
			toast.error(`Error ${action} order`);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: selectOrdersQueryKey as unknown as readonly unknown[],
			});
			queryClient.invalidateQueries({
				queryKey:
					selectStockpilesQueryKey as unknown as readonly unknown[],
			});
		},
	});
};
