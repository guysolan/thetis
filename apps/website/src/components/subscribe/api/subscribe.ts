import { supabase } from "@/lib/supabase";

export const subscribePatient = async (email: string) => {
    const { data, error } = await supabase
        .functions.invoke("subscribe-resend", {
            body: {
                email,
                audience_id: "e93cfc73-67a9-4a80-b5dd-add94ec70bae",
            },
        });
    if (error) {
        console.error("Failed to subscribe patient:", error);
        throw error;
    }
    return data;
};
