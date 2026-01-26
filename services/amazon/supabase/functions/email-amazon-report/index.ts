import { corsHeaders } from "../_shared/cors.ts";
import { supabase } from "../_shared/supabase/config.ts";
import { resend } from "../_shared/resend/index.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { path, to, subject } = await req.json();
        console.log(path, to, subject);

        // Download PDF file from Supabase Storage
        const filePath = `${path}.pdf`;

        const { data: signedUrl } = await supabase.storage
            .from("amazon-reports")
            .createSignedUrl(filePath, 60);

        console.log(signedUrl);

        const { data, error } = await supabase.storage
            .from("amazon-reports")
            .download(filePath);

        if (error) {
            throw new Error(`Error downloading ${filePath}: ${error.message}`);
        }

        console.log(data);

        // Convert the downloaded file to base64
        const buffer = await data.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);
        const base64Content = btoa(
            Array.from(uint8Array).map((byte) => String.fromCharCode(byte))
                .join(""),
        );

        // Get filename from path
        const filename = filePath.replace("/", " ");
        console.log(`Filename ${filename}`);

        // Send email with PDF attachment using Resend
        const emailResponse = await resend({
            prefix: "reports",
            to: Array.isArray(to) ? to : [to],
            subject: subject || `Amazon Accounts: ${filename}`,
            html:
                `<p>Please find attached the Amazon settlement report for ${filename}.</p>`,
            attachments: [{
                filename,
                content: base64Content,
                path: signedUrl.signedUrl,
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
