import { toast } from "sonner";
import { supabase } from "../../../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectOrdersQueryKey } from "../features/order-history/api/selectOrders";
import { selectStockpilesQueryKey } from "../../stockpiles/api/selectStockpiles";
import { closeSheet } from "@/utils/closeSheet";
import { CreateOrderType } from "../features/order-forms/utils/formatCreateOrderArguments";
import { openDefaultDocument } from "../features/order-documents/utils/openDefaultDocument";
import { OrderType } from "../types";

const createOrder = async (orderData: CreateOrderType) => {
	const { data: result, error } = await supabase.rpc(
		"insert_order",
		orderData,
	);
	console.log(result, error);
	if (error) throw error;
	return result;
};

export const useCreateOrder = (orderType: OrderType) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createOrder,
		onSuccess: (data, mutation) => {
			console.log(data);
			toast.success("Order created successfully");
			openDefaultDocument(data[0].order_id, orderType);
			closeSheet();
			// @ts-ignore
			mutation?.onSuccess&&mutation.onSuccess();
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
