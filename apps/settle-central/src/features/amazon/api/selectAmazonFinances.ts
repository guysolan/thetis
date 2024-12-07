import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed

export const selectAmazonFinances = async (
    region: "NA" | "EUR",
    year: number,
    month: number,
) => {
    const { data, error } = await supabase.functions.invoke(
        "amazon-finances",
        {
            body: {
                region: region,
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
    region: "NA" | "EUR",
    year: number,
    month: number,
) => {
    return queryOptions({
        queryKey: ["amazonFinances", region, year, month] as const,
        queryFn: () => selectAmazonFinances(region, year, month),
    });
};

export const useAmazonFinances = (
    region: "NA" | "EUR",
    year: number,
    month: number,
) => useSuspenseQuery(selectAmazonFinancesQueryOptions(region, year, month));
