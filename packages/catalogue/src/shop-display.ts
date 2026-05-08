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

/** Lower = earlier in shop lists (essential → recommended → optional-style tiers). */
const SHOP_PRIORITY_ORDER: Record<AchillesProductPriority, number> = {
  essential: 0,
  recommended: 1,
  comfort: 2,
  optional: 3,
  supplement: 4,
  reference: 5,
};

function shopPriorityRank(priority: AchillesProductPriority): number {
  return SHOP_PRIORITY_ORDER[priority] ?? 99;
}

/** Shop grid: priority (essential → optional) then A→Z by display name. */
export function orderedShopProductsForDisplay(
  products: AchillesProduct[],
): AchillesProduct[] {
  return [...products].sort((a, b) => {
    const byTier = shopPriorityRank(a.priority) - shopPriorityRank(b.priority);
    if (byTier !== 0) return byTier;
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
}
