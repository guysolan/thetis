import { Button } from "@thetis/ui/button";
import { AmazonReport } from "@/components/AmazonReportById";
import { useDownloadedAmazonReports } from "../../api/selectDownloadedAmazonReports";
import { useDownloadFiles } from "../../api/useDownloadFiles";
import { Download } from "lucide-react";

const DownloadReport = ({
  report,
}: { region: string; country: string; report: AmazonReport }) => {
  const { mutate: downloadFile } = useDownloadFiles();
  const { data: downloadedReports } = useDownloadedAmazonReports();
  const downloaded = downloadedReports?.find(
    (r) => r.report_id === report.reportId,
  );
  return (
    <>
      <Button
        variant="default"
        onClick={() => downloadFile({ path: downloaded.storage_path })}
      >
        <Download /> Save
      </Button>
    </>
  );
};

export default DownloadReport;
