import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { AmazonReport } from "../components/AmazonReportById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const saveAmazonReport = async (
    region: string,
    country: string,
    report: AmazonReport,
) => {
    const { data, error } = await supabase.functions.invoke(
        "save-amazon-report",
        {
            body: { report, region, country },
        },
    );
    if (error) throw error;
    return data;
};

export const useSaveAmazonReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (
            {
                region,
                country,
                report,
            }: { region: string; country: string; report: AmazonReport },
        ) => saveAmazonReport(region, country, report),
        onSuccess: () => {
            toast.success("Report saved");
        },
        onError: () => {
            toast.error("Error saving report");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["amazon-reports"] });
        },
    });
};
