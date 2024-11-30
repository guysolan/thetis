import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { OrderView } from "../../../types.ts";

export const selectOrders = async () => {
  const { data, error } = await supabase.from("orders_view").select("*")
    .order("order_id", { ascending: false })
    .returns<OrderView[]>();

  if (error) {
    throw error;
  }
  return data;
};

export const selectOrdersQueryKey = { queryKey: ["select-orders"] };

export const selectOrdersQueryOptions = () => {
  return queryOptions({
    ...selectOrdersQueryKey,
    queryFn: selectOrders,
  });
};

export const useSelectOrders = () =>
  useSuspenseQuery(selectOrdersQueryOptions());
