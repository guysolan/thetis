import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed
import type { AmazonReport } from "../components/AmazonReportById";

export const selectAmazonReports = async () => {
    const { data, error } = await supabase.functions.invoke(
        "amazon-reports",
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

export const selectAmazonReportsQueryOptions = () => {
    return queryOptions({
        queryKey: ["amazonReport"] as const,
        queryFn: () => selectAmazonReports(),
    });
};

export const useAmazonReports = () => {
    return useSuspenseQuery(
        selectAmazonReportsQueryOptions(),
    );
};
