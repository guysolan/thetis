import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed
import type { AmazonReport } from "../components/AmazonReportById";

export const selectAmazonReports = async () => {
    const { data, error } = await supabase.from("amazon_reports").select("*");
    if (error) {
        console.error(error);
        throw new Error("Error fetching amazon reports");
    }
    return data as AmazonReport[];
};

export const selectAmazonReportsQueryOptions = () => {
    return queryOptions({
        queryKey: ["amazon-reports"] as const,
        queryFn: () => selectAmazonReports(),
    });
};

export const useAmazonReports = () => {
    return useSuspenseQuery(
        selectAmazonReportsQueryOptions(),
    );
};
