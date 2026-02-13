import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import { cn } from "@thetis/ui/cn";

export interface StocktakeItemRow {
  item_name: string;
  quantity_before: number;
  quantity_after: number;
  quantity_change: number;
}

interface StocktakeSummaryProps {
  items: StocktakeItemRow[];
  /** Optional class for the wrapper */
  className?: string;
}

/**
 * Displays stocktake (count) results in the same format as the form:
 * Previous (before) | New (counted/after) | Change
 */
export function StocktakeSummary({ items, className }: StocktakeSummaryProps) {
  if (!items?.length) {
    return (
      <div
        className={cn(
          "rounded-lg border bg-muted/30 p-4 text-center text-sm text-muted-foreground",
          className,
        )}
      >
        No items in this stocktake
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="font-semibold text-sm text-foreground">
        Stock count
      </h3>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-medium text-xs">Item</TableHead>
              <TableHead className="w-24 text-center font-medium text-xs">
                Previous
              </TableHead>
              <TableHead className="w-24 text-center font-medium text-xs">
                Counted
              </TableHead>
              <TableHead className="w-24 text-center font-medium text-xs">
                Change
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((row, index) => (
              <TableRow key={`${row.item_name}-${index}`}>
                <TableCell className="font-medium text-sm">
                  {row.item_name || "—"}
                </TableCell>
                <TableCell className="text-center tabular-nums text-sm text-muted-foreground">
                  {row.quantity_before}
                </TableCell>
                <TableCell className="text-center tabular-nums text-sm">
                  {row.quantity_after}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-center tabular-nums text-sm font-medium",
                    row.quantity_change > 0 && "text-green-600",
                    row.quantity_change < 0 && "text-red-500",
                    row.quantity_change === 0 && "text-muted-foreground",
                  )}
                >
                  {row.quantity_change > 0 ? "+" : ""}
                  {row.quantity_change}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
