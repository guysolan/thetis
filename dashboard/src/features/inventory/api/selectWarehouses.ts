import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const selectWarehouses = async () => {
  const { data, error } = await supabase.from("warehouses").select(
    `*`,
  );

  if (error) {
    throw error;
  }
  return data;
};

export const selectWarehousesQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-warehouses"],
    queryFn: selectWarehouses,
  });
};

export const useSelectWarehouses = () =>
  useSuspenseQuery(selectWarehousesQueryOptions());
