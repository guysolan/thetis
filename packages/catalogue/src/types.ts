/** Storefront / site region (uppercase keys in data). */
export type MarketCode = "US" | "GB";

/** Accept lowercase from older call sites. */
export type RegionInput = MarketCode | "us" | "gb";

export type AchillesProductPriority =
  | "essential"
  | "recommended"
  | "comfort"
  | "optional"
  /** Equipment guide & bundles only — not listed on survival-kit page. */
  | "supplement"
  /** Boot retailers, legacy ASINs, article citations — lookup by id only. */
  | "reference";

export interface AchillesProductLocation {
  /** Display range, e.g. `$40–$50` or `£35–£40` */
  price?: string;
  /**
   * Destination: `https://...` off-site, or site-relative `/articles/...` for
   * same-origin pages (e.g. achilles-rupture.com). Prefer relative paths when
   * the target lives on the current site so links work in dev/staging.
   */
  url: string;
  /** Dub (or other tracked) short link — takes precedence over `url` when set. */
  dub?: string;
}

export interface AchillesProduct {
  id: string;
  priority: AchillesProductPriority;
  name: string;
  category: string;
  keyBenefit: string;
  tags: string[];
  imagePath: string;
  description?: string;
  features: string[];
  locations: Partial<Record<MarketCode, AchillesProductLocation>>;
  notes?: string;
}

export type SplintVariantId = "LL" | "LR" | "SL" | "SR";

export type SplintPurchaseRegion =
  | "US"
  | "UK"
  | "CA"
  | "DE"
  | "IT"
  | "FR"
  | "BE"
  | "NL"
  | "PL"
  | "ES"
  | "AU"
  | "PT";

export type SplintPurchaseMatrix = Record<
  SplintPurchaseRegion,
  Record<SplintVariantId, string>
>;
