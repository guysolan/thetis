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
            const { error } = await supabase.rpc(
                "set_default_shipping_address",
                {
                    in_company_id: companyId,
                    in_address_id: addressId,
                },
            );
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
            const { error } = await supabase.rpc(
                "set_default_billing_address",
                {
                    in_company_id: companyId,
                    in_address_id: addressId,
                },
            );
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
            const { error } = await supabase.rpc("set_default_contact", {
                in_company_id: companyId,
                in_contact_id: contactId,
            });
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
