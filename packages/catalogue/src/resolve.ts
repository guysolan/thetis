import { CATALOGUE_PRODUCTS, CATALOGUE_PRODUCTS_BY_ID } from "./catalogue";
import type { AchillesProduct, MarketCode, RegionInput } from "./types";

export function normalizeMarket(region: RegionInput): MarketCode {
  return region === "GB" || region === "gb" ? "GB" : "US";
}

function parseHttpUrl(raw: string): URL | null {
  try {
    return new URL(raw.trim());
  } catch {
    return null;
  }
}

function hostKey(hostname: string): string {
  return hostname.replace(/^www\./i, "").toLowerCase();
}

/** Strip query/hash; normalize trailing slash on path for comparison. */
function comparableUrlKey(u: URL): string {
  const path = u.pathname.length > 1
    ? u.pathname.replace(/\/+$/, "")
    : u.pathname;
  return `${hostKey(u.hostname)}${path}`;
}

function amazonAsinFromPath(pathname: string): string | null {
  const dp = pathname.match(
    /\/(?:dp|gp\/product|d)\/([A-Z0-9]{10})(?:\/|$|\?)/i,
  );
  if (dp) return dp[1]!.toUpperCase();
  return null;
}

function trackedHrefFromLocation(
  loc: AchillesProduct["locations"][MarketCode] | undefined,
): string | undefined {
  if (!loc) return undefined;
  const u = loc.url?.trim();
  if (!u?.startsWith("http")) return undefined;
  return loc.dub ?? loc.url;
}

/** Same destination as `resolveProductUrl`, for raw URL strings (articles, legacy links). */
export function resolvedCatalogueOutboundHref(
  rawUrl: string,
  region: RegionInput,
): string {
  const market = normalizeMarket(region);
  const url = parseHttpUrl(rawUrl);
  if (!url) return rawUrl;

  const tryMarkets: MarketCode[] = [market, market === "US" ? "GB" : "US"];

  for (const mkt of tryMarkets) {
    for (const p of CATALOGUE_PRODUCTS) {
      const loc = p.locations[mkt];
      const cu = loc?.url?.trim();
      if (!cu?.startsWith("http")) continue;
      const catUrl = parseHttpUrl(cu);
      if (!catUrl) continue;
      if (comparableUrlKey(url) === comparableUrlKey(catUrl)) {
        const href = trackedHrefFromLocation(loc);
        if (href) return href;
      }
    }
  }

  const asin = amazonAsinFromPath(url.pathname);
  if (asin && /\.amazon\./i.test(url.hostname)) {
    for (const mkt of tryMarkets) {
      for (const p of CATALOGUE_PRODUCTS) {
        const loc = p.locations[mkt];
        const cu = loc?.url?.trim();
        if (!cu?.startsWith("http")) continue;
        const catUrl = parseHttpUrl(cu);
        if (!catUrl || !/\.amazon\./i.test(catUrl.hostname)) continue;
        const catAsin = amazonAsinFromPath(catUrl.pathname);
        if (catAsin === asin) {
          const href = trackedHrefFromLocation(loc);
          if (href) return href;
        }
      }
    }
  }

  type Alias = { test: (u: URL) => boolean; productId: string };
  const aliases: Alias[] = [
    {
      test: (u) =>
        hostKey(u.hostname) === "thetismedical.com" &&
        /\/(splint|night-splint|achilles-rupture-splint)(\/|$|\?)/i.test(
          u.pathname,
        ),
      productId: "thetis-night-splint",
    },
    {
      test: (u) =>
        hostKey(u.hostname) === "opedmedical.com" &&
        /vacoped/i.test(u.pathname),
      productId: "vacoped-achilles-boot",
    },
    {
      test: (u) =>
        hostKey(u.hostname) === "oped-uk.com" && /vacoped/i.test(u.pathname),
      productId: "vacoped-achilles-boot",
    },
    {
      test: (u) =>
        hostKey(u.hostname) === "opedmedical.com" && /evenup/i.test(u.pathname),
      productId: "evenup-manufacturer-op",
    },
  ];

  for (const { test, productId } of aliases) {
    if (!test(url)) continue;
    const p = CATALOGUE_PRODUCTS_BY_ID[productId];
    if (!p) continue;
    const href = resolveProductUrl(p, market);
    if (href?.startsWith("http")) return href;
  }

  return rawUrl;
}

export function resolveProductUrl(
  product: AchillesProduct,
  region: RegionInput,
): string | undefined {
  const m = normalizeMarket(region);
  const primary = product.locations[m];
  const alt: MarketCode = m === "US" ? "GB" : "US";
  const fallback = product.locations[alt];
  const tries: [
    MarketCode,
    AchillesProduct["locations"][MarketCode] | undefined,
  ][] = [
    [m, primary],
    [alt, fallback],
  ];
  for (const [_mkt, loc] of tries) {
    if (!loc) continue;
    const out = loc.dub ?? loc.url;
    if (out) return out;
  }
  return undefined;
}

export function resolveProductPrice(
  product: AchillesProduct,
  region: RegionInput,
): string | undefined {
  const m = normalizeMarket(region);
  return (
    product.locations[m]?.price ??
      product.locations[m === "US" ? "GB" : "US"]?.price
  );
}

export function resolveProductUrlById(
  id: string,
  region: RegionInput,
): string | undefined {
  const p = CATALOGUE_PRODUCTS_BY_ID[id];
  if (!p) return undefined;
  return resolveProductUrl(p, region);
}

/** `https:` / `http:` URLs (open in new tab off-site). */
export function isOffSiteUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

/** Relative paths and absolute URLs on the Thetis marketing site (same-tab). */
export function isInternalThetisUrl(url: string): boolean {
  const t = url.trim();
  if (!isOffSiteUrl(t)) return true;
  try {
    const h = new URL(t).hostname.replace(/^www\./i, "").toLowerCase();
    return h === "thetismedical.com";
  } catch {
    return false;
  }
}

/** Partner / retailer links (new tab + mark clearly as not Thetis checkout). */
export function isExternalCatalogueProductUrl(url: string): boolean {
  return isOffSiteUrl(url) && !isInternalThetisUrl(url);
}

/** Default button label from destination URL. */
export function defaultProductCta(url: string): string {
  if (!isOffSiteUrl(url)) return "Compare Options";
  return "Buy";
}

/** @deprecated Use `resolveProductUrl` */
export const resolveSurvivalKitUrl = resolveProductUrl;

/** @deprecated Use `resolveProductPrice` */
export const resolveSurvivalKitPriceRange = resolveProductPrice;

/** @deprecated Use `resolveProductUrlById` */
export const resolveTrackedPatientUrl = resolveProductUrlById;
