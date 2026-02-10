import { useFormContext } from "react-hook-form";
import Select from "@/components/Select";
import { useSelectCompanies } from "../api/selectCompanies";
import { Pencil, Plus } from "lucide-react";
import TooltipDialog from "@/components/TooltipDialog";
import CompanyForm from "./CompanyForm";

interface Props {
  name: string;
}

const CompanySelectAddEdit = ({ name }: Props) => {
  const form = useFormContext();
  const { data: companies = [] } = useSelectCompanies();

  const getSelectedCompany = () => {
    const companyId = form.watch(name);
    return companies?.find((c) => String(c.id) === companyId);
  };

  return (
    <div className="flex flex-row items-center gap-2 w-full">
      <div className="flex-1 min-w-0">
        <Select
          label="Company"
          name={name}
          options={(companies || []).map((c) => ({
            label: c.name,
            value: String(c.id),
          }))}
        />
      </div>
      {getSelectedCompany() && (
        <TooltipDialog icon={<Pencil size={16} />} tooltipText="Edit Company">
          <CompanyForm company={getSelectedCompany()} />
        </TooltipDialog>
      )}
      <TooltipDialog icon={<Plus size={16} />} tooltipText="Add Company">
        <CompanyForm />
      </TooltipDialog>
    </div>
  );
};

export default CompanySelectAddEdit;
