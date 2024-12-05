import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteAmazonReport = async (in_report_id: string) => {
    // Delete both CSV and PDF from storage
    const { error: storageError } = await supabase.storage
        .from("amazon-reports")
        .remove([`${in_report_id}.csv`, `${in_report_id}.pdf`]);

    if (storageError) throw storageError;

    // Then delete from the database
    const { error: dbError } = await supabase
        .from("amazon_reports")
        .delete()
        .eq("report_id", in_report_id);

    if (dbError) throw dbError;

    return { success: true };
};

export const useDeleteAmazonReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ reportId }: { reportId: string }) =>
            deleteAmazonReport(reportId),
        onSuccess: () => {
            toast.success("Report deleted");
        },
        onError: () => {
            toast.error("Error deleting report");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["amazon-reports"] });
        },
    });
};
