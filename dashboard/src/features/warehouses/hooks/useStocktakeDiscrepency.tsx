import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelectWarehouseItems } from "../api/selectWarehouseItems";
import { type OrderItem } from "@/components/OrderItems";

export const useStocktakeDiscrepancy = () => {
  const { data: warehouseItems } = useSelectWarehouseItems();
  const { control } = useFormContext();

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
      (w) => String(w.warehouse_id) === String(selectedFromWarehouse)
    );

    const stockTakeDiscrepancy = orderItems.map((oi: OrderItem) => {
        const warehouseItem = itemsInWarehouse.find((item) => String(item.item_id) === String(oi.id));
        console.log('warehouseItem', warehouseItem);
        const itemQuantity = warehouseItem?.item_quantity || 0;
    

      return {
        id: oi.id,
        name: oi.item_name,
        quantity_before: itemQuantity,
        quantity_after: oi.quantity,
        quantity_change:  oi.quantity-itemQuantity,
      };
    });
      
      console.log(stockTakeDiscrepancy);
        return stockTakeDiscrepancy;
      
      
  }, [selectedFromWarehouse, warehouseItems, orderItems]);

  return stockTakeDiscrepancy;
};