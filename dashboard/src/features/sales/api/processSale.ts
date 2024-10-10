import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import type { SaleFormData } from "../components/SaleForm";

const processSale = async (body: SaleFormData) => {
  const { data, error } = await supabase.rpc(
    "process_sale",
    {
      p_sale_items: body.sale_items,
    },
  )
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const useProcessSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processSale,
    onError: () => {
      toast.error("Error updating sale");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-parts"] });
      toast.success("Sale updated successfully");
    },
  });
};
