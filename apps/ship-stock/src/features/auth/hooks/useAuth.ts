import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
    return useQuery({
        queryKey: ["auth", "user"],
        queryFn: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            return user || null;
        },
    });
}
