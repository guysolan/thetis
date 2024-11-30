import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { selectCompaniesQueryKey } from "./selectCompanies";

// Mutation hooks for setting defaults
export const useSetDefaultShipping = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            { companyId, addressId }: { companyId: number; addressId: number },
        ) => {
            // First, reset all shipping defaults for this company
            const { error: resetError } = await supabase
                .from("addresses")
                .update({ is_default_shipping: false })
                .eq("company_id", companyId);

            if (resetError) throw resetError;

            // Then set the new default
            const { error } = await supabase
                .from("addresses")
                .update({ is_default_shipping: true })
                .eq("id", addressId)
                .eq("company_id", companyId);

            if (error) throw error;
        },
        onSuccess: () => {
            toast.success("Default shipping address updated");
            queryClient.invalidateQueries(selectCompaniesQueryKey);
        },
        onError: () => {
            toast.error("Failed to update default shipping address");
        },
    });
};

export const useSetDefaultBilling = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            { companyId, addressId }: { companyId: number; addressId: number },
        ) => {
            // First, reset all billing defaults for this company
            const { error: resetError } = await supabase
                .from("addresses")
                .update({ is_default_billing: false })
                .eq("company_id", companyId);

            if (resetError) throw resetError;

            // Then set the new default
            const { error } = await supabase
                .from("addresses")
                .update({ is_default_billing: true })
                .eq("id", addressId)
                .eq("company_id", companyId);

            if (error) throw error;
        },
        onSuccess: () => {
            toast.success("Default billing address updated");
            queryClient.invalidateQueries(selectCompaniesQueryKey);
        },
        onError: () => {
            toast.error("Failed to update default billing address");
        },
    });
};

export const useSetDefaultContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            { companyId, contactId }: { companyId: number; contactId: number },
        ) => {
            // First, reset all contact defaults for this company
            const { error: resetError } = await supabase
                .from("contacts")
                .update({ is_default: false })
                .eq("company_id", companyId);

            if (resetError) throw resetError;

            // Then set the new default
            const { error } = await supabase
                .from("contacts")
                .update({ is_default: true })
                .eq("id", contactId)
                .eq("company_id", companyId);

            if (error) throw error;
        },
        onSuccess: () => {
            toast.success("Default contact updated");
            queryClient.invalidateQueries(selectCompaniesQueryKey);
        },
        onError: () => {
            toast.error("Failed to update default contact");
        },
    });
};
