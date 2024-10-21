import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed

export const selectAmazonReportByIdAsXML = async (
    reportId?: string,
    countryCode?: string,
) => {
    const { data, error } = await supabase.functions.invoke(
        "amazon-report-by-id-as-xml",
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

export const selectAmazonReportByIdAsXMLQueryOptions = (
    reportId?: string,
    countryCode?: string,
) => {
    return queryOptions({
        queryKey: ["amazonReport", reportId, countryCode] as const,
        queryFn: () => selectAmazonReportByIdAsXML(reportId, countryCode),
    });
};

export const useAmazonReportByIdAsXML = (
    reportId?: string,
    countryCode?: string,
) => {
    return useQuery(
        selectAmazonReportByIdAsXMLQueryOptions(reportId, countryCode),
    );
};
