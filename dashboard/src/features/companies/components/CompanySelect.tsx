import { useFormContext } from "react-hook-form";
import Select from "@/components/Select";
import { useSelectCompanies } from "../api/selectCompanies";
import { Pencil, Plus } from "lucide-react";
import TooltipDialog from "@/components/TooltipDialog";
import CompanyForm from "./CompanyForm";

interface Props {
    name: string;
}

const CompanySelect = ({ name }: Props) => {
    const form = useFormContext();
    const { data: companies = [] } = useSelectCompanies();

    const getSelectedCompany = () => {
        const companyId = form.watch(name);
        return companies?.find((c) => String(c.id) === companyId);
    };

    return (
        <div className="flex flex-row items-end gap-2 w-full">
            <Select
                label="Company"
                name={name}
                options={(companies || []).map((c) => ({
                    label: c.name,
                    value: String(c.id),
                }))}
            />
            {getSelectedCompany() && (
                <TooltipDialog
                    icon={<Pencil size={20} />}
                    tooltipText={"Edit Company"}
                >
                    <CompanyForm company={getSelectedCompany()} />
                </TooltipDialog>
            )}
            <TooltipDialog
                icon={<Plus size={20} />}
                tooltipText={"Add Company"}
            >
                <CompanyForm />
            </TooltipDialog>
        </div>
    );
};

export default CompanySelect;
