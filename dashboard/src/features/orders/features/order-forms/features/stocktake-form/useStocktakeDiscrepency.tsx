import { useEffect, useState } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";

interface StocktakeDiscrepancy {
  id: string;
  quantity_before: number;
  quantity_after: number;
  quantity_change: number;
}

export const useStocktakeDiscrepancy = (
  control: Control<any>,
  setValue: UseFormSetValue<any>,
): StocktakeDiscrepancy[] => {
  const { data: stockpileItems } = useSelectItemsByAddress();

  // Watch for changes in relevant form fields
  const orderItems = useWatch({
    control,
    name: "order_items",
  });

  const selectedFromStockpile = useWatch({
    control,
    name: "address_id",
  });

  // Add state to store discrepancies
  const [discrepancies, setDiscrepancies] = useState<StocktakeDiscrepancy[]>(
    [],
  );

  useEffect(() => {
    if (!selectedFromStockpile || !stockpileItems || !orderItems) {
      setValue("change_quantity", []);
      setDiscrepancies([]);
      return;
    }

    // Calculate stocktake discrepancies
    const newDiscrepancies = processStocktakeItems({
      orderItems,
      stockpileItems,
      selectedFromStockpile,
    }) || [];

    setDiscrepancies(newDiscrepancies);

    // Update form with change quantities
    setValue(
      "change_quantity",
      newDiscrepancies?.map((item) => ({
        quantity_change: Number(item.quantity_change),
        item_id: Number(item.id),
      })),
    );
  }, [selectedFromStockpile, stockpileItems, orderItems, setValue]);

  return discrepancies;
};

interface ProcessStocktakeItemsParams {
  orderItems: any[]; // Replace with proper type
  stockpileItems: any[]; // Replace with proper type
  selectedFromStockpile: string | number;
}

function processStocktakeItems({
  orderItems,
  stockpileItems,
  selectedFromStockpile,
}: ProcessStocktakeItemsParams): StocktakeDiscrepancy[] {
  const itemsInStockpile = stockpileItems.filter(
    (w) => String(w.address_id) === String(selectedFromStockpile),
  );

  return orderItems?.map((orderItem) => {
    const stockpileItem = itemsInStockpile.find(
      (item) => String(item.item_id) === String(orderItem.item_id),
    );

    const quantityBefore = stockpileItem?.item_quantity ?? 0;
    const quantityAfter = Number(orderItem.quantity_change);

    return {
      id: orderItem.item_id,
      quantity_before: quantityBefore,
      quantity_after: quantityAfter,
      quantity_change: quantityAfter - quantityBefore,
    };
  });
}
