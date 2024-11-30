import { useQuery } from "@tanstack/react-query";
import { getUserCompany } from "../api/companyUsers";
import { usePublicUser } from "../../auth/hooks/usePublicUser";

export function useUserCompany(userId?: string | undefined) {
    const { data: publicUser } = usePublicUser();
    const id = userId ?? String(publicUser?.id);
    return useQuery({
        queryKey: ["userCompany", id],
        queryFn: () => getUserCompany(id),
        enabled: !!id,
    });
}
