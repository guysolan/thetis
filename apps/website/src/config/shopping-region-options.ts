/**
 * ISO codes aligned with {@link @thetis/catalogue#splintPurchaseRegionFromCountryCode}
 * and Shopify cart `buyerIdentity.countryCode`.
 */
export const SHOPPING_REGION_OPTIONS = [
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "IE", label: "Ireland" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
  { code: "NZ", label: "New Zealand" },
  { code: "BE", label: "Belgium" },
  { code: "DE", label: "Germany" },
  { code: "ES", label: "Spain" },
  { code: "FR", label: "France" },
  { code: "IT", label: "Italy" },
  { code: "NL", label: "Netherlands" },
  { code: "PL", label: "Poland" },
  { code: "PT", label: "Portugal" },
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
