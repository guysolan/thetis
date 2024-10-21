import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed

export const selectAmazonReportById = async (
    reportId?: string,
    countryCode?: string,
) => {
    const { data, error } = await supabase.functions.invoke(
        "amazon-report-by-id",
        {
            body: {
                reportId,
                countryCode,
            },
        },
    );

    if (error) {
        throw error;
    }

    return data;
};

export const selectAmazonReportByIdQueryOptions = (
    reportId?: string,
    countryCode?: string,
) => {
    return queryOptions({
        queryKey: ["amazonReport", reportId, countryCode] as const,
        queryFn: () => selectAmazonReportById(reportId, countryCode),
    });
};

export const useAmazonReportById = (
    reportId?: string,
    countryCode?: string,
) => {
    return useQuery(
        selectAmazonReportByIdQueryOptions(reportId, countryCode),
    );
};
