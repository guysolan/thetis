import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createGoogleDoc } from "../_shared/google/drive.ts";
import {
    addFileToDrive,
    createDriveClient,
    getTokens,
    oauth2Client,
} from "../_shared/google/config.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }
    try {
        // const driveClient = createDriveClient();
        // console.log(driveClient);

        const accessToken = oauth2Client?.credentials?.access_token;
        const fileName = "example.txt";
        const mimeType = "text/plain";
        const fileContent = "This is the content of my file.";

        try {
            const fileId = await addFileToDrive(
                mimeType,
                fileName,
                fileContent,
            );
            console.log("File added successfully. File ID:", fileId);
        } catch (error) {
            console.error("Failed to add file:", error);
        }

        return new Response(JSON.stringify(fileId), {
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
