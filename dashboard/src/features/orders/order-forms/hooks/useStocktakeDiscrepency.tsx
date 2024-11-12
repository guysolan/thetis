import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";

export const useStocktakeDiscrepancy = () => {
  const { data: stockpileItems } = useSelectItemsByAddress();
  const { control, setValue } = useFormContext();

  const orderItems = useWatch({
    control,
    name: "order_items",
  });

  const selectedFromStockpile = useWatch({
    control,
    name: "stockpile_id",
  });

  const stockTakeDiscrepancy = useMemo(() => {
    if (!selectedFromStockpile || !stockpileItems || !orderItems) return [];

    const itemsInStockpile = stockpileItems.filter(
      (w) => String(w.stockpile_id) === String(selectedFromStockpile),
    );

    const stockTakeDiscrepancy = orderItems.map((oi) => {
      const stockpileItem = itemsInStockpile.find((item) =>
        String(item.item_id) === String(oi.item_id)
      );

      const itemQuantity = stockpileItem?.item_quantity ?? 0;

      return {
        id: oi.item_id,
        quantity_before: itemQuantity,
        quantity_after: oi.quantity_change,
        quantity_change: oi.quantity_change - itemQuantity,
      };
    });

    setValue(
      "change_quantity",
      stockTakeDiscrepancy.map((item) => ({
        quantity_change: Number(item.quantity_change),
        item_id: Number(item.id),
      })),
    );

    return stockTakeDiscrepancy;
  }, [selectedFromStockpile, stockpileItems, orderItems]);

  return stockTakeDiscrepancy;
};
