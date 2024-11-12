import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { InsertAddress } from "../types";

const upsertAddress = async (address: InsertAddress) => {
  const { data, error } = await supabase
    .from("addresses")
    .upsert(address)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const useUpsertAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (address: InsertAddress) => upsertAddress(address),
    onError: (error) => {
      toast.error("Error saving address");
    },
    onSuccess: () => {
      toast.success("Address saved");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["select-stockpiles"] });
    },
  });
};
