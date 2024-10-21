import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed

export const selectAmazonReports = async (
    countryCode: string,
) => {
    const { data, error } = await supabase.functions.invoke(
        "amazon-reports",
        {
            body: {
                countryCode,
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

    return data as { date: string; flatFile: any; flatFileV2: any; xml: any }[];
};

export const selectAmazonReportsQueryOptions = (
    countryCode: string,
) => {
    return queryOptions({
        queryKey: ["amazonReport", countryCode] as const,
        queryFn: () => selectAmazonReports(countryCode),
    });
};

export const useAmazonReports = (
    countryCode: string,
) => {
    return useSuspenseQuery(selectAmazonReportsQueryOptions(countryCode));
};
