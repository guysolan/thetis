import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed
import type { AmazonReport } from "../components/AmazonReportById";

export const selectAmazonReports = async (
    country: string,
) => {
    const { data, error } = await supabase.functions.invoke(
        "amazon-reports-by-country",
        {
            body: {
                country,
            },
        },
    );
    console.log(data);
    console.log(error);

    if (error) {
        console.error(error);
        throw new Error(
            `Error fetching seller central report: ${error.message}`,
        );
    }

    return data as AmazonReport[];
};

export const selectAmazonReportsQueryOptions = (
    country: string,
) => {
    return queryOptions({
        queryKey: ["amazon-reports-by-country", country] as const,
        queryFn: () => selectAmazonReports(country),
    });
};

export const useAmazonReports = (
    country: string,
) => {
    return useSuspenseQuery(
        selectAmazonReportsQueryOptions(country),
    );
};
