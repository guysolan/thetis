import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface PublicUser {
    id: string;
    auth_user_id: string;
    // Add other public.users fields here
}

async function getPublicUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("uuid", user.id)
        .single();

    if (error) throw error;
    return data as PublicUser;
}

export function usePublicUser() {
    return useQuery({
        queryKey: ["publicUser"],
        queryFn: getPublicUser,
    });
}
