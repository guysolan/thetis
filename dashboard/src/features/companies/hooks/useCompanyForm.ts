import { useFormContext } from "react-hook-form";
import { useSelectCompanies } from "../api/selectCompanies";

export const useCompanyForm = (direction: "to" | "from") => {
    const form = useFormContext();
    const { data: companies = [] } = useSelectCompanies();

    const getFieldName = (
        type: "company" | "shipping" | "billing" | "contact",
    ) => {
        const prefix = direction === "to" ? "to" : "from";
        if (type === "company") return `${prefix}_${type}_id`;
        if (type === "contact") return `${prefix}_contact_id`;
        return `${prefix}_${type}_address_id`;
    };

    const getSelectedCompany = () => {
        const companyId = form.watch(getFieldName("company"));
        return companies?.find((c) => String(c.id) === companyId);
    };

    const getAddressOptions = () => {
        const selectedCompany = getSelectedCompany();
        const addresses = selectedCompany?.addresses || [];

        return addresses.map((addr) => ({
            label: `${addr.address.line_1 ? `${addr.address.line_1}, ` : ""} ${
                addr.address.line_2 ? `${addr.address.line_2}, ` : ""
            } ${
                addr.address.city
                    ? `${addr.address.city}, `
                    : "Unknown City"
            } ${addr.address.state ? `${addr.address.state}, ` : ""} ${
                addr.address.code ? `${addr.address.code}, ` : ""
            } ${addr.address.country ?? "No Country"}`,
            value: String(addr.address.id),
        }));
    };

    const getSelectedAddress = (type: "shipping" | "billing") => {
        const selectedCompany = getSelectedCompany();
        const addressId = form.watch(getFieldName(type));
        return selectedCompany?.addresses?.find(
            (addr) => String(addr.address.id) === addressId,
        )?.address;
    };

    const getContactOptions = () => {
        const selectedCompany = getSelectedCompany();
        const contacts = selectedCompany?.contacts || [];

        return contacts.map((cont) => ({
            label: cont.contact.name,
            value: String(cont.contact.id),
        }));
    };

    const getSelectedContact = () => {
        const selectedCompany = getSelectedCompany();
        const contactId = form.watch(getFieldName("contact"));
        return selectedCompany?.contacts?.find(
            (cont) => String(cont.contact.id) === contactId,
        )?.contact;
    };

    return {
        form,
        companies,
        getFieldName,
        getSelectedCompany,
        getAddressOptions,
        getSelectedAddress,
        getContactOptions,
        getSelectedContact,
    };
};
