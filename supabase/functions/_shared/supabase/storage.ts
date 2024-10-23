import { supabase } from "./config.ts";

/**
 * Fetch file content from a URL.
 * @param fileUrl - The URL of the file to fetch.
 * @returns The file content as an ArrayBuffer.
 */
export async function fetchFileContent(fileUrl: string): Promise<ArrayBuffer> {
    const response = await fetch(fileUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    return await response.arrayBuffer();
}

/**
 * Upload file content to Supabase Storage.
 * @param bucketName - The name of the storage bucket.
 * @param filePath - The path where the file will be stored.
 * @param fileContent - The content of the file as an ArrayBuffer.
 * @param contentType - The MIME type of the file.
 * @returns The upload data.
 */
export async function uploadFileContent(
    bucketName: string,
    filePath: string,
    fileContent: ArrayBuffer,
    contentType: string,
) {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, fileContent, {
            contentType,
            upsert: true,
        });

    if (error) throw error;
    if (!data) throw new Error("Upload successful but no data returned");

    return data;
}

/**
 * Get the public URL of a file in Supabase Storage.
 * @param bucketName - The name of the storage bucket.
 * @param filePath - The path of the file.
 * @returns The public URL of the file.
 */
export function getPublicUrl(bucketName: string, filePath: string): string {
    const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return data.publicUrl;
}

/**
 * Upload a file from a URL to Supabase Storage.
 * @param fileUrl - The URL of the file to upload.
 * @param bucketName - The name of the storage bucket.
 * @param filePath - The path where the file will be stored.
 * @param contentType - The MIME type of the file.
 * @returns The public URL of the uploaded file.
 */
export async function uploadFileFromUrl(
    fileUrl: string,
    bucketName: string,
    filePath: string,
    contentType: string,
): Promise<string> {
    const fileContent = await fetchFileContent(fileUrl);
    await uploadFileContent(bucketName, filePath, fileContent, contentType);
    return getPublicUrl(bucketName, filePath);
}
