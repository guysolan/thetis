// Shopify product configuration
// Get product IDs from Shopify admin: Products > [Product] > Product ID (numeric)

export const SHOPIFY_PRODUCTS = {
    ESSENTIALS_COURSE: "9846187786568",
    PROFESSIONALS_COURSE: "9846188081480",
} as const;

// Helper to get product ID from handle (if needed)
export async function getProductIdFromHandle(
    handle: string,
): Promise<string | null> {
    const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
      }
    }
  `;

    try {
        const response = await fetch(
            `https://shop.thetismedical.com/api/2024-01/graphql.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token":
                        "784883c28d6484a8804b44ae00adfb99",
                },
                body: JSON.stringify({
                    query,
                    variables: { handle },
                }),
            },
        );

        const data = await response.json();
        if (data.data?.product?.id) {
            // Extract numeric ID from GID format: "gid://shopify/Product/123456"
            const gid = data.data.product.id;
            return gid.split("/").pop() || null;
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch product ID:", error);
        return null;
    }
}
