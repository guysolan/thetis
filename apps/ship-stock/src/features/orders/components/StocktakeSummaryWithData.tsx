import { useQuery } from "@tanstack/react-query";
import { selectOrderFormValuesById } from "../features/order-history/api/selectOrderViewById";
import type { OrderView } from "../types";
import { StocktakeSummary, type StocktakeItemRow } from "./StocktakeSummary";

interface StocktakeSummaryWithDataProps {
  order: OrderView;
}

/**
 * Fetches order_form_values for a count order and renders StocktakeSummary
 * with previous / counted / change. Used in OrderHistory expanded content.
 */
export function StocktakeSummaryWithData({ order }: StocktakeSummaryWithDataProps) {
  const { data: formData, isLoading, error } = useQuery({
    queryKey: ["select-order-form-values", order.order_id],
    queryFn: () => selectOrderFormValuesById(String(order.order_id)),
    enabled: order.order_type === "count",
  });

  const orderItems = formData?.order_form_values?.order_items as
    | Array<{
        item_id?: string | number;
        quantity_before?: number;
        quantity_after?: number;
        quantity_change?: number;
      }>
    | undefined;

  const nameByItemId = new Map(
    (order.items || []).map((item) => [String(item.item_id), item.item_name]),
  );

  let rows: StocktakeItemRow[];

  if (orderItems?.length) {
    rows = orderItems.map((item) => ({
      item_name:
        nameByItemId.get(String(item.item_id)) ?? `Item ${item.item_id}`,
      quantity_before: Number(item.quantity_before) ?? 0,
      quantity_after: Number(item.quantity_after) ?? 0,
      quantity_change: Number(item.quantity_change) ?? 0,
    }));
  } else {
    // Fallback: use view items (we only have change/quantity)
    rows = (order.items || []).map((item) => {
      const qty = Number((item as { quantity?: number }).quantity) ?? 0;
      return {
        item_name: item.item_name ?? `Item ${item.item_id}`,
        quantity_before: 0,
        quantity_after: qty,
        quantity_change: qty,
      };
    });
  }

  if (order.order_type !== "count") {
    return null;
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
        Loading stock count…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-center text-sm text-destructive">
        Failed to load stock count
      </div>
    );
  }

  return <StocktakeSummary items={rows} />;
}
