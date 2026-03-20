import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@thetis/ui/accordion";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@thetis/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { selectItemsByAddressQueryOptions } from "@/features/stockpiles/api/selectItemsByAddress";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";
import {
  selectStockpilesQueryOptions,
  useSelectStockpiles,
} from "@/features/stockpiles/api/selectStockpiles";
import { useQuery } from "@tanstack/react-query";
import { selectOrdersQueryOptions } from "@/features/orders/features/order-history/api/selectOrders";
import type { OrderView } from "@/features/orders/types";
import {
  selectInventoryHistoryQueryOptions,
  useSelectInventoryHistory,
} from "@/features/stock-history/api/selectInventoryHistory";
import { getCurrentQuantity } from "@/features/stock-history/utils";
import {
  ANNUAL_DEMAND_TOTAL,
  BUFFER_MONTHS,
  computeReorderPlan,
  computeRunOutAndOrderBy,
  getDemandForMonth,
  getDemandMultiplierForProduct,
  getMonthName,
  getUpcomingMonthsDemand,
  LEAD_TIME_WEEKS,
  ORDER_QUANTITY_MULTIPLE,
  type ReorderPlanResult,
} from "@/features/stock-history/reorderPlanUtils";
import { Button } from "@thetis/ui/button";
import { ArrowLeft, Info, Package } from "lucide-react";

// Fixed order: Small Right, Small Left, Large Right, Large Left
const TARGET_PRODUCTS = [
  { name: "Night Splint - Small Right (Bag)", label: "Small Right" },
  { name: "Night Splint - Small Left (Bag)", label: "Small Left" },
  { name: "Night Splint - Large Right (Bag)", label: "Large Right" },
  { name: "Night Splint - Large Left (Bag)", label: "Large Left" },
] as const;

/** Parse delivery_dates JSON and return end date as { month, year } and the Date, or null if invalid. */
function parseDeliveryEndDate(
  deliveryDates: string | null | undefined,
): { month: number; year: number; date: Date } | null {
  if (!deliveryDates) return null;
  try {
    const parsed = JSON.parse(deliveryDates as string);
    if (!Array.isArray(parsed) || parsed.length < 2) return null;
    const endStr = parsed[1];
    if (!endStr) return null;
    const d = new Date(endStr);
    if (Number.isNaN(d.getTime())) return null;
    return { month: d.getMonth(), year: d.getFullYear(), date: d };
  } catch {
    return null;
  }
}

/** Build orders with delivery_dates in the future, sorted by delivery end date ascending. */
function getUpcomingBuildOrders(orders: OrderView[] | undefined): OrderView[] {
  if (!orders?.length) return [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return orders
    .filter((o) => o.order_type === "build")
    .map((o) => ({ order: o, end: parseDeliveryEndDate(o.delivery_dates) }))
    .filter(
      (x): x is { order: OrderView; end: { month: number; year: number; date: Date } } =>
        x.end != null && x.end.date >= now,
    )
    .sort((a, b) => a.end.date.getTime() - b.end.date.getTime())
    .map((x) => x.order);
}

/** Get variant quantities (Small Right, Small Left, Large Right, Large Left) from order items (products only). */
function getVariantQuantitiesFromOrder(order: OrderView): { label: string; orderQty: number }[] {
  const nameToQty = new Map<string, number>();
  for (const item of order.items ?? []) {
    if (item.item_type !== "product") continue;
    const name = (item.item_name ?? "").trim();
    if (!name) continue;
    const key = name.toLowerCase();
    nameToQty.set(key, (nameToQty.get(key) ?? 0) + (item.quantity ?? 0));
  }
  return TARGET_PRODUCTS.map((t) => ({
    label: t.label,
    orderQty: nameToQty.get(t.name.toLowerCase()) ?? 0,
  }));
}

/** Find an already-placed order (build/buy) delivering to MPD or Park House in the same month/year as the plan's next order. */
function findPlacedOrderId(
  orders: OrderView[] | undefined,
  deliversBy: { month: number; year: number },
  mpdId: number | null,
  parkHouseId: number | null,
): number | null {
  if (!orders?.length || (mpdId == null && parkHouseId == null)) return null;
  const targetMonth = deliversBy.month;
  const targetYear = deliversBy.year;

  for (const order of orders) {
    if (order.order_type !== "build" && order.order_type !== "buy") continue;
    const o = order as OrderView & { to_shipping_address?: { id?: number } };
    const toId = o.to_address?.id ?? o.to_shipping_address?.id;
    if (toId == null) continue;
    if (String(toId) !== String(mpdId) && String(toId) !== String(parkHouseId)) continue;

    const deliveryDates = order.delivery_dates;
    if (!deliveryDates) continue;
    try {
      const parsed = JSON.parse(deliveryDates as string);
      if (!Array.isArray(parsed) || parsed.length < 2) continue;
      const endDate = parsed[1];
      if (!endDate) continue;
      const d = new Date(endDate);
      if (
        d.getMonth() === targetMonth &&
        d.getFullYear() === targetYear &&
        order.order_id != null
      ) {
        return order.order_id;
      }
    } catch {
      // ignore parse errors
    }
  }
  return null;
}

const ReorderPlanPage = () => {
  const { data: stockpiles } = useSelectStockpiles();
  const { data: itemsByAddress } = useSelectItemsByAddress();
  const { data: inventoryHistory } = useSelectInventoryHistory();
  const { data: apiOrders } = useQuery(selectOrdersQueryOptions());

  const mpd = stockpiles?.find((s) => s.stockpile_name === "MPD");
  const parkHouse = stockpiles?.find((s) => s.stockpile_name === "Park House");
  const mpdId = mpd?.stockpile_id ?? null;
  const parkHouseId = parkHouse?.stockpile_id ?? null;

  const products =
    itemsByAddress?.filter(
      (item) =>
        item.item_type === "product" &&
        TARGET_PRODUCTS.some((t) => t.name.toLowerCase() === (item.item_name ?? "").toLowerCase()),
    ) ?? [];

  const byItemName = new Map(products.map((p) => [(p.item_name ?? "").toLowerCase(), p] as const));

  const now = new Date();
  const startMonth = now.getMonth();
  const startYear = now.getFullYear();

  // Build data for each variant and compute all orders
  const variantData = TARGET_PRODUCTS.map((target) => {
    const product = byItemName.get(target.name.toLowerCase());
    const itemId = product?.item_id ?? 0;

    const currentStock =
      itemId && mpdId != null && parkHouseId != null
        ? getCurrentQuantity(itemId, inventoryHistory ?? [], mpdId) +
          getCurrentQuantity(itemId, inventoryHistory ?? [], parkHouseId)
        : 0;

    let plan: ReorderPlanResult | null = null;
    if (itemId) {
      plan = computeReorderPlan(currentStock, startMonth, startYear, {
        demandMultiplier: getDemandMultiplierForProduct(target.name),
      });
    }

    return {
      label: target.label,
      name: target.name,
      currentStock,
      plan,
    };
  });

  const totalStock = variantData.reduce((sum, v) => sum + v.currentStock, 0);

  // Build orders grouped by orderIndex (all variants for each order)
  const firstPlan = variantData.find((v) => v.plan)?.plan;
  const orders = firstPlan?.orders ?? [];
  const ordersData = orders.map((order) => {
    const variantQuantities = variantData.map((v) => ({
      label: v.label,
      currentStock: v.currentStock,
      orderQty: v.plan?.orders.find((o) => o.orderIndex === order.orderIndex)?.quantity ?? 0,
    }));
    const totalOrderQty = variantQuantities.reduce((sum, v) => sum + v.orderQty, 0);
    return {
      orderIndex: order.orderIndex,
      isNextOrder: order.isNextOrder,
      placeOrderBy: order.placeOrderBy,
      deliversBy: order.deliversBy,
      variantQuantities,
      totalOrderQty,
    };
  });

  const nextOrder = ordersData.find((o) => o.isNextOrder);
  /** If the next order has already been placed, its real order_id from the database */
  const placedOrderId = nextOrder
    ? findPlacedOrderId(apiOrders, nextOrder.deliversBy, mpdId, parkHouseId)
    : null;

  /** Build orders with delivery date in the future for the Upcoming orders table */
  const upcomingBuildOrdersForTable = useMemo(() => {
    const buildOrders = getUpcomingBuildOrders(apiOrders);
    return buildOrders.map((order) => {
      const variantQuantities = getVariantQuantitiesFromOrder(order);
      const totalOrderQty = variantQuantities.reduce((s, v) => s + v.orderQty, 0);
      const end = parseDeliveryEndDate(order.delivery_dates);
      const orderDate = order.order_date ? new Date(order.order_date) : null;
      return {
        orderId: order.order_id,
        placeOrderBy: orderDate
          ? { month: orderDate.getMonth(), year: orderDate.getFullYear() }
          : null,
        deliversBy: end ? { month: end.month, year: end.year } : null,
        variantQuantities,
        totalOrderQty,
      };
    });
  }, [apiOrders]);

  /** Latest delivery (month, year) among upcoming build orders, or null if none */
  const latestUpcomingDelivery = useMemo(() => {
    if (upcomingBuildOrdersForTable.length === 0) return null;
    let maxMonth = -1;
    let maxYear = -1;
    for (const o of upcomingBuildOrdersForTable) {
      if (o.deliversBy == null) continue;
      const { month, year } = o.deliversBy;
      if (year > maxYear || (year === maxYear && month > maxMonth)) {
        maxYear = year;
        maxMonth = month;
      }
    }
    return maxMonth >= 0 ? { month: maxMonth, year: maxYear } : null;
  }, [upcomingBuildOrdersForTable]);

  /** Forecast: computed plan orders that deliver *after* the last upcoming build order */
  const forecastOrdersForTable = useMemo(() => {
    if (latestUpcomingDelivery == null) return ordersData;
    const { month: lastM, year: lastY } = latestUpcomingDelivery;
    return ordersData.filter((o) => {
      const { month, year } = o.deliversBy;
      return year > lastY || (year === lastY && month > lastM);
    });
  }, [ordersData, latestUpcomingDelivery]);

  /** Deliveries by (year, month): real upcoming orders first, then forecast. Used for chart. */
  const deliveriesByMonth = useMemo(() => {
    const map = new Map<string, number>();
    const add = (year: number, month: number, qty: number) => {
      const key = `${year}-${month}`;
      map.set(key, (map.get(key) ?? 0) + qty);
    };
    upcomingBuildOrdersForTable.forEach((o) => {
      if (o.deliversBy) add(o.deliversBy.year, o.deliversBy.month, o.totalOrderQty);
    });
    forecastOrdersForTable.forEach((o) => {
      add(o.deliversBy.year, o.deliversBy.month, o.totalOrderQty);
    });
    return map;
  }, [upcomingBuildOrdersForTable, forecastOrdersForTable]);

  /** Weekly projection: reduce by consumption each week, jump when production arrives (week containing 1st of month). 52 weeks. */
  const stockProjectionWeeklyData = useMemo(() => {
    if (totalStock <= 0) return [];
    const startDate = new Date(startYear, startMonth, 1);
    const totalWeeks = 52;
    let stock = totalStock;
    const points: {
      weekLabel: string;
      weekIndex: number;
      monthLabel: string;
      dateLabel: string;
      stock: number;
    }[] = [];
    for (let w = 0; w < totalWeeks; w++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(weekStart.getDate() + w * 7);
      let weekDemand = 0;
      let hasFirstOfMonth = false;
      let firstMonth = -1;
      let firstYear = -1;
      for (let d = 0; d < 7; d++) {
        const day = new Date(weekStart);
        day.setDate(day.getDate() + d);
        const m = day.getMonth();
        const y = day.getFullYear();
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        weekDemand += getDemandForMonth(m) / daysInMonth;
        if (day.getDate() === 1) {
          hasFirstOfMonth = true;
          firstMonth = m;
          firstYear = y;
        }
      }
      stock -= weekDemand;
      stock = Math.max(0, stock);
      if (hasFirstOfMonth && firstMonth >= 0) {
        stock += deliveriesByMonth.get(`${firstYear}-${firstMonth}`) ?? 0;
      }
      points.push({
        weekLabel: `W${w + 1}`,
        weekIndex: w,
        monthLabel: hasFirstOfMonth && firstMonth >= 0 ? getMonthName(firstMonth) : "",
        dateLabel: `${weekStart.getDate()} ${getMonthName(weekStart.getMonth())} ${weekStart.getFullYear()}`,
        stock: Math.round(stock),
      });
    }
    return points;
  }, [totalStock, deliveriesByMonth, startMonth, startYear]);

  // For the "how it works" section
  const runOutResult = computeRunOutAndOrderBy(totalStock, startMonth, startYear, {
    demandMultiplier: 1,
  });
  const upcomingDemand = getUpcomingMonthsDemand(startMonth, startYear, 12);
  const runOutMonth = runOutResult.runOutMonth;
  const runOutYear = runOutResult.runOutYear;

  return (
    <div className="space-y-6 mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/home/stock" search={{ tab: "all" }}>
            <ArrowLeft className="mr-1 w-4 h-4" />
            Stock
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Reorder plan</CardTitle>
              <p className="text-muted-foreground text-sm">
                Based on {totalStock} units in stock (MPD + Park House)
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {totalStock === 0 && (
            <p className="py-4 text-muted-foreground text-sm text-center">
              No stock found at MPD or Park House.
            </p>
          )}

          {ordersData.length > 0 && nextOrder && (
            <>
              {/* Next order summary block (like Amazon region summaries) */}
              <div className="rounded-lg border p-3">
                <h3 className="font-semibold text-sm mb-1">Next order</h3>
                <p className="text-muted-foreground text-sm">
                  Place by {getMonthName(nextOrder.placeOrderBy.month)}{" "}
                  {nextOrder.placeOrderBy.year} • Delivers by{" "}
                  {getMonthName(nextOrder.deliversBy.month)} {nextOrder.deliversBy.year}
                </p>
                <p className="mt-1 text-sm font-medium">Total: {nextOrder.totalOrderQty} units</p>
              </div>

              {/* Current stock & order qty table */}
              <div>
                <h4 className="font-semibold mb-2">Next order</h4>
                <div className="border rounded-md overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Variant</TableHead>
                        <TableHead className="text-right tabular-nums">Current stock</TableHead>
                        <TableHead className="text-right tabular-nums">Order qty</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {nextOrder.variantQuantities.map((v) => (
                        <TableRow key={v.label}>
                          <TableCell className="font-medium">{v.label}</TableCell>
                          <TableCell className="tabular-nums text-right">
                            {v.currentStock}
                          </TableCell>
                          <TableCell className="font-semibold tabular-nums text-right">
                            {v.orderQty}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell className="font-semibold">Total</TableCell>
                        <TableCell className="font-semibold tabular-nums text-right">
                          {totalStock}
                        </TableCell>
                        <TableCell className="font-bold tabular-nums text-right">
                          {nextOrder.totalOrderQty}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>
            </>
          )}

          {upcomingBuildOrdersForTable.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Upcoming orders</h4>
              <p className="text-muted-foreground text-sm mb-2">
                Build orders with a delivery date in the future.
              </p>
              <div className="border rounded-md overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Order</TableHead>
                      <TableHead className="text-muted-foreground font-normal">Place by</TableHead>
                      <TableHead className="text-muted-foreground font-normal">
                        Delivers by
                      </TableHead>
                      <TableHead className="text-right tabular-nums">Small Right</TableHead>
                      <TableHead className="text-right tabular-nums">Small Left</TableHead>
                      <TableHead className="text-right tabular-nums">Large Right</TableHead>
                      <TableHead className="text-right tabular-nums">Large Left</TableHead>
                      <TableHead className="text-right tabular-nums font-semibold">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingBuildOrdersForTable.map((order) => (
                      <TableRow key={order.orderId}>
                        <TableCell className="font-medium">
                          <Link
                            to="/home/orders/$orderId/view"
                            params={{ orderId: String(order.orderId) }}
                            className="text-primary hover:underline"
                          >
                            #{order.orderId}
                          </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {order.placeOrderBy
                            ? `${getMonthName(order.placeOrderBy.month)} ${order.placeOrderBy.year}`
                            : "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {order.deliversBy
                            ? `${getMonthName(order.deliversBy.month)} ${order.deliversBy.year}`
                            : "—"}
                        </TableCell>
                        {order.variantQuantities.map((v) => (
                          <TableCell key={v.label} className="tabular-nums text-right">
                            {v.orderQty}
                          </TableCell>
                        ))}
                        <TableCell className="font-semibold tabular-nums text-right">
                          {order.totalOrderQty}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {forecastOrdersForTable.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Forecast: orders you&apos;ll need after that</h4>
              <p className="text-muted-foreground text-sm mb-2">
                Planned reorders based on current stock and demand (delivery after your upcoming
                build orders).
              </p>
              <div className="border rounded-md overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Order</TableHead>
                      <TableHead className="text-muted-foreground font-normal">Place by</TableHead>
                      <TableHead className="text-muted-foreground font-normal">
                        Delivers by
                      </TableHead>
                      <TableHead className="text-right tabular-nums">Small Right</TableHead>
                      <TableHead className="text-right tabular-nums">Small Left</TableHead>
                      <TableHead className="text-right tabular-nums">Large Right</TableHead>
                      <TableHead className="text-right tabular-nums">Large Left</TableHead>
                      <TableHead className="text-right tabular-nums font-semibold">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forecastOrdersForTable.map((order) => (
                      <TableRow key={order.orderIndex}>
                        <TableCell className="font-medium">
                          {order.isNextOrder && placedOrderId != null
                            ? `#${placedOrderId}`
                            : `#${order.orderIndex}`}
                          {order.isNextOrder && placedOrderId == null && (
                            <span className="ml-1.5 text-primary text-xs font-normal">
                              (place next)
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {getMonthName(order.placeOrderBy.month)} {order.placeOrderBy.year}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {getMonthName(order.deliversBy.month)} {order.deliversBy.year}
                        </TableCell>
                        {order.variantQuantities.map((v) => (
                          <TableCell key={v.label} className="tabular-nums text-right">
                            {v.orderQty}
                          </TableCell>
                        ))}
                        <TableCell className="font-semibold tabular-nums text-right">
                          {order.totalOrderQty}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {ordersData.length === 0 && totalStock > 0 && (
            <p className="py-4 text-muted-foreground text-sm text-center">No orders calculated.</p>
          )}

          {/* How it works - collapsible */}
          <Accordion type="single" collapsible>
            <AccordionItem value="how-it-works" className="border-t border-b-0">
              <AccordionTrigger className="text-muted-foreground hover:text-foreground text-sm">
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  How is this calculated?
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm">
                  {/* Assumptions */}
                  <div>
                    <h4 className="mb-2 font-semibold">Assumptions</h4>
                    <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                      <li>
                        <strong>Annual demand:</strong> {ANNUAL_DEMAND_TOTAL.toLocaleString()}{" "}
                        units/year
                      </li>
                      <li>
                        <strong>Size split:</strong> 3:1 Large to Small (75% Large, 25% Small)
                      </li>
                      <li>
                        <strong>Lead time:</strong> {LEAD_TIME_WEEKS} weeks (~
                        {Math.round(LEAD_TIME_WEEKS / 4.33)} months)
                      </li>
                      <li>
                        <strong>Buffer:</strong> {BUFFER_MONTHS} month extra stock
                      </li>
                      <li>
                        <strong>Order multiples:</strong> Rounded up to nearest{" "}
                        {ORDER_QUANTITY_MULTIPLE}
                      </li>
                      <li>
                        <strong>Build order:</strong> If you have a build order scheduled for
                        delivery, plan the next reorder delivery for 2 months after that date.
                      </li>
                    </ul>
                  </div>

                  {/* Monthly demand curve */}
                  <div>
                    <h4 className="mb-2 font-semibold">Monthly Demand (Seasonal)</h4>
                    <p className="mb-2 text-muted-foreground text-xs">
                      Low: Oct–Feb | Mid (×1.5): Mar, Aug, Sep | High (×2): Apr–Jul
                    </p>
                    <ChartContainer
                      config={{
                        demand: {
                          label: "Demand",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="w-full h-[140px]"
                    >
                      <BarChart
                        data={upcomingDemand}
                        margin={{
                          top: 8,
                          right: 8,
                          bottom: 0,
                          left: 0,
                        }}
                      >
                        <XAxis
                          dataKey="monthName"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 10 }}
                          tickFormatter={(v) => v.slice(0, 1)}
                        />
                        <YAxis hide domain={[0, "dataMax"]} />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent className="bg-white dark:bg-neutral-900 border-neutral-200" />
                          }
                          cursor={{
                            fill: "hsl(var(--neutral-200, 0 0% 90%))",
                          }}
                        />
                        <Bar dataKey="demand" fill="var(--color-demand)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </div>

                  {/* Stock projection with orders: bar = stock at end of each week; consumption per week then jumps when production hits */}
                  {stockProjectionWeeklyData.length > 0 && (
                    <div>
                      <h4 className="mb-2 font-semibold">Stock projection with orders</h4>
                      <p className="mb-2 text-muted-foreground text-xs">
                        Weekly consumption reduces the bar; production adds a jump in the week
                        delivery arrives.
                      </p>
                      <ChartContainer
                        config={{
                          stock: { label: "Stock", color: "hsl(var(--chart-1))" },
                        }}
                        className="w-full h-[200px]"
                      >
                        <BarChart
                          data={stockProjectionWeeklyData}
                          margin={{ top: 8, right: 8, bottom: 0, left: 36 }}
                        >
                          <XAxis
                            dataKey="weekLabel"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 10 }}
                            tickFormatter={(_, i) => stockProjectionWeeklyData[i]?.monthLabel ?? ""}
                          />
                          <YAxis
                            domain={[0, "auto"]}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 10 }}
                            width={28}
                          />
                          <ChartTooltip
                            content={({ active, payload }) => {
                              if (!active || !payload?.length) return null;
                              const p = payload[0].payload as { dateLabel: string; stock: number };
                              return (
                                <ChartTooltipContent
                                  active={active}
                                  payload={payload}
                                  className="bg-white dark:bg-neutral-900 border-neutral-200"
                                  label={p.dateLabel}
                                />
                              );
                            }}
                            cursor={{ fill: "hsl(var(--neutral-200, 0 0% 90%))" }}
                          />
                          <Bar dataKey="stock" fill="var(--color-stock)" name="Stock" />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  )}

                  {/* Calculation summary */}
                  <div>
                    <h4 className="mb-2 font-semibold">Calculation</h4>
                    <p className="text-muted-foreground text-xs">
                      Order quantity = demand until next delivery + {BUFFER_MONTHS} month buffer −
                      current stock, rounded up to nearest {ORDER_QUANTITY_MULTIPLE}. Each variant
                      is calculated separately based on its share of total demand.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export const Route = createFileRoute("/home/stock/reorder-plan")({
  component: ReorderPlanPage,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(selectStockpilesQueryOptions()),
      context.queryClient.ensureQueryData(selectItemsByAddressQueryOptions()),
      context.queryClient.ensureQueryData(selectInventoryHistoryQueryOptions()),
      context.queryClient.prefetchQuery(selectOrdersQueryOptions()),
    ]);
  },
});
