import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { orderQueryString } from "./orderQueryString";

export const selectOrderById = async (id: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select(orderQueryString)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const selectOrderByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["select-order", id],
    queryFn: () => selectOrderById(id),
  });
};

export const useSelectOrderById = (id: string) =>
  useSuspenseQuery(selectOrderByIdQueryOptions(id));
