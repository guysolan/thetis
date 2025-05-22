import { useFormContext } from "react-hook-form";
import { OrderItem } from "../schema";

type OrderItemWithTotal = {
  item_type: string;
  item_id: string;
  quantity_change: number;
  item_price?: number;
  item_tax?: number;
  package_item_id?: string;
  components?: {
    unit_price: number;
    component_quantity: number;
    lot_number?: string;
  }[];
  item_total: number;
};

export const useOrderItems = (): OrderItemWithTotal[] => {
  const form = useFormContext();

  const mode = form.watch("mode");
  const orderType = form.watch("order_type");

  const orderItems = form.watch("order_items")?.map((oi) => {
    if (oi.item_type === "package") {
      // Calculate total for package components
      const componentTotal =
        oi.components?.reduce((sum, comp) => {
          const unitPrice = comp.unit_price !== undefined ? comp.unit_price : 0;
          const componentQuantity = comp.component_quantity || 1;
          return (
            sum + unitPrice * componentQuantity * (oi.quantity_change || 1)
          );
        }, 0) || 0;

      return {
        ...oi,
        item_total: componentTotal,
      } as OrderItemWithTotal;
    }
    return {
      ...oi,
      item_total:
        oi.quantity_change * (oi.item_price || 0) * (1 + (oi.item_tax || 0)),
    } as OrderItemWithTotal;
  });

  return extractOrderItems(orderItems, mode, orderType);
};

export function extractOrderItems(
  orderItems: OrderItemWithTotal[],
  mode: "package" | "direct",
  order_type?: "sale" | "purchase",
): OrderItemWithTotal[] {
  const quantityMultiplier = order_type === "sale" ? -1 : 1;

  if (mode === "package") {
    // First, get all package items
    const packageItems = orderItems
      .filter((item) => item.item_type === "package")
      .map((item) => ({
        ...item,
        quantity_change: item.quantity_change * quantityMultiplier,
        item_total: item.item_total * quantityMultiplier,
      }));

    // Then, get all components from packages and aggregate them
    const componentItems = orderItems
      .filter((item) => item.package_item_id) // Only get items that are part of a package
      .reduce((acc, item) => {
        const existingItem = acc.find((i) => i.item_id === item.item_id);
        if (existingItem) {
          existingItem.quantity_change +=
            item.quantity_change * quantityMultiplier;
          existingItem.item_total += item.item_total * quantityMultiplier;
        } else {
          acc.push({
            ...item,
            quantity_change: item.quantity_change * quantityMultiplier,
            item_total: item.item_total * quantityMultiplier,
          });
        }
        return acc;
      }, [] as OrderItemWithTotal[]);

    return [...packageItems, ...componentItems];
  }

  // For direct mode, just return non-package items
  return orderItems
    .filter((item) => item.item_type !== "package" && !item.package_item_id)
    .map((oi) => ({
      ...oi,
      quantity_change: oi.quantity_change * quantityMultiplier,
      item_total: oi.item_total * quantityMultiplier,
    }));
}
