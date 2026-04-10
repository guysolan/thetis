export type {
  AchillesProduct,
  AchillesProductLocation,
  AchillesProductPriority,
  MarketCode,
  RegionInput,
  SplintPurchaseMatrix,
  SplintPurchaseRegion,
  SplintVariantId,
} from "./types";

export {
  ACHILLES_RUPTURE_PRODUCTS,
  ACHILLES_RUPTURE_PRODUCTS_BY_ID,
  SURVIVAL_KIT_PRODUCTS,
  THETIS_SPLINT_PURCHASE_LINKS,
} from "./achilles-rupture";

export {
  defaultProductCta,
  isOffSiteUrl,
  normalizeMarket,
  resolvedCatalogueOutboundHref,
  resolveProductPrice,
  resolveProductUrl,
  resolveProductUrlById,
  resolveSurvivalKitPriceRange,
  resolveSurvivalKitUrl,
  resolveTrackedPatientUrl,
} from "./resolve";
