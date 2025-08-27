import { useFormContext } from "react-hook-form";
import { PricedOrderItem } from "../../multi-order-form/schema";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";

type OrderItemWithTotal = PricedOrderItem & {
  item_total: number;
  item_name?: string;
};

export const useOrderItems = (): OrderItemWithTotal[] => {
  const form = useFormContext();
  const { data: items = [] } = useSelectItemsView();
  const orderType = form.watch("order_type");

  const orderItems =
    form.watch("order_items")?.map((oi) => {
      // Calculate total based on quantity, price and tax
      const quantity = oi.quantity_change || 0;
      const price = oi.item_price || 0;
      const tax = oi.item_tax || 0;
      const total = quantity * price * (1 + tax);

      // Find the item name from the items data
      const item = items.find((item) => String(item.item_id) === oi.item_id);
      const item_name = item?.item_name;

      return {
        ...oi,
        item_total: total,
        item_name,
      } as OrderItemWithTotal;
    }) || [];

  return orderItems;
};
