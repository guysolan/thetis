/** Storefront / site region (uppercase keys in data). */
export type MarketCode = "US" | "GB";

/** Accept lowercase from older call sites. */
export type RegionInput = MarketCode | "us" | "gb";

/** Condition slugs aligned with website `ConditionId`. */
export type CatalogueConditionId =
  | "achilles-rupture"
  | "plantar-fasciitis"
  | "achilles-tendinitis"
  | "insertional-achilles-tendonitis";

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
  /** Which condition shop/survival-kit lists include this row (when priority matches). */
  conditions: CatalogueConditionId[];
  /**
   * Curation tier. Shop cards: **essential** → gold medal, **recommended** → silver,
   * **optional** & **comfort** → bronze. (`supplement` / `reference` are not listed on the shop grid.)
   */
  priority: AchillesProductPriority;
  name: string;
  category: string;
  keyBenefit: string;
  tags: string[];
  /** Site-relative; product photos under `/images/catalogue-products/` (synced from package assets). */
  imagePath: string;
  description?: string;
  features: string[];
  locations: Partial<Record<MarketCode, AchillesProductLocation>>;
  notes?: string;
  /**
   * @deprecated Unused in shop (single-card grid). Kept for legacy tooling.
   */
  shopCardGroupId?: string;
  /**
   * Other product ids for the same role. The shop shows an “Alternative to”
   * callout with their names (each product stays its own card).
   */
  alternativeTo?: string[];
  /**
   * This row is an add-on for these primary product ids (e.g. liner → boot).
   */
  accessoryTo?: string[];
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
