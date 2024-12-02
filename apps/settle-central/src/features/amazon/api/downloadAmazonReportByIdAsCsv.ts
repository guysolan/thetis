import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed

export const selectAmazonReportByIdAsCSV = async (
    reportId?: string,
    countryCode?: string,
) => {
    const { data, error } = await supabase.functions.invoke(
        "amazon-report-by-id-as-csv",
        {
            body: {
                reportId,
                countryCode,
            },
        },
    );

    if (error) {
        throw new Error(
            `Error fetching seller central report: ${error.message}`,
        );
    }

    return data;
};

export const selectAmazonReportByIdAsCSVQueryOptions = (
    reportId?: string,
    countryCode?: string,
) => {
    return queryOptions({
        queryKey: ["amazonReport", reportId, countryCode] as const,
        queryFn: () => selectAmazonReportByIdAsCSV(reportId, countryCode),
    });
};

export const useAmazonReportByIdAsCSV = (
    reportId?: string,
    countryCode?: string,
) => {
    return useQuery(
        selectAmazonReportByIdAsCSVQueryOptions(reportId, countryCode),
    );
};
