/**
 * Product photos live in `packages/catalogue/assets/product-images/`.
 * Run `pnpm run sync-catalogue-images` from an app (or `pnpm run sync-product-images`
 * from `@thetis/catalogue`) before dev/build so files exist under each app’s
 * `public/images/catalogue-products/`.
 */
export const CATALOGUE_PRODUCT_IMAGES_PUBLIC_PREFIX =
  "/images/catalogue-products";

export function catalogueProductImageHref(filename: string): string {
  return `${CATALOGUE_PRODUCT_IMAGES_PUBLIC_PREFIX}/${filename}`;
}
