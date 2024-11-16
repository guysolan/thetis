import CompanySelect from "./CompanySelect";
import AddressSelect from "./AddressSelect";
import ContactSelect from "./ContactSelect";

interface CompanyAddressExpandedViewProps {
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

export const CompanyAddressExpandedView = ({
    getFieldName,
    getAddressOptions,
    getSelectedAddress,
    getContactOptions,
    getSelectedContact,
    form,
    onDone,
}: CompanyAddressExpandedViewProps) => {
    return (
        <div className="space-y-4">
            <CompanySelect name={getFieldName("company")} />
            <AddressSelect
                label="Shipping Address"
                type="shipping"
                getFieldName={getFieldName}
                getAddressOptions={getAddressOptions}
                getSelectedAddress={getSelectedAddress}
                form={form}
            />
            <AddressSelect
                label="Billing Address"
                type="billing"
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
