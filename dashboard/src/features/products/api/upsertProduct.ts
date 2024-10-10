import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ProductFormData } from "../components/ProductForm";
import { toast } from "sonner";

const upsertProduct = async (product: ProductFormData) => {
  const { data, error } = await supabase.rpc("upsert_product_with_parts", {
    p_name: product.name,
    p_price: product.price,
    p_quantity: product.quantity,
    p_product_parts: product.product_parts,
    p_id: product.id ?? null,
  })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const useUpsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertProduct,
    onError: () => {
      toast.error("Error updating product");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["select-product-parts"] });
      toast.success("Product updated successfully");
    },
  });
};
