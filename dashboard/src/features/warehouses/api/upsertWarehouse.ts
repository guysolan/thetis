import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { InsertWarehouse } from "../types";

const upsertWarehouse = async (warehouse: InsertWarehouse) => {
  const { data, error } = await supabase
    .from("warehouses")
    .upsert(warehouse)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const useUpsertWarehouse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (warehouse: InsertWarehouse) =>
      upsertWarehouse(warehouse),
    onError: (error) => {
      toast.error("Error saving warehouse");
    },
    onSuccess: () => {
      toast.success("Warehouse saved");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["select-warehouses-view"] });
    },
  });
};
