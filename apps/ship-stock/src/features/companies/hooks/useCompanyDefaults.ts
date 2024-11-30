import React from "react";
import { useUserCompany } from "./useUserCompany";
import { useFormContext, useFormState } from "react-hook-form";

const useCompanyDefaults = (
    { fieldName }: { fieldName?: "to_company_id" | "from_company_id" },
) => {
    const { data: companyUser } = useUserCompany();
    const form = useFormContext();
    const orderType = form.watch("order_type");
    // Set user's company when component mounts
    React.useEffect(() => {
        if (companyUser?.company_id) {
            form.setValue(
                "company_id",
                companyUser.company_id.toString(),
            );
            console.log(`Setting ${fieldName} to ${companyUser.company_id}`);
            if (fieldName) {
                form.setValue(
                    fieldName,
                    companyUser.company_id.toString(),
                );
            }
        }
    }, [fieldName, companyUser, orderType]);
};

export default useCompanyDefaults;
