import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { toast } from "sonner";
import { selectOrderByIdQueryKey } from "./selectOrderById";

export interface UpdateOrderItemChangeData {
    order_id: number;
    item_change_id: number;
    price?: number | null;
    tax?: number | null;
    lot_number?: string | null;
    package_item_change_id?: number | null;
}

export const updateOrderItemChange = async (
    data: UpdateOrderItemChangeData,
) => {
    const { order_id, item_change_id, ...updateData } = data;

    const { error } = await supabase
        .from("order_item_changes")
        .update(updateData)
        .eq("order_id", order_id)
        .eq("item_change_id", item_change_id);

    if (error) {
        throw error;
    }
};

export const useUpdateOrderItemChange = (orderId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrderItemChange,
        onError: (error) => {
            console.error(error);
            toast.error("Failed to update order item");
        },
        onSuccess: () => {
            toast.success("Order item updated successfully");
        },
        onSettled: () => {
            queryClient.invalidateQueries(selectOrderByIdQueryKey(orderId));
        },
    });
};
