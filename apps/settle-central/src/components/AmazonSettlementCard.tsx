import React from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@thetis/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";
import dayjs from "dayjs";
import { AmazonReport } from "@/components/AmazonReportById";
import { useSaveAmazonReport } from "@/api/saveAmazonReport";
import { useDownloadedAmazonReports } from "../api/selectDownloadedAmazonReports";
import { Separator } from "@thetis/ui/separator";
import { useDownloadFiles } from "../api/useDownloadFiles";
import EmailPdfDialog from "./EmailPdfDialog";
import { Route as SummaryRoute } from "../routes/settlements/report/summary";
import { Route as ReportRoute } from "../routes/settlements/report/xml";
import { useDeleteAmazonReport } from "../api/deleteAmazonReport";
import { ArrowRight, File } from "lucide-react";
import { FilePreview } from "@/components/FilePreview";

const AmazonSettlementCard = ({
  region,
  country,
  report,
}: { region: string; country: string; report: AmazonReport }) => {
  const { mutate: downloadFile } = useDownloadFiles();
  const { mutate: saveReport, isPending: isSavingReport } =
    useSaveAmazonReport();
  const { mutate: deleteReport, isPending: isDeletingReport } =
    useDeleteAmazonReport();
  const { data: downloadedReports } = useDownloadedAmazonReports();
  const downloaded = downloadedReports?.find(
    (r) => r.report_id === report.reportId,
  );
  return (
    <Card key={report.reportId}>
      <CardHeader>
        <CardTitle>
          Settlement Report - {dayjs(report.dataEndTime).format("DD MMM YYYY")}
        </CardTitle>
        {downloaded && (
          <>
            <CardDescription>{downloaded.storage_path}</CardDescription>
            <FilePreview
              fileName={`${downloaded.storage_path}.pdf`}
              className="mt-2"
              thumbnailSize={100}
            />
          </>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Separator />
          <Link
            to={SummaryRoute.to}
            search={{ report: report, region: region, country: country }}
            className="flex justify-between items-center py-1 w-full text-zinc-700 hover:underline"
          >
            Open Summary <ArrowRight size={20} />
          </Link>
          <Separator />

          <Link
            to={ReportRoute.to}
            search={{ report: report, region: region, country: country }}
            className="flex justify-between items-center py-1 w-full text-zinc-700 hover:underline"
          >
            Open Table <ArrowRight size={20} />
          </Link>
          <Separator />
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {downloaded ? (
          <>
            <Button
              variant="default"
              onClick={() => downloadFile({ path: downloaded.storage_path })}
            >
              Download
            </Button>
            <EmailPdfDialog
              path={downloaded.storage_path}
              reportDate={dayjs(report.dataEndTime).format("YYYY-MM-DD")}
            />
            <Button
              variant="danger"
              onClick={() => deleteReport({ reportId: report.reportId })}
            >
              {isDeletingReport ? "Deleting..." : "Delete"}
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            onClick={() => {
              saveReport({
                report: report,
                region: region,
                country: country,
              });
            }}
          >
            {isSavingReport ? "Saving..." : "Save"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AmazonSettlementCard;
