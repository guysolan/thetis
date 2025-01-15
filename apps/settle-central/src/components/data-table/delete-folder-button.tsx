import React from "react";
import { Button } from "@thetis/ui/button";
import { useDeleteAmazonReport } from "@/api/deleteAmazonReport";
import { Trash2, Loader2 } from "lucide-react";

const DeleteFolderButton = ({
  disabled,
  reportId,
}: { disabled: boolean; reportId: string }) => {
  const { mutate: deleteReport, isPending: isDeletingReport } =
    useDeleteAmazonReport();
  return (
    <Button
      variant="destructive"
      size="icon"
      disabled={disabled}
      onClick={() => deleteReport({ reportId: reportId })}
    >
      {isDeletingReport ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </Button>
  );
};

export default DeleteFolderButton;
