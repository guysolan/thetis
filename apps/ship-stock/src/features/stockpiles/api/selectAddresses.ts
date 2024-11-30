import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Address } from "../types";

export const selectAddresses = async () => {
  const { data, error } = await supabase.from("addresses").select(
    "*, companies(*)",
  );

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
    ...selectAddressesQueryKey,
    queryFn: selectAddresses,
    enabled: !companyId || !!companyId,
  });
};
