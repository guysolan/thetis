import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";

import { getSettlementReportsByRegion } from "../_shared/amazon/reports.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }
    try {
        const body = await req.json();
        const { region } = body;

        const data = await getSettlementReportsByRegion(
            region,
        );

        return new Response(
            JSON.stringify(data),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            },
        );
    } catch (e) {
        return new Response(
            JSON.stringify(e),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});
