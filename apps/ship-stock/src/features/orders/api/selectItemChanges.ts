import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { ExtendedOrderItemChange } from "../types";

export const selectItemChanges = async (packageItemChangeId: string | null) => {
    if (!Number(packageItemChangeId)) {
        return null;
    }
    const { data, error } = await supabase
        .from("item_changes")
        .select("*,  items (*)")
        .eq("id", Number(packageItemChangeId))
        .maybeSingle();

    if (error) {
        throw error;
    }
    return data;
};

export const selectItemChangesQueryKey = (
    packageItemChangeId: string | null,
) => ({
    queryKey: ["select-item-changes", packageItemChangeId],
});

export const selectItemChangesQueryOptions = (
    packageItemChangeId: string | null,
) => {
    return queryOptions({
        ...selectItemChangesQueryKey(packageItemChangeId),
        queryFn: () => selectItemChanges(packageItemChangeId),
    });
};

export const useSelectItemChanges = (packageItemChangeId: string | null) =>
    useSuspenseQuery(selectItemChangesQueryOptions(packageItemChangeId));
