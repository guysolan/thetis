import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../config/supabase";

export const selectProductParts = async () => {
  const { data, error } = await supabase.from("products").select(
    "*, product_parts(quantity, part:parts(uuid, name, price))",
  );

  if (error) {
    throw error;
  }
  return data;
};

export const selectProductPartsQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-product-parts"],
    queryFn: selectProductParts,
  });
};

export const useSelectProductParts = () =>
  useSuspenseQuery(selectProductPartsQueryOptions());
