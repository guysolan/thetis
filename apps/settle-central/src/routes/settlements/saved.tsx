import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@thetis/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";
import { DollarSign, Euro, FolderArchive, FolderOpen } from "lucide-react";
import { useDownloadFolder } from "@/api/useDownloadFolder";
import { useAmazonReportsFromDb } from "../../api/selectAmazonReportsFromDb";
import AmazonReportById from "../../components/AmazonReportById";
import { FilePreview } from "../../components/FilePreview";
import { useDownloadFile } from "../../api/useDownloadFile";

const AmazonFinancialReports = () => {
  const { data: amazonReports } = useAmazonReportsFromDb();
  const { mutate: downloadFile } = useDownloadFile();

  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-2xl">Amazon Financial Reports</h1>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {amazonReports.map((report) => (
          <Card key={report.report_id}>
            <CardHeader>
              <CardTitle>{report.storage_path}</CardTitle>
            </CardHeader>
            <CardContent>
              <FilePreview
                fileName={`${report.storage_path}.pdf`}
                className="mt-2"
                thumbnailSize={100}
              />
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    downloadFile({
                      path: report.storage_path,
                      extension: ".pdf",
                    })
                  }
                >
                  <FolderOpen className="mr-2 w-4 h-4" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    downloadFile({
                      path: report.storage_path,
                      extension: ".csv",
                    })
                  }
                >
                  <FolderArchive className="mr-2 w-4 h-4" />
                  Download CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/settlements/saved")({
  component: AmazonFinancialReports,
});
