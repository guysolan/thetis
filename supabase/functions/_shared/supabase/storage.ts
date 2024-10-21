import { supabase } from "./config.ts";

/**
 * Upload a file to Supabase storage.
 * @param bucketName - The name of the storage bucket.
 * @param filePath - The path where the file will be stored.
 * @param file - The file to upload.
 * @returns The upload response data.
 */
export async function uploadFile(
    bucketName: string,
    filePath: string,
    file: File,
) {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

    if (error) throw error;
    return data;
}

/**
 * Create a signed URL for a file in Supabase storage.
 * @param bucketName - The name of the storage bucket.
 * @param filePath - The path of the file.
 * @param expiresIn - The duration in seconds for which the URL is valid.
 * @returns The signed URL.
 */
export async function createSignedUrl(
    bucketName: string,
    filePath: string,
    expiresIn: number,
) {
    const { signedURL, error } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(filePath, expiresIn);

    if (error) throw error;
    return signedURL;
}
