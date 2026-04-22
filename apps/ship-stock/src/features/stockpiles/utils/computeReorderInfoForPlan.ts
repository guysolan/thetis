import {
  computeReorderPlan,
  getDemandMultiplierForProduct,
  getMonthName,
  REORDER_PLAN_PRODUCT_NAMES,
} from "@/features/stock-history/reorderPlanUtils";
import type { LocationColumn, StockRow } from "./pivotStockData";

export type ReorderInfoEntry = {
  placeOrderBy: string;
  isDue: boolean;
  orderQty: number;
};

/**
 * MPD + Park House reorder schedule for products in the reorder plan (Night Splints).
 */
export function computeReorderInfo(
  rows: StockRow[],
  columns: LocationColumn[],
  stockpiles:
    | { stockpile_id: number | null; stockpile_name: string | null }[]
    | undefined,
): Map<number, ReorderInfoEntry> {
  const map = new Map<number, ReorderInfoEntry>();
  if (!stockpiles?.length) return map;

  const mpd = stockpiles.find((s) => s.stockpile_name === "MPD");
  const parkHouse = stockpiles.find((s) => s.stockpile_name === "Park House");
  if (!mpd?.stockpile_id || !parkHouse?.stockpile_id) return map;

  const mpdKey = columns.find((c) => c.addressId === mpd.stockpile_id)?.key;
  const parkHouseKey = columns.find((c) =>
    c.addressId === parkHouse.stockpile_id
  )?.key;
  if (!mpdKey || !parkHouseKey) return map;

  const now = new Date();
  const startMonth = now.getMonth();
  const startYear = now.getFullYear();
  const productNameSet = new Set(
    REORDER_PLAN_PRODUCT_NAMES.map((n) => n.toLowerCase()),
  );

  for (const row of rows) {
    if (!productNameSet.has(row.itemName.toLowerCase())) continue;

    const combinedStock = (row.locations[mpdKey] ?? 0) +
      (row.locations[parkHouseKey] ?? 0);
    const plan = computeReorderPlan(combinedStock, startMonth, startYear, {
      demandMultiplier: getDemandMultiplierForProduct(row.itemName),
    });
    const nextOrder = plan.orders.find((o) => o.isNextOrder);
    if (!nextOrder || nextOrder.quantity <= 0) continue;

    const { month, year } = nextOrder.placeOrderBy;
    const placeOrderByStr = `${getMonthName(month)} ${year}`;
    const isDue = year < startYear ||
      (year === startYear && month <= startMonth);

    map.set(row.itemId, {
      placeOrderBy: placeOrderByStr,
      isDue,
      orderQty: nextOrder.quantity,
    });
  }
  return map;
}
