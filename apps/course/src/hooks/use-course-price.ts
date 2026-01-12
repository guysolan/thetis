import { useEffect, useState } from "react";
import { SHOPIFY_PRODUCTS } from "@/lib/shopify";

// Shopify Storefront API credentials
const SHOPIFY_DOMAIN = "shop.thetismedical.com";
const STOREFRONT_ACCESS_TOKEN = "784883c28d6484a8804b44ae00adfb99";

interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

interface UseCoursePriceResult {
  price: ShopifyPrice | null;
  formattedPrice: string | null;
  isLoading: boolean;
  error: string | null;
}

// Fetch price from Shopify Storefront API
async function fetchCoursePrice(
  productId: string,
  countryCode: string = "GB",
): Promise<ShopifyPrice | null> {
  const productGid = `gid://shopify/Product/${productId}`;
  const query = `
    query getProductPrice($country: CountryCode) @inContext(country: $country) {
      product(id: "${productGid}") {
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
          "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
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

export function useCoursePrice(
  courseType: "standard" | "premium" | "essentials" | "professionals",
): UseCoursePriceResult {
  const [price, setPrice] = useState<ShopifyPrice | null>(null);
  const [formattedPrice, setFormattedPrice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPrice() {
      try {
        // Map course types to product IDs (supporting both old and new names)
        const productId =
          courseType === "standard" || courseType === "essentials"
            ? SHOPIFY_PRODUCTS.STANDARD_COURSE
            : SHOPIFY_PRODUCTS.PREMIUM_COURSE;

        // Detect the user's country
        const countryCode = await detectCountry();

        // Fetch the price for that country
        const priceData = await fetchCoursePrice(productId, countryCode);

        if (!isMounted) return;

        if (priceData) {
          setPrice(priceData);
          setFormattedPrice(
            formatPrice(priceData.amount, priceData.currencyCode),
          );
        } else {
          // Fallback to static prices if API fails
          const isStandard = courseType === "standard" ||
            courseType === "essentials";
          const fallbackPrice = isStandard
            ? countryCode === "US" ? "$29.99" : "£29.99"
            : countryCode === "US"
            ? "$79.99"
            : "£79.99";

          setFormattedPrice(fallbackPrice);
          setPrice({
            amount: fallbackPrice.replace(/[£$]/g, ""),
            currencyCode: countryCode === "US" ? "USD" : "GBP",
          });
        }
      } catch (err) {
        if (!isMounted) return;
        setError(
          err instanceof Error ? err.message : "Failed to load price",
        );
        // Fallback
        const isStandard = courseType === "standard" ||
          courseType === "essentials";
        const fallbackPrice = isStandard ? "£29.99" : "£79.99";
        setFormattedPrice(fallbackPrice);
        setPrice({
          amount: fallbackPrice.replace(/[£$]/g, ""),
          currencyCode: "GBP",
        });
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
  }, [courseType]);

  return { price, formattedPrice, isLoading, error };
}

export { detectCountry, fetchCoursePrice, formatPrice };
