import Select from "@/components/Select";
import { Pencil, Plus } from "lucide-react";
import CompanyContactForm from "../../contacts/components/CompanyContactForm";
import TooltipDialog from "../../../components/TooltipDialog";

interface ContactSelectProps {
    label: string;
    getFieldName: (type: "contact") => string;
    getContactOptions: () => { label: string; value: string }[];
    getSelectedContact: () => any;
    form: any;
}

const ContactSelect = ({
    label,
    getFieldName,
    getContactOptions,
    getSelectedContact,
    form,
}: ContactSelectProps) => {
    return (
        <div className="flex flex-row items-end gap-2 w-full">
            <Select
                label={label}
                name={getFieldName("contact")}
                options={getContactOptions()}
            />
            <div className="flex gap-2">
                {getSelectedContact() && (
                    <TooltipDialog
                        icon={<Pencil size={20} />}
                        tooltipText="Edit Contact"
                    >
                        <CompanyContactForm
                            operation="upsert"
                            companyId={form.watch(getFieldName("company"))}
                            contact={getSelectedContact()}
                        />
                    </TooltipDialog>
                )}
                <TooltipDialog
                    icon={<Plus size={20} />}
                    tooltipText="Add Contact"
                >
                    <CompanyContactForm
                        operation="insert"
                        companyId={form.watch(getFieldName("contact"))}
                        contact={null}
                    />
                </TooltipDialog>
            </div>
        </div>
    );
};

export default ContactSelect;
