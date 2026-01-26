import { useEffect, useState } from "react";
import { getVariantPrice } from "@/lib/shopify/storefront";
import {
    getCachedPrice,
    setCachedPrice,
} from "@/lib/shopify/price-cache";

interface UseVariantPriceResult {
    formattedPrice: string | null;
    isLoading: boolean;
    error: string | null;
}

// Fallback prices for known products (used when API fails)
const FALLBACK_PRICES: Record<string, { GBP: string; USD: string }> = {
    // Night Splint variants
    "gid://shopify/ProductVariant/47494539673928": { GBP: "£63.99", USD: "$93.99" },
    "gid://shopify/ProductVariant/47494539608392": { GBP: "£63.99", USD: "$93.99" },
    "gid://shopify/ProductVariant/47494539706696": { GBP: "£63.99", USD: "$93.99" },
    "gid://shopify/ProductVariant/47494539641160": { GBP: "£63.99", USD: "$93.99" },
    // Course variants
    "gid://shopify/ProductVariant/52265314353480": { GBP: "£29.99", USD: "$39.99" },
    "gid://shopify/ProductVariant/52265315828040": { GBP: "£99.99", USD: "$129.99" },
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
