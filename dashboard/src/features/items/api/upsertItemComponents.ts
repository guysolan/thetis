import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ItemFormData } from "../components/ItemComponentsForm";
import { toast } from "sonner";
import { ItemComponentInsert } from "../types";

const upsertItemComponents = async (items: ItemComponentInsert[]) => {
  const { error: deleteCurrentComponents } = await supabase.from(
    "item_components",
  ).delete().eq("item_id", Number(items[0].item_id));

  if (deleteCurrentComponents) throw deleteCurrentComponents;
  const { data, error } = await supabase.from("item_components").upsert(items)
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
