import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getAmazonReportById } from "../_shared/amazon/index.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }
    try {
        const body = await req.json();

        const { reportId, countryCode } = body;

        const { report, summary } = await getAmazonReportById(
            countryCode,
            reportId,
        );

        console.log(report);

        return new Response(JSON.stringify(summary), {
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
            status: 200,
        });
    } catch (e) {
        console.error("Error processing report:", e);
        return new Response(
            JSON.stringify({
                error: "Error processing report",
                details: e instanceof Error ? e.message : String(e),
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});
