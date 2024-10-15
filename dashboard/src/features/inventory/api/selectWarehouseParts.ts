import {
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const selectWarehouseParts = async () => {
  const { data, error } = await supabase.from("warehouse_parts").select('*');

  if (error) {
    throw error;
  }
  return data;
};

export const selectWarehousePartsQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-warehouse-parts"],
    queryFn: selectWarehouseParts,
  });
};

export const useSelectWarehouseParts = () =>
  useSuspenseQuery(selectWarehousePartsQueryOptions());
