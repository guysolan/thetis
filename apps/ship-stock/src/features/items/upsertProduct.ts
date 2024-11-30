import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";

type Product = {
  id?: number;
  name: string;
  quantity: number;
  price: number;
};

const upsertProduct = async (product: Product) => {
  const { data, error } = await supabase
    .from("products")
    .upsert(product, { onConflict: "id" })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const useUpsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["select-products"] });
    },
  });
};
