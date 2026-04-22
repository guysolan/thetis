import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useStockUrgency } from "@/hooks/useStockUrgency";

const warehouseChipClass =
  "whitespace-nowrap rounded-md border border-amber-200/70 bg-amber-50/80 px-2 py-0.5 text-[11px] sm:text-xs text-amber-950/90 transition-colors hover:bg-amber-100/70 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-100/85 dark:hover:bg-amber-900/40";

const fbaChipClass =
  "inline-flex items-center gap-2 rounded-md border border-red-400/90 bg-red-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-red-900 shadow-sm transition-colors hover:bg-red-100 dark:border-red-700 dark:bg-red-950/55 dark:text-red-100 dark:hover:bg-red-950/80";

/**
 * Chip-style links in the top bar when Amazon inventory and/or warehouse reorders need attention.
 */
export default function TopBarStockNotice() {
  const { show, amazonUrgent, warehouseUrgent } = useStockUrgency();
  if (!show) return null;

  return (
    <div className="flex flex-wrap justify-end items-center gap-1.5 sm:gap-2 max-w-full leading-tight shrink-0">
      {amazonUrgent && (
        <Link
          to="/home/stock/amazon-plan"
          className={fbaChipClass}
          title="Amazon inventory below minimum — open Amazon Plan"
        >
          <Bell
            className="size-3.5 sm:size-4 text-red-600 dark:text-red-400 shrink-0"
            aria-hidden
          />
          <span>Amazon Inventory Low</span>
        </Link>
      )}
      {warehouseUrgent && (
        <Link to="/home/stock/reorder-plan" className={warehouseChipClass}>
          Reorder due
        </Link>
      )}
    </div>
  );
}
