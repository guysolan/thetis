import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { OrderView } from "../types";

export const selectOrders = async () => {
  const { data, error } = await supabase.from("orders_view").select("*")
    .returns<OrderView[]>();

  if (error) {
    throw error;
  }
  return data;
};

export const selectOrdersQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-orders"],
    queryFn: selectOrders,
  });
};

export const useSelectOrders = () =>
  useSuspenseQuery(selectOrdersQueryOptions());
