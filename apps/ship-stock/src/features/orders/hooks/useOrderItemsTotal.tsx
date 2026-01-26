import { useMemo } from "react";
import { useOrderItems } from "./useOrderItems";

export const useOrderItemsTotal = (): number => {
  const orderItems = useOrderItems();

  // Memoize the total calculation to prevent infinite loops
  const total = useMemo(() => {
    return orderItems.reduce((sum, oi) => sum + (oi.item_total || 0), 0);
  }, [orderItems]);

  return total;
};
