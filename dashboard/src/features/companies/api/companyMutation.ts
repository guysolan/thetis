import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { selectCompaniesQueryKey } from "./selectCompanies";
import { usePublicUser } from "@/features/auth/hooks/usePublicUser";

const insertCompany = async (
    { company, userId }: { company: any; userId: string },
) => {
    const { data, error } = await supabase
        .from("companies")
        .insert({ ...company, user_id: userId })
        .select()
        .single();

    if (error) throw error;
    return data;
};

const upsertCompany = async (
    { company, userId }: { company: any; userId: string },
) => {
    const { data, error } = await supabase
        .from("companies")
        .upsert({ ...company, user_id: userId })
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const useCompanyMutation = (operation: "insert" | "upsert") => {
    const queryClient = useQueryClient();
    const { data: user } = usePublicUser();

    return useMutation({
        mutationFn: (company: any) => {
            if (!user?.id) throw new Error("User not authenticated");
            return operation === "insert"
                ? insertCompany({ company, userId: user.id })
                : upsertCompany({ company, userId: user.id });
        },
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
