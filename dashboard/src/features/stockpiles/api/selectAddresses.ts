import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Address, StockpileView } from "../types";

export const selectAddresses = async () => {
  const { data, error } = await supabase.from("addresses").select(
    `*`,
  ).returns<Address["Row"][]>();

  if (error) {
    throw error;
  }
  return data;
};

export const selectAddressesQueryKey = { queryKey: ["select-addresses"] };

export const selectAddressesQueryOptions = () => {
  return queryOptions({
    ...selectAddressesQueryKey,
    queryFn: selectAddresses,
  });
};

export const useSelectAddresses = () =>
  useSuspenseQuery(selectAddressesQueryOptions());
