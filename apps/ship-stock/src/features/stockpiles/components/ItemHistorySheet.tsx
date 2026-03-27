import { useMemo } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@thetis/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@thetis/ui/table";
import { Badge } from "@thetis/ui/badge";
import { ScrollArea } from "@thetis/ui/scroll-area";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import type { InventoryHistoryRecord } from "../../stock-history/StockHistoryTable";
import {
  getCurrentQuantity,
  getDeliveryBoundFromItemChange,
  getDeliveryBoundUsedLabel,
  getDeliveryWindowParts,
  getOrderTypeBadgeVariant,
  resolvedItemAddressId,
  sliceDeltaVersusPriorCalendarDay,
} from "../../stock-history/utils";
import type { StockRow, LocationColumn } from "../utils/pivotStockData";

function locationColumnForAddressId(
  addressId: unknown,
  stockpileColumns: LocationColumn[],
): LocationColumn | undefined {
  if (addressId == null || String(addressId) === "") return undefined;
  const n = Number(addressId);
  if (Number.isNaN(n)) return undefined;
  return stockpileColumns.find(
    (c) => c.addressId != null && Number(c.addressId) === n,
  );
}

/** Net change shown in the row: ledger delta when present, else slice change. */
function sumLocationNet(
  locations: Record<string, { quantity: number; change: number; displayDelta?: number }>,
): number {
  return Object.values(locations).reduce((s, loc) => s + (loc.displayDelta ?? loc.change), 0);
}

function applyDisplayDeltas(
  locations: Record<string, { quantity: number; change: number; displayDelta?: number }>,
  stockpileColumns: LocationColumn[],
  itemId: number,
  inventoryHistory: InventoryHistoryRecord[],
  transactionDate: string,
): Record<string, { quantity: number; change: number; displayDelta?: number }> {
  const next: typeof locations = {};
  for (const [key, loc] of Object.entries(locations)) {
    const col = stockpileColumns.find((c) => c.key === key);
    if (col?.addressId == null) {
      next[key] = { ...loc };
      delete next[key].displayDelta;
      continue;
    }
    const displayDelta = sliceDeltaVersusPriorCalendarDay(
      itemId,
      inventoryHistory,
      col.addressId,
      transactionDate,
      loc.quantity,
    );
    next[key] = { ...loc, displayDelta };
  }
  return next;
}

/**
 * Row date for display, sorting, and ledger deltas. Does not use order_date (treat as created-at only).
 * With delivery_start / delivery_end: negative tracked change → first date; positive → second date.
 * Otherwise falls back to line effective_date or the slice transaction_date from the history view (not order_date).
 */
function movementSortDate(
  record: InventoryHistoryRecord,
  trackedNetChange: number,
  matchingItems: InventoryHistoryRecord["items"],
): string {
  const ds =
    record.delivery_start != null && String(record.delivery_start) !== ""
      ? dayjs(record.delivery_start)
      : null;
  const de =
    record.delivery_end != null && String(record.delivery_end) !== ""
      ? dayjs(record.delivery_end)
      : null;

  if (trackedNetChange < 0 && ds?.isValid()) {
    return ds.format("YYYY-MM-DD");
  }
  if (trackedNetChange > 0 && de?.isValid()) {
    return de.format("YYYY-MM-DD");
  }

  const effRaw =
    matchingItems.find((i) => i.effective_date != null && String(i.effective_date) !== "")
      ?.effective_date ?? record.transaction_date;
  if (dayjs(effRaw).isValid()) {
    return dayjs(effRaw).format("YYYY-MM-DD");
  }
  if (dayjs(record.transaction_date).isValid()) {
    return dayjs(record.transaction_date).format("YYYY-MM-DD");
  }
  return dayjs().format("YYYY-MM-DD");
}

interface ItemHistorySheetProps {
  selectedItem: StockRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inventoryHistory: InventoryHistoryRecord[];
  columns: LocationColumn[];
}

interface TransactionRow {
  /** Movement date: delivery-bound + sign, or slice dates only — drives sort, Date column, and scheduled deltas. */
  transactionDate: string;
  orderId: number;
  orderType: string;
  deliveryStart: string | null;
  deliveryEnd: string | null;
  /**
   * Sum of slice quantity_change for this item across table stockpile columns only.
   * Negative → first delivery day (dispatch from tracked stock); positive → last day (inbound).
   */
  trackedNetChange: number;
  /** True when movement date is after today — show order but not qty/change yet. */
  isFuture: boolean;
  /** Map of locationKey -> qty/change; displayDelta overrides +/- for scheduled rows */
  locations: Record<string, { quantity: number; change: number; displayDelta?: number }>;
}

export default function ItemHistorySheet({
  selectedItem,
  open,
  onOpenChange,
  inventoryHistory,
  columns,
}: ItemHistorySheetProps) {
  // Only use stockpile (non-Amazon) columns -- Amazon doesn't have transaction history
  const stockpileColumns = useMemo(() => columns.filter((col) => !col.isAmazon), [columns]);

  // Build the transaction rows for the selected item
  const transactionRows = useMemo<TransactionRow[]>(() => {
    if (!selectedItem || !inventoryHistory.length) return [];

    const itemId = selectedItem.itemId;
    const todayStart = dayjs().startOf("day");
    const rows: TransactionRow[] = [];

    for (const record of inventoryHistory) {
      // Check if this record mentions the selected item (IDs from JSON may be string | number)
      const matchingItems = record.items.filter((item) => Number(item.id) === Number(itemId));

      if (matchingItems.length === 0) continue;

      let locations: Record<string, { quantity: number; change: number; displayDelta?: number }> = {};

      for (const item of matchingItems) {
        const addr = resolvedItemAddressId(item, record);
        const col = locationColumnForAddressId(addr, stockpileColumns);
        if (col) {
          const prev = locations[col.key];
          const change = Number(item.change);
          const qty = Number(item.quantity);
          if (prev) {
            locations[col.key] = {
              quantity: qty,
              change: prev.change + change,
            };
          } else {
            locations[col.key] = { quantity: qty, change };
          }
        }
      }

      if (Object.keys(locations).length === 0) continue;

      const matchingNetChange = matchingItems.reduce((s, i) => s + Number(i.change), 0);
      let rawTrackedNet =
        Object.keys(locations).length > 0
          ? Object.values(locations).reduce((s, l) => s + l.change, 0)
          : matchingNetChange;

      let transactionDate = movementSortDate(record, rawTrackedNet, matchingItems);
      let trackedNetChange = rawTrackedNet;

      // Raw slice changes can disagree with ledger (e.g. + slice / − display). Converge movement date using the same net we show.
      for (let iter = 0; iter < 4; iter++) {
        const rowDayIter = dayjs(transactionDate).startOf("day");
        const isFutIter = rowDayIter.isAfter(todayStart);
        if (isFutIter) {
          locations = applyDisplayDeltas(
            locations,
            stockpileColumns,
            itemId,
            inventoryHistory,
            transactionDate,
          );
        }
        const net = sumLocationNet(locations);
        const nextDate = movementSortDate(record, net, matchingItems);
        trackedNetChange = net;
        if (nextDate === transactionDate) break;
        transactionDate = nextDate;
      }

      const rowDay = dayjs(transactionDate).startOf("day");
      const isFuture = rowDay.isAfter(todayStart);
      if (isFuture) {
        locations = applyDisplayDeltas(
          locations,
          stockpileColumns,
          itemId,
          inventoryHistory,
          transactionDate,
        );
        trackedNetChange = sumLocationNet(locations);
      }

      rows.push({
        transactionDate,
        orderId: record.order_id,
        orderType: record.order_type,
        deliveryStart: record.delivery_start ?? null,
        deliveryEnd: record.delivery_end ?? null,
        trackedNetChange,
        isFuture,
        locations,
      });
    }

    return rows;
  }, [selectedItem, inventoryHistory, stockpileColumns]);

  // Build the "Current" row using getCurrentQuantity per location
  const currentRow = useMemo<TransactionRow | null>(() => {
    if (!selectedItem || !inventoryHistory.length) return null;

    const itemId = selectedItem.itemId;
    const locations: Record<string, { quantity: number; change: number }> = {};

    for (const col of stockpileColumns) {
      if (col.addressId == null) continue;
      const qty = getCurrentQuantity(itemId, inventoryHistory, col.addressId);
      if (qty !== 0) {
        locations[col.key] = { quantity: qty, change: 0 };
      }
    }

    return {
      transactionDate: dayjs().format("YYYY-MM-DD"),
      orderId: 0,
      orderType: "current",
      deliveryStart: null,
      deliveryEnd: null,
      trackedNetChange: 0,
      isFuture: false,
      locations,
    };
  }, [selectedItem, inventoryHistory, stockpileColumns]);

  /** Newest-first within future and within past; "Now" sits between them. */
  const allRows = useMemo(() => {
    const todayStart = dayjs().startOf("day");
    const byDesc = (a: TransactionRow, b: TransactionRow) =>
      dayjs(b.transactionDate).valueOf() - dayjs(a.transactionDate).valueOf();

    const future = transactionRows.filter((r) => dayjs(r.transactionDate).startOf("day").isAfter(todayStart)).sort(byDesc);
    const past = transactionRows
      .filter((r) => !dayjs(r.transactionDate).startOf("day").isAfter(todayStart))
      .sort(byDesc);

    if (!currentRow) return [...future, ...past];
    return [...future, currentRow, ...past];
  }, [currentRow, transactionRows]);

  if (!selectedItem) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-neutral-50 w-full sm:max-w-[min(94vw,56rem)] sm:w-[min(94vw,56rem)]">
        <SheetHeader>
          <SheetTitle>{selectedItem.itemName}</SheetTitle>
          <SheetDescription className="text-pretty">
            Rows sort by movement date from the delivery window and the direction of change at tracked
            locations (negative → first day, positive → second). Order created-at is not used. Scheduled
            lines reconcile +/- with the ledger when needed so the date and bold match what you see.
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
                    <TableHead className="whitespace-nowrap">Date</TableHead>
                    <TableHead className="min-w-[10rem]">Delivery window</TableHead>
                    <TableHead className="whitespace-nowrap">Type</TableHead>
                    {stockpileColumns.map((col) => (
                      <TableHead key={col.key} className="whitespace-nowrap">
                        {col.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allRows.map((row, index) => {
                    const windowParts = getDeliveryWindowParts(
                      row.deliveryStart,
                      row.deliveryEnd,
                    );
                    const boundUsed =
                      row.orderType === "current"
                        ? null
                        : row.trackedNetChange !== 0
                          ? getDeliveryBoundFromItemChange(row.trackedNetChange)
                          : getDeliveryBoundUsedLabel(
                            row.transactionDate,
                            row.deliveryStart,
                            row.deliveryEnd,
                          );
                    const deliveryCell =
                      row.orderType === "current" ||
                      !windowParts ||
                      (windowParts.start == null && windowParts.end == null) ? (
                        <span className="text-muted-foreground">—</span>
                      ) : windowParts.start &&
                        windowParts.end &&
                        windowParts.start === windowParts.end ? (
                        <span className={boundUsed ? "font-bold" : undefined}>
                          {windowParts.start}
                        </span>
                      ) : windowParts.start && windowParts.end ? (
                        <>
                          <span
                            className={boundUsed === "outbound" ? "font-bold" : undefined}
                          >
                            {windowParts.start}
                          </span>
                          <span> → </span>
                          <span
                            className={boundUsed === "inbound" ? "font-bold" : undefined}
                          >
                            {windowParts.end}
                          </span>
                        </>
                      ) : windowParts.start ? (
                        <span
                          className={boundUsed === "outbound" ? "font-bold" : undefined}
                        >
                          {windowParts.start}
                        </span>
                      ) : (
                        <span
                          className={boundUsed === "inbound" ? "font-bold" : undefined}
                        >
                          {windowParts.end}
                        </span>
                      );
                    return (
                      <TableRow
                        key={`${row.orderId}-${row.transactionDate}-${row.orderType}-${index}`}
                        className={row.orderType === "current" ? "bg-muted/50 font-medium" : ""}
                      >
                        <TableCell className="whitespace-nowrap">
                          {row.orderType === "current"
                            ? "Now"
                            : row.isFuture
                              ? (
                                <span className="text-foreground">
                                  {dayjs(row.transactionDate).format("DD/MM/YYYY")}
                                  <span className="ml-1.5 text-muted-foreground text-xs font-normal">
                                    (scheduled)
                                  </span>
                                </span>
                              )
                              : dayjs(row.transactionDate).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell className="text-sm align-top">{deliveryCell}</TableCell>
                        <TableCell>
                          <div className="flex flex-col items-start gap-1">
                            <Badge className={getOrderTypeBadgeVariant(row.orderType)}>
                              {row.orderType}
                            </Badge>
                            {row.orderId !== 0 ? (
                              <Link
                                to="/home/orders/$orderId"
                                params={{
                                  orderId: row.orderId.toString(),
                                }}
                                className="text-primary text-xs underline-offset-4 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                #{row.orderId}
                              </Link>
                            ) : null}
                          </div>
                        </TableCell>
                        {stockpileColumns.map((col) => {
                          const loc = row.locations[col.key];
                          if (!loc) {
                            return <TableCell key={col.key}>-</TableCell>;
                          }
                          return (
                            <TableCell key={col.key}>
                              <div>
                                <div className="tabular-nums">
                                  {loc.quantity}
                                  {row.isFuture && row.orderType !== "current" && (
                                    <span className="ml-1 text-muted-foreground text-xs font-normal">
                                      (proj.)
                                    </span>
                                  )}
                                </div>
                                {(() => {
                                  const delta = loc.displayDelta !== undefined ? loc.displayDelta : loc.change;
                                  if (delta === 0) return null;
                                  return (
                                    <div
                                      className={`text-xs ${
                                        delta > 0 ? "text-green-600" : "text-red-600"
                                      }`}
                                    >
                                      {delta > 0 ? "+" : ""}
                                      {delta}
                                    </div>
                                  );
                                })()}
                              </div>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
