import { ColumnDef } from "@tanstack/react-table";
import { Save, Trash2, FileText, FileSpreadsheet } from "lucide-react";
import { Button } from "@thetis/ui/button";
import SaveOrDeleteReport from "./save-or-delete-report";
import { FilePreview } from "../FilePreview";
import dayjs from "dayjs";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AmazonReport = {
  id: string;
  settlement_id: string;
  marketplace_name: string;
  settlement_start_date: Date;
  settlement_end_date: Date;
  deposit_date: Date;
  currency: string;
  net_proceeds: number;
  sales_total: number;
  expenses_total: number;
  refunds_total: number;
  is_saved: boolean;
};

export const columns: ColumnDef<AmazonReport>[] = [
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
    accessorKey: "deposit_date",
    header: "Deposit Date",
    cell: ({ row }) => {
      return dayjs(row.original.deposit_date).format("DD MMM YYYY");
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
      const isSaved = row.original.is_saved;
      return (
        <Button disabled={!isSaved} variant="ghost" size="icon">
          <FileText className="w-4 h-4" />
        </Button>
      );
    },
  },
  {
    id: "csv",
    header: "CSV",
    cell: ({ row }) => {
      const isSaved = row.original.is_saved;
      return (
        <Button disabled={!isSaved} variant="ghost" size="icon">
          <FileSpreadsheet className="w-4 h-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const report = row.original;
      return (
        <SaveOrDeleteReport
          report={row.original}
          region={row.original.region}
        />
      );
    },
  },
];