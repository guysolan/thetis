// Product and Variant definitions for upsell logic
import { COURSE_URL } from "../env";

// Night Splint variants
export const SPLINT_VARIANTS = {
    "large-left": "gid://shopify/ProductVariant/47494539673928",
    "large-right": "gid://shopify/ProductVariant/47494539608392",
    "small-left": "gid://shopify/ProductVariant/47494539706696",
    "small-right": "gid://shopify/ProductVariant/47494539641160",
} as const;

export const SPLINT_VARIANT_IDS = Object.values(SPLINT_VARIANTS);

// Course variants
export const COURSE_VARIANTS = {
    ESSENTIALS: "gid://shopify/ProductVariant/52265314353480",
    PROFESSIONALS: "gid://shopify/ProductVariant/52265315828040",
} as const;

export const COURSE_VARIANT_IDS = Object.values(COURSE_VARIANTS);

// Product info for upsells
// Note: Prices are fetched dynamically using useVariantPrice hook
// The price field is kept for TypeScript compatibility but should not be used for display
export const UPSELL_PRODUCTS = {
    splint: {
        title: "Achilles Night Splint",
        description: "Sleep comfortably while your tendon heals",
        price: "", // Fetched dynamically via useVariantPrice hook
        image: "/images/night_splint_bed_top_square.jpg",
        href: "/achilles-rupture-splint",
        variantId: SPLINT_VARIANTS["large-left"], // Default variant for upsell
        canAddToCart: true,
    },
    essentialsCourse: {
        title: "Recovery Course",
        description: "31 lessons to guide your recovery",
        price: "", // Fetched dynamically via useVariantPrice hook
        image: "/images/tendon-gap.png",
        href: `${COURSE_URL}/standard`,
        variantId: COURSE_VARIANTS.ESSENTIALS,
        canAddToCart: true,
    },
    professionalsCourse: {
        title: "Professionals Course",
        description: "Complete guide for clinicians",
        price: "", // Fetched dynamically via useVariantPrice hook
        image: "/images/tendon-gap.png",
        href: `${COURSE_URL}/premium`,
        variantId: COURSE_VARIANTS.PROFESSIONALS,
        canAddToCart: true,
    },
} as const;

// Helper to check if cart contains a splint
export function cartContainsSplint(variantIds: string[]): boolean {
    return variantIds.some((id) => SPLINT_VARIANT_IDS.includes(id as any));
}

// Helper to check if cart contains a course
export function cartContainsCourse(variantIds: string[]): boolean {
    return variantIds.some((id) => COURSE_VARIANT_IDS.includes(id as any));
}

// Get upsell suggestions based on cart contents
export function getUpsellSuggestions(
    variantIds: string[],
): typeof UPSELL_PRODUCTS[keyof typeof UPSELL_PRODUCTS][] {
    const hasSplint = cartContainsSplint(variantIds);
    const hasCourse = cartContainsCourse(variantIds);
    const hasEssentials = variantIds.includes(COURSE_VARIANTS.ESSENTIALS);
    const hasProfessionals = variantIds.includes(COURSE_VARIANTS.PROFESSIONALS);

    const suggestions: typeof UPSELL_PRODUCTS[keyof typeof UPSELL_PRODUCTS][] =
        [];

    // If has splint but no courses, suggest standard course only (premium coming soon)
    if (hasSplint && !hasCourse) {
        suggestions.push(UPSELL_PRODUCTS.essentialsCourse);
        // Premium course is coming soon - don't suggest it
    }

    // If has course but no splint, suggest splint
    if (hasCourse && !hasSplint) {
        suggestions.push(UPSELL_PRODUCTS.splint);
    }

    // Premium course is coming soon - don't suggest upgrading from essentials

    return suggestions;
}
