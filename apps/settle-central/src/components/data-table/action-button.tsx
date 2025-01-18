import {
  Table,
  ChevronDown,
  FileSpreadsheet,
  Save,
  Mail,
  FileDown,
  FileText,
  Loader2,
  SaveIcon,
  CheckIcon,
} from "lucide-react";
import { Button, buttonVariants } from "@thetis/ui/button";
import { Link } from "@tanstack/react-router";
import { FilePreview } from "../FilePreview";
import dayjs from "dayjs";
import EmailPdfDialog from "../EmailPdfDialog";
import { useSaveAmazonReport } from "../../api/saveAmazonReport";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@thetis/ui/dropdown-menu";

import { AmazonReport } from "@thetis/amazon/amazon-types";
import { Separator } from "@thetis/ui/separator";
import { useDownloadFile } from "../../api/useDownloadFile";
import { cn } from "@thetis/ui/cn";

type RowData = AmazonReport & { is_saved: boolean };

const ActionsCell = ({ report }: { report: RowData }) => {
  const isSaved = report.is_saved;
  const { mutate: downloadFile } = useDownloadFile();
  const { mutate: saveReport, isPending: isSavingReport } =
    useSaveAmazonReport();

  return (
    <div className={cn("flex flex-row items-center pr-0")}>
      {isSaved ? (
        <FilePreview
          fileName={`${report.storage_path}.pdf`}
          className={cn(buttonVariants({ size: "sm" }), "w-full")}
        />
      ) : (
        <SaveReportButton report={report} />
      )}
      <Separator orientation="vertical" className="h-full" />
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ size: "icon" }),
            "flex justify-center items-center w-8 h-8 aspect-square",
          )}
        >
          <span className="sr-only">Open menu</span>
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white dark:bg-black w-56"
        >
          <DropdownMenuItem asChild>
            <Link
              className="cursor-pointer"
              to="/settlements/report"
              search={{
                report: report,
                region: report.region,
                country: report.country,
              }}
            >
              <Table className="mr-2 w-4 h-4" />
              View Detailed Table
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              className="cursor-pointer"
              to="/settlements/report/summary"
              search={{
                report: report,
                region: report.region,
                country: report.country,
              }}
            >
              <FileText className="mr-2 w-4 h-4" />
              View Summary
            </Link>
          </DropdownMenuItem>
          <Separator />

          {!isSaved ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                saveReport({
                  report: report,
                  region: report.region,
                });
              }}
            >
              {isSavingReport ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <Save className="mr-2 w-4 h-4" />
              )}
              Save Report
            </DropdownMenuItem>
          ) : (
            <>
              <EmailPdfDialog
                path={report.storage_path}
                reportDate={dayjs(report.settlement_start_date).format(
                  "DD MMM YYYY",
                )}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <Mail className="mr-2 w-4 h-4" />
                  Email PDF
                </DropdownMenuItem>
              </EmailPdfDialog>

              <Separator />

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  downloadFile({
                    path: report.storage_path,
                    extension: ".pdf",
                  })
                }
              >
                <FileDown className="mr-2 w-4 h-4" />
                Download PDF
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  downloadFile({
                    path: report.storage_path,
                    extension: ".csv",
                  })
                }
              >
                <FileSpreadsheet className="mr-2 w-4 h-4" />
                Download CSV
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const SaveReportButton = ({ report }: { report: AmazonReport }) => {
  const { mutate: saveReport, isPending, isSuccess } = useSaveAmazonReport();

  return (
    <Button
      size="sm"
      className="flex flex-row gap-2 pr-2 w-full"
      onClick={() => {
        saveReport({
          report: report,
          region: report.region,
        });
      }}
      type="button"
    >
      {isSuccess ? (
        <CheckIcon className="w-4 h-4" />
      ) : isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <SaveIcon className="w-4 h-4" />
      )}
      Save
    </Button>
  );
};

export default ActionsCell;
