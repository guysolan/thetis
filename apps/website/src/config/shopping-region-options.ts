/**
 * ISO codes aligned with {@link @thetis/catalogue#splintPurchaseRegionFromCountryCode}
 * and Shopify cart `buyerIdentity.countryCode`.
 */
export const SHOPPING_REGION_OPTIONS = [
  { code: "US", label: "United States", currencySymbol: "$" },
  { code: "GB", label: "United Kingdom", currencySymbol: "£" },
  { code: "IE", label: "Ireland", currencySymbol: "€" },
  { code: "CA", label: "Canada", currencySymbol: "$" },
  { code: "AU", label: "Australia", currencySymbol: "$" },
  { code: "NZ", label: "New Zealand", currencySymbol: "$" },
  { code: "BE", label: "Belgium", currencySymbol: "€" },
  { code: "DE", label: "Germany", currencySymbol: "€" },
  { code: "ES", label: "Spain", currencySymbol: "€" },
  { code: "FR", label: "France", currencySymbol: "€" },
  { code: "IT", label: "Italy", currencySymbol: "€" },
  { code: "NL", label: "Netherlands", currencySymbol: "€" },
  { code: "PL", label: "Poland", currencySymbol: "zł" },
  { code: "PT", label: "Portugal", currencySymbol: "€" },
] as const;

export type ShoppingRegionCode =
  (typeof SHOPPING_REGION_OPTIONS)[number]["code"];

const CODES = new Set<string>(SHOPPING_REGION_OPTIONS.map((o) => o.code));

export function isKnownShoppingRegionCode(
  iso: string | null | undefined,
): iso is ShoppingRegionCode {
  if (!iso) return false;
  return CODES.has(iso.trim().toUpperCase());
}
