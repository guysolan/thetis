import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

export const selectItemById = async (id: number | null) => {
  if (id === null) return null;
  const { data, error } = await supabase.from("items").select("*").eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const selectItemByIdQueryOptions = (id: number | null) => {
  return queryOptions({
    queryKey: ["select-items", { id }],
    queryFn: () => selectItemById(id),
    enabled: id !== null,
  });
};

export const useSelectItemById = (id: number | null) => {
  return useQuery(selectItemByIdQueryOptions(id));
};
