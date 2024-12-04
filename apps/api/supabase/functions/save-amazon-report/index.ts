import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";

import { getAmazonReportById } from "../_shared/amazon/reports/process-amazon-report.ts";

import { doppio } from "../_shared/doppio/index.ts";
import {
    uploadFileContent,
    uploadFileFromUrl,
} from "../_shared/supabase/storage.ts";
import { supabase } from "../_shared/supabase/config.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }
    try {
        const body = await req.json();

        const { report, region, upsert } = body;

        const { csvData, summary } = await getAmazonReportById(
            region,
            report.reportDocumentId,
        );

        const reportId = report.reportId;
        const location = summary.location;
        const date = summary.depositDate.split("T")[0];

        // You might need to validate or process the request here
        const pdf = await doppio(
            `https://tax.thetismedical.com/finances/amazon/settlements/${region}/summary?report=${
                encodeURIComponent(JSON.stringify(report))
            }`,
        );

        const fileName = `${location}/${date} (${reportId})`;

        // Upload PDF to Supabase Storage
        const savedPdf = await uploadFileFromUrl(
            pdf.documentUrl,
            "amazon-reports",
            `${fileName}.pdf`,
            "application/pdf",
        );

        const savedCsv = await uploadFileContent(
            "amazon-reports",
            `${fileName}.csv`,
            csvData,
            "application/csv",
        );

        const { data: dbData, error: dbError } = await supabase.from(
            "amazon_reports",
        )
            .insert({
                report_id: report.reportId,
                storage_path: fileName,
            }).select().single();
        if (dbError) throw dbError;

        return new Response(
            JSON.stringify({ pdf: savedPdf, csv: savedCsv.path, db: dbData }),
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
