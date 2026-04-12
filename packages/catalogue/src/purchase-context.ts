import { THETIS_SPLINT_PURCHASE_LINKS } from "./catalogue";
import type {
  AchillesProduct,
  MarketCode,
  SplintPurchaseRegion,
  SplintVariantId,
} from "./types";
import { resolveProductPrice, resolveProductUrl } from "./resolve";

/** ISO 3166-1 alpha-2 buyer / shipping country (e.g. US, GB, FR). */
export type PurchaseContext = {
  countryCode: string;
};

export const THETIS_NIGHT_SPLINT_PRODUCT_ID = "thetis-night-splint";

/** Map ISO country to splint purchase matrix region (UK for GB/UK). */
export function splintPurchaseRegionFromCountryCode(
  iso: string | null | undefined,
): SplintPurchaseRegion {
  if (!iso) return "US";
  const u = iso.trim().toUpperCase();
  const map: Record<string, SplintPurchaseRegion> = {
    US: "US",
    GB: "UK",
    UK: "UK",
    CA: "CA",
    DE: "DE",
    IT: "IT",
    FR: "FR",
    BE: "BE",
    NL: "NL",
    PL: "PL",
    ES: "ES",
    AU: "AU",
    PT: "PT",
  };
  return map[u] ?? "US";
}

/** Matrix region key → ISO country for Shopify `CountryCode` / storage. */
export function isoCountryFromSplintRegion(
  region: SplintPurchaseRegion,
): string {
  return region === "UK" ? "GB" : region;
}

/** For catalogue rows with only `locations.US` / `locations.GB`. */
export function catalogueMarketFromCountryCode(
  iso: string | null | undefined,
): MarketCode {
  if (!iso) return "US";
  const u = iso.trim().toUpperCase();
  if (u === "GB" || u === "UK") return "GB";
  return "US";
}

export function splintMatrixUrl(
  region: SplintPurchaseRegion,
  variant: SplintVariantId = "LL",
): string {
  return THETIS_SPLINT_PURCHASE_LINKS[region][variant];
}

/** `data-href-us`, `data-href-gb`, … for client-side country switching on shop grids. */
export function splintMatrixAnchorDataAttrs(
  variant: SplintVariantId = "LL",
): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (
    const region of Object.keys(
      THETIS_SPLINT_PURCHASE_LINKS,
    ) as SplintPurchaseRegion[]
  ) {
    const iso = isoCountryFromSplintRegion(region).toLowerCase();
    attrs[`data-href-${iso}`] = splintMatrixUrl(region, variant);
  }
  return attrs;
}

/** True when URL is Thetis checkout splint picker (Shopify cart eligible). */
export function isShopifyHostedSplintUrl(url: string): boolean {
  try {
    const h = new URL(url).hostname.replace(/^www\./i, "").toLowerCase();
    return h === "thetismedical.com" && /\/splint\//i.test(url);
  } catch {
    return false;
  }
}

export function resolveProductUrlForCountry(
  product: AchillesProduct,
  countryCode: string | undefined,
  variant: SplintVariantId = "LL",
): string | undefined {
  if (product.id === THETIS_NIGHT_SPLINT_PRODUCT_ID) {
    const region = splintPurchaseRegionFromCountryCode(countryCode);
    return splintMatrixUrl(region, variant);
  }
  const market = catalogueMarketFromCountryCode(countryCode);
  return resolveProductUrl(product, market);
}

export function resolveProductPriceForCountry(
  product: AchillesProduct,
  countryCode: string | undefined,
): string | undefined {
  if (product.id === THETIS_NIGHT_SPLINT_PRODUCT_ID) {
    const market = catalogueMarketFromCountryCode(countryCode);
    return resolveProductPrice(product, market);
  }
  return resolveProductPrice(
    product,
    catalogueMarketFromCountryCode(countryCode),
  );
}

export type CatalogueProductCta = {
  href: string;
  price: string | undefined;
  channel: "shopify_hosted" | "external";
};

export function resolveCatalogueProductCta(
  product: AchillesProduct,
  ctx: PurchaseContext,
  variant: SplintVariantId = "LL",
): CatalogueProductCta | null {
  const href = resolveProductUrlForCountry(product, ctx.countryCode, variant);
  if (!href) return null;
  const price = resolveProductPriceForCountry(product, ctx.countryCode);
  const channel = isShopifyHostedSplintUrl(href)
    ? "shopify_hosted"
    : "external";
  return { href, price, channel };
}
