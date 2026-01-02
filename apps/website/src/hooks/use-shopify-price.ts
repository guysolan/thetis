import { useEffect, useState } from "react";

// Shopify Storefront API credentials
const SHOPIFY_DOMAIN = "shop.thetismedical.com";
const STOREFRONT_ACCESS_TOKEN = "784883c28d6484a8804b44ae00adfb99";

// Product and variant IDs
const PRODUCT_ID = "gid://shopify/Product/8572432253256";
const VARIANT_IDS = {
    "large-left": "gid://shopify/ProductVariant/47494539673928",
    "large-right": "gid://shopify/ProductVariant/47494539608392",
    "small-left": "gid://shopify/ProductVariant/47494539706696",
    "small-right": "gid://shopify/ProductVariant/47494539641160",
} as const;

interface ShopifyPrice {
    amount: string;
    currencyCode: string;
}

interface UseShopifyPriceResult {
    price: ShopifyPrice | null;
    formattedPrice: string | null;
    isLoading: boolean;
    error: string | null;
}

// Fetch price from Shopify Storefront API
async function fetchShopifyPrice(
    countryCode: string = "GB",
): Promise<ShopifyPrice | null> {
    const query = `
    query getProductPrice($country: CountryCode) @inContext(country: $country) {
      product(id: "${PRODUCT_ID}") {
        variants(first: 1) {
          edges {
            node {
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch(
            `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token":
                        STOREFRONT_ACCESS_TOKEN,
                },
                body: JSON.stringify({
                    query,
                    variables: { country: countryCode },
                }),
            },
        );

        if (!response.ok) {
            throw new Error(`Shopify API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
            console.error("Shopify GraphQL errors:", data.errors);
            return null;
        }

        const variant = data?.data?.product?.variants?.edges?.[0]?.node;
        if (variant?.price) {
            return {
                amount: variant.price.amount,
                currencyCode: variant.price.currencyCode,
            };
        }

        return null;
    } catch (error) {
        console.error("Failed to fetch Shopify price:", error);
        return null;
    }
}

// Detect user's country
async function detectCountry(): Promise<string> {
    try {
        // Try multiple geolocation services for reliability
        const response = await fetch("https://ipapi.co/json/");
        if (response.ok) {
            const data = await response.json();
            return data.country_code || "GB";
        }
    } catch (error) {
        console.error("Failed to detect country:", error);
    }

    // Fallback to GB
    return "GB";
}

// Format price based on currency
function formatPrice(amount: string, currencyCode: string): string {
    const numAmount = parseFloat(amount);

    const formatter = new Intl.NumberFormat(
        currencyCode === "GBP"
            ? "en-GB"
            : currencyCode === "USD"
            ? "en-US"
            : "en-GB",
        {
            style: "currency",
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        },
    );

    return formatter.format(numAmount);
}

export function useShopifyPrice(): UseShopifyPriceResult {
    const [price, setPrice] = useState<ShopifyPrice | null>(null);
    const [formattedPrice, setFormattedPrice] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadPrice() {
            try {
                // First detect the user's country
                const countryCode = await detectCountry();

                // Then fetch the price for that country
                const priceData = await fetchShopifyPrice(countryCode);

                if (!isMounted) return;

                if (priceData) {
                    setPrice(priceData);
                    setFormattedPrice(
                        formatPrice(priceData.amount, priceData.currencyCode),
                    );
                } else {
                    // Fallback to static prices if API fails
                    setFormattedPrice(
                        countryCode === "US" ? "$93.99" : "£63.99",
                    );
                    setPrice({
                        amount: countryCode === "US" ? "93.99" : "63.99",
                        currencyCode: countryCode === "US" ? "USD" : "GBP",
                    });
                }
            } catch (err) {
                if (!isMounted) return;
                setError(
                    err instanceof Error ? err.message : "Failed to load price",
                );
                // Fallback
                setFormattedPrice("£63.99");
                setPrice({ amount: "63.99", currencyCode: "GBP" });
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadPrice();

        return () => {
            isMounted = false;
        };
    }, []);

    return { price, formattedPrice, isLoading, error };
}

// Export for use in components that need raw price data
export { detectCountry, fetchShopifyPrice, formatPrice, VARIANT_IDS };
