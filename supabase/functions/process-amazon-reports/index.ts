import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { supabase } from "../_shared/supabase/config.ts";
import dayjs from "dayjs";

const MIDDAY_EMAIL = Deno.env.get("MIDDAY_EMAIL");

Deno.serve(async () => {
    try {
        console.log("Processing Amazon reports");
        // Get Amazon reports for NA region
        const { data: naReports, error: naReportsError } = await supabase
            .functions
            .invoke("amazon-reports", { body: { region: "NA" } });
        if (naReportsError) throw naReportsError;

        const { data: eurReports, error: eurReportsError } = await supabase
            .functions
            .invoke("amazon-reports", { body: { region: "EUR" } });
        if (eurReportsError) throw eurReportsError;

        const { data: reports } = await supabase.from("amazon_reports").select(
            "*",
        );

        const recentReports = reports?.filter((r) =>
            dayjs(r.created_at).isAfter(dayjs().subtract(1, "month"))
        );

        const allReports = [...naReports, ...eurReports];

        const remainingReports = allReports?.filter(
            (report) =>
                !recentReports?.map((r) => r?.report_id).includes(
                    report?.reportId,
                ),
        );

        console.log(
            `\n
            Saved Reports: ${reports.length}\n
            Recent Reports: ${recentReports.length}\n 
            Amazon Reports: ${allReports.length}\n
            Remaining Reports: ${remainingReports.length}`,
        );

        if (!reports?.length || !remainingReports?.length) {
            return new Response(
                JSON.stringify({
                    message: `No reports to be saved`,
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: 200,
                },
            );
        }

        const firstReport = remainingReports[0];
        if (!firstReport?.reportId) {
            throw new Error("Invalid report format - missing reportId");
        }

        const region = naReports?.filter((r) =>
                r?.reportId === firstReport.reportId
            ).length > 0
            ? "NA"
            : "EUR";

        const { data: savedReport, error: savedReportError } = await supabase
            .functions.invoke("save-amazon-report", {
                body: {
                    report: firstReport,
                    region: region,
                },
            });

        if (savedReportError) throw savedReportError;

        console.log("savedReport", savedReport);

        const { data: emailReport, error: emailReportError } = await supabase
            .functions.invoke("email-amazon-report", {
                body: {
                    path: savedReport.db.storage_path,
                    to: MIDDAY_EMAIL,
                },
            });

        if (emailReportError) throw emailReportError;

        console.log("emailReport", emailReport);

        return new Response(
            JSON.stringify({
                message: `Saved report ${firstReport.reportId}`,
                data: savedReport,
                email: emailReport,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            },
        );
    } catch (error) {
        console.error("Error processing Amazon reports:", error);
        return new Response(
            JSON.stringify({
                error: "Failed to process Amazon reports",
                details: error.message,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});

// curl --request POST 'http://localhost:54321/functions/v1/process-amazon-accounts' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{ "name":"Functions" }'
