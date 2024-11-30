import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { selectItemsViewQueryKey } from "./selectItemsView";

const deleteItem = async (id: number) => {
  const { error } = await supabase
    .from("items")
    .delete().eq("id", id);

  if (error) {
    throw error;
  }
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: number) => deleteItem(item),
    onError: (error) => {
      toast.error("Error deleting item");
    },
    onSuccess: () => {
      toast.success("Item deleted successfully");
      queryClient.invalidateQueries(selectItemsViewQueryKey);
    },
  });
};
