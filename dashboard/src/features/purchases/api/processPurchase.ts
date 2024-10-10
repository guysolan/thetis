import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import type { PurchaseFormData } from "../components/PurchaseForm";

const processPurchase = async (body: PurchaseFormData) => {
  const { data, error } = await supabase.rpc(
    "process_purchase",
    {
      p_purchase_items: body.purchase_items,
      p_parts_summary: body.parts_summary,
    },
  )
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const useProcessPurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processPurchase,
    onError: () => {
      toast.error("Error updating purchase");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase-parts"] });
      toast.success("Purchase updated successfully");
    },
  });
};
