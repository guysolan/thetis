import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { selectAddressesQueryKey } from "./selectAddresses";
import { selectCompaniesQueryKey } from "../../companies/api/selectCompanies";
import { toast } from "sonner";

export const deleteAddress = async (addressId: number) => {
    const { data, error } = await supabase.from("addresses").delete()
        .eq("id", addressId);
    if (error) throw error;
    return data;
};

const useDeleteAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAddress,
        onSuccess: () => {
            toast.success("Address deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete address");
        },
        onSettled: () => {
            queryClient.invalidateQueries(selectCompaniesQueryKey);
            queryClient.invalidateQueries(selectAddressesQueryKey);
        },
    });
};

export default useDeleteAddress;
