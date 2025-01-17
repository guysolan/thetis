import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Progress } from "@thetis/ui/progress";

async function downloadZippedFolder(
  fileNames: string[],
  fileTypes: ("pdf" | "csv")[],
) {
  // Create array of all possible file combinations
  const filesToDownload = fileNames.flatMap((fileName) =>
    fileTypes.map((type) => `${fileName}.${type}`),
  );

  const toastId = toast("Preparing your export...", {
    duration: Number.Infinity,
    description: (
      <div className="space-y-2">
        <Progress value={100} className="animate-progress-linear" />
        <p className="text-muted-foreground text-sm">
          Exporting {filesToDownload.length} file(s)...
        </p>
      </div>
    ),
  });

  try {
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

    toast.success("Export completed!", {
      id: toastId,
      description: `Successfully exported ${filesToDownload.length} file(s)`,
    });
  } catch (error) {
    toast.error("Export failed", {
      id: toastId,
      description: "There was an error exporting your files",
    });
    throw error;
  }
}

export const useExportFiles = () => {
  return useMutation({
    mutationFn: (params: {
      fileNames: string[];
      fileTypes: ("pdf" | "csv")[];
    }) => downloadZippedFolder(params.fileNames, params.fileTypes),
  });
};
