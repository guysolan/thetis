import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { selectCompaniesQueryKey } from "./selectCompanies";

const insertCompany = async (company: any) => {
    const { data, error } = await supabase
        .from("companies")
        .insert(company)
        .select()
        .single();

    if (error) throw error;
    return data;
};

const upsertCompany = async (company: any) => {
    const { data, error } = await supabase
        .from("companies")
        .upsert(company)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const useCompanyMutation = (operation: "insert" | "upsert") => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: operation === "insert" ? insertCompany : upsertCompany,
        onSuccess: () => {
            toast.success("Company saved successfully");
        },
        onError: () => {
            toast.error("Error saving company");
        },
        onSettled: () => {
            queryClient.invalidateQueries(selectCompaniesQueryKey);
        },
    });
};
