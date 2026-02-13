import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@thetis/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import { ArrowLeft, TrendingUp } from "lucide-react";
import {
  selectInventoryHistoryQueryOptions,
  useSelectInventoryHistory,
} from "@/features/stock-history/api/selectInventoryHistory";
import {
  selectItemsQueryOptions,
  useSelectItems,
} from "@/features/items/api/selectItems";
import {
  selectStockpilesQueryOptions,
  useSelectStockpiles,
} from "@/features/stockpiles/api/selectStockpiles";
import {
  calculateStockValueOverTime,
  formatCurrencyValue,
  formatUnitPrice,
  getItemValueDetailsAtDate,
  type StockValueDataPoint,
} from "@/features/stock-history/stockValueUtils";

// Chart colors - using CSS variables from the theme
const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const StockValuePage = () => {
  const { data: inventoryHistory } = useSelectInventoryHistory();
  const { data: items } = useSelectItems();
  const { data: stockpiles } = useSelectStockpiles();

  // Track which date is being hovered on the chart
  const [hoveredData, setHoveredData] = useState<StockValueDataPoint | null>(null);

  const { data: chartData, locations } = useMemo(() => {
    return calculateStockValueOverTime(
      inventoryHistory ?? [],
      items ?? [],
      stockpiles
    );
  }, [inventoryHistory, items, stockpiles]);

  // Build chart config dynamically based on locations
  const chartConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {};
    locations.forEach((loc, i) => {
      config[loc.key] = {
        label: loc.name,
        color: CHART_COLORS[i % CHART_COLORS.length],
      };
    });
    return config;
  }, [locations]);

  // Get current total value (latest data point)
  const currentTotal = chartData.length > 0 
    ? chartData[chartData.length - 1].total 
    : 0;

  // Get the date to show in the table (hovered or latest)
  const selectedDate = hoveredData?.date ?? (chartData.length > 0 ? chartData[chartData.length - 1].date : null);
  const selectedDateFormatted = hoveredData?.dateFormatted ?? (chartData.length > 0 ? chartData[chartData.length - 1].dateFormatted : "Current");

  // Get item details for the selected date
  const itemDetails = useMemo(() => {
    if (!selectedDate || !inventoryHistory?.length || !items?.length) return [];
    return getItemValueDetailsAtDate(
      inventoryHistory,
      items,
      locations,
      selectedDate
    );
  }, [selectedDate, inventoryHistory, items, locations]);

  // Calculate totals for the table
  const tableTotals = useMemo(() => {
    const totals: Record<number, number> = {};
    let grandTotal = 0;

    for (const loc of locations) {
      totals[loc.id] = 0;
    }

    for (const item of itemDetails) {
      for (const locDetail of item.locations) {
        totals[locDetail.locationId] += locDetail.value;
      }
      grandTotal += item.totalValue;
    }

    return { byLocation: totals, total: grandTotal };
  }, [itemDetails, locations]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/home/stock">
            <ArrowLeft className="mr-1 w-4 h-4" />
            Stock
          </Link>
        </Button>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Stock Value Over Time</CardTitle>
              <p className="text-muted-foreground text-sm">
                Current total: {formatCurrencyValue(currentTotal)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                onMouseMove={(state) => {
                  if (state?.activePayload?.[0]?.payload) {
                    setHoveredData(state.activePayload[0].payload as StockValueDataPoint);
                  }
                }}
                onMouseLeave={() => setHoveredData(null)}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="dateFormatted"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  tickMargin={8}
                  tickFormatter={(value) => formatCurrencyValue(value)}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const total = payload[0]?.payload?.total ?? 0;
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-md">
                        <p className="mb-2 font-medium">{label}</p>
                        <div className="space-y-1">
                          {payload.map((entry, i) => {
                            const loc = locations.find((l) => l.key === entry.dataKey);
                            return (
                              <div key={entry.dataKey} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    {loc?.name ?? entry.dataKey}
                                  </span>
                                </div>
                                <span className="font-mono text-sm font-medium">
                                  {formatCurrencyValue(entry.value as number)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-2 flex justify-between gap-4 border-t pt-2 font-semibold">
                          <span>Total</span>
                          <span className="font-mono">{formatCurrencyValue(total)}</span>
                        </div>
                      </div>
                    );
                  }}
                />
                <ChartLegend content={<ChartLegendContent />} />
                {locations.map((loc, i) => (
                  <Area
                    key={loc.key}
                    type="monotone"
                    dataKey={loc.key}
                    name={loc.key}
                    stackId="1"
                    fill={CHART_COLORS[i % CHART_COLORS.length]}
                    stroke={CHART_COLORS[i % CHART_COLORS.length]}
                    fillOpacity={0.6}
                  />
                ))}
              </AreaChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-[400px] text-muted-foreground">
              No stock history data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location breakdown */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Value by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((loc, i) => {
                const latestValue = chartData[chartData.length - 1][loc.key] as number;
                const percentage = currentTotal > 0 
                  ? ((latestValue / currentTotal) * 100).toFixed(1) 
                  : "0";
                return (
                  <div
                    key={loc.key}
                    className="flex items-center gap-3 p-3 rounded-lg border"
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{loc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {percentage}% of total
                      </p>
                    </div>
                    <p className="font-semibold tabular-nums">
                      {formatCurrencyValue(latestValue)}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Item breakdown table - updates on chart hover */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Item Breakdown
                {hoveredData && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    (Hover on chart to change date)
                  </span>
                )}
              </CardTitle>
              <span className="text-sm font-medium text-muted-foreground">
                {selectedDateFormatted}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Item</TableHead>
                    {locations.map((loc) => (
                      <TableHead key={loc.id} className="text-right min-w-[100px]">
                        {loc.name}
                      </TableHead>
                    ))}
                    <TableHead className="text-right font-semibold">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemDetails.length > 0 ? (
                    <>
                      {itemDetails.map((item) => (
                        <TableRow key={item.itemId}>
                          <TableCell>
                            <span className="font-medium">{item.itemName}</span>
                            <span className="text-muted-foreground text-sm ml-1">
                              ({formatUnitPrice(item.price)})
                            </span>
                          </TableCell>
                          {locations.map((loc) => {
                            const locDetail = item.locations.find(
                              (l) => l.locationId === loc.id
                            );
                            return (
                              <TableCell key={loc.id} className="text-right tabular-nums">
                                {locDetail && locDetail.value > 0 ? (
                                  formatCurrencyValue(locDetail.value)
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                            );
                          })}
                          <TableCell className="text-right tabular-nums font-medium">
                            {formatCurrencyValue(item.totalValue)}
                          </TableCell>
                        </TableRow>
                      ))}
                      {/* Totals row */}
                      <TableRow className="bg-muted/50 font-semibold">
                        <TableCell>Total</TableCell>
                        {locations.map((loc) => (
                          <TableCell key={loc.id} className="text-right tabular-nums">
                            {formatCurrencyValue(tableTotals.byLocation[loc.id] ?? 0)}
                          </TableCell>
                        ))}
                        <TableCell className="text-right tabular-nums">
                          {formatCurrencyValue(tableTotals.total)}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={2 + locations.length}
                        className="text-center text-muted-foreground py-8"
                      >
                        No items in stock at this date
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const Route = createFileRoute("/home/stock/value")({
  component: StockValuePage,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(selectInventoryHistoryQueryOptions()),
      context.queryClient.ensureQueryData(selectItemsQueryOptions()),
      context.queryClient.ensureQueryData(selectStockpilesQueryOptions()),
    ]);
  },
});
