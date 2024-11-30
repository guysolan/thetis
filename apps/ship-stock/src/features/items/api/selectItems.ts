import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

export const selectItems = async () => {
  const { data, error } = await supabase.from("items").select("*");

  if (error) {
    throw error;
  }
  return data;
};

export const selectItemsQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-items"],
    queryFn: selectItems,
  });
};

export const useSelectItems = () => useSuspenseQuery(selectItemsQueryOptions());
