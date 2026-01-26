import React from "react";
import { usePublicUser } from "../../auth/hooks/usePublicUser";
import { useUserCompany } from "./useUserCompany";
const useMyCompanyId = () => {
  const { data: publicUser, isLoading: isLoadingUser } = usePublicUser();
  const { data: companyUser } = useUserCompany(publicUser?.id);
  return companyUser?.company_id.toString() ?? "";
};

export default useMyCompanyId;
