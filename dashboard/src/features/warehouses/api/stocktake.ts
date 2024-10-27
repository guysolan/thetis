import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { toast } from "sonner";

type Stocktake = {
    warehouse_id: number;
    item_id: number;
    quantity_change: number;
};
const stocktake = async (stocktakeChanges: Stocktake[]) => {
    const { data, error } = await supabase.rpc(
        "insert_stocktake_changes",
        { data: stocktakeChanges },
    );
    if (error) {
        throw error;
    }
    return data;
};

const useStocktake = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: stocktake,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success("Stocktake changes saved");
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["select-warehouses-view"],
            });
        },
    });
};

export default useStocktake;
