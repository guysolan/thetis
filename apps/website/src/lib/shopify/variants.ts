// Night splint variant IDs from Shopify
// These are the Shopify GraphQL global IDs for each variant

export const NIGHT_SPLINT_PRODUCT_ID = "8572432253256";

// Variant IDs in format: gid://shopify/ProductVariant/{id}
export const NIGHT_SPLINT_VARIANTS = {
    // Large variants
    largeLeft: "gid://shopify/ProductVariant/47494539673928",
    largeRight: "gid://shopify/ProductVariant/47494539608392",
    // Small variants
    smallLeft: "gid://shopify/ProductVariant/47494539706696",
    smallRight: "gid://shopify/ProductVariant/47494539641160",
} as const;

// Helper to get variant ID by size and side
export function getVariantId(
    size: "large" | "small",
    side: "left" | "right",
): string {
    const key = `${size}${
        side.charAt(0).toUpperCase() + side.slice(1)
    }` as keyof typeof NIGHT_SPLINT_VARIANTS;
    return NIGHT_SPLINT_VARIANTS[key];
}

// Checkout links (direct cart URLs)
export const CHECKOUT_LINKS = {
    largeLeft:
        "https://shop.thetismedical.com/cart/47494539673928:1?channel=buy_button",
    largeRight:
        "https://shop.thetismedical.com/cart/47494539608392:1?channel=buy_button",
    smallLeft:
        "https://shop.thetismedical.com/cart/47494539706696:1?channel=buy_button",
    smallRight:
        "https://shop.thetismedical.com/cart/47494539641160:1?channel=buy_button",
} as const;

export function getCheckoutLink(
    size: "large" | "small",
    side: "left" | "right",
): string {
    const key = `${size}${
        side.charAt(0).toUpperCase() + side.slice(1)
    }` as keyof typeof CHECKOUT_LINKS;
    return CHECKOUT_LINKS[key];
}
