import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

export const deleteWarehouse = async (warehouseId: number) => {
    const { data, error } = await supabase.from("warehouses").delete()
        .eq("id", warehouseId);
    if (error) throw error;
    return data;
};

const useDeleteWarehouse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteWarehouse,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["select-warehouses"] });
        },
    });
};

export default useDeleteWarehouse;
