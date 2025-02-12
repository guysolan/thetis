import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { Resend } from "npm:resend";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        if (!RESEND_API_KEY) {
            throw new Error("Missing Resend API key");
        }

        const resend = new Resend(RESEND_API_KEY);
        const { email, audienceId, firstName, lastName } = await req.json();

        await resend.contacts.create({
            email,
            firstName,
            lastName,
            unsubscribed: false,
            audienceId,
        });

        return new Response(
            JSON.stringify({
                message: "Successfully subscribed to newsletter",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            },
        );
    } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        return new Response(
            JSON.stringify({
                error: "Failed to subscribe to newsletter",
                details: error.message,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});
