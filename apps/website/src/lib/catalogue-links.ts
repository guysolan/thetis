/**
 * Markdown snippets with Dub (or canonical) shop URLs from `@thetis/catalogue`.
 */

import { resolveProductUrlById } from "@thetis/catalogue";

type Region = "us" | "gb";

function shop(id: string, region: Region): string {
  const u = resolveProductUrlById(id, region);
  if (!u) throw new Error(`@thetis/catalogue missing ${id} (${region})`);
  return u;
}

/** `[UK](…) · [US](…)` */
export function mdShopPair(productId: string): string {
  return `[UK](${shop(productId, "gb")}) · [US](${shop(productId, "us")})`;
}

/** Aircast + VACOped — typical “walking boot” shopping line. */
export function mdBootShopInline(): string {
  return `Aircast ${mdShopPair("aircast-airselect-boot")}; VACOped ${
    mdShopPair("vacoped-achilles-boot")
  }`;
}

/** Bold item label with shop pair (for guide tables). */
export function mdGuideItemWithShop(
  itemLabel: string,
  productId: string,
): string {
  return `${itemLabel} — ${mdShopPair(productId)}`;
}
