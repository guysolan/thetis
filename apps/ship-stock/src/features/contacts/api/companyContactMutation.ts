import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Contact } from "../types";
import { selectContactsQueryKey } from "./selectContacts";
import { selectCompaniesQueryKey } from "../../companies/api/selectCompanies";
import { insertUpsertContact } from "./contactMutation";

const insertUpsertCompanyContact = async (
    contact: Contact["Insert"],
    operation: "insert" | "upsert",
) => {
    const data = await insertUpsertContact({
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        company_id: contact.company_id,
    }, operation);
    return data;
};

export const useCompanyContactMutation = (operation: "insert" | "upsert") => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Contact["Insert"]) =>
            insertUpsertCompanyContact(data, operation),
        onError: () => {
            toast.error("Error saving company contact");
        },
        onSuccess: (data) => {
            const contactId = data.id;
            toast.success("Company contact saved");
            return contactId;
        },
        onSettled: () => {
            queryClient.invalidateQueries(selectContactsQueryKey);
            queryClient.invalidateQueries(selectCompaniesQueryKey);
        },
    });
};
