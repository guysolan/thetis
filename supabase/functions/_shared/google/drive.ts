import { createDriveClient } from "./config.ts";
import { drive_v3 } from "google";

let driveClient: drive_v3.Drive | null = null;

// Function to get or create the Drive client
export async function getDriveClient(): Promise<drive_v3.Drive> {
    if (!driveClient) {
        driveClient = await createDriveClient();
    }
    return driveClient;
}

// Helper function to create a Google Doc
export async function createGoogleDoc(
    title: string,
    content: string,
): Promise<string> {
    const drive = await getDriveClient();

    const fileMetadata = {
        name: title,
        mimeType: "application/vnd.google-apps.document",
    };

    const media = {
        mimeType: "text/plain",
        body: content,
    };

    const file = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id",
    });

    return file.data.id as string;
}

// Helper function to save a CSV file
export async function saveCSVToDrive(
    fileName: string,
    csvContent: string,
): Promise<string> {
    const drive = await getDriveClient();

    const fileMetadata = {
        name: fileName,
        mimeType: "text/csv",
    };

    const media = {
        mimeType: "text/csv",
        body: csvContent,
    };

    const file = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id",
    });

    return file.data.id as string;
}
