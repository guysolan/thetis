import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const selectWarehouseItems = async () => {
  const { data, error } = await supabase.from("warehouse_items").select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const selectWarehouseItemsQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-warehouse-items"],
    queryFn: selectWarehouseItems,
  });
};

export const useSelectWarehouseItems = () =>
  useSuspenseQuery(selectWarehouseItemsQueryOptions());
