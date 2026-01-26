import { useEffect, useState } from "react";
import { getVariantPrice } from "@/lib/shopify/storefront";
import {
    getCachedPrice,
    setCachedPrice,
} from "@/lib/shopify/price-cache";
import { SPLINT_VARIANTS, COURSE_VARIANTS } from "@/lib/shopify/products";

interface UseVariantPriceResult {
    formattedPrice: string | null;
    isLoading: boolean;
    error: string | null;
}

// Fallback prices for known products (used when API fails)
// These should match your Shopify prices - update if prices change
const FALLBACK_PRICES: Record<string, { GBP: string; USD: string }> = {
    // Night Splint variants (all same price)
    [SPLINT_VARIANTS["large-left"]]: { GBP: "£63.99", USD: "$93.99" },
    [SPLINT_VARIANTS["large-right"]]: { GBP: "£63.99", USD: "$93.99" },
    [SPLINT_VARIANTS["small-left"]]: { GBP: "£63.99", USD: "$93.99" },
    [SPLINT_VARIANTS["small-right"]]: { GBP: "£63.99", USD: "$93.99" },
    // Course variants
    [COURSE_VARIANTS.ESSENTIALS]: { GBP: "£29.99", USD: "$39.99" },
    [COURSE_VARIANTS.PROFESSIONALS]: { GBP: "£99.99", USD: "$129.99" },
};

// Detect user's country
async function detectCountry(): Promise<string> {
    try {
        const response = await fetch("https://ipapi.co/json/");
        if (response.ok) {
            const data = await response.json();
            return data.country_code || "GB";
        }
    } catch (error) {
        console.error("Failed to detect country:", error);
    }
    return "GB";
}

// Get fallback price for a variant
function getFallbackPrice(variantId: string, countryCode: string): string | null {
    const prices = FALLBACK_PRICES[variantId];
    if (!prices) return null;
    return countryCode === "US" ? prices.USD : prices.GBP;
}

export function useVariantPrice(
    variantId: string,
    fallbackPrice?: string,
): UseVariantPriceResult {
    const [formattedPrice, setFormattedPrice] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadPrice() {
            setIsLoading(true);
            setError(null);
            
            // Detect the user's country first (needed for fallback too)
            const countryCode = await detectCountry();
            
            try {
                // Check cache first
                const cachedPrice = getCachedPrice(variantId, countryCode);
                if (cachedPrice) {
                    if (!isMounted) return;
                    setFormattedPrice(cachedPrice);
                    setIsLoading(false);
                    return;
                }

                // Fetch price from Shopify Storefront API
                const priceData = await getVariantPrice(variantId, countryCode);

                if (!isMounted) return;

                if (priceData) {
                    // Cache the price
                    setCachedPrice(
                        variantId,
                        countryCode,
                        priceData.formattedPrice,
                    );
                    setFormattedPrice(priceData.formattedPrice);
                } else {
                    // Fallback to known prices or provided fallback
                    const fallback = getFallbackPrice(variantId, countryCode) || fallbackPrice || null;
                    setFormattedPrice(fallback);
                }
            } catch (err) {
                if (!isMounted) return;
                const errorMessage = err instanceof Error
                    ? err.message
                    : "Failed to load price";
                setError(errorMessage);
                // Fallback to known prices or provided fallback
                const fallback = getFallbackPrice(variantId, countryCode) || fallbackPrice || null;
                setFormattedPrice(fallback);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        if (variantId) {
            loadPrice();
        } else {
            setIsLoading(false);
            setFormattedPrice(fallbackPrice || null);
        }

        return () => {
            isMounted = false;
        };
    }, [variantId, fallbackPrice]);

    return { formattedPrice, isLoading, error };
}
