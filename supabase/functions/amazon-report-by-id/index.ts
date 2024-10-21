import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import {
    getReportDocumentAsCSV,
    summariseSettlementReport,
} from "../_shared/amazon/reports.ts";

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

        // Convert CSV to JSON
        const jsonData = csvToJson(csvData);

        const summary = summariseSettlementReport(jsonData);

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

function csvToJson(csv: string): any[] {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const obj: { [key: string]: string } = {};
        const currentLine = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentLine[j]?.trim() || "";
        }

        result.push(obj);
    }

    return result;
}
