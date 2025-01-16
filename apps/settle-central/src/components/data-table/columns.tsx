import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { Button } from "@thetis/ui/button";
import { Link } from "@tanstack/react-router";
import { FilePreview } from "../FilePreview";
import dayjs from "dayjs";
import EmailPdfDialog from "../EmailPdfDialog";
import DownloadFolderButton from "./download-folder-button";
import DeleteFolderButton from "./delete-folder-button";
import SaveReportButton from "./save-report";
import { AmazonReport } from "@thetis/amazon/amazon-types";

type RowData = AmazonReport & { is_saved: boolean };

export const columns: ColumnDef<RowData>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const isSaved = row.original.is_saved;
      if (isSaved) {
        return <DownloadFolderButton storagePath={row.original.storage_path} />;
      }
      return (
        <SaveReportButton report={row.original} region={row.original.region} />
      );
    },
  },
  {
    accessorKey: "preview",
    header: "Preview",
    cell: ({ row }) => {
      if (!row.original.is_saved) return null;
      return (
        <FilePreview
          fileName={`${row.original.storage_path}.pdf`}
          className="mt-2"
          thumbnailSize={100}
        />
      );
    },
  },
  {
    accessorKey: "report_id",
    header: "Report ID",
  },
  {
    accessorKey: "settlement_id",
    header: "Settlement ID",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "marketplace_name",
    header: "Marketplace",
  },
  {
    accessorKey: "settlement_start_date",
    header: "Start Date",
    cell: ({ row }) => {
      return dayjs(row.original.settlement_start_date).format("DD MMM YYYY");
    },
  },
  {
    accessorKey: "settlement_end_date",
    header: "End Date",
    cell: ({ row }) => {
      return dayjs(row.original.settlement_end_date).format("DD MMM YYYY");
    },
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "net_proceeds",
    header: "Net Proceeds",
  },
  {
    accessorKey: "sales_total",
    header: "Total Sales",
  },
  {
    accessorKey: "expenses_total",
    header: "Total Expenses",
  },
  {
    accessorKey: "refunds_total",
    header: "Total Refunds",
  },
  {
    id: "pdf",
    header: "PDF",
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon">
          <Link
            to="/settlements/report/summary"
            search={{
              report: row.original,
              region: row.original.region,
              country: row.original.country,
            }}
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </Button>
      );
    },
  },
  {
    id: "csv",
    header: "CSV",
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon">
          <Link
            to="/settlements/report"
            search={{
              report: row.original,
              region: row.original.region,
              country: row.original.country,
            }}
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </Button>
      );
    },
  },
  {
    id: "download",
    header: "Download",
    cell: ({ row }) => {
      return (
        <DownloadFolderButton
          disabled={!row.original.is_saved}
          storagePath={row.original.storage_path}
        />
      );
    },
  },

  {
    id: "email",
    header: "Email",
    cell: ({ row }) => {
      const storagePath = row.original.storage_path;
      const depositDate = row.original.deposit_date;
      return (
        <EmailPdfDialog
          path={storagePath}
          reportDate={dayjs(depositDate).format("YYYY-MM-DD")}
        />
      );
    },
  },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }) => {
      return (
        <DeleteFolderButton
          disabled={!row.original.is_saved}
          reportId={row.original.report_id}
        />
      );
    },
  },
];
