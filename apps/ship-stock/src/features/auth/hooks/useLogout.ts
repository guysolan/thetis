import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useLogout = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        },
        onSuccess: () => {
            navigate({ to: "/" });
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    });
};
