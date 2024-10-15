import {
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const selectWarehouseProducts = async () => {
  const { data, error } = await supabase.from("warehouse_products").select('*');

  if (error) {
    throw error;
  }
  return data;
};

export const selectWarehouseProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-warehouse-products"],
    queryFn: selectWarehouseProducts,
  });
};

export const useSelectWarehouseProducts = () =>
  useSuspenseQuery(selectWarehouseProductsQueryOptions());
