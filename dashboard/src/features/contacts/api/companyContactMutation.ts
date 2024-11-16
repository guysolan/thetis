import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Contact } from "../types";
import { selectContactsQueryKey } from "./selectContacts";
import { selectCompaniesQueryKey } from "../../companies/api/selectCompanies";
import { insertUpsertContact } from "./contactMutation";

const insertUpsertCompanyContact = async (
    { contact, companyId, operation }: {
        contact: Contact["Insert"];
        operation: "insert" | "upsert";
        companyId: number;
    },
) => {
    const contactData = await insertUpsertContact({
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
    }, operation);

    const { error: relationError } = await supabase
        .from("company_contacts")
        .upsert({
            company_id: companyId,
            contact_id: contactData.id,
        });

    if (relationError) throw relationError;

    return contactData;
};

export const useCompanyContactMutation = (operation: "insert" | "upsert") => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { contact: Contact["Insert"]; companyId: number }) =>
            insertUpsertCompanyContact({ ...data, operation: operation }),
        onError: () => {
            toast.error("Error saving company contact");
        },
        onSuccess: () => {
            toast.success("Company contact saved");
        },
        onSettled: () => {
            queryClient.invalidateQueries(selectContactsQueryKey);
            queryClient.invalidateQueries(selectCompaniesQueryKey);
        },
    });
};
