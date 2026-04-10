/**
 * Shop URLs from `@thetis/catalogue` for inline markdown in lesson content.
 */

import { resolveProductUrlById } from "@thetis/catalogue";

type Region = "us" | "gb";

function shop(id: string, region: Region): string {
  const u = resolveProductUrlById(id, region);
  if (!u) throw new Error(`@thetis/catalogue missing ${id} (${region})`);
  return u;
}

export function mdShopPair(productId: string): string {
  return `[UK](${shop(productId, "gb")}) · [US](${shop(productId, "us")})`;
}
