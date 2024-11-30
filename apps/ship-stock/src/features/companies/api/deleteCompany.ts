import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { selectCompaniesQueryKey } from "./selectCompanies";

const deleteCompany = async (id: number) => {
    const { error } = await supabase.from("companies").delete().eq("id", id);
    if (error) throw error;
};

export const useDeleteCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCompany,
        onSuccess: () => {
            toast.success("Company deleted successfully");
            queryClient.invalidateQueries(selectCompaniesQueryKey);
        },
        onError: () => {
            toast.error("Error deleting company");
        },
    });
};
