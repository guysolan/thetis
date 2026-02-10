import { useMemo, useState } from "react";
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	flexRender,
	createColumnHelper,
	type SortingState,
	type ColumnDef,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from "@thetis/ui/table";
import { ArrowUpDown, Search, AlertTriangle } from "lucide-react";
import { Input } from "@thetis/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import { Badge } from "@thetis/ui/badge";
import { Link } from "@tanstack/react-router";
import type { StockRow, LocationColumn } from "../utils/pivotStockData";
import type { InventoryHistoryRecord } from "../../stock-history/StockHistoryTable";
import ItemHistorySheet from "./ItemHistorySheet";

export interface ReorderInfoItem {
	placeOrderBy: string;
	isDue: boolean;
	orderQty: number;
}

interface StockTableProps {
	rows: StockRow[];
	columns: LocationColumn[];
	inventoryHistory: InventoryHistoryRecord[];
	reorderInfo?: Map<number, ReorderInfoItem>;
	/** When provided, type filter is controlled by parent (e.g. page tabs) */
	typeFilter?: string;
	/** When provided, search is controlled by parent */
	globalFilter?: string;
	onGlobalFilterChange?: (value: string) => void;
}

const columnHelper = createColumnHelper<StockRow>();

export default function StockTable({
	rows,
	columns,
	inventoryHistory,
	reorderInfo,
	typeFilter: typeFilterProp,
	globalFilter: globalFilterProp,
	onGlobalFilterChange,
}: StockTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [internalGlobalFilter, setInternalGlobalFilter] = useState("");
	const [internalTypeFilter, setInternalTypeFilter] = useState("all");
	const [selectedItem, setSelectedItem] = useState<StockRow | null>(null);

	const typeFilter = typeFilterProp ?? internalTypeFilter;
	const globalFilter = globalFilterProp ?? internalGlobalFilter;
	const setGlobalFilter = onGlobalFilterChange ?? setInternalGlobalFilter;

	// Filter rows by item type
	const filteredRows = useMemo(() => {
		if (typeFilter === "all") return rows;
		return rows.filter((r) => r.itemType === typeFilter);
	}, [rows, typeFilter]);

	// Build tanstack-table column definitions from the dynamic location columns
	const tableColumns = useMemo<ColumnDef<StockRow, unknown>[]>(() => {
		const cols: ColumnDef<StockRow, unknown>[] = [
			columnHelper.accessor("itemName", {
				header: "Item",
				cell: (info) => (
					<span className="font-medium">{info.getValue()}</span>
				),
				enableGlobalFilter: true,
			}) as ColumnDef<StockRow, unknown>,
			columnHelper.accessor("itemType", {
				header: "Type",
				cell: (info) => (
					<span className="text-muted-foreground capitalize text-xs">
						{info.getValue()}
					</span>
				),
				enableGlobalFilter: false,
			}) as ColumnDef<StockRow, unknown>,
			// Reorder status (only for reorder-plan products)
			columnHelper.display({
				id: "reorder",
				header: "Reorder",
				cell: ({ row }) => {
					const info = reorderInfo?.get(row.original.itemId);
					if (!info) return null;
					return (
						<Link
							to="/home/stock/reorder-plan"
							className="inline-flex items-center gap-1.5 text-sm no-underline hover:underline"
						>
							{info.isDue ? (
								<Badge variant="destructive" className="gap-1 font-normal">
									<AlertTriangle className="h-3 w-3" />
									Due
								</Badge>
							) : info.orderQty > 0 ? (
								<Badge variant="secondary" className="font-normal">
									Reordering
								</Badge>
							) : (
								<Badge variant="secondary" className="font-normal">
									Order by {info.placeOrderBy}
								</Badge>
							)}
						</Link>
					);
				},
				enableGlobalFilter: false,
			}) as ColumnDef<StockRow, unknown>,
		];

		// One column per location
		for (const loc of columns) {
			cols.push(
				columnHelper.accessor(
					(row) => row.locations[loc.key] ?? 0,
					{
						id: loc.key,
						header: () => (
							<span
								className={
									loc.isAmazon
										? "text-orange-600 dark:text-orange-400"
										: ""
								}
							>
								{loc.label}
							</span>
						),
						cell: (info) => {
							const val = info.getValue() as number;
							return (
								<span className="tabular-nums">
									{val || "-"}
								</span>
							);
						},
						enableGlobalFilter: false,
					},
				) as ColumnDef<StockRow, unknown>,
			);
		}

		// Total column
		cols.push(
			columnHelper.accessor("total", {
				header: "Total",
				cell: (info) => (
					<span className="font-semibold tabular-nums">
						{info.getValue()}
					</span>
				),
				enableGlobalFilter: false,
			}) as ColumnDef<StockRow, unknown>,
		);

		return cols;
	}, [columns, reorderInfo]);

	const table = useReactTable({
		data: filteredRows,
		columns: tableColumns,
		state: { sorting, globalFilter },
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: "includesString",
	});

	// Compute column totals for the footer
	const columnTotals = useMemo(() => {
		const totals: Record<string, number> = {};
		for (const loc of columns) {
			totals[loc.key] = filteredRows.reduce(
				(sum, row) => sum + (row.locations[loc.key] ?? 0),
				0,
			);
		}
		totals.total = filteredRows.reduce((sum, row) => sum + row.total, 0);
		return totals;
	}, [filteredRows, columns]);

	const handleRowClick = (row: StockRow) => {
		setSelectedItem(row);
	};

	return (
		<div className="space-y-4">
			{/* Toolbar only when not controlled by parent */}
			{typeFilterProp == null && onGlobalFilterChange == null && (
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
					<div className="relative w-full sm:w-64">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search items..."
							value={globalFilter}
							onChange={(e) => setGlobalFilter(e.target.value)}
							className="pl-9"
						/>
					</div>
					<Tabs
						value={typeFilter}
						onValueChange={setInternalTypeFilter}
					>
						<TabsList>
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="product">Products</TabsTrigger>
							<TabsTrigger value="part">Parts</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			)}

			{/* Table */}
			<div className="border rounded-md overflow-x-auto">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="cursor-pointer select-none whitespace-nowrap"
										onClick={header.column.getToggleSortingHandler()}
									>
										<div className="flex items-center gap-1">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext(),
													)}
											{header.column.getIsSorted() ? (
												<ArrowUpDown className="h-3 w-3" />
											) : null}
										</div>
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={tableColumns.length}
									className="text-center text-muted-foreground py-8"
								>
									No items found.
								</TableCell>
							</TableRow>
						) : (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="cursor-pointer hover:bg-muted/50"
									onClick={() =>
										handleRowClick(row.original)
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="whitespace-nowrap"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell className="font-semibold">
								Total
							</TableCell>
							<TableCell />
							<TableCell />
							{columns.map((col) => (
								<TableCell
									key={col.key}
									className="font-semibold tabular-nums whitespace-nowrap"
								>
									{columnTotals[col.key] || "-"}
								</TableCell>
							))}
							<TableCell className="font-bold tabular-nums">
								{columnTotals.total}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>

			<ItemHistorySheet
				selectedItem={selectedItem}
				open={!!selectedItem}
				onOpenChange={(open) => {
					if (!open) setSelectedItem(null);
				}}
				inventoryHistory={inventoryHistory}
				columns={columns}
			/>
		</div>
	);
}
