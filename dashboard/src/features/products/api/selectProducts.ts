import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";

export const selectProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    throw error;
  }
  return data;
};

export const selectProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-products"],
    queryFn: selectProducts,
  });
};

export const useSelectProducts = () =>
  useSuspenseQuery(selectProductsQueryOptions());
