import { toast } from "sonner";
import { supabase } from "../../../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectOrdersQueryKey } from "../features/order-history/api/selectOrders";
import { selectStockpilesQueryKey } from "../../stockpiles/api/selectStockpiles";
import { CreateOrderType } from "../features/order-forms/utils/formatCreateOrderArguments";
import { openDefaultDocument } from "../features/order-documents/utils/openDefaultDocument";
import { OrderType } from "../types";
import { MultiOrderFormData } from "../features/multi-order-form/schema";
import { processMultiOrderFormData } from "../features/multi-order-form/utils";
import { useNavigate } from "@tanstack/react-router";

export const useCreateOrder = (orderType: string) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (formData: MultiOrderFormData) => {
			console.log("Submitting form data:", formData);
			console.log("Order items:", formData.order_items);

			const { data: order, error: orderError } = await supabase
				.from("orders")
				.insert({
					order_type: orderType,
					order_date: formData.order_date,
					delivery_dates: formData.delivery_date,
					from_company_id: formData.from_company_id,
					to_company_id: formData.to_company_id,
					from_contact_id: formData.from_contact_id,
					to_contact_id: formData.to_contact_id,
					from_billing_address_id: formData.from_billing_address_id,
					from_shipping_address_id: formData.from_shipping_address_id,
					to_billing_address_id: formData.to_billing_address_id,
					to_shipping_address_id: formData.to_shipping_address_id,
					currency: formData.currency,
					carriage: formData.carriage,
					reason_for_export: formData.reason_for_export,
					shipment_number: formData.shipment_number,
					airwaybill: formData.airwaybill,
					mode_of_transport: formData.mode_of_transport,
					incoterms: formData.incoterms,
					unit_of_measurement: formData.unit_of_measurement,
					company_id: formData.company_id,
					order_form_value: formData.order_form_value,
				})
				.select()
				.single();

			if (orderError) throw orderError;

			// Handle item changes
			const itemChanges = formData.order_items.map(async (item) => {
				// Create item_change record
				const { data: itemChange, error: itemChangeError } =
					await supabase
						.from("item_changes")
						.insert({
							item_id: item.item_id,
							quantity_change: item.quantity_change,
							address_id: formData.from_shipping_address_id,
						})
						.select()
						.single();

				if (itemChangeError) throw itemChangeError;

				// Create order_item_change record
				const { error: orderItemChangeError } = await supabase
					.from("order_item_changes")
					.insert({
						order_id: order.id,
						item_change_id: itemChange.id,
						price: item.item_price,
						tax: item.item_tax,
						package_item_id: item.package_item_id,
					});

				if (orderItemChangeError) throw orderItemChangeError;
			});

			await Promise.all(itemChanges);

			return order;
		},
		onSuccess: (data, mutation) => {
			console.log(data);
			toast.success("Order created successfully");
			openDefaultDocument(data.id, orderType);
			navigate({ to: "/home/orders" });
		},
		onError: (error) => {
			console.error(error);
			toast.error("Error creating order");
		},
		onSettled: () => {
			queryClient.invalidateQueries(selectOrdersQueryKey);
			queryClient.invalidateQueries(selectStockpilesQueryKey);
		},
	});
};
