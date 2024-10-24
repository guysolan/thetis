import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";

import { getAmazonReportById } from "../_shared/amazon/index.ts";

import { doppio } from "../_shared/doppio/index.ts";
import { uploadFileFromUrl } from "../_shared/supabase/storage.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }
    try {
        const body = await req.json();

        const { report, region } = body;

        const { csvData, summary } = await getAmazonReportById(
            region,
            report.reportDocumentId,
        );

        const location = summary.location;
        const date = summary.depositDate.split("T")[0];

        // You might need to validate or process the request here
        const pdf = await doppio(
            `https://dashboard.thetismedical.com/finances/amazon/settlements/${region}/summary?report=${
                encodeURIComponent(JSON.stringify(report))
            }`,
        );

        console.log(pdf);

        // Upload PDF to Supabase Storage
        const pdfUrl = await uploadFileFromUrl(
            pdf.documentUrl,
            "amazon-reports",
            `${location}/${date}.pdf`,
            "application/pdf",
        );

        return new Response(
            JSON.stringify({ pdf: pdfUrl, csv: csvData }),
            {
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
                status: 200,
            },
        );
    } catch (e) {
        console.error("Error processing request:", e);
        return new Response(
            JSON.stringify({
                error: "Error processing request",
                details: e instanceof Error ? e.message : String(e),
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});
