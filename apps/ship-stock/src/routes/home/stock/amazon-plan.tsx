import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@thetis/ui/table";
import { Button } from "@thetis/ui/button";
import { ArrowLeft, Check, Copy, Package } from "lucide-react";
import { useCallback, useState } from "react";
import {
  selectAmazonInventoryQueryOptions,
  useAmazonInventoryOptional,
} from "@/features/amazon/selectAmazonInventory";

const AMAZON_REGIONS = ["Amazon US", "Amazon UK", "Amazon CA", "Amazon DE"] as const;
type AmazonRegion = (typeof AMAZON_REGIONS)[number];

const SIZE_ROWS = [
  { label: "Small Right", sku: "TM-ATRNS-SR" },
  { label: "Small Left", sku: "TM-ATRNS-SL" },
  { label: "Large Right", sku: "TM-ATRNS-LR" },
  { label: "Large Left", sku: "TM-ATRNS-LL" },
] as const;

/** Minimum stock per region (US, UK, CA, DE) for each size */
const MIN_STOCK: Record<AmazonRegion, Record<string, number>> = {
  "Amazon US": { "Small Right": 20, "Small Left": 20, "Large Right": 60, "Large Left": 60 },
  "Amazon UK": { "Small Right": 15, "Small Left": 15, "Large Right": 45, "Large Left": 45 },
  "Amazon CA": { "Small Right": 10, "Small Left": 10, "Large Right": 30, "Large Left": 30 },
  "Amazon DE": { "Small Right": 15, "Small Left": 15, "Large Right": 45, "Large Left": 45 },
};

/** Maximum stock per region for each size */
const MAX_STOCK: Record<AmazonRegion, Record<string, number>> = {
  "Amazon US": { "Small Right": 50, "Small Left": 50, "Large Right": 120, "Large Left": 120 },
  "Amazon UK": { "Small Right": 35, "Small Left": 70, "Large Right": 60, "Large Left": 60 },
  "Amazon CA": { "Small Right": 35, "Small Left": 35, "Large Right": 70, "Large Left": 70 },
  "Amazon DE": { "Small Right": 35, "Small Left": 35, "Large Right": 70, "Large Left": 70 },
};

type StockStatus = "ok" | "restock";

function getStockStatus(stock: number, min: number): StockStatus {
  if (stock < min) return "restock";
  return "ok";
}

const SMALL_SIZES = ["Small Right", "Small Left"] as const;
const LARGE_SIZES = ["Large Right", "Large Left"] as const;

/**
 * Send-in in whole boxes only. Box types: small = 25 SR + 25 SL, large = 25 LR + 25 LL.
 * For each region we need N_small boxes and N_large boxes (from deficit vs min, ceil to 25 per size, then N = max of the pair).
 * Each size gets 25 × N for its box type. No splitting boxes.
 */
function computeSendIn(
  stockBySizeAndRegion: Map<string, Record<AmazonRegion, number>>,
): Map<string, Record<AmazonRegion, number>> {
  const result = new Map<string, Record<AmazonRegion, number>>();
  for (const { label } of SIZE_ROWS) {
    result.set(label, {
      "Amazon US": 0,
      "Amazon UK": 0,
      "Amazon CA": 0,
      "Amazon DE": 0,
    });
  }

  for (const region of AMAZON_REGIONS) {
    const deficit = (label: string) => {
      const stock = stockBySizeAndRegion.get(label)?.[region] ?? 0;
      const min = MIN_STOCK[region][label] ?? 0;
      return Math.max(0, min - stock);
    };
    const boxes = (labels: readonly string[]) => {
      const need = labels.map((l) => Math.ceil(deficit(l) / 25));
      return Math.max(0, ...need);
    };

    const nSmall = boxes(SMALL_SIZES);
    const nLarge = boxes(LARGE_SIZES);

    const sendSmall = nSmall * 25;
    const sendLarge = nLarge * 25;

    for (const label of SMALL_SIZES) {
      result.get(label)![region] = sendSmall;
    }
    for (const label of LARGE_SIZES) {
      result.get(label)![region] = sendLarge;
    }
  }

  return result;
}

function statusCellClass(status: StockStatus): string {
  switch (status) {
    case "restock":
      return "bg-destructive/15 text-destructive font-semibold";
    default:
      return "tabular-nums";
  }
}

const AmazonPlanPage = () => {
  const { data: amazonInventory } = useAmazonInventoryOptional();

  // Build stock matrix: sizeLabel -> region -> total (available + inbound + fcTransfer)
  const stockBySizeAndRegion = new Map<string, Record<AmazonRegion, number>>();
  for (const { label } of SIZE_ROWS) {
    stockBySizeAndRegion.set(label, {
      "Amazon US": 0,
      "Amazon UK": 0,
      "Amazon CA": 0,
      "Amazon DE": 0,
    });
  }

  if (amazonInventory) {
    for (const region of AMAZON_REGIONS) {
      const items = amazonInventory[region] ?? [];
      for (const item of items) {
        const row = SIZE_ROWS.find((r) => r.sku === item.sellerSku);
        if (!row) continue;
        const total =
          (item.total ?? 0) || (item.available ?? 0) + (item.inbound ?? 0) + (item.fcTransfer ?? 0);
        const map = stockBySizeAndRegion.get(row.label)!;
        map[region] = (map[region] ?? 0) + total;
      }
    }
  }

  // Region summaries: "All above minimum" or list sizes that need restock
  const regionSummaries = AMAZON_REGIONS.map((region) => {
    const belowMin: string[] = [];
    for (const { label } of SIZE_ROWS) {
      const stock = stockBySizeAndRegion.get(label)?.[region] ?? 0;
      const min = MIN_STOCK[region][label] ?? 0;
      if (stock < min) belowMin.push(label);
    }
    return {
      region,
      belowMin,
      allOk: belowMin.length === 0,
    };
  });

  // Send-in qty: only below min, ceil to 25; if only one below min add 25 to next-closest-to-min (box of 50)
  const sendInBySizeAndRegion = computeSendIn(stockBySizeAndRegion);

  const hasData =
    amazonInventory && AMAZON_REGIONS.some((r) => (amazonInventory[r]?.length ?? 0) > 0);

  const [copied, setCopied] = useState(false);
  const copyPageAsMarkdown = useCallback(async () => {
    const header = (rowLabel: string) => `| ${rowLabel} | ${AMAZON_REGIONS.join(" | ")} |`;
    const sep = `| --- | --- | --- | --- | --- |`;
    const row = (label: string, getVal: (r: AmazonRegion) => string | number) =>
      `| ${label} | ${AMAZON_REGIONS.map((r) => getVal(r)).join(" | ")} |`;

    const lines: string[] = [];
    lines.push("# Amazon FBA plan\n");
    for (const { region, belowMin, allOk } of regionSummaries) {
      lines.push(`**${region}**\n\n`);
      lines.push(
        allOk
          ? "All sizes are above minimum stock. No action required at this time.\n\n"
          : `Need restock: ${belowMin.join(", ")}\n\n`,
      );
      lines.push("---\n\n");
    }
    if (hasData) {
      lines.push("## Stock\n\n");
      lines.push(header("Stock"));
      lines.push(sep);
      for (const { label } of SIZE_ROWS) {
        lines.push(row(label, (r) => stockBySizeAndRegion.get(label)?.[r] ?? 0));
      }
      lines.push("\n\n## Minimum Stock\n\n");
      lines.push(header("Minimum Stock"));
      lines.push(sep);
      for (const { label } of SIZE_ROWS) {
        lines.push(row(label, (r) => MIN_STOCK[r][label]));
      }
      lines.push("\n\n## Maximum Stock\n\n");
      lines.push(header("Maximum Stock"));
      lines.push(sep);
      for (const { label } of SIZE_ROWS) {
        lines.push(row(label, (r) => MAX_STOCK[r][label]));
      }
      lines.push("\n\n## Send in\n\n");
      lines.push(header("Send in"));
      lines.push(sep);
      for (const { label } of SIZE_ROWS) {
        lines.push(
          row(label, (r) => {
            const s = sendInBySizeAndRegion.get(label)?.[r] ?? 0;
            return s > 0 ? s : "–";
          }),
        );
      }
    } else {
      lines.push("No Amazon inventory data.\n");
    }

    const text = lines.join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [regionSummaries, stockBySizeAndRegion, sendInBySizeAndRegion, hasData]);

  return (
    <div className="space-y-6 mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/home/stock">
            <ArrowLeft className="mr-1 w-4 h-4" />
            Stock
          </Link>
        </Button>
        <Button variant="outline" size="sm" onClick={copyPageAsMarkdown} className="shrink-0">
          {copied ? (
            <>
              <Check className="mr-1.5 w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-1.5 w-4 h-4" />
              Copy
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Amazon FBA plan</CardTitle>
              <p className="text-muted-foreground text-sm">
                Stock vs minimum (red/orange) and maximum (how much to send) by marketplace
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded bg-destructive/20 border border-destructive/50" />
              RED = Need restock (below minimum)
            </span>
          </div>

          {/* Region summaries */}
          <div className="space-y-3">
            {regionSummaries.map(({ region, belowMin, allOk }) => (
              <div key={region} className="rounded-lg border p-3">
                <h3 className="font-semibold text-sm mb-1">{region}</h3>
                {allOk ? (
                  <p className="text-muted-foreground text-sm">
                    All sizes are above minimum stock. No action required at this time.
                  </p>
                ) : (
                  <p className="text-destructive text-sm font-medium">
                    Need restock: {belowMin.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>

          {!hasData && (
            <p className="text-muted-foreground text-sm py-4">
              No Amazon inventory data. Check the connection or try again later.
            </p>
          )}

          {hasData && (
            <>
              {/* Stock table */}
              <div>
                <h4 className="font-semibold mb-2">Stock</h4>
                <div className="border rounded-md overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Stock</TableHead>
                        {AMAZON_REGIONS.map((r) => (
                          <TableHead key={r} className="text-right tabular-nums">
                            {r}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SIZE_ROWS.map(({ label }) => (
                        <TableRow key={label}>
                          <TableCell className="font-medium">{label}</TableCell>
                          {AMAZON_REGIONS.map((region) => {
                            const stock = stockBySizeAndRegion.get(label)?.[region] ?? 0;
                            const min = MIN_STOCK[region][label] ?? 0;
                            const status = getStockStatus(stock, min);
                            return (
                              <TableCell
                                key={region}
                                className={`text-right ${statusCellClass(status)}`}
                              >
                                {stock}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Minimum Stock table */}
              <div>
                <h4 className="font-semibold mb-2">Minimum Stock</h4>
                <div className="border rounded-md overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Minimum Stock</TableHead>
                        {AMAZON_REGIONS.map((r) => (
                          <TableHead key={r} className="text-right tabular-nums">
                            {r}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SIZE_ROWS.map(({ label }) => (
                        <TableRow key={label}>
                          <TableCell className="font-medium">{label}</TableCell>
                          {AMAZON_REGIONS.map((region) => (
                            <TableCell
                              key={region}
                              className="text-right tabular-nums text-muted-foreground"
                            >
                              {MIN_STOCK[region][label]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Maximum Stock table */}
              <div>
                <h4 className="font-semibold mb-2">Maximum Stock</h4>
                <div className="border rounded-md overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Maximum Stock</TableHead>
                        {AMAZON_REGIONS.map((r) => (
                          <TableHead key={r} className="text-right tabular-nums">
                            {r}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SIZE_ROWS.map(({ label }) => (
                        <TableRow key={label}>
                          <TableCell className="font-medium">{label}</TableCell>
                          {AMAZON_REGIONS.map((region) => (
                            <TableCell
                              key={region}
                              className="text-right tabular-nums text-muted-foreground"
                            >
                              {MAX_STOCK[region][label]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Send in: only when below min, ceil to nearest 25; if only one below min, add 25 to next-closest-to-min (box of 50) */}
              <div>
                <h4 className="font-semibold mb-2">Send in</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  Whole boxes only: small box = 25 SR + 25 SL, large box = 25 LR + 25 LL. Shown when
                  below min; number of boxes from the size that needs most in each pair.
                </p>
                <div className="border rounded-md overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Send in</TableHead>
                        {AMAZON_REGIONS.map((r) => (
                          <TableHead key={r} className="text-right tabular-nums">
                            {r}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SIZE_ROWS.map(({ label }) => (
                        <TableRow key={label}>
                          <TableCell className="font-medium">{label}</TableCell>
                          {AMAZON_REGIONS.map((region) => {
                            const send = sendInBySizeAndRegion.get(label)?.[region] ?? 0;
                            return (
                              <TableCell
                                key={region}
                                className={`text-right tabular-nums ${send > 0 ? "font-semibold text-primary" : "text-muted-foreground"}`}
                              >
                                {send > 0 ? send : "–"}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export const Route = createFileRoute("/home/stock/amazon-plan")({
  component: AmazonPlanPage,
  loader: async ({ context }) => {
    context.queryClient.prefetchQuery(selectAmazonInventoryQueryOptions());
  },
});
