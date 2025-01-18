import { ColumnDef } from "@tanstack/react-table";

import dayjs from "dayjs";
import NumberFlow from "@number-flow/react";
import { Checkbox } from "@thetis/ui/checkbox";

import { AmazonReport } from "@thetis/amazon/amazon-types";

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

import ActionButton from "./action-button";

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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionButton report={row.original} />,
    enableSorting: false,
  },
];
