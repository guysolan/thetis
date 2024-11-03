import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { InsertItem, ItemRow } from "../types";

export const upsertItem = async (item: InsertItem): Promise<ItemRow> => {
  const { data, error } = await supabase
    .from("items")
    .upsert(item)
    .select().single();

  if (error) {
    throw error;
  }

  return data;
};

export const useUpsertItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: InsertItem) => upsertItem(item),
    onError: () => {
      toast.error("Error saving item");
    },
    onSuccess: () => {
      toast.success("Item saved");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["select-items-view"] });
    },
  });
};
