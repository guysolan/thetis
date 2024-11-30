import Select from "@/components/Select";
import { Pencil, Plus } from "lucide-react";
import CompanyContactForm from "../../contacts/components/CompanyContactForm";
import TooltipDialog from "../../../components/TooltipDialog";
import { useSelectContacts } from "../../contacts/api/selectContacts";

interface ContactSelectProps {
    label: string;
    getFieldName: (type: "contact" | "company") => string;
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
    const { data: contacts } = useSelectContacts();

    const companyId = form.watch(getFieldName("company"));
    const contactId = form.watch(getFieldName("contact"));
    const contact = contacts.find((c) => String(c.id) === String(contactId));

    const onSuccess = (contactData: number | { id: number }) => {
        const fieldName = getFieldName("contact");
        const contactId = typeof contactData === "number"
            ? contactData
            : contactData.id;
        console.log(fieldName, contactId);
        form.setValue(fieldName, String(contactId));
    };

    return (
        <div className="flex flex-row items-end gap-2 w-full">
            <Select
                label={label}
                name={getFieldName("contact")}
                options={getContactOptions()}
            />
            <div className="flex gap-2">
                {contactId && (
                    <TooltipDialog
                        icon={<Pencil size={20} />}
                        tooltipText="Edit Contact"
                    >
                        <CompanyContactForm
                            operation="upsert"
                            companyId={companyId}
                            contact={contact}
                            onSuccess={onSuccess}
                        />
                    </TooltipDialog>
                )}
                <TooltipDialog
                    icon={<Plus size={20} />}
                    tooltipText="Add Contact"
                >
                    <CompanyContactForm
                        operation="insert"
                        companyId={companyId}
                        contact={null}
                        onSuccess={onSuccess}
                    />
                </TooltipDialog>
            </div>
        </div>
    );
};

export default ContactSelect;
