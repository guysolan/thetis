import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelectWarehouseItems } from "../../warehouses/api/selectWarehouseItems";

export const useStocktakeDiscrepancy = () => {
  const { data: warehouseItems } = useSelectWarehouseItems();
  const { control, setValue } = useFormContext();

  const orderItems = useWatch({
    control,
    name: "order_items",
  });

  const selectedFromWarehouse = useWatch({
    control,
    name: "warehouse_id",
  });

  const stockTakeDiscrepancy = useMemo(() => {
    if (!selectedFromWarehouse || !warehouseItems || !orderItems) return [];

    const itemsInWarehouse = warehouseItems.filter(
      (w) => String(w.warehouse_id) === String(selectedFromWarehouse),
    );

    const stockTakeDiscrepancy = orderItems.map((oi) => {
      const warehouseItem = itemsInWarehouse.find((item) =>
        String(item.item_id) === String(oi.item_id)
      );

      const itemQuantity = warehouseItem?.item_quantity ?? 0;

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
  }, [selectedFromWarehouse, warehouseItems, orderItems]);

  return stockTakeDiscrepancy;
};
