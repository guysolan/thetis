import { toast } from "sonner";
import { supabase } from "../../../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectOrdersQueryKey } from "../features/order-history/api/selectOrders";
import { selectStockpilesQueryKey } from "../../stockpiles/api/selectStockpiles";
import { closeSheet } from "@/utils/closeSheet";
import { CreateOrderType } from "../features/order-forms/utils/formatCreateOrderArguments";
import { openDefaultDocument } from "../features/order-documents/utils/openDefaultDocument";
import { OrderType } from "../types";
import { MultiOrderFormData } from "../features/multi-order-form/schema";
import { processMultiOrderFormData } from "../features/multi-order-form/utils";

const createOrder = async (formData: MultiOrderFormData) => {
	const orderData = formData.order_type === "stocktake"
		? formData
		: processMultiOrderFormData(formData);

	const { data: result, error } = await supabase.rpc(
		"insert_order",
		orderData,
	);
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
			mutation?.onSuccess && mutation.onSuccess();
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
