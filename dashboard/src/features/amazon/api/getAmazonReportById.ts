import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed
import type { AmazonReport } from "../components/AmazonReportById";
export const selectAmazonReportById = async (
    reportId?: string,
    region?: string,
) => {
    const { data, error } = await supabase.functions.invoke(
        "amazon-report-by-id",
        {
            body: {
                reportId,
                region,
            },
        },
    );

    if (error) {
        throw error;
    }

    return data as AmazonReport;
};

export const selectAmazonReportByIdQueryOptions = (
    reportId?: string,
    region?: string,
) => {
    return queryOptions({
        queryKey: ["amazonReport", reportId, region] as const,
        queryFn: () => selectAmazonReportById(reportId, region),
    });
};

export const useAmazonReportById = (
    reportId?: string,
    region?: string,
) => {
    return useQuery(
        selectAmazonReportByIdQueryOptions(reportId, region),
    );
};
