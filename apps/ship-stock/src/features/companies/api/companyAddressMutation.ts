import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { InsertAddress } from "../../stockpiles/types";
import { selectAddressesQueryKey } from "../../stockpiles/api/selectAddresses";
import { selectCompaniesQueryKey } from "./selectCompanies";
import { insertUpsertAddress } from "../../stockpiles/api/addressMutation";
import { selectStockpilesQueryKey } from "../../stockpiles/api/selectStockpiles";

const insertUpsertCompanyAddress = async (
    { address, companyId, operation }: {
        address: InsertAddress;
        operation: "insert" | "upsert";
        companyId: number;
    },
) => {
    const addressWithCompany = {
        ...address,
        company_id: companyId,
    };

    return insertUpsertAddress(addressWithCompany, operation);
};

export const useCompanyAddressMutation = (operation: "insert" | "upsert") => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { address: InsertAddress; companyId: number }) =>
            insertUpsertCompanyAddress({ ...data, operation: operation }),
        onError: () => {
            toast.error("Error saving company address");
        },
        onSuccess: (data, mutation) => {
            toast.success("Company address saved");
            mutation?.onSuccess && mutation?.onSuccess(data.id);
        },
        onSettled: () => {
            queryClient.invalidateQueries(selectAddressesQueryKey);
            queryClient.invalidateQueries(selectStockpilesQueryKey);
            queryClient.invalidateQueries(selectCompaniesQueryKey);
        },
    });
};
