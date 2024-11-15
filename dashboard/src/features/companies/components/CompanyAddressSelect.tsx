import { useFormContext } from "react-hook-form";
import Select from "@/components/Select";
import { useSelectCompanies } from "../api/selectCompanies";
import { useEffect } from "react";

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
        const selectedCompany = companies?.find((c) => String(c.id) === companyId);
        const addresses = selectedCompany?.addresses || [];
        
        return addresses.map(addr => ({
            label: addr.name || addr.street,
            value: String(addr.id)
        }));
    };

    // Auto-fill addresses when there's only one option
    useEffect(() => {
        const companyId = form.watch(getFieldName("company"));
        const selectedCompany = companies?.find((c) => String(c.id) === companyId);
        const addresses = selectedCompany?.addresses || [];

        if (addresses.length === 1) {
            const addressId = String(addresses[0].id);
            form.setValue(getFieldName("shipping"), addressId);
            form.setValue(getFieldName("billing"), addressId);
        }
    }, [form.watch(getFieldName("company"))]);

    return (
        <>
            <Select
                label="Company"
                name={getFieldName("company")}
                options={(companies || []).map((c) => ({ label: c.name, value: String(c.id) }))}
            />
            <Select
                label="Shipping Address"
                name={getFieldName("shipping")}
                options={getAddressOptions()}
            />
            <Select
                label="Billing Address"
                name={getFieldName("billing")}
                options={getAddressOptions()}
            />
        </>
    );
};

export default CompanyAddressSelect;
