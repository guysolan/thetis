import { docs_v1, google } from "npm:googleapis";

import serviceAccount from "./service-account.json" assert { type: "json" };

// Function to get the authorization URL
export function googleAuth() {
    return new google.auth.GoogleAuth({
        credentials: serviceAccount,
        scopes: [
            "https://www.googleapis.com/auth/docs",
            "https://www.googleapis.com/auth/drive",
        ],
    });
}

// ... existing code ...

// New function to upload a CSV file to a specific folder in Google Drive
export async function uploadCSVToGoogleDrive(
    csvContent: string,
    fileName: string,
    folderId: string,
): Promise<{ fileId: string; fileUrl: string }> {
    const auth = await googleAuth().getClient();
    const drive = google.drive({ version: "v3", auth });

    try {
        const fileMetadata = {
            name: fileName,
            parents: [folderId],
            mimeType: "text/csv",
        };

        const media = {
            mimeType: "text/csv",
            body: csvContent,
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id",
        });

        if (response.data.id) {
            console.log(
                `File ${fileName} uploaded successfully to folder ${folderId}`,
            );
            return {
                fileId: response.data.id,
                fileUrl:
                    `https://drive.google.com/file/d/${response.data.id}/view`,
            };
        } else {
            throw new Error("Failed to upload CSV file");
        }
    } catch (error) {
        console.error("Error uploading CSV to Google Drive:", error);
        throw error;
    }
}

// Updated function to create a new Google Doc and store it in a specific folder within a shared drive
export async function createGoogleDoc(
    title: string,
    content: docs_v1.Schema$BatchUpdateDocumentRequest,
    folderId?: string,
): Promise<{ documentId: string; documentUrl: string }> {
    console.log("Creating Google Doc with title:", title);
    console.log("Content:", JSON.stringify(content, null, 2));

    const docs = google.docs({ version: "v1", auth: await googleAuth() });

    try {
        const res = await docs.documents.create({
            requestBody: {
                title,
            },
        });

        console.log("Document created:", res.data);

        if (res.data.documentId) {
            console.log("Updating document content...");
            await docs.documents.batchUpdate({
                documentId: res.data.documentId,
                requestBody: content,
            });

            if (folderId) {
                console.log("Moving document to folder:", folderId);
                const drive = google.drive({
                    version: "v3",
                    auth: await googleAuth(),
                });
                await drive.files.update({
                    fileId: res.data.documentId,
                    addParents: folderId,
                    fields: "id, parents",
                });
            }

            return {
                documentId: res.data.documentId,
                documentUrl:
                    `https://docs.google.com/document/d/${res.data.documentId}/edit`,
            };
        } else {
            throw new Error("Failed to create document");
        }
    } catch (error) {
        console.error("Error in createGoogleDoc:", error);
        throw error;
    }
}

// Updated function to get or create a folder based on the given path
export async function getOrCreateFolder(
    folderPath: string,
): Promise<string> {
    const auth = await googleAuth().getClient();
    const drive = google.drive({ version: "v3", auth });

    const folders = folderPath.split("/").filter((f) => f);
    let parentId = "root";

    for (const folderName of folders) {
        try {
            // Search for the folder
            const response = await drive.files.list({
                q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents and trashed=false`,
                fields: "files(id, name)",
                spaces: "drive",
            });

            if (response.data.files && response.data.files.length > 0) {
                // Folder exists, use its ID as the parent for the next iteration
                parentId = response.data.files[0].id!;
            } else {
                // Folder doesn't exist, create it
                const folderMetadata = {
                    name: folderName,
                    mimeType: "application/vnd.google-apps.folder",
                    parents: [parentId],
                };

                const folder = await drive.files.create({
                    requestBody: folderMetadata,
                    fields: "id",
                });

                parentId = folder.data.id!;
            }
        } catch (error) {
            console.error(
                `Error getting or creating folder ${folderName}:`,
                error,
            );
            throw error;
        }
    }

    // Share the folder with guy@thetismedical.com
    await shareFolderWithUser(parentId, "guy@thetismedical.com");

    return parentId;
}

// New function to share a folder with a specific email address
export async function shareFolderWithUser(
    folderId: string,
    userEmail: string,
): Promise<void> {
    const auth = await googleAuth().getClient();
    const drive = google.drive({ version: "v3", auth });

    try {
        await drive.permissions.create({
            fileId: folderId,
            requestBody: {
                type: "user",
                role: "writer",
                emailAddress: userEmail,
            },
            fields: "id",
        });
        console.log(`Folder shared successfully with ${userEmail}`);
    } catch (error) {
        console.error(`Error sharing folder with ${userEmail}:`, error);
        throw error;
    }
}

export async function shareFolderWithUserByPath(
    folderPath: string,
    userEmail: string,
): Promise<void> {
    try {
        // Get the folder ID for the given path
        const folderId = await getOrCreateFolder(folderPath);

        // Share the main folder (which will include all subfolders)
        await shareFolderWithUser(folderId, userEmail);

        console.log(
            `Folder and all subfolders shared successfully with ${userEmail}`,
        );
    } catch (error) {
        console.error(
            `Error sharing folder and subfolders with ${userEmail}:`,
            error,
        );
        throw error;
    }
}

// Function to check if a document with a given name exists in a folder
export async function checkDocumentExistsInFolder(
    folderPath: string,
    documentName: string,
): Promise<{ exists: boolean; fileId?: string; fileUrl?: string }> {
    const auth = await googleAuth().getClient();
    const drive = google.drive({ version: "v3", auth });

    try {
        // Get the folder ID for the given path
        const folderId = await getOrCreateFolder(folderPath);

        // Search for the document in the folder
        const response = await drive.files.list({
            q: `'${folderId}' in parents and name = '${documentName}' and mimeType = 'application/vnd.google-apps.document'`,
            fields: "files(id, name, webViewLink)",
            spaces: "drive",
        });

        const files = response.data.files;
        if (files && files.length > 0) {
            return {
                exists: true,
                fileId: files[0].id,
                fileUrl: files[0].webViewLink ||
                    `https://docs.google.com/document/d/${files[0].id}/edit`,
            };
        } else {
            return { exists: false };
        }
    } catch (error) {
        console.error(
            `Error checking for document '${documentName}' in folder:`,
            error,
        );
        throw error;
    }
}

// Function to convert a Google Doc to PDF
export async function convertGoogleDocToPDF(
    documentId: string,
    outputFileName: string,
): Promise<{ id: string; url: string }> {
    const auth = await googleAuth().getClient();
    const drive = google.drive({ version: "v3", auth });

    try {
        // Export the Google Doc as PDF
        const response = await drive.files.export({
            fileId: documentId,
            mimeType: "application/pdf",
        }, { responseType: "arraybuffer" });

        // Create a new file metadata for the PDF
        const fileMetadata = {
            name: outputFileName,
            mimeType: "application/pdf",
        };

        // Convert ArrayBuffer to ReadableStream
        const pdfStream = new ReadableStream({
            start(controller) {
                controller.enqueue(
                    new Uint8Array(response.data as ArrayBuffer),
                );
                controller.close();
            },
        });

        // Create the PDF file in Google Drive
        const pdfFile = await drive.files.create({
            requestBody: fileMetadata,
            media: {
                mimeType: "application/pdf",
                body: pdfStream,
            },
            fields: "id, webViewLink",
        });

        console.log("PDF created successfully:", pdfFile.data.id);
        return {
            id: pdfFile.data.id || "",
            url: pdfFile.data.webViewLink || "",
        };
    } catch (error) {
        console.error("Error converting Google Doc to PDF:", error);
        throw error;
    }
}
