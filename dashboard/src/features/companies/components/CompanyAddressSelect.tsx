import { useFormContext } from "react-hook-form";
import { useSelectCompanies } from "../api/selectCompanies";
import { useEffect } from "react";
import CompanySelect from "./CompanySelect";
import AddressSelect from "./AddressSelect";

interface Props {
    direction: "to" | "from";
}

const CompanyAddressSelect = ({ direction }: Props) => {
    const form = useFormContext();
    const { data: companies = [] } = useSelectCompanies();

    // Helper function to get field names
    const getFieldName = (type: "company" | "shipping" | "billing") => {
        const prefix = direction === "to" ? "to" : "from";
        return `${prefix}_${type}_${type === "company" ? "id" : "address_id"}`;
    };

    // Get selected company's addresses
    const getAddressOptions = () => {
        const companyId = form.watch(getFieldName("company"));
        const selectedCompany = companies?.find((c) =>
            String(c.id) === companyId
        );
        const addresses = selectedCompany?.addresses || [];

        return addresses.map((addr) => ({
            label: `${addr.line_1 ? `${addr.line_1}, ` : ""} ${
                addr.line_2 ? `${addr.line_2}, ` : ""
            } ${addr.city ? `${addr.city}, ` : "Unknown City"} ${
                addr.state ? `${addr.state}, ` : ""
            } ${addr.code ? `${addr.code}, ` : ""} ${
                addr.country ?? "No Country"
            }`,
            value: String(addr.id),
        }));
    };

    // Auto-fill addresses when there's only one option
    useEffect(() => {
        const companyId = form.watch(getFieldName("company"));
        const selectedCompany = companies?.find((c) =>
            String(c.id) === companyId
        );
        const addresses = selectedCompany?.addresses || [];

        if (addresses.length === 1) {
            const addressId = String(addresses[0].id);
            form.setValue(getFieldName("shipping"), addressId);
            form.setValue(getFieldName("billing"), addressId);
        }
    }, [form.watch(getFieldName("company"))]);

    // Helper to get selected company
    const getSelectedCompany = () => {
        const companyId = form.watch(getFieldName("company"));
        return companies?.find((c) => String(c.id) === companyId);
    };

    // Helper to get selected address
    const getSelectedAddress = (type: "shipping" | "billing") => {
        const addressId = form.watch(getFieldName(type));
        const selectedCompany = getSelectedCompany();
        return selectedCompany?.addresses?.find((a) =>
            String(a.id) === addressId
        );
    };

    return (
        <>
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
        </>
    );
};

export default CompanyAddressSelect;
