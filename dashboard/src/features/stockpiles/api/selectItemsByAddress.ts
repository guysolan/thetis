import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const selectItemsByAddress = async () => {
  const { data, error } = await supabase.from("items_by_address").select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const selectItemsByAddressQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-items-by-address"],
    queryFn: selectItemsByAddress,
  });
};

export const useSelectItemsByAddress = () =>
  useSuspenseQuery(selectItemsByAddressQueryOptions());
