import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { AmazonReport } from "../components/AmazonReportById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const saveAmazonReport = async (
    region: string,
    report: AmazonReport,
) => {
    console.log("report", report);
    const toastId = toast("Saving report...", {
        duration: Number.Infinity,
        description: `Saving report ${report.report_id}...`,
    });

    try {
        const { data, error } = await supabase.functions.invoke(
            "save-amazon-report",
            {
                body: { report, region },
            },
        );
        if (error) throw error;

        toast.success("Report saved successfully!", {
            id: toastId,
            description: `Report ${report.report_id} saved successfully!`,
        });
        return data;
    } catch (error) {
        toast.error("Error saving report", {
            id: toastId,
            description: `Error saving report ${report.report_id}`,
        });
        throw error;
    }
};

export const useSaveAmazonReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (
            {
                region,
                report,
            }: { region: string; report: AmazonReport },
        ) => saveAmazonReport(region, report),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["amazon-reports"] });
        },
    });
};
