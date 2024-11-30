import { usePublicUser } from "@/features/auth/hooks/usePublicUser";
import { useUserCompany } from "../hooks/useUserCompany";
import { useUpdateUserCompany } from "../hooks/useChangeUserCompany";
import { useSelectCompanies } from "../api/selectCompanies";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@thetis/ui/select";

const MyCompany = () => {
    const { data: publicUser, isLoading: isLoadingUser } = usePublicUser();
    const { data: companyUser } = useUserCompany(publicUser?.id);
    const { mutate: updateCompany } = useUpdateUserCompany();
    const { data: companies = [] } = useSelectCompanies();

    const handleCompanyChange = (value: string) => {
        if (!publicUser) return;

        const newCompanyId = parseInt(value);
        updateCompany({ userId: publicUser.id, companyId: newCompanyId });
    };

    if (isLoadingUser) return null;

    return (
        <Select
            value={companyUser?.company_id?.toString()}
            onValueChange={handleCompanyChange}
        >
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
                {companies.map((company) => (
                    <SelectItem
                        key={company.id}
                        value={company.id.toString()}
                    >
                        {company.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default MyCompany;
