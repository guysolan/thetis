import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { toast } from "sonner";
import { selectOrderByIdQueryKey } from "./selectOrderById";

export interface UpdateItemChangeData {
  id: number;
  quantity_change?: number;
  address_id?: number | null;
}

export const updateItemChange = async (data: UpdateItemChangeData) => {
  const { id, ...updateData } = data;
  
  const { error } = await supabase
    .from("item_changes")
    .update(updateData)
    .eq("id", id);

  if (error) {
    throw error;
  }
};

export const useUpdateItemChange = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItemChange,
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update item change");
    },
    onSuccess: () => {
      toast.success("Item change updated successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries(selectOrderByIdQueryKey(orderId));
    },
  });
};