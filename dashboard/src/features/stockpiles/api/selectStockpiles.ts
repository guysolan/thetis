import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { StockpileView } from "../types";

export const selectStockpiles = async () => {
  const { data, error } = await supabase.from("stockpiles").select(
    `*`,
  ).returns<StockpileView[]>();

  if (error) {
    throw error;
  }
  return data;
};

export const selectStockpilesQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-stockpiles"],
    queryFn: selectStockpiles,
  });
};

export const useSelectStockpiles = () =>
  useSuspenseQuery(selectStockpilesQueryOptions());
