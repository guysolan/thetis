import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { ItemView } from "../types";

export const selectItemsView = async () => {
  const { data, error } = await supabase.from("items_view").select(
    "*",
  ).returns<ItemView[]>();

  if (error) {
    throw error;
  }
  return data;
};

export const selectItemsViewQueryOptions = () => {
  return queryOptions({
    queryKey: ["select-items-view"],
    queryFn: selectItemsView,
  });
};

export const useSelectItemsView = () =>
  useSuspenseQuery(selectItemsViewQueryOptions());
