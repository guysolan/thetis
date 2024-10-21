import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed

export const selectAmazonFinances = async (year: number, month: number) => {
    const { data, error } = await supabase.functions.invoke(
        "amazon-finances",
        {
            body: {
                year: year,
                month: month,
            },
        },
    );

    if (error) {
        throw new Error(
            `Error fetching seller central finances: ${error.message}`,
        );
    }

    return data;
};

export const selectAmazonFinancesQueryOptions = (
    year: number,
    month: number,
) => {
    return queryOptions({
        queryKey: ["amazonFinances", year, month] as const,
        queryFn: () => selectAmazonFinances(year, month),
    });
};

export const useAmazonFinances = (year: number, month: number) =>
    useSuspenseQuery(selectAmazonFinancesQueryOptions(year, month));
