import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { saleQueryString } from "./saleQueryString";

export const selectSaleById = async (id: string) => {
  const { data, error } = await supabase
    .from("sales")
    .select(saleQueryString)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const selectSaleByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["select-sale", id],
    queryFn: () => selectSaleById(id),
  });
};

export const useSelectSaleById = (id: string) =>
  useSuspenseQuery(selectSaleByIdQueryOptions(id));
