import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";

export const selectPurchaseById = async (id: string) => {
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const selectPurchaseByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["select-purchase", id],
    queryFn: () => selectPurchaseById(id),
  });
};

export const useSelectPurchaseById = (id: string) =>
  useSuspenseQuery(selectPurchaseByIdQueryOptions(id));
