import { Button } from "@thetis/ui/button";
import { AmazonReport } from "@/components/AmazonReportById";
import { useSaveAmazonReport } from "@/api/saveAmazonReport";
import { useDeleteAmazonReport } from "../../api/deleteAmazonReport";
import { Save, Trash2 } from "lucide-react";

const SaveOrDeleteReport = ({
  region,
  country,
  report,
  saved,
}: {
  region: string;
  country: string;
  report: AmazonReport;
  saved: boolean;
}) => {
  const { mutate: saveReport, isPending: isSavingReport } =
    useSaveAmazonReport();
  const { mutate: deleteReport, isPending: isDeletingReport } =
    useDeleteAmazonReport();

  return (
    <>
      {saved ? (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => deleteReport({ reportId: report.reportId })}
        >
          <Trash2 size={16} className="mr-1" />
          {isDeletingReport ? "Deleting..." : "Delete"}
        </Button>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            saveReport({
              report: report,
              region: region,
              country: country,
            });
          }}
        >
          <Save size={16} className="mr-1" />
          {isSavingReport ? "Saving..." : "Save"}
        </Button>
      )}
    </>
  );
};

export default SaveOrDeleteReport;
