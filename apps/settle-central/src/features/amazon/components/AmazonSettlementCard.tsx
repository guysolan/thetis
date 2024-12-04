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
import { AmazonReport } from "@/features/amazon/components/AmazonReportById";
import { useSaveAmazonReport } from "@/features/amazon/api/saveAmazonReport";
import { useDownloadedAmazonReports } from "../api/selectDownloadedAmazonReports";
import { Separator } from "@thetis/ui/separator";
import { useDownloadFile } from "../api/useDownloadFile";
import EmailPdfDialog from "./EmailPdfDialog";
import { Route as SummaryRoute } from "../../../routes/settlements/$region/summary";
import { Route as ReportRoute } from "../../../routes/settlements/$region/report";

const AmazonSettlementCard = ({
  region,
  report,
}: { region: string; report: AmazonReport }) => {
  const { mutate: downloadFile } = useDownloadFile();
  const { mutate: saveReport, isPending: isSavingReport } =
    useSaveAmazonReport();
  const { data: downloadedReports } = useDownloadedAmazonReports();
  const downloaded = downloadedReports?.find(
    (r) => r.report_id === report.reportId,
  );
  return (
    <Card key={report.reportId}>
      <CardHeader>
        <CardTitle>
          Settlement Report - {dayjs(report.dataEndTime).format("YYYY-MM-DD")}
        </CardTitle>
        {downloaded && (
          <CardDescription>{downloaded.storage_path}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Separator />
          <Link
            to={SummaryRoute.to}
            params={{
              region: region,
            }}
            search={{ report: report }}
            className="flex justify-between items-center py-1 w-full text-zinc-700 hover:underline"
          >
            Open Summary <span className="ml-2">→</span>
          </Link>
          <Separator />

          <Link
            to={ReportRoute.to}
            params={{
              region: region,
            }}
            search={{ report: report }}
            className="flex justify-between items-center py-1 w-full text-zinc-700 hover:underline"
          >
            Open Table <span className="ml-2">→</span>
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
          </>
        ) : (
          <Button
            variant="default"
            onClick={() => {
              saveReport({
                report: report,
                region: region,
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
