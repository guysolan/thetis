import { toast } from "sonner";
import { supabase } from "../../../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type OrderItemChange = {
	item_id: string;
	quantity_change: number;
	item_price: number;
	item_tax: number;
	warehouse_id: string;
};

type CreateOrderType = {
	in_order_type: string;
	in_order_date: string;
	in_order_items: OrderItemChange[];
};
const createOrder = async (
	order_type: string,
	order_date: string,
	item_changes_with_warehouse: OrderItemChange[],
) => {
	const { data, error } = await supabase.rpc("insert_order", {
		in_order_type: order_type,
		in_order_date: order_date,
		in_order_items: item_changes_with_warehouse,
	});
	console.log(data, error);
	if (error) throw error;
	return data;
};

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (
			data: CreateOrderType,
		) => createOrder(
			data.in_order_type,
			data.in_order_date,
			data.in_order_items,
		),
		onSuccess: () => {
			toast.success("Order created successfully");
		},
		onError: () => {
			toast.error("Error creating order");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["select-orders"] });
		},
	});
};
