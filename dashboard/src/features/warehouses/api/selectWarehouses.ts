import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { WarehouseView } from "../types";

export const selectWarehouses = async () => {
  const { data, error } = await supabase.from("warehouses_view").select(
    `*`,
  ).returns<WarehouseView[]>();

  if (error) {
    throw error;
  }
  return data;
};

export const selectWarehousesQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-warehouses-view"],
    queryFn: selectWarehouses,
  });
};

export const useSelectWarehouses = () =>
  useSuspenseQuery(selectWarehousesQueryOptions());
