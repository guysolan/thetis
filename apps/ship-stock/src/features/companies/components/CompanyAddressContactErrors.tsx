import FormErrors from "@/components/FormErrors";

interface CompanyAddressContactErrorsProps {
    direction: "to" | "from";
}

export const CompanyAddressContactErrors = ({ direction }: CompanyAddressContactErrorsProps) => {
    const prefix = `${direction}_company`;

    return (
        <FormErrors
            title="Company Details Errors"
            fieldPrefix={prefix}
            fields={[
                `${prefix}_id`,
                `${prefix}_shipping_address_id`,
                `${prefix}_billing_address_id`,
                `${prefix}_contact_id`
            ]}
        />
    );
}; 