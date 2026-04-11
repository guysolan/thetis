import type { AchillesProduct, AchillesProductPriority } from "./types";

export type ShopMedalTier = "gold" | "silver" | "bronze";

/** Maps `priority` to shop medal: gold / silver / bronze (or null if no medal). */
export function shopMedalTierForPriority(
  priority: AchillesProductPriority,
): ShopMedalTier | null {
  switch (priority) {
    case "essential":
      return "gold";
    case "recommended":
      return "silver";
    case "optional":
    case "comfort":
      return "bronze";
    default:
      return null;
  }
}

/** Shop grid: one card per product, A→Z by display name. */
export function orderedShopProductsForDisplay(
  products: AchillesProduct[],
): AchillesProduct[] {
  return [...products].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );
}
