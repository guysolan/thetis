import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import JSZip from "jszip";
// @deno-ignore
import { saveAs } from "file-saver";

async function downloadZippedFolder(
  fileNames: string[],
  fileTypes: ("pdf" | "csv")[],
) {
  try {
    // Create array of all possible file combinations
    const filesToDownload = fileNames.flatMap((fileName) =>
      fileTypes.map((type) => `${fileName}.${type}`),
    );

    const zip = new JSZip();

    // Get signed URLs and add files to zip
    for (const fileName of filesToDownload) {
      const {
        data: { signedUrl },
        error,
      } = await supabase.storage
        .from("amazon-reports")
        .createSignedUrl(fileName, 60);

      if (error || !signedUrl) {
        console.warn(`Failed to get signed URL for ${fileName}, skipping...`);
        continue;
      }

      const response = await fetch(signedUrl);
      if (!response.ok) {
        console.warn(`Failed to fetch ${fileName}, skipping...`);
        continue;
      }

      const blob = await response.blob();
      zip.file(fileName, blob);
    }

    // Generate and download the zip file
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `amazon_reports.zip`);
  } catch (error) {
    console.error("Error downloading files:", error);
    throw error;
  }
}

export const useExportFiles = () => {
  return useMutation({
    mutationFn: (params: {
      fileNames: string[];
      fileTypes: ("pdf" | "csv")[];
    }) => downloadZippedFolder(params.fileNames, params.fileTypes),
    onSuccess: () => {
      toast.success("Files downloaded successfully");
    },
    onError: () => {
      toast.error("Failed to download files");
    },
  });
};
