import { useFormContext } from "react-hook-form";
import { useSelectCompanies } from "../api/selectCompanies";
import { useSelectAddresses } from "../../stockpiles/api/selectAddresses";
import { useSelectContacts } from "../../contacts/api/selectContacts";

export const useCompanyForm = (direction: "to" | "from") => {
    const form = useFormContext();
    const { data: companies = [] } = useSelectCompanies();
    const { data: addresses = [] } = useSelectAddresses();
    const { data: contacts = [] } = useSelectContacts();

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

    const getSelectedAddress = (type: "shipping" | "billing") => {
        const addressId = form.watch(getFieldName(type));
        return addresses?.find(
            (addr) => String(addr.id) === addressId,
        );
    };

    const getContactOptions = () => {
        return contacts.map((cont) => ({
            label: cont.name,
            value: String(cont.id),
        }));
    };

    const getSelectedContact = () => {
        const contactId = form.watch(getFieldName("contact"));
        return contacts?.find(
            (cont) => String(cont.id) === contactId,
        )?.name;
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
