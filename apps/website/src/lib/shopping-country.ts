import { detectCountryCode } from "@/lib/geo-country";

/** ISO 3166-1 alpha-2; drives catalogue URLs, cart buyerIdentity, and course eligibility. */
export const SHOPPING_COUNTRY_STORAGE_KEY = "thetis-shopping-country";

export const SHOPPING_COUNTRY_CHANGE_EVENT = "thetis-shopping-country-change";

/** Shopify `CountryCode` uses GB, not UK. */
export function toShopifyCountryCode(iso: string | null | undefined): string {
  const u = (iso || "").trim().toUpperCase();
  if (u === "UK") return "GB";
  if (!u) return "US";
  return u;
}

export function getStoredShoppingCountryCode(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SHOPPING_COUNTRY_STORAGE_KEY);
}

export function setStoredShoppingCountryCode(iso: string): void {
  if (typeof window === "undefined") return;
  const prev = localStorage.getItem(SHOPPING_COUNTRY_STORAGE_KEY);
  const next = toShopifyCountryCode(iso);
  localStorage.setItem(SHOPPING_COUNTRY_STORAGE_KEY, next);
  window.dispatchEvent(
    new CustomEvent(SHOPPING_COUNTRY_CHANGE_EVENT, { detail: { prev, next } }),
  );
}

/** Prefer stored; else geo-detect once and persist. */
export async function ensureShoppingCountryCode(): Promise<string> {
  const stored = getStoredShoppingCountryCode();
  if (stored) return toShopifyCountryCode(stored);
  const detected = await detectCountryCode();
  const c = toShopifyCountryCode(detected);
  if (typeof window !== "undefined") {
    localStorage.setItem(SHOPPING_COUNTRY_STORAGE_KEY, c);
  }
  return c;
}

/** Pricing hooks: stored shopping country wins, else IP (no persist). */
export async function getCountryCodeForPricing(): Promise<string> {
  const stored = getStoredShoppingCountryCode();
  if (stored) return toShopifyCountryCode(stored);
  return detectCountryCode();
}
