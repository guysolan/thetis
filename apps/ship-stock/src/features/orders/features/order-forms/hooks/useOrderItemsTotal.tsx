import { useOrderItems } from "./useOrderItems";

export const useOrderItemsTotal = (): number => {
  const orderItems = useOrderItems();
  let total = 0;

  for (const oi of orderItems) {
    total += oi.item_total;
  }

  return total;
};
