import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed
import type { AmazonReport } from "../components/AmazonReportById";

type AmazonReportById = {
    reportId?: string;
    region?: string;
    country?: string;
};

export const selectAmazonReportById = async ({
    reportId,
    region,
    country,
}: AmazonReportById) => {
    const { data, error } = await supabase.functions.invoke(
        "amazon-report-by-id",
        {
            body: {
                reportId,
                region,
                country,
            },
        },
    );

    if (error) {
        throw error;
    }

    return data as AmazonReport;
};

export const selectAmazonReportByIdQueryOptions = (
    props: AmazonReportById,
) => {
    return queryOptions({
        queryKey: ["amazonReport", props] as const,
        queryFn: () => selectAmazonReportById(props),
    });
};

export const useAmazonReportById = (props: AmazonReportById) => {
    return useQuery(
        selectAmazonReportByIdQueryOptions(props),
    );
};
