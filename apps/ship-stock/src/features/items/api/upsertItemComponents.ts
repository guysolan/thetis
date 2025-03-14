import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ItemComponentInsert } from "../types";

export const upsertItemComponents = async (items: ItemComponentInsert[]) => {
  const { error: deleteCurrentComponents } = await supabase.from(
    "item_components",
  ).delete().eq("item_id", Number(items[0].item_id));

  if (deleteCurrentComponents) throw deleteCurrentComponents;
  const { data, error } = await supabase.from("item_components").insert(items)
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
    onSuccess: (data, mutation) => {
      toast.success("Item updated successfully");
      mutation?.onSuccess && mutation.onSuccess();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["select-items-view"] });
    },
  });
};
