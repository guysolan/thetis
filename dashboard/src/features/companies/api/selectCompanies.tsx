import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const selectCompanies = async () => {
    const { data, error } = await supabase.from("companies").select(`
        *,
        addresses:company_addresses(
            address:addresses(*),
            is_default_shipping,
            is_default_billing
        ),
        contacts:company_contacts(
            contact:contacts(*),
            is_default
        )
    `);

    if (error) {
        throw error;
    }
    return data;
};

export const selectCompaniesQueryKey = { queryKey: ["select-companies"] };

export const selectCompaniesQueryOptions = () => {
    return queryOptions({
        ...selectCompaniesQueryKey,
        queryFn: selectCompanies,
    });
};

export const useSelectCompanies = () => {
    return useSuspenseQuery({
        ...selectCompaniesQueryKey,
        queryFn: selectCompanies,
    });
};
