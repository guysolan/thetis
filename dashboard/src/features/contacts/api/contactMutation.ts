import { supabase } from "@/lib/supabase";
import { Contact } from "../types";

export const insertUpsertContact = async (
    in_contact: Contact["Insert"],
    in_operation: "insert" | "upsert",
) => {
    const { data: contactData, error: contactError } = await supabase
        .from("contacts")
        .upsert(
            {
                ...in_contact,
            },
            {
                onConflict: in_operation === "upsert" ? "id" : undefined,
                ignoreDuplicates: in_operation === "insert",
            },
        )
        .select("*")
        .single();

    if (contactError) throw contactError;
    if (!contactData) throw new Error("No data returned from contact upsert");

    return contactData;
};
