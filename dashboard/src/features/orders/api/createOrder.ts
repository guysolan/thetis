import { toast } from "sonner";
import { supabase } from "../../../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectOrdersQueryKey } from "../features/order-history/api/selectOrders";
import { selectStockpilesQueryKey } from "../../stockpiles/api/selectStockpiles";
import { ItemType } from "../../items/types";

export type OrderItemChange = {
	item_id: string;
	quantity_change: number;
	item_price: number;
	item_tax: number;
	item_type: ItemType;
	address_id: string;
};

type CreateOrderType = {
	in_order_type: string;
	in_order_date: string;
	in_order_items: OrderItemChange[];
	in_from_company_id: string | null;
	in_to_company_id: string | null;
	in_from_billing_address_id: string | null;
	in_from_shipping_address_id: string | null;
	in_to_billing_address_id: string | null;
	in_to_shipping_address_id: string | null;
};
const createOrder = async (orderData: CreateOrderType) => {
	const { data: result, error } = await supabase.rpc(
		"insert_order",
		orderData,
	);
	console.log(result, error);
	if (error) throw error;
	return result;
};

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createOrder,
		onSuccess: () => {
			toast.success("Order created successfully");
		},
		onError: () => {
			toast.error("Error creating order");
		},
		onSettled: () => {
			queryClient.invalidateQueries(selectOrdersQueryKey);
			queryClient.invalidateQueries(selectStockpilesQueryKey);
		},
	});
};
