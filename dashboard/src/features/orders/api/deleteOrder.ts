import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const deleteOrder = async (id: number) => {
    const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteOrder,
        onError: (error) => {
            console.error(error);
            toast.error("Failed to delete order");
        },
        onSuccess: () => {
            toast.success("Order deleted successfully");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["select-orders"] });
        },
    });
};
