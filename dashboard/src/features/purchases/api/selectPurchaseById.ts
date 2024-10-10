import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { purchaseQueryString } from "./purchaseQueryString";

export const selectPurchaseById = async (id: string) => {
  const { data, error } = await supabase
    .from("purchases")
    .select(purchaseQueryString)
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
