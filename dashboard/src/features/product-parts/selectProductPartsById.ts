import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../config/supabase";

export const selectProductParts = async (id: number) => {
  const { data, error } = await supabase.from("products").select(
    "*, product_parts(*, part:parts(*))",
  ).eq("id", id).single();

  if (error) {
    throw error;
  }
  return data;
};

export const selectProductPartsQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["select-product-parts"],
    queryFn: () => selectProductParts(id),
  });
};

export const useSelectProductParts = (id: number) =>
  useSuspenseQuery(selectProductPartsQueryOptions(id));
