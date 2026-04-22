import type { AmazonInventory } from "./selectAmazonInventory";

export const AMAZON_REGIONS = [
  "Amazon US",
  "Amazon UK",
  "Amazon CA",
  "Amazon DE",
] as const;
export type AmazonRegion = (typeof AMAZON_REGIONS)[number];

export const SIZE_ROWS = [
  { label: "Small Right", sku: "TM-ATRNS-SR" },
  { label: "Small Left", sku: "TM-ATRNS-SL" },
  { label: "Large Right", sku: "TM-ATRNS-LR" },
  { label: "Large Left", sku: "TM-ATRNS-LL" },
] as const;

/** Minimum stock per region for each size (same rules as Amazon Plan). */
export const MIN_STOCK: Record<AmazonRegion, Record<string, number>> = {
  "Amazon US": {
    "Small Right": 20,
    "Small Left": 20,
    "Large Right": 60,
    "Large Left": 60,
  },
  "Amazon UK": {
    "Small Right": 15,
    "Small Left": 15,
    "Large Right": 45,
    "Large Left": 45,
  },
  "Amazon CA": {
    "Small Right": 10,
    "Small Left": 10,
    "Large Right": 30,
    "Large Left": 30,
  },
  "Amazon DE": {
    "Small Right": 15,
    "Small Left": 15,
    "Large Right": 45,
    "Large Left": 45,
  },
};

export type FbaRegionSummary = {
  region: AmazonRegion;
  belowMin: string[];
  allOk: boolean;
};

/**
 * Stock matrix: size label → region → total (available + inbound + fcTransfer).
 */
export function buildFbaStockBySizeAndRegion(
  amazonInventory: AmazonInventory | null | undefined,
): Map<string, Record<AmazonRegion, number>> {
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
        const total = (item.total ?? 0) ||
          (item.available ?? 0) + (item.inbound ?? 0) + (item.fcTransfer ?? 0);
        const map = stockBySizeAndRegion.get(row.label)!;
        map[region] = (map[region] ?? 0) + total;
      }
    }
  }

  return stockBySizeAndRegion;
}

export function getFbaRegionSummaries(
  stockBySizeAndRegion: Map<string, Record<AmazonRegion, number>>,
): FbaRegionSummary[] {
  return AMAZON_REGIONS.map((region) => {
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
}

/** True when we have FBA data and at least one region/size is below minimum. */
export function fbaHasBelowMinimum(
  amazonInventory: AmazonInventory | null | undefined,
): boolean {
  if (!amazonInventory) return false;
  const hasAnyRows = AMAZON_REGIONS.some((r) =>
    (amazonInventory[r]?.length ?? 0) > 0
  );
  if (!hasAnyRows) return false;
  const matrix = buildFbaStockBySizeAndRegion(amazonInventory);
  return getFbaRegionSummaries(matrix).some((s) => !s.allOk);
}
