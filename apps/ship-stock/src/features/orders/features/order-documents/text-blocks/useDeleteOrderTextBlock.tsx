import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface DeleteOrderTextBlockParams {
  in_orderId: number;
  in_textBlockId: number;
}

export function useDeleteOrderTextBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      in_orderId,
      in_textBlockId,
    }: DeleteOrderTextBlockParams) => {
      const { data, error } = await supabase
        .from("orders_text_blocks")
        .delete()
        .match({
          order_id: in_orderId,
          text_block_id: in_textBlockId,
        });

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { in_orderId }) => {
      queryClient.invalidateQueries({
        queryKey: ["orders", in_orderId, "text-blocks"],
      });
    },
  });
}
