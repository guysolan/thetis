import { ColumnDef, Column } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
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

import { AmazonReport } from "@thetis/amazon/amazon-types";

type RowData = AmazonReport & { is_saved: boolean };

const SortableHeader = ({ column, title }: { column: any; title: string }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 w-4 h-4" />
    </Button>
  );
};

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
    header: ({ column }) => <SortableHeader column={column} title="Actions" />,
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
    header: ({ column }) => <SortableHeader column={column} title="Preview" />,
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
    header: ({ column }) => (
      <SortableHeader column={column} title="Report ID" />
    ),
  },
  {
    accessorKey: "settlement_id",
    header: ({ column }) => (
      <SortableHeader column={column} title="Settlement ID" />
    ),
  },
  {
    accessorKey: "region",
    header: ({ column }) => <SortableHeader column={column} title="Region" />,
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "marketplace_name",
    header: ({ column }) => (
      <SortableHeader column={column} title="Marketplace" />
    ),
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "settlement_start_date",
    header: ({ column }) => (
      <SortableHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => {
      return dayjs(row.original.settlement_start_date).format("DD MMM YYYY");
    },
  },
  {
    accessorKey: "settlement_end_date",
    header: ({ column }) => <SortableHeader column={column} title="End Date" />,
    cell: ({ row }) => {
      return dayjs(row.original.settlement_end_date).format("DD MMM YYYY");
    },
  },
  {
    accessorKey: "currency",
    header: ({ column }) => <SortableHeader column={column} title="Currency" />,
  },
  {
    accessorKey: "net_proceeds",
    header: ({ column }) => (
      <SortableHeader column={column} title="Net Proceeds" />
    ),
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
    header: ({ column }) => (
      <SortableHeader column={column} title="Total Sales" />
    ),
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
    header: ({ column }) => (
      <SortableHeader column={column} title="Total Expenses" />
    ),
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
    header: ({ column }) => (
      <SortableHeader column={column} title="Total Refunds" />
    ),
    cell: ({ row }) => {
      return (
        <CurrencyCell
          value={row.original.refunds_total}
          currency={row.original.currency}
        />
      );
    },
  },
  {
    id: "pdf",
    header: ({ column }) => <SortableHeader column={column} title="PDF" />,
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
    header: ({ column }) => <SortableHeader column={column} title="CSV" />,
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
    id: "email",
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
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
    header: ({ column }) => <SortableHeader column={column} title="Delete" />,
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
