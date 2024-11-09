import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Order } from "../types";

export const updateOrder = async (id: number, data: Order["Update"]) => {
    const { error } = await supabase.from("orders").update(data).eq("id", id);

    if (error) {
        throw error;
    }
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Order["Update"] & { id: number }) =>
            updateOrder(data.id, data),
        onError: (error) => {
            console.error(error);
            toast.error("Failed to update order");
        },
        onSuccess: () => {
            toast.success("Order updated successfully");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["select-orders"] });
        },
    });
};
