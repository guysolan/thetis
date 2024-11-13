import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { InsertAddress } from "../types";
import { selectAddressesQueryKey } from "./selectAddresses";
import { selectStockpilesQueryKey } from "./selectStockpiles";

const insertAddress = async (address: InsertAddress) => {
  const { data, error } = await supabase
    .from("addresses")
    .insert(address)
    .select().single();

  if (error) {
    throw error;
  }

  return data;
};

const upsertAddress = async (address: InsertAddress) => {
  const { data, error } = await supabase
    .from("addresses")
    .upsert(address)
    .select().single();

  if (error) {
    throw error;
  }

  return data;
};

export const useAddressMutation = (operation: "insert" | "upsert") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (address: InsertAddress) =>
      operation === "insert" ? insertAddress(address) : upsertAddress(address),
    onError: (error) => {
      toast.error("Error saving address");
    },
    onSuccess: () => {
      toast.success("Address saved");
    },
    onSettled: () => {
      queryClient.invalidateQueries(selectAddressesQueryKey);
      queryClient.invalidateQueries(selectStockpilesQueryKey);
    },
  });
};
