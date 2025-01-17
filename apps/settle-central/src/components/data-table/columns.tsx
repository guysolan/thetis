import { ColumnDef, Column } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ExternalLink,
  MoreHorizontal,
  Copy,
  Table,
  FileSpreadsheet,
  Save,
  Mail,
  FileDown,
  FileArchive,
  FileText,
} from "lucide-react";
import { Button } from "@thetis/ui/button";
import { Link } from "@tanstack/react-router";
import { FilePreview } from "../FilePreview";
import dayjs from "dayjs";
import EmailPdfDialog from "../EmailPdfDialog";
import DownloadFolderButton from "./download-folder-button";
import DeleteFolderButton from "./delete-folder-button";
import SaveReportButton from "./save-report";
import NumberFlow from "@number-flow/react";
import { Checkbox } from "@thetis/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@thetis/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@thetis/ui/context-menu";

import { AmazonReport } from "@thetis/amazon/amazon-types";
import { Separator } from "@thetis/ui/separator";

type RowData = AmazonReport & { is_saved: boolean };

const CurrencyCell = ({
  value,
  currency,
}: { value: number; currency: string }) => {
  return (
    <NumberFlow
      value={value}
      format={
        currency
          ? { style: "currency", currency: currency }
          : {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
      }
    />
  );
};

// Update the ActionsCell to a simpler version
const ActionsCell = ({ row }: { row: any }) => {
  const isSaved = row.original.is_saved;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0 w-8 h-8">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-black w-56">
        <DropdownMenuItem asChild>
          <Link
            to="/settlements/report"
            search={{
              report: row.original,
              region: row.original.region,
              country: row.original.country,
            }}
          >
            <Table className="mr-2 w-4 h-4" />
            View Detailed Table
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <FileText className="mr-2 w-4 h-4" />
          View Summary
        </DropdownMenuItem>

        {!isSaved ? (
          <DropdownMenuItem className="font-medium text-primary">
            <Save className="mr-2 w-4 h-4" />
            Save Report
          </DropdownMenuItem>
        ) : (
          <>
            <Separator />

            <DropdownMenuItem>
              <Mail className="mr-2 w-4 h-4" />
              Email Report
            </DropdownMenuItem>

            <Separator />

            <DropdownMenuItem>
              <FileDown className="mr-2 w-4 h-4" />
              Download PDF
            </DropdownMenuItem>

            <DropdownMenuItem>
              <FileSpreadsheet className="mr-2 w-4 h-4" />
              Download CSV
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<RowData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    header: "",
    cell: ActionsCell,
    enableSorting: false,
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
    enableSorting: false,
  },
  {
    accessorKey: "report_id",
    header: "Report ID",
    cell: ({ row }) => row.getValue("report_id"),
  },
  {
    accessorKey: "settlement_id",
    header: "Settlement ID",
  },
  {
    accessorKey: "region",
    header: "Region",
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "marketplace_name",
    header: "Marketplace",
    filterFn: "arrIncludesSome",
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
    cell: ({ row }) => {
      return (
        <CurrencyCell
          value={row.original.net_proceeds}
          currency={row.original.currency}
        />
      );
    },
  },
  {
    accessorKey: "sales_total",
    header: "Total Sales",
    cell: ({ row }) => {
      return (
        <CurrencyCell
          value={row.original.sales_total}
          currency={row.original.currency}
        />
      );
    },
  },
  {
    accessorKey: "expenses_total",
    header: "Total Expenses",
    cell: ({ row }) => {
      return (
        <CurrencyCell
          value={row.original.expenses_total}
          currency={row.original.currency}
        />
      );
    },
  },
  {
    accessorKey: "refunds_total",
    header: "Total Refunds",
    cell: ({ row }) => {
      return (
        <CurrencyCell
          value={row.original.refunds_total}
          currency={row.original.currency}
        />
      );
    },
  },
];
