import { useMemo } from "react";
import { useSelectStockpiles } from "@/features/stockpiles/api/selectStockpiles";
import { useSelectInventoryHistory } from "@/features/stock-history/api/selectInventoryHistory";
import { useAmazonInventoryOptional } from "@/features/amazon/selectAmazonInventory";
import { pivotStockData } from "@/features/stockpiles/utils/pivotStockData";
import { computeReorderInfo } from "@/features/stockpiles/utils/computeReorderInfoForPlan";
import { fbaHasBelowMinimum } from "@/features/amazon/amazonFbaMinStock";

export function useStockUrgency() {
  const { data: stockpiles } = useSelectStockpiles();
  const { data: inventoryHistory } = useSelectInventoryHistory();
  const { data: amazonInventory } = useAmazonInventoryOptional();
  const { rows, columns } = useMemo(
    () => pivotStockData(inventoryHistory, stockpiles, amazonInventory),
    [inventoryHistory, stockpiles, amazonInventory],
  );

  const reorderInfo = useMemo(
    () => computeReorderInfo(rows, columns, stockpiles),
    [rows, columns, stockpiles],
  );

  const amazonUrgent = useMemo(
    () => fbaHasBelowMinimum(amazonInventory),
    [amazonInventory],
  );
  const warehouseUrgent = useMemo(() => {
    for (const v of reorderInfo?.values() ?? []) {
      if (v.isDue) return true;
    }
    return false;
  }, [reorderInfo]);

  return {
    amazonUrgent,
    warehouseUrgent,
    show: amazonUrgent || warehouseUrgent,
  };
}
