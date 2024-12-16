import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Database } from "@/database.types";
import { toast } from "sonner";
type OrderTextBlockInsert =
  Database["public"]["Tables"]["orders_text_blocks"]["Insert"];

interface UpdateOrderTextBlockParams {
  orderId: number;
  textBlockId: number;
  position: number;
}

export function useUpdateOrderTextBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      textBlockId,
      position,
    }: UpdateOrderTextBlockParams) => {
      const { data, error } = await supabase.from("orders_text_blocks").upsert({
        order_id: orderId,
        text_block_id: textBlockId,
        display_order: position,
      });

      if (error) throw error;
      return data;
    },
    onError: (error) => {
      toast.error("Error updating text block");
    },
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({
        queryKey: ["orders", orderId, "text-blocks"],
      });
      toast.success("Text Block Updated");
    },
  });
}
