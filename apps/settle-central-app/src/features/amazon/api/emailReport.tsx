import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { EmailFormValue } from "../components/EmailPdfDialog";
import { toast } from "sonner";

const emailAmazonReport = async (values: EmailFormValue) => {
    const { data, error } = await supabase.functions.invoke(
        "email-amazon-report",
        {
            body: values,
        },
    );
    if (error) {
        throw new Error("Failed to send email");
    }
    return data;
};
export const useEmailAmazonReport = () =>
    useMutation({
        mutationFn: async (values: EmailFormValue) => emailAmazonReport(values),
        onSuccess: () => {
            toast.success("Report sent successfully");
        },
        onError: (error) => {
            toast.error("Failed to send report", {
                description: error.message,
            });
        },
    });
