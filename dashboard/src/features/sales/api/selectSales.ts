import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { orderQueryString } from "./orderQueryString";

export const selectOrders = async () => {
  const { data, error } = await supabase.from("orders_view").select(
    orderQueryString,
  );

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
