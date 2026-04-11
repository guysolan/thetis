export {
  CATALOGUE_PRODUCT_IMAGES_PUBLIC_PREFIX,
  catalogueProductImageHref,
} from "./product-images-public";

export type {
  AchillesProduct,
  AchillesProductLocation,
  AchillesProductPriority,
  CatalogueConditionId,
  MarketCode,
  RegionInput,
  SplintPurchaseMatrix,
  SplintPurchaseRegion,
  SplintVariantId,
} from "./types";

export type { ShopMedalTier } from "./shop-display";

export {
  ACHILLES_RUPTURE_PRODUCTS,
  ACHILLES_RUPTURE_PRODUCTS_BY_ID,
  CATALOGUE_PRODUCTS,
  CATALOGUE_PRODUCTS_BY_ID,
  getCatalogueProductsForCondition,
  SURVIVAL_KIT_PRODUCTS,
  THETIS_SPLINT_PURCHASE_LINKS,
} from "./catalogue";

export {
  orderedShopProductsForDisplay,
  shopMedalTierForPriority,
} from "./shop-display";

export {
  defaultProductCta,
  isExternalCatalogueProductUrl,
  isInternalThetisUrl,
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
