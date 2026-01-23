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
            try {
                // Detect the user's country
                const countryCode = await detectCountry();

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
                    // Fallback to provided price or null
                    setFormattedPrice(fallbackPrice || null);
                }
            } catch (err) {
                if (!isMounted) return;
                const errorMessage = err instanceof Error
                    ? err.message
                    : "Failed to load price";
                setError(errorMessage);
                // Fallback to provided price or null
                setFormattedPrice(fallbackPrice || null);
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
