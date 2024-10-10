import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { saleQueryString } from "./saleQueryString";

export const selectSales = async () => {
  const { data, error } = await supabase.from("sales").select(
    saleQueryString,
  );

  if (error) {
    throw error;
  }
  return data;
};

export const selectSalesQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-sales"],
    queryFn: selectSales,
  });
};

export const useSelectSales = () => useSuspenseQuery(selectSalesQueryOptions());
