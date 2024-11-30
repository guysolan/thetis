import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed
import type { AmazonReport } from "../components/AmazonReportById";

export const selectAmazonReports = async (
    region: string,
) => {
    const { data, error } = await supabase.functions.invoke(
        "amazon-reports",
        {
            body: {
                region,
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
    region: string,
) => {
    return queryOptions({
        queryKey: ["amazonReport", region] as const,
        queryFn: () => selectAmazonReports(region),
    });
};

export const useAmazonReports = (
    region: string,
) => {
    return useSuspenseQuery(
        selectAmazonReportsQueryOptions(region),
    );
};
