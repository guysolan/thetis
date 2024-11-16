import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { selectContactsQueryKey } from "./selectContacts";

const deleteContact = async (in_id: number) => {
    const { error } = await supabase.from("contacts").delete().eq("id", in_id);
    if (error) throw error;
};

export const useDeleteContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            toast.success("Contact deleted successfully");
            queryClient.invalidateQueries(selectContactsQueryKey);
        },
        onError: () => {
            toast.error("Error deleting contact");
        },
    });
};
