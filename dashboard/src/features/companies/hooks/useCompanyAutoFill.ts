import { useEffect } from "react";

export const useCompanyAutoFill = (
    companyId: string,
    getSelectedCompany: () => any,
    getFieldName: (type: "company" | "shipping" | "billing" | "contact") => string,
    form: any
) => {
    useEffect(() => {
        if (!companyId) return;

        const selectedCompany = getSelectedCompany();
        const addresses = selectedCompany?.addresses || [];
        const contacts = selectedCompany?.contacts || [];

        // Clear existing values
        form.setValue(getFieldName("shipping"), "");
        form.setValue(getFieldName("billing"), "");
        form.setValue(getFieldName("contact"), "");

        // Set default shipping address
        const defaultShipping = addresses.find((a) => a.is_default_shipping);
        if (defaultShipping) {
            form.setValue(
                getFieldName("shipping"),
                String(defaultShipping.address.id),
            );
        } else if (addresses.length === 1) {
            form.setValue(
                getFieldName("shipping"),
                String(addresses[0].address.id),
            );
        }

        // Set default billing address
        const defaultBilling = addresses.find((a) => a.is_default_billing);
        if (defaultBilling) {
            form.setValue(
                getFieldName("billing"),
                String(defaultBilling.address.id),
            );
        } else if (addresses.length === 1) {
            form.setValue(
                getFieldName("billing"),
                String(addresses[0].address.id),
            );
        }

        // Set default contact
        const defaultContact = contacts.find((c) => c.is_default);
        if (defaultContact) {
            form.setValue(
                getFieldName("contact"),
                String(defaultContact.contact.id),
            );
        } else if (contacts.length === 1) {
            form.setValue(
                getFieldName("contact"),
                String(contacts[0].contact.id),
            );
        }
    }, [companyId]); 