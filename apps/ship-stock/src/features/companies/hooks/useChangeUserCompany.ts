import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserCompany } from "../api/companyUsers";
import { toast } from "sonner";

export function useUpdateUserCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            { userId, companyId }: { userId: string; companyId: number },
        ) => updateUserCompany(userId, companyId),
        onError: () => {
            toast.error("Failed to update your company");
        },
        onSuccess: (_, { userId }) => {
            toast.success("Your company updated");
            queryClient.invalidateQueries({
                queryKey: ["userCompany", userId],
            });
        },
    });
}
