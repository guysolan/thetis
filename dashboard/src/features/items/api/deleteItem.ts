import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
      queryClient.invalidateQueries({ queryKey: ["select-items"] });
    },
  });
};
