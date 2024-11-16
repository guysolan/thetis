import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const useCompanyAutoFill = (
    direction: "to" | "from",
    getSelectedCompany: () => any,
    getFieldName: (
        type: "company" | "shipping" | "billing" | "contact",
    ) => string,
) => {
    const form = useFormContext();
    const companyId = form.watch(
        direction === "to" ? "to_company_id" : "from_company_id",
    );
    useEffect(() => {
        if (!companyId) return;

        const selectedCompany = getSelectedCompany();
        const addresses = selectedCompany?.addresses || [];
        const contacts = selectedCompany?.contacts || [];

        const billing = getFieldName("billing");
        const shipping = getFieldName("shipping");
        const contact = getFieldName("contact");

        // Clear existing values
        form.setValue(billing, "");
        form.setValue(shipping, "");
        form.setValue(contact, "");

        // Set default shipping address
        const defaultShipping = addresses.find((a) => a.is_default_shipping);
        if (defaultShipping?.id) {
            form.setValue(
                shipping,
                String(defaultShipping.id),
            );
        } else if (addresses.length === 1) {
            form.setValue(
                shipping,
                String(addresses[0].id),
            );
        }
        // Set default billing address
        const defaultBilling = addresses.find((a) => a.is_default_billing);
        if (defaultBilling) {
            form.setValue(
                billing,
                String(defaultBilling.id),
            );
        } else if (addresses.length === 1) {
            form.setValue(
                billing,
                String(addresses[0].id),
            );
        }

        // Set default contact
        const defaultContact = contacts.find((c) => c.is_default);
        if (defaultContact) {
            form.setValue(
                contact,
                String(defaultContact.id),
            );
        } else if (contacts.length === 1) {
            form.setValue(
                contact,
                String(contacts[0].id),
            );
        }
    }, [companyId]);
};
