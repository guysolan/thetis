import { useMemo } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@thetis/ui/sheet";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@thetis/ui/table";
import { Badge } from "@thetis/ui/badge";
import { ScrollArea } from "@thetis/ui/scroll-area";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import type { InventoryHistoryRecord } from "../../stock-history/StockHistoryTable";
import {
	getCurrentQuantity,
	getOrderTypeBadgeVariant,
} from "../../stock-history/utils";
import type { StockRow, LocationColumn } from "../utils/pivotStockData";

interface ItemHistorySheetProps {
	selectedItem: StockRow | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	inventoryHistory: InventoryHistoryRecord[];
	columns: LocationColumn[];
}

interface TransactionRow {
	transactionDate: string;
	orderId: number;
	orderType: string;
	/** Map of locationKey -> { quantity, change } */
	locations: Record<string, { quantity: number; change: number }>;
}

export default function ItemHistorySheet({
	selectedItem,
	open,
	onOpenChange,
	inventoryHistory,
	columns,
}: ItemHistorySheetProps) {
	// Only use stockpile (non-Amazon) columns -- Amazon doesn't have transaction history
	const stockpileColumns = useMemo(
		() => columns.filter((col) => !col.isAmazon),
		[columns],
	);

	// Build the transaction rows for the selected item
	const transactionRows = useMemo<TransactionRow[]>(() => {
		if (!selectedItem || !inventoryHistory.length) return [];

		const itemId = selectedItem.itemId;
		const rows: TransactionRow[] = [];

		for (const record of inventoryHistory) {
			// Check if this record mentions the selected item at any address
			const matchingItems = record.items.filter(
				(item) => item.id === itemId,
			);

			if (matchingItems.length === 0) continue;

			const locations: Record<
				string,
				{ quantity: number; change: number }
			> = {};

			for (const item of matchingItems) {
				// Find the matching stockpile column by address_id
				const col = stockpileColumns.find(
					(c) => c.addressId === item.address_id,
				);
				if (col) {
					locations[col.key] = {
						quantity: item.quantity,
						change: item.change,
					};
				}
			}

			rows.push({
				transactionDate: record.transaction_date,
				orderId: record.order_id,
				orderType: record.order_type,
				locations,
			});
		}

		return rows;
	}, [selectedItem, inventoryHistory, stockpileColumns]);

	// Build the "Current" row using getCurrentQuantity per location
	const currentRow = useMemo<TransactionRow | null>(() => {
		if (!selectedItem || !inventoryHistory.length) return null;

		const itemId = selectedItem.itemId;
		const locations: Record<
			string,
			{ quantity: number; change: number }
		> = {};

		for (const col of stockpileColumns) {
			if (col.addressId == null) continue;
			const qty = getCurrentQuantity(
				itemId,
				inventoryHistory,
				col.addressId,
			);
			if (qty !== 0) {
				locations[col.key] = { quantity: qty, change: 0 };
			}
		}

		return {
			transactionDate: dayjs().format("YYYY-MM-DD"),
			orderId: 0,
			orderType: "current",
			locations,
		};
	}, [selectedItem, inventoryHistory, stockpileColumns]);

	const allRows = useMemo(() => {
		if (!currentRow) return transactionRows;
		return [currentRow, ...transactionRows];
	}, [currentRow, transactionRows]);

	if (!selectedItem) return null;

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="bg-neutral-50 sm:max-w-2xl">
				<SheetHeader>
					<SheetTitle>{selectedItem.itemName}</SheetTitle>
					<SheetDescription>
						Stock history across all locations
					</SheetDescription>
				</SheetHeader>
				<ScrollArea className="h-[calc(100vh-10rem)] mt-4">
					{allRows.length === 0 ? (
						<div className="py-12 text-center text-muted-foreground">
							No history found for this item.
						</div>
					) : (
						<div className="border rounded-md overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="whitespace-nowrap">
											Date
										</TableHead>
										<TableHead className="whitespace-nowrap">
											Order
										</TableHead>
										<TableHead className="whitespace-nowrap">
											Type
										</TableHead>
										{stockpileColumns.map((col) => (
											<TableHead
												key={col.key}
												className="whitespace-nowrap"
											>
												{col.label}
											</TableHead>
										))}
									</TableRow>
								</TableHeader>
								<TableBody>
									{allRows.map((row, index) => (
										<TableRow
											key={`${row.orderId}-${index}`}
											className={
												row.orderType === "current"
													? "bg-muted/50 font-medium"
													: ""
											}
										>
											<TableCell className="whitespace-nowrap">
												{row.orderType === "current"
													? "Now"
													: dayjs(
															row.transactionDate,
														).format("DD/MM/YYYY")}
											</TableCell>
											<TableCell className="whitespace-nowrap">
												{row.orderId !== 0 ? (
													<Link
														to="/home/orders/$orderId"
														params={{
															orderId:
																row.orderId.toString(),
														}}
														className="text-primary underline-offset-4 hover:underline"
														onClick={(e) =>
															e.stopPropagation()
														}
													>
														#{row.orderId}
													</Link>
												) : (
													"-"
												)}
											</TableCell>
											<TableCell>
												<Badge
													className={getOrderTypeBadgeVariant(
														row.orderType,
													)}
												>
													{row.orderType}
												</Badge>
											</TableCell>
											{stockpileColumns.map((col) => {
												const loc =
													row.locations[col.key];
												if (!loc) {
													return (
														<TableCell
															key={col.key}
														>
															-
														</TableCell>
													);
												}
												return (
													<TableCell key={col.key}>
														<div>
															<div className="tabular-nums">
																{loc.quantity}
															</div>
															{loc.change !==
																0 && (
																<div
																	className={`text-xs ${
																		loc.change >
																		0
																			? "text-green-600"
																			: "text-red-600"
																	}`}
																>
																	{loc.change >
																	0
																		? "+"
																		: ""}
																	{loc.change}
																</div>
															)}
														</div>
													</TableCell>
												);
											})}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					)}
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
