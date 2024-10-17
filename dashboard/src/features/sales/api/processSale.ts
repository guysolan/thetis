import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import type { OrderFormData } from "../components/OrderForm";

const processOrder = async (body: OrderFormData) => {
  const { data, error } = await supabase.rpc(
    "process_order",
    {
      p_order_items: body.order_items,
    },
  )
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const useProcessOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processOrder,
    onError: () => {
      toast.error("Error updating order");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-parts"] });
      toast.success("Order updated successfully");
    },
  });
};
