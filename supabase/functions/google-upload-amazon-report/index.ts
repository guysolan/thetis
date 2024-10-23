import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import {
    convertGoogleDocToPDF,
    createGoogleDoc,
    getOrCreateFolder,
    googleAuth,
    shareFolderWithUserByPath,
    uploadCSVToGoogleDrive,
} from "../_shared/google/config.ts";
import { getAmazonReportById } from "../_shared/amazon/index.ts";
import {
    generateAmazonReportContent,
} from "../_shared/google/amazon-settlement-report.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }
    try {
        await googleAuth();

        const body = await req.json();

        const { reportId, countryCode } = body;

        const { csv, summary } = await getAmazonReportById(
            countryCode,
            reportId,
        );

        const content = generateAmazonReportContent(summary);

        // Get or create the folder based on the provided path
        const folderId = await getOrCreateFolder(
            `accounts/amazon-settlements/${countryCode}/${
                summary.depositDate.split("T")[0]
            }`,
        );

        await shareFolderWithUserByPath(
            "accounts",
            "guy@thetismedical.com",
        );

        const fileName =
            `Amazon ${countryCode} Settlement ${summary.depositDate}`;

        // Create the Google Doc in the specified folder
        const { documentUrl: docUrl, documentId } = await createGoogleDoc(
            fileName,
            content,
            folderId,
        );

        const { url: pdfUrl } = await convertGoogleDocToPDF(
            documentId,
            `${fileName}.pdf`,
        );

        const { fileUrl: csvUrl } = await uploadCSVToGoogleDrive(
            csv,
            `${fileName}.csv`,
            folderId,
        );

        return new Response(JSON.stringify({ pdfUrl, docUrl, csvUrl }), {
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
            status: 200,
        });
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
