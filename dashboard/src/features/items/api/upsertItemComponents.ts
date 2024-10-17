import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ItemFormData } from "../components/ItemComponentsForm";
import { toast } from "sonner";

const upsertItemComponents = async (item: ItemFormData) => {
  const { data, error } = await supabase.from("item_components").upsert(item)
    .select();

  if (error) throw error;
  return data;
};

export const useUpsertItemComponents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertItemComponents,
    onError: () => {
      toast.error("Error updating item");
    },
    onSuccess: () => {
      toast.success("Item updated successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["select-items-view"] });
    },
  });
};
