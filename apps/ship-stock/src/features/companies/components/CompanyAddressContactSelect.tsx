import CompanySelectAddEdit from "./CompanySelectAddEdit";
import AddressSelectAddEdit from "./AddressSelectAddEdit";
import ContactSelect from "./ContactSelect";

interface CompanyAddressContactSelectProps {
    companyId: number;
    getFieldName: (
        type: "company" | "shipping" | "billing" | "contact",
    ) => string;
    getAddressOptions: () => { label: string; value: string }[];
    getSelectedAddress: (type: "shipping" | "billing") => any;
    getContactOptions: () => { label: string; value: string }[];
    getSelectedContact: () => any;
    form: any;
    onDone: () => void;
}

export const CompanyAddressContactSelect = ({
    companyId,
    getFieldName,
    getAddressOptions,
    getSelectedAddress,
    getContactOptions,
    getSelectedContact,
    form,
    onDone,
}: CompanyAddressContactSelectProps) => {
    return (
        <div className="space-y-4 w-full">
            <CompanySelectAddEdit name={getFieldName("company")} />
            <AddressSelectAddEdit
                label="Shipping Address"
                type="shipping"
                companyId={companyId}
                getFieldName={getFieldName}
                getAddressOptions={getAddressOptions}
                getSelectedAddress={getSelectedAddress}
                form={form}
            />
            <AddressSelectAddEdit
                label="Billing Address"
                type="billing"
                companyId={companyId}
                getFieldName={getFieldName}
                getAddressOptions={getAddressOptions}
                getSelectedAddress={getSelectedAddress}
                form={form}
            />
            <ContactSelect
                label="Contact"
                getFieldName={getFieldName}
                getContactOptions={getContactOptions}
                getSelectedContact={getSelectedContact}
                form={form}
            />
        </div>
    );
};
