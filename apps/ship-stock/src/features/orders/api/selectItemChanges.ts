import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { ExtendedOrderItemChange } from "../types";

export const selectItemChanges = async (packageItemChangeId: string) => {
    const { data, error } = await supabase
        .from("item_changes")
        .select("*,  items (*)")
        .eq("id", packageItemChangeId)
        .single();

    if (error) {
        throw error;
    }
    return data;
};

export const selectItemChangesQueryKey = (packageItemChangeId: string) => ({
    queryKey: ["select-item-changes", packageItemChangeId],
});

export const selectItemChangesQueryOptions = (packageItemChangeId: string) => {
    return queryOptions({
        ...selectItemChangesQueryKey(packageItemChangeId),
        queryFn: () => selectItemChanges(packageItemChangeId),
    });
};

export const useSelectItemChanges = (packageItemChangeId: string) =>
    useSuspenseQuery(selectItemChangesQueryOptions(packageItemChangeId));
