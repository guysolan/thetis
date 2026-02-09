import { supabase } from "../../../lib/supabase";
import { toast } from "sonner";
import dayjs from "dayjs";
import { Currency, currencyKeys } from "../../../constants/currencies";
import { OrderRow as AppOrderType } from "../types";
import { MultiOrderFormData } from "../features/multi-order-form/schema";
import {
	FormatOrderItemChanges,
	mapToFormOrderItem,
	processBuyFormData,
	processSellFormData,
	processShipmentFormData,
	processSimpleBuyFormData,
} from "./createOrder";

// Helper to convert empty strings to null
const toNullIfEmpty = (value: any): any => {
	if (value === "" || value === undefined) return null;
	return value;
};

/**
 * Page 1: Save Order Details
 * Creates or updates order header with basic order information
 */
export async function saveOrderDetails(
	data: {
		order_type: MultiOrderFormData["order_type"];
		order_date: Date | string;
		currency: string;
		delivery_dates?: [Date | string | null, Date | string | null] | null;
		unit_of_measurement: MultiOrderFormData["unit_of_measurement"];
		orderId?: number;
	},
): Promise<number> {
	console.log("📄 Page 1: Saving order details...", data);

	let validCurrency: Currency = "GBP";
	if (
		data.currency &&
		(currencyKeys as readonly string[]).includes(data.currency)
	) {
		validCurrency = data.currency as Currency;
	}

	const deliveryDates: [string | null, string | null] | null =
		data.delivery_dates
			? [
				data.delivery_dates[0]
					? dayjs(data.delivery_dates[0]).toISOString()
					: null,
				data.delivery_dates[1]
					? dayjs(data.delivery_dates[1]).toISOString()
					: null,
			] as [string | null, string | null]
			: null;

	if (data.orderId) {
		// Update existing order
		const { data: updatedOrder, error } = await supabase
			.from("orders")
			.update({
				order_type: data.order_type,
				order_date: dayjs(data.order_date).toISOString(),
				currency: validCurrency,
				delivery_dates: deliveryDates,
				unit_of_measurement: data.unit_of_measurement,
			})
			.eq("id", data.orderId)
			.select()
			.single<AppOrderType>();

		if (error) {
			console.error("❌ Error updating order details:", error);
			throw error;
		}

		console.log("✅ Order details updated:", updatedOrder?.id);
		return updatedOrder!.id;
	} else {
		// Create new order
		const { data: newOrder, error } = await supabase
			.from("orders")
			.insert({
				order_type: data.order_type,
				order_date: dayjs(data.order_date).toISOString(),
				currency: validCurrency,
				delivery_dates: deliveryDates,
				unit_of_measurement: data.unit_of_measurement,
				// Set defaults for required fields (will be updated in later pages)
				from_company_id: null,
				to_company_id: null,
				from_billing_address_id: null,
				from_shipping_address_id: null,
				to_billing_address_id: null,
				to_shipping_address_id: null,
				company_id: null,
			})
			.select()
			.single<AppOrderType>();

		if (error) {
			console.error("❌ Error creating order:", error);
			throw error;
		}

		if (!newOrder?.id) {
			throw new Error("Failed to create order: ID missing");
		}

		console.log("✅ Order created:", newOrder.id);
		return newOrder.id;
	}
}

/**
 * Page 2: Save Companies & Addresses
 * Updates order with company and address IDs
 */
export async function saveOrderCompanies(
	orderId: number,
	data: {
		from_company_id: string;
		to_company_id: string;
		from_billing_address_id: string;
		from_shipping_address_id: string;
		to_billing_address_id: string;
		to_shipping_address_id: string;
		from_contact_id?: string | null;
		to_contact_id?: string | null;
		company_id?: string;
	},
): Promise<void> {
	console.log("🏢 Page 2: Saving companies & addresses...", {
		orderId,
		data,
	});

	const { error } = await supabase
		.from("orders")
		.update({
			from_company_id: toNullIfEmpty(data.from_company_id),
			to_company_id: toNullIfEmpty(data.to_company_id),
			from_billing_address_id: toNullIfEmpty(
				data.from_billing_address_id,
			),
			from_shipping_address_id: toNullIfEmpty(
				data.from_shipping_address_id,
			),
			to_billing_address_id: toNullIfEmpty(data.to_billing_address_id),
			to_shipping_address_id: toNullIfEmpty(data.to_shipping_address_id),
			from_contact_id: toNullIfEmpty(data.from_contact_id),
			to_contact_id: toNullIfEmpty(data.to_contact_id),
			company_id: toNullIfEmpty(data.company_id),
		})
		.eq("id", orderId);

	if (error) {
		console.error("❌ Error updating companies & addresses:", error);
		throw error;
	}

	console.log("✅ Companies & addresses updated");
}

/**
 * Page 3: Save Order Items
 * Saves all items (order_items, package_items, etc.) and processes them
 */
export async function saveOrderItems(
	orderId: number,
	formData: MultiOrderFormData,
): Promise<void> {
	console.log("📦 Page 3: Saving order items...", {
		orderId,
		order_type: formData.order_type,
		from_shipping_address_id: formData.from_shipping_address_id,
		to_shipping_address_id: formData.to_shipping_address_id,
		order_items_count: formData.order_items?.length ?? 0,
	});

	// Delete existing order_item_changes and item_changes for this order
	// First get all order_item_changes to find associated item_changes
	const { data: existingOrderItemChanges } = await supabase
		.from("order_item_changes")
		.select("item_change_id")
		.eq("order_id", orderId);

	console.log(
		"🗑️ Found existing order_item_changes to delete:",
		existingOrderItemChanges?.length || 0,
	);

	if (existingOrderItemChanges && existingOrderItemChanges.length > 0) {
		const itemChangeIds = existingOrderItemChanges.map((oic) =>
			oic.item_change_id
		);

		console.log("🗑️ Deleting item_change IDs:", itemChangeIds);

		// Delete order_item_changes
		const { error: deleteOrderItemChangesError } = await supabase
			.from("order_item_changes")
			.delete()
			.eq("order_id", orderId);

		if (deleteOrderItemChangesError) {
			console.error(
				"❌ Error deleting order_item_changes:",
				deleteOrderItemChangesError,
			);
			throw deleteOrderItemChangesError;
		}

		console.log("✅ Deleted order_item_changes");

		// Delete associated item_changes
		if (itemChangeIds.length > 0) {
			const { error: deleteItemChangesError } = await supabase
				.from("item_changes")
				.delete()
				.in("id", itemChangeIds);

			if (deleteItemChangesError) {
				console.error(
					"❌ Error deleting item_changes:",
					deleteItemChangesError,
				);
				throw deleteItemChangesError;
			}

			console.log("✅ Deleted item_changes");
		}
	}

	// Process items based on order type
	let processedItems: FormatOrderItemChanges[] = [];

	if (formData.order_type === "build") {
		processedItems = processBuyFormData(formData);
	} else if (formData.order_type === "buy") {
		processedItems = processSimpleBuyFormData(formData);
	} else if (formData.order_type === "sell") {
		processedItems = processSellFormData(formData);
	} else if (formData.order_type === "ship") {
		processedItems = processShipmentFormData(formData);
	}

	// Filter out empty/invalid items
	const packageItems = (formData.package_items || []).filter(
		(p): p is typeof p => {
			const hasPackageId =
				p.package_id != null && String(p.package_id).trim() !== "";
			if (!hasPackageId) {
				console.warn(
					"⚠️ Skipping package item with missing package_id:",
					p,
				);
				return false;
			}
			return true;
		},
	);

	const regularItems = processedItems.filter(
		(item) =>
			item.item_id &&
			item.item_id.trim() !== "" &&
			item.quantity_change !== 0 &&
			item.address_id,
	);

	// For buy orders, packages go to to_shipping_address_id; for everything else, from_shipping_address_id
	const packageAddressId = formData.order_type === "buy"
		? formData.to_shipping_address_id
		: formData.from_shipping_address_id;

	if (
		(packageItems.length > 0 || regularItems.length > 0) &&
		(packageAddressId == null || String(packageAddressId).trim() === "")
	) {
		throw new Error(
			"Shipping address is required to save order items. Please complete the Companies step.",
		);
	}

	console.log("📦 Package items to process:", packageItems.length);
	console.log("📋 Regular items to process:", regularItems.length);
	console.log(
		"📋 Regular items details:",
		JSON.stringify(
			regularItems.map((item) => ({
				item_id: item.item_id,
				quantity_change: item.quantity_change,
				address_id: item.address_id,
			})),
			null,
			2,
		),
	);

	// Map to track package_item_change_id from form data to actual item_changes.id
	const packageItemChangeIdMap = new Map<number | null, number>();

	// First, insert package items
	const packageAddressIdNum =
		packageAddressId != null ? Number(packageAddressId) : NaN;
	if (packageItems.length > 0 && !Number.isNaN(packageAddressIdNum)) {
		const packageItemPromises = packageItems.map(async (packageItem) => {
			const originalPackageItemChangeId =
				packageItem.package_item_change_id;
			const itemChangeId =
				packageItem.package_item_change_id ??
				Math.floor(Math.random() * 1000000);
			const packageIdNum = Number(packageItem.package_id);
			if (Number.isNaN(packageIdNum)) {
				throw new Error(
					`Invalid package_id for package item: ${packageItem.package_id}`,
				);
			}

			const { data: itemChange, error: itemChangeError } = await supabase
				.from("item_changes")
				.upsert(
					{
						id: itemChangeId,
						item_id: packageIdNum,
						quantity_change: 1,
						address_id: packageAddressIdNum,
					},
					{ onConflict: "id" },
				)
				.select("id")
				.single();

			if (itemChangeError) {
				console.error(
					"❌ Error upserting package item_change:",
					itemChangeError,
				);
				throw itemChangeError;
			}

			if (originalPackageItemChangeId != null) {
				packageItemChangeIdMap.set(
					originalPackageItemChangeId,
					itemChange.id,
				);
			}

			// Create order_item_change for package (omit optional null columns to avoid sending undefined)
			const { error: orderItemChangeError } = await supabase
				.from("order_item_changes")
				.upsert(
					{
						order_id: orderId,
						item_change_id: itemChange.id,
						price: 0,
						tax: 0,
						package_item_change_id: itemChange.id,
					},
					{ onConflict: "order_id,item_change_id" },
				);

			if (orderItemChangeError) {
				console.error(
					"❌ Error upserting package order_item_change:",
					orderItemChangeError,
				);
				throw orderItemChangeError;
			}
		});

		await Promise.all(packageItemPromises);
		console.log("✅ All package items processed");
	}

	// Then, insert regular items
	if (regularItems.length > 0) {
		const regularItemPromises = regularItems.map(async (item) => {
			const itemChangeId = Math.floor(Math.random() * 1000000);
			const itemIdNum = Number(item.item_id);
			const addressIdNum = Number(item.address_id);
			if (Number.isNaN(itemIdNum) || Number.isNaN(addressIdNum)) {
				throw new Error(
					`Invalid item_id or address_id for order item: item_id=${item.item_id}, address_id=${item.address_id}`,
				);
			}

			const { data: itemChange, error: itemChangeError } = await supabase
				.from("item_changes")
				.upsert(
					{
						id: itemChangeId,
						item_id: itemIdNum,
						quantity_change: item.quantity_change,
						address_id: addressIdNum,
					},
					{ onConflict: "id" },
				)
				.select("id")
				.single();

			if (itemChangeError) {
				console.error(
					"❌ Error upserting regular item_change:",
					itemChangeError,
				);
				throw itemChangeError;
			}

			if (!itemChange?.id) {
				throw new Error("item_change ID is missing");
			}

			// Resolve package_item_change_id
			let resolvedPackageItemChangeId: number | null = null;
			if (
				item.package_item_change_id !== null &&
				item.package_item_change_id !== undefined
			) {
				const mappedId = packageItemChangeIdMap.get(
					item.package_item_change_id,
				);
				if (mappedId !== undefined) {
					resolvedPackageItemChangeId = mappedId;
				}
			}

			// Create order_item_change (use null for optional fields to avoid sending undefined)
			const { error: orderItemChangeError } = await supabase
				.from("order_item_changes")
				.upsert(
					{
						order_id: orderId,
						item_change_id: itemChange.id,
						price: item.item_price ?? 0,
						tax: item.item_tax ?? 0,
						package_item_change_id: resolvedPackageItemChangeId,
						lot_number: item.lot_number ?? null,
					},
					{ onConflict: "order_id,item_change_id" },
				);

			if (orderItemChangeError) {
				console.error(
					"❌ Error upserting regular order_item_change:",
					orderItemChangeError,
				);
				throw orderItemChangeError;
			}
		});

		await Promise.all(regularItemPromises);
		console.log("✅ All regular items processed");
	}

	// Update order_form_values with current form data
	const { order_id, ...formValuesWithoutOrderId } = formData;
	const { error: updateFormValuesError } = await supabase
		.from("orders")
		.update({
			order_form_values: formValuesWithoutOrderId,
		})
		.eq("id", orderId);

	if (updateFormValuesError) {
		console.error(
			"❌ Error updating order_form_values:",
			updateFormValuesError,
		);
		throw updateFormValuesError;
	}

	console.log("✅ Order items saved successfully");
}

/**
 * Page 4: Save Pricing & Summary
 * Updates order with carriage and shipping details
 */
export async function saveOrderPricing(
	orderId: number,
	data: {
		carriage: number;
		shipment_number?: string | null;
		airwaybill?: string | null;
		mode_of_transport?: string | null;
		incoterms?: string | null;
		reason_for_export?: string | null;
		reference_number?: string | null;
	},
): Promise<void> {
	console.log("💰 Page 4: Saving pricing & summary...", { orderId, data });

	const { error } = await supabase
		.from("orders")
		.update({
			carriage: data.carriage ?? 0,
			shipment_number: toNullIfEmpty(data.shipment_number),
			airwaybill: toNullIfEmpty(data.airwaybill),
			mode_of_transport: toNullIfEmpty(data.mode_of_transport),
			incoterms: toNullIfEmpty(data.incoterms),
			reason_for_export: toNullIfEmpty(data.reason_for_export),
			reference_number: toNullIfEmpty(data.reference_number),
		})
		.eq("id", orderId);

	if (error) {
		console.error("❌ Error updating pricing & summary:", error);
		throw error;
	}

	console.log("✅ Pricing & summary updated");
}
