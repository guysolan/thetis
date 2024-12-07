import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface DownloadFileParams {
  path: string; // e.g. "US/filename"
}

async function downloadFiles({ path }: DownloadFileParams) {
  try {
    const zip = new JSZip();
    const extensions = [".csv", ".pdf"];

    // Extract filename from path (gets the part after the last slash)
    const filename = path.split("/").pop() || "";

    // Get signed URLs and add files to zip
    for (const ext of extensions) {
      const fullFilename = `${filename}${ext}`;
      const {
        data: { signedUrl },
      } = await supabase.storage
        .from("amazon-reports")
        .createSignedUrl(`${path}${ext}`, 60);

      if (!signedUrl) {
        console.warn(`File not found: ${fullFilename}`);
        continue;
      }

      const response = await fetch(signedUrl);
      if (!response.ok) continue;

      const blob = await response.blob();
      zip.file(fullFilename, blob);
    }

    // Check if any files were added to the zip
    if (Object.keys(zip.files).length === 0) {
      throw new Error("No files found");
    }

    // Generate and download the zip file
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${filename}_files.zip`);
  } catch (error) {
    console.error("Error downloading files:", error);
    throw error;
  }
}

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: (params: DownloadFileParams) => downloadFiles(params),
    onSuccess: () => {
      toast.success("Files downloaded successfully");
    },
    onError: () => {
      toast.error("Failed to download files");
    },
  });
};
