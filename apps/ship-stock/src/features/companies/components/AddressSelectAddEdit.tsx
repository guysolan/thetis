import { Pencil, Plus } from "lucide-react";
import AddressForm from "../../stockpiles/components/AddressForm";
import TooltipDialog from "../../../components/TooltipDialog";
import { CompanyAddressSelect } from "./CompanyAddressSelect";

interface AddressSelectProps {
  label: string;
  type: "shipping" | "billing";
  getFieldName: (type: "company" | "shipping" | "billing") => string;
  getAddressOptions: () => { label: string; value: string }[];
  getSelectedAddress: (type: "shipping" | "billing") => any;
  form: any;
  companyId: number;
}

const AddressSelectAddEdit = ({
  label,
  type,
  getFieldName,
  getSelectedAddress,
  form,
  companyId,
}: AddressSelectProps) => {
  const onCompanySuccess = (companyId: number) => {
    form.setValue(getFieldName("company"), String(companyId));
  };
  return (
    <div className="flex flex-row items-center gap-2 w-full">
      <div className="flex-1 min-w-0">
        <CompanyAddressSelect
          value={form.watch(getFieldName(type))}
          companyId={companyId}
          onChange={(value) => form.setValue(getFieldName(type), value)}
          placeholder={`Select ${label.toLowerCase()}...`}
          error={form.formState.errors[getFieldName(type)]?.message}
        />
      </div>
      <div className="flex shrink-0 gap-2">
        {getSelectedAddress(type) && (
          <TooltipDialog icon={<Pencil size={16} />} tooltipText="Edit Address">
            <AddressForm
              operation="upsert"
              companyId={form.watch(getFieldName("company"))}
              address={getSelectedAddress(type)}
              onSuccess={onCompanySuccess}
            />
          </TooltipDialog>
        )}
        <TooltipDialog icon={<Plus size={16} />} tooltipText="Add Address">
          <AddressForm
            operation="insert"
            companyId={form.watch(getFieldName("company"))}
            address={null}
            onSuccess={onCompanySuccess}
          />
        </TooltipDialog>
      </div>
    </div>
  );
};

export default AddressSelectAddEdit;
