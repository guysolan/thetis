"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@thetis/ui/dialog";
import { Button } from "@thetis/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";
import { cn } from "@thetis/ui/cn";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@thetis/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@thetis/ui/dropdown-menu";
import {
  Globe2,
  Store,
  Filter,
  Check,
  MapPin,
  ShoppingCart,
  FileText,
  Table2,
} from "lucide-react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@thetis/ui/dropdown-menu";
import { Progress } from "@thetis/ui/progress";

import * as changeCase from "change-case";
import { useExportFiles } from "@/api/useExportFiles";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [openRegion, setOpenRegion] = React.useState(false);
  const [openMarketplace, setOpenMarketplace] = React.useState(false);
  const [openColumns, setOpenColumns] = React.useState(false);

  const { mutateAsync: downloadFiles } = useExportFiles();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    filterFns: {
      arrIncludesSome: (row, columnId, filterValues: string[]) => {
        const value = row.getValue(columnId) as string;
        return filterValues.includes(value?.toLowerCase());
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleExport = async (fileTypes: ("pdf" | "csv")[]) => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const fileNames = selectedRows.map((row) => row.original.storage_path);

    await downloadFiles({
      fileNames,
      fileTypes,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 w-4 h-4" />
                Filters
                {Object.keys(columnFilters).length > 0 && (
                  <span className="flex justify-center items-center bg-primary ml-2 rounded-full w-5 h-5 text-primary-foreground text-xs">
                    {Object.keys(columnFilters).length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-56">
              <DropdownMenuLabel>Filter Data</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/* Region Filter */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Globe2 className="mr-2 w-4 h-4" />
                    <span>Regions</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white">
                    {["NA", "EUR", "ASIA"].map((region) => {
                      const selected = (
                        (table
                          .getColumn("region")
                          ?.getFilterValue() as string[]) ?? []
                      ).includes(region.toLowerCase());
                      return (
                        <DropdownMenuItem
                          key={region}
                          onSelect={(e) => {
                            e.preventDefault();
                            const currentValues =
                              (table
                                .getColumn("region")
                                ?.getFilterValue() as string[]) ?? [];
                            const newValues = selected
                              ? currentValues.filter(
                                  (value) => value !== region.toLowerCase(),
                                )
                              : [...currentValues, region.toLowerCase()];
                            table
                              .getColumn("region")
                              ?.setFilterValue(
                                newValues.length ? newValues : undefined,
                              );
                          }}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              selected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50",
                            )}
                          >
                            {selected && <Check className="w-4 h-4" />}
                          </div>
                          <span>{region}</span>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Marketplace Filter */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Store className="mr-2 w-4 h-4" />
                    <span>Marketplaces</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white">
                    {[
                      "amazon.com",
                      "amazon.co.uk",
                      "amazon.de",
                      "amazon.fr",
                      "amazon.it",
                      "amazon.es",
                      "amazon.ca",
                      "amazon.com.au",
                    ].map((marketplace) => {
                      const selected = (
                        (table
                          .getColumn("marketplace_name")
                          ?.getFilterValue() as string[]) ?? []
                      ).includes(marketplace.toLowerCase());
                      return (
                        <DropdownMenuItem
                          key={marketplace}
                          onSelect={(e) => {
                            e.preventDefault();
                            const currentValues =
                              (table
                                .getColumn("marketplace_name")
                                ?.getFilterValue() as string[]) ?? [];
                            const newValues = selected
                              ? currentValues.filter(
                                  (value) =>
                                    value !== marketplace.toLowerCase(),
                                )
                              : [...currentValues, marketplace.toLowerCase()];
                            table
                              .getColumn("marketplace_name")
                              ?.setFilterValue(
                                newValues.length ? newValues : undefined,
                              );
                          }}
                          className="hover:bg-accent cursor-pointer"
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              selected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50",
                            )}
                          >
                            {selected && <Check className="w-4 h-4" />}
                          </div>
                          <span>{marketplace}</span>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  table.getColumn("region")?.setFilterValue(undefined);
                  table
                    .getColumn("marketplace_name")
                    ?.setFilterValue(undefined);
                }}
              >
                Clear All Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover open={openColumns} onOpenChange={setOpenColumns}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openColumns}
                className="w-[180px]"
              >
                {Object.keys(columnVisibility).length > 0
                  ? `${Object.keys(columnVisibility).length} hidden`
                  : "Toggle Columns"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white p-0 w-[200px]">
              <Command className="border-none">
                <CommandEmpty>No columns found.</CommandEmpty>
                <CommandGroup>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      const isVisible = column.getIsVisible();
                      return (
                        <CommandItem
                          key={column.id}
                          onSelect={() => column.toggleVisibility(!isVisible)}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isVisible
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50",
                            )}
                          >
                            {isVisible && <Check className="w-4 h-4" />}
                          </div>
                          <span className="capitalize">
                            {changeCase.capitalCase(column.id)}
                          </span>
                        </CommandItem>
                      );
                    })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-muted-foreground text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                disabled={table.getFilteredSelectedRowModel().rows.length === 0}
              >
                <ShoppingCart className="mr-2 w-4 h-4" />
                Export {table.getFilteredSelectedRowModel().rows.length} row(s)
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Export Selected Data</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-4 hover:bg-accent p-4 border rounded-lg cursor-pointer">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full w-10 h-10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm leading-none">
                      PDF Export
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Export data in a formatted PDF document
                    </p>
                  </div>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => handleExport(["pdf"])}
                    >
                      Export PDF
                    </Button>
                  </DialogTrigger>
                </div>

                <div className="flex items-center space-x-4 hover:bg-accent p-4 border rounded-lg cursor-pointer">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full w-10 h-10">
                    <Table2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm leading-none">
                      CSV Export
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Export data in a spreadsheet-compatible format
                    </p>
                  </div>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => handleExport(["csv"])}
                    >
                      Export CSV
                    </Button>
                  </DialogTrigger>
                </div>

                <div className="flex items-center space-x-4 hover:bg-accent p-4 border rounded-lg cursor-pointer">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full w-10 h-10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm leading-none">
                      Export Both
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Export data in both PDF and CSV formats
                    </p>
                  </div>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => handleExport(["pdf", "csv"])}
                    >
                      Export Both
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-nowrap" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-nowrap" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
