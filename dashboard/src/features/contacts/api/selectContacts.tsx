import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const selectContacts = async () => {
    const { data, error } = await supabase.from("contacts").select(
        "*, companies(*)",
    );

    if (error) {
        throw error;
    }
    return data;
};

export const selectContactsQueryKey = { queryKey: ["select-contacts"] };

export const selectContactsQueryOptions = () => {
    return queryOptions({
        ...selectContactsQueryKey,
        queryFn: selectContacts,
    });
};

export const useSelectContacts = () => {
    return useSuspenseQuery({
        ...selectContactsQueryKey,
        queryFn: selectContacts,
    });
};
