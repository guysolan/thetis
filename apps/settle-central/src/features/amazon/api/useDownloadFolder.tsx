import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import JSZip from "jszip";
// @deno-ignore
import { saveAs } from "file-saver";

async function downloadZippedFolder(countryCode: string) {
  try {
    // List files in the folder
    const { data: files, error } = await supabase.storage
      .from("amazon-reports")
      .list(countryCode);

    if (error) throw error;
    if (!files || files.length === 0)
      throw new Error("No files found in the folder");

    const zip = new JSZip();

    // Get signed URLs and add files to zip
    for (const file of files) {
      const {
        data: { signedUrl },
      } = await supabase.storage
        .from("amazon-reports")
        .createSignedUrl(`${countryCode}/${file.name}`, 60); // 60 seconds expiry

      if (!signedUrl)
        throw new Error(`Failed to get signed URL for ${file.name}`);

      const response = await fetch(signedUrl);
      const blob = await response.blob();
      zip.file(file.name, blob);
    }

    // Generate and download the zip file
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${countryCode}_amazon_reports.zip`);
  } catch (error) {
    console.error("Error downloading zipped folder:", error);
    throw error;
  }
}

export const useDownloadFolder = () => {
  return useMutation({
    mutationFn: (countryCode: string) => downloadZippedFolder(countryCode),
    onSuccess: () => {
      toast.success("Folder downloaded successfully");
    },
    onError: () => {
      toast.error("Failed to download folder");
    },
  });
};
