import { supabase } from "../lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface DownloadFileParams {
  path: string;
  extension: string; // e.g. ".csv" or ".pdf"
}

async function downloadFile({ path, extension }: DownloadFileParams) {
  const { data, error } = await supabase.storage
    .from("amazon-reports")
    .download(`${path}${extension}`);

  if (error || !data) {
    throw error || new Error("No data received");
  }

  // Create and click a temporary download link
  const url = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.download = path.split("/").pop() + extension; // Use the filename from the path
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  return data;
}

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: (params: DownloadFileParams) => downloadFile(params),
    onSuccess: () => {
      toast.success("File downloaded successfully");
    },
    onError: () => {
      toast.error("Failed to download file");
    },
  });
};
