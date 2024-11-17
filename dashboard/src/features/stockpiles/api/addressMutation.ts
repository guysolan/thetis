import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { InsertAddress } from "../types";
import { selectAddressesQueryKey } from "./selectAddresses";
import { selectStockpilesQueryKey } from "./selectStockpiles";
import { selectCompaniesQueryKey } from "../../companies/api/selectCompanies";
import { closeSheet } from "../../../utils/closeSheet";

export const insertAddress = async (address: InsertAddress) => {
  const { data, error } = await supabase
    .from("addresses")
    .insert(address)
    .select().single();

  if (error) {
    throw error;
  }

  return data;
};

export const upsertAddress = async (address: InsertAddress) => {
  const { data, error } = await supabase
    .from("addresses")
    .upsert(address)
    .select().single();

  if (error) {
    throw error;
  }

  return data;
};

export const insertUpsertAddress = async (
  address: InsertAddress,
  operation: "insert" | "upsert",
) => {
  return operation === "insert"
    ? insertAddress(address)
    : upsertAddress(address);
};

export const useAddressMutation = (operation: "insert" | "upsert") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (address: InsertAddress) =>
      insertUpsertAddress(address, operation),
    onError: (error) => {
      toast.error("Error saving address");
    },
    onSuccess: () => {
      toast.success("Address saved");
    },
    onSettled: () => {
      queryClient.invalidateQueries(selectAddressesQueryKey);
      queryClient.invalidateQueries(selectStockpilesQueryKey);
      queryClient.invalidateQueries(selectCompaniesQueryKey);
    },
  });
};
