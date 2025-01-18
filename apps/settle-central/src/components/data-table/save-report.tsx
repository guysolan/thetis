import { Button } from "@thetis/ui/button";
import { AmazonReport } from "@/types";
import { useSaveAmazonReport } from "@/api/saveAmazonReport";
import { Loader2, Save } from "lucide-react";

const SaveReportButton = ({
  region,
  report,
}: {
  region: string;
  report: AmazonReport;
}) => {
  const { mutate: saveReport, isPending: isSavingReport } =
    useSaveAmazonReport();

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          saveReport({
            report: report,
            region: region,
          });
        }}
      >
        {isSavingReport ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Save size={16} />
        )}
        <span>Save Report</span>
      </Button>
    </>
  );
};

export default SaveReportButton;
