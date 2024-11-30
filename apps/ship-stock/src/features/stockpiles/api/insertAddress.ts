import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

export const insertStockpile = async (stockpile: any) => {
    const { data, error } = await supabase.from("stockpiles").insert(stockpile)
        .select();
    if (error) throw error;
    return data;
};

const useInsertStockpile = () => {
    return useMutation({
        mutationFn: insertStockpile,
    });
};

export default useInsertStockpile;
