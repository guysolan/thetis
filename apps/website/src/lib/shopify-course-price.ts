// Shopify Storefront API credentials
const SHOPIFY_DOMAIN = "shop.thetismedical.com";
const STOREFRONT_ACCESS_TOKEN = "784883c28d6484a8804b44ae00adfb99";

// Product IDs (numeric; used in order webhooks and Admin API)
export const SHOPIFY_COURSE_PRODUCTS = {
    ESSENTIALS_COURSE: "9846187786568",
    PROFESSIONALS_COURSE: "9846188081480",
} as const;

/**
 * Splint product ID (numeric; order webhook line_items[].product_id).
 * Get from: Supabase webhook_events.payload for a splint order, e.g.
 *   SELECT payload->'line_items'->0->'product_id' FROM webhook_events WHERE (payload->>'order_number') = '1324' LIMIT 1;
 * Or Shopify Admin → Products → Achilles Rupture Splint → ID in URL.
 */
export const SHOPIFY_SPLINT_PRODUCT_ID = "8013896130728";

// Variant IDs (GIDs)
export const SHOPIFY_COURSE_VARIANTS = {
    ESSENTIALS_COURSE: "gid://shopify/ProductVariant/52265314353480",
    PROFESSIONALS_COURSE: "gid://shopify/ProductVariant/52265315828040",
} as const;

export interface ShopifyPrice {
    amount: string;
    currencyCode: string;
    formattedPrice: string;
}

// Fetch price from Shopify Storefront API
export async function fetchCoursePrice(
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
            const amount = variant.price.amount;
            const currencyCode = variant.price.currencyCode;

            // Format price
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

            return {
                amount,
                currencyCode,
                formattedPrice: formatter.format(numAmount),
            };
        }

        return null;
    } catch (error) {
        console.error("Failed to fetch Shopify price:", error);
        return null;
    }
}
