/// <reference lib="deno.ns" />

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getReportDocumentAsXML } from "../_shared/amazon/reports.ts";
// import { uploadFile } from "../_shared/supabase/storage.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }
    try {
        const body = await req.json();
        const { reportId, countryCode } = body;

        const xmlData = await getReportDocumentAsXML(
            countryCode,
            reportId,
        );

        console.log(xmlData);

        return new Response(xmlData, {
            headers: {
                ...corsHeaders,
                "Content-Type": "application/xml",
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
