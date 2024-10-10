import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { purchaseQueryString } from "./purchaseQueryString";

export const selectPurchases = async () => {
  const { data, error } = await supabase.from("purchases").select(
    purchaseQueryString,
  );

  if (error) {
    throw error;
  }
  return data;
};

export const selectPurchasesQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-purchases"],
    queryFn: selectPurchases,
  });
};

export const useSelectPurchases = () =>
  useSuspenseQuery(selectPurchasesQueryOptions());
