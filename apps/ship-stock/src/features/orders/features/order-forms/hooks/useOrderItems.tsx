import { useFormContext } from "react-hook-form";
import {
  FormOrderItem,
  PackageOrderItems,
} from "../features/sell-form/sellFormSchema";
import { OrderItem, OrderItemChange } from "../schema";

type OrderItemWithTotal = OrderItem & { total: number };
export const useOrderItems = (): OrderItemWithTotal[] => {
  const form = useFormContext();

  const mode = form.watch("mode");
  const orderType = form.watch("order_type");

  const orderItems = form.watch("order_items").map((oi) => ({
    ...oi,
    total: oi.quantity_change * oi.item_price * (1 + oi.item_tax),
  }));

  return extractOrderItems(orderItems, mode, orderType);
};

export function extractOrderItems(
  orderItems: FormOrderItem[],
  mode: "package" | "direct",
  order_type?: "sale" | "purchase",
): OrderItemWithTotal[] {
  const quantityMultiplier = order_type === "sale" ? -1 : 1;

  if (mode === "package") {
    return orderItems
      .flatMap((pkg: PackageOrderItems) => pkg.package_items ?? [])
      .map((item) => ({
        item_id: item.item_id,
        item_type: item.item_type,
        quantity_change: item.quantity_change * quantityMultiplier,
        item_price: item.item_price,
        item_total: item.quantity_change * item.item_price,
      }));
  }
  return orderItems.map((oi) => ({
    ...oi,
    quantity_change: oi.quantity_change * quantityMultiplier,
    item_total: oi.item_total * quantityMultiplier,
  }));
}
