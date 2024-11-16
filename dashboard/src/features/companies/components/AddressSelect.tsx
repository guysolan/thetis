import Select from "@/components/Select";
import { Pencil, Plus } from "lucide-react";
import AddressForm from "../../stockpiles/components/AddressForm";
import TooltipDialog from "../../../components/TooltipDialog";

interface AddressSelectProps {
    label: string;
    type: "shipping" | "billing";
    getFieldName: (type: "company" | "shipping" | "billing") => string;
    getAddressOptions: () => { label: string; value: string }[];
    getSelectedAddress: (type: "shipping" | "billing") => any;
    form: any;
}

const AddressSelect = ({
    label,
    type,
    getFieldName,
    getAddressOptions,
    getSelectedAddress,
    form,
}: AddressSelectProps) => {
    return (
        <div className="flex flex-row items-end gap-2 w-full">
            <Select
                label={label}
                name={getFieldName(type)}
                options={getAddressOptions()}
            />
            <div className="flex gap-2">
                {getSelectedAddress(type) && (
                    <TooltipDialog
                        icon={<Pencil size={20} />}
                        tooltipText="Edit Address"
                    >
                        <AddressForm
                            operation="update"
                            companyId={form.watch(getFieldName("company"))}
                            address={getSelectedAddress(type)}
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
                    />
                </TooltipDialog>
            </div>
        </div>
    );
};

export default AddressSelect;
