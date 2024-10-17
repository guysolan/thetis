import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

export const insertWarehouse = async (warehouse: any) => {
    const { data, error } = await supabase.from("warehouses").insert(warehouse)
        .select();
    if (error) throw error;
    return data;
};

const useInsertWarehouse = () => {
    return useMutation({
        mutationFn: insertWarehouse,
    });
};

export default useInsertWarehouse;
