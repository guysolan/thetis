import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // Adjust the import path as needed

export const selectDownloadedAmazonReports = async () => {
    const { data, error } = await supabase.from("amazon_reports").select("*");
    if (error) throw error;
    return data;
};

export const useDownloadedAmazonReports = () => {
    return useSuspenseQuery({
        queryKey: ["amazon-reports"],
        queryFn: selectDownloadedAmazonReports,
    });
};
