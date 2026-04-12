/**
 * Shop catalogue uses `@thetis/catalogue` markets: US (USD) and GB (GBP).
 * Persisted for affiliate / retailer links on shop grids.
 */
export const SHOP_MARKET_STORAGE_KEY = "thetis-shop-market";

export type ShopMarketCode = "US" | "GB";

export function normalizeStoredShopMarket(raw: string | null): ShopMarketCode {
  if (raw === "GB" || raw === "gb") return "GB";
  return "US";
}
