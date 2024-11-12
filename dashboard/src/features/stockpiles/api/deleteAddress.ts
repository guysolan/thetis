import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

export const deleteStockpile = async (stockpileId: number) => {
    const { data, error } = await supabase.from("stockpiles").delete()
        .eq("id", stockpileId);
    if (error) throw error;
    return data;
};

const useDeleteStockpile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteStockpile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["select-stockpiles"] });
        },
    });
};

export default useDeleteStockpile;
