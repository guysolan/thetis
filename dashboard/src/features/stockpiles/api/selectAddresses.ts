import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Address } from "../types";

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

export const useSelectAddresses = (companyId?: string) => {
  return useQuery({
    queryKey: ["addresses", companyId],
    queryFn: selectAddresses,
    enabled: !companyId || !!companyId,
  });
};
