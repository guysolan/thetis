import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Database } from "../../../database.types";
type InsertItem = Database["public"]["Tables"]["items"]["Insert"];

const upsertItem = async (item: InsertItem) => {
  const { data, error } = await supabase
    .from("items")
    .upsert(item)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const useUpsertItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: InsertItem) => upsertItem(item),
    onError: (error) => {
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
