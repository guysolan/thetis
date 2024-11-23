import Select from "@/components/Select";
import { Pencil, Plus } from "lucide-react";
import AddressForm from "../../stockpiles/components/AddressForm";
import TooltipDialog from "../../../components/TooltipDialog";
import { closeDialog } from "../../../utils/closeDialog";

interface AddressSelectProps {
    label: string;
    type: "shipping" | "billing";
    getFieldName: (type: "company" | "shipping" | "billing") => string;
    getAddressOptions: () => { label: string; value: string }[];
    getSelectedAddress: (type: "shipping" | "billing") => any;
    form: any;
}

const AddressSelectAddEdit = ({
    label,
    type,
    getFieldName,
    getAddressOptions,
    getSelectedAddress,
    form,
}: AddressSelectProps) => {
    const onCompanySuccess = (companyId: number) => {
        form.setValue(getFieldName("company"), String(companyId));
    };
    return (
        <div className="flex flex-row items-end gap-2 w-full">
            <div className="flex-1 min-w-0">
                <Select
                    label={label}
                    name={getFieldName(type)}
                    options={getAddressOptions()}
                />
            </div>
            <div className="flex flex-shrink-0 gap-2">
                {getSelectedAddress(type) && (
                    <TooltipDialog
                        icon={<Pencil size={20} />}
                        tooltipText="Edit Address"
                    >
                        <AddressForm
                            operation="upsert"
                            companyId={form.watch(getFieldName("company"))}
                            address={getSelectedAddress(type)}
                            onSuccess={onCompanySuccess}
                        />
                    </TooltipDialog>
                )}
                <TooltipDialog
                    icon={<Plus size={20} />}
                    tooltipText="Add Address"
                >
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
