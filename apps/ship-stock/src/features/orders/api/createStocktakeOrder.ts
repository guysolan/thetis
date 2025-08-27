import { toast } from "sonner";
import { supabase } from "../../../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectOrdersQueryKey } from "../features/order-history/api/selectOrders";
import { selectStockpilesQueryKey } from "../../stockpiles/api/selectStockpiles";
import { CreateOrderType } from "../utils/formatCreateOrderArguments";

const createStocktakeOrder = async (formData: CreateOrderType) => {
    const { data: result, error } = await supabase.rpc(
        "upsert_order",
        formData,
    );
    if (error) throw error;
    return result;
};

export const useCreateStocktakeOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createStocktakeOrder,
        onSuccess: (data, mutation) => {
            console.log(data);
            toast.success("Order created successfully");
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
