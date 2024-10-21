import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getReportDocumentAsCSV } from "../_shared/amazon/reports.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }
    try {
        const body = await req.json();
        const { reportId, countryCode } = body;

        const csvData = await getReportDocumentAsCSV(
            reportId,
            countryCode,
        );

        return new Response(csvData, {
            headers: {
                ...corsHeaders,
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="${reportId}.csv"`,
            },
            status: 200,
        });
    } catch (e) {
        console.error(e);
        return new Response(
            JSON.stringify(e),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});
