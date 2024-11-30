import { supabase } from "@/lib/supabase";

export async function getUserCompany(userId: string) {
    const { data, error } = await supabase
        .from("company_users")
        .select("company_id")
        .eq("user_id", userId)
        .single();

    if (error) throw error;
    return data;
}

export async function updateUserCompany(userId: string, companyId: number) {
    const { error } = await supabase
        .rpc("change_user_company", {
            in_user_id: userId,
            in_new_company_id: companyId,
        });

    if (error) throw error;
}
