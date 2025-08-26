import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const selectOrderFormValuesById = async (id: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select("order_form_values")
    .eq("id", Number(id))
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const selectOrderViewById = async (id: string) => {
  const { data, error } = await supabase
    .from("orders_view")
    .select("*")
    .eq("order_id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const selectOrderViewByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["select-order-view", id],
    queryFn: () => selectOrderViewById(id),
  });
};

export const useSelectOrderViewById = (id: string) =>
  useSuspenseQuery(selectOrderViewByIdQueryOptions(id));
