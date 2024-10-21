import { google } from "npm:googleapis";

const clientJson = {
    "web": {
        "client_id":
            "170500420086-el6tv8vpri2s97dfmvdpjag33v6nsbu4.apps.googleusercontent.com",
        "project_id": "dashboard-439121",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url":
            "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "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",
        "redirect_uris": [
            "http://127.0.0.1:54321/functions/v1/",
            "https://supabase.com/dashboard/project/jgntxyfqcytscgprebds/",
        ],
    },
};

const VERSION = "v3";
const API_NAME = "drive";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

export const oauth2Client = new google.auth.OAuth2(
    clientJson.web.client_id,
    clientJson.web.client_secret,
    clientJson.web.redirect_uris[0],
);

// Function to exchange the code for tokens
export async function getTokens(code: string) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
}

// Helper function to create a Google Drive client
export function createDriveClient() {
    return google.drive({
        version: "v3",
        auth: oauth2Client,
        key: Deno.env.get("GOOGLE_API_KEY"),
    });
}

// Function to get the authorization URL
export function getAuthUrl() {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
}

// Updated function to add a file to Google Drive
export async function addFileToDrive(
    fileName: string,
    mimeType: string,
    fileContent: string | Uint8Array,
) {
    const drive = google.drive({
        version: "v3",
        auth: oauth2Client,
    });

    const fileMetadata = {
        name: fileName,
    };

    const media = {
        mimeType: mimeType,
        body: fileContent,
    };

    try {
        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id",
        });

        return response.data.id;
    } catch (error) {
        console.error("Error adding file to Google Drive:", error);
        throw error;
    }
}
