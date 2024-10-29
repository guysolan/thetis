import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { supabase } from "../_shared/supabase/config.ts";
import { resend } from "../_shared/resend/index.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { path, to, subject } = await req.json();

        // Download PDF file from Supabase Storage
        const filePath = `${path}.pdf`;
        const { data, error } = await supabase.storage
            .from("amazon-reports")
            .download(filePath);

        if (error) {
            throw new Error(`Error downloading ${filePath}: ${error.message}`);
        }

        // Convert the downloaded file to base64
        const buffer = await data.arrayBuffer();
        const base64Content = btoa(
            String.fromCharCode(...new Uint8Array(buffer)),
        );

        // Get filename from path
        const filename = filePath.split("/").pop() || "report.pdf";

        // Send email with PDF attachment using Resend
        const emailResponse = await resend({
            prefix: "reports",
            to: Array.isArray(to) ? to : [to],
            subject: subject || "Amazon Settlement Report",
            html: `<p>Please find attached the Amazon settlement report.</p>`,
            attachments: [{
                filename,
                content: base64Content,
                path: filePath,
            }],
        });

        return new Response(
            JSON.stringify({ success: true, data: emailResponse }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            },
        );
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(
            JSON.stringify({
                error: "Error processing request",
                details: error instanceof Error ? error.message : String(error),
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});
