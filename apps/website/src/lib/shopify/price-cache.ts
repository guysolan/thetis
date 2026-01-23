import { atom, map } from "nanostores";

// Cache for variant prices
// Key: variantId, Value: { formattedPrice: string; timestamp: number }
interface CachedPrice {
    formattedPrice: string;
    timestamp: number;
    countryCode: string;
}

// Cache expires after 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

export const $priceCache = map<Record<string, CachedPrice>>({});

/**
 * Get cached price for a variant, or null if not cached or expired
 */
export function getCachedPrice(
    variantId: string,
    countryCode: string,
): string | null {
    const cache = $priceCache.get();
    const cached = cache[variantId];

    if (!cached) {
        return null;
    }

    // Check if cache is expired or country changed
    const now = Date.now();
    if (
        now - cached.timestamp > CACHE_DURATION ||
        cached.countryCode !== countryCode
    ) {
        // Remove expired entry
        const newCache = { ...cache };
        delete newCache[variantId];
        $priceCache.set(newCache);
        return null;
    }

    return cached.formattedPrice;
}

/**
 * Set cached price for a variant
 */
export function setCachedPrice(
    variantId: string,
    countryCode: string,
    formattedPrice: string,
): void {
    const cache = $priceCache.get();
    $priceCache.set({
        ...cache,
        [variantId]: {
            formattedPrice,
            timestamp: Date.now(),
            countryCode,
        },
    });
}

/**
 * Clear all cached prices
 */
export function clearPriceCache(): void {
    $priceCache.set({});
}

/**
 * Clear cached price for a specific variant
 */
export function clearVariantPrice(variantId: string): void {
    const cache = $priceCache.get();
    const newCache = { ...cache };
    delete newCache[variantId];
    $priceCache.set(newCache);
}
