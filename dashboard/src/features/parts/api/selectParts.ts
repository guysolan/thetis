import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";

export const selectParts = async () => {
  const { data, error } = await supabase.from("parts").select(
    "*, product_parts(*, product:products(*))",
  );

  if (error) {
    throw error;
  }
  return data;
};

export const selectPartsQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-parts"],
    queryFn: selectParts,
  });
};

export const useSelectParts = () => useSuspenseQuery(selectPartsQueryOptions());
