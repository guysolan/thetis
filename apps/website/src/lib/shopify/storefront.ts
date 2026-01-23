// Shopify Storefront API client for cart operations

const SHOPIFY_DOMAIN = "shop.thetismedical.com";
const STOREFRONT_ACCESS_TOKEN = "784883c28d6484a8804b44ae00adfb99";
const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

interface CartLine {
    id: string;
    quantity: number;
    merchandise: {
        id: string;
        title: string;
        product: {
            title: string;
            featuredImage?: {
                url: string;
                altText?: string;
            };
        };
        price: {
            amount: string;
            currencyCode: string;
        };
    };
}

interface Cart {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: {
        totalAmount: {
            amount: string;
            currencyCode: string;
        };
        subtotalAmount: {
            amount: string;
            currencyCode: string;
        };
    };
    lines: {
        edges: Array<{
            node: CartLine;
        }>;
    };
}

interface CartResponse {
    cart: Cart | null;
}

interface CartCreateResponse {
    cartCreate: {
        cart: Cart;
        userErrors: Array<{ field: string[]; message: string }>;
    };
}

interface CartLinesAddResponse {
    cartLinesAdd: {
        cart: Cart;
        userErrors: Array<{ field: string[]; message: string }>;
    };
}

interface CartLinesUpdateResponse {
    cartLinesUpdate: {
        cart: Cart;
        userErrors: Array<{ field: string[]; message: string }>;
    };
}

interface CartLinesRemoveResponse {
    cartLinesRemove: {
        cart: Cart;
        userErrors: Array<{ field: string[]; message: string }>;
    };
}

async function storefrontFetch<T>(
    query: string,
    variables: Record<string, unknown> = {},
): Promise<T> {
    const response = await fetch(STOREFRONT_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        throw new Error(`Storefront API error: ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
        throw new Error(json.errors[0]?.message || "Unknown error");
    }

    return json.data;
}

const CART_FRAGMENT = `
    fragment CartFragment on Cart {
        id
        checkoutUrl
        totalQuantity
        cost {
            totalAmount {
                amount
                currencyCode
            }
            subtotalAmount {
                amount
                currencyCode
            }
        }
        lines(first: 100) {
            edges {
                node {
                    id
                    quantity
                    merchandise {
                        ... on ProductVariant {
                            id
                            title
                            product {
                                title
                                featuredImage {
                                    url
                                    altText
                                }
                            }
                            price {
                                amount
                                currencyCode
                            }
                        }
                    }
                }
            }
        }
    }
`;

export async function createCart(
    variantId: string,
    quantity: number = 1,
): Promise<Cart> {
    const query = `
        mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
                cart {
                    ...CartFragment
                }
                userErrors {
                    field
                    message
                }
            }
        }
        ${CART_FRAGMENT}
    `;

    const variables = {
        input: {
            lines: [
                {
                    merchandiseId: variantId,
                    quantity,
                },
            ],
        },
    };

    const data = await storefrontFetch<CartCreateResponse>(query, variables);

    if (data.cartCreate.userErrors.length > 0) {
        throw new Error(data.cartCreate.userErrors[0].message);
    }

    return data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
    const query = `
        query getCart($cartId: ID!) {
            cart(id: $cartId) {
                ...CartFragment
            }
        }
        ${CART_FRAGMENT}
    `;

    const data = await storefrontFetch<CartResponse>(query, { cartId });
    return data.cart;
}

export async function addToCart(
    cartId: string,
    variantId: string,
    quantity: number = 1,
): Promise<Cart> {
    const query = `
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                    ...CartFragment
                }
                userErrors {
                    field
                    message
                }
            }
        }
        ${CART_FRAGMENT}
    `;

    const variables = {
        cartId,
        lines: [
            {
                merchandiseId: variantId,
                quantity,
            },
        ],
    };

    const data = await storefrontFetch<CartLinesAddResponse>(query, variables);

    if (data.cartLinesAdd.userErrors.length > 0) {
        throw new Error(data.cartLinesAdd.userErrors[0].message);
    }

    return data.cartLinesAdd.cart;
}

export async function updateCartLine(
    cartId: string,
    lineId: string,
    quantity: number,
): Promise<Cart> {
    const query = `
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
                cart {
                    ...CartFragment
                }
                userErrors {
                    field
                    message
                }
            }
        }
        ${CART_FRAGMENT}
    `;

    const variables = {
        cartId,
        lines: [
            {
                id: lineId,
                quantity,
            },
        ],
    };

    const data = await storefrontFetch<CartLinesUpdateResponse>(
        query,
        variables,
    );

    if (data.cartLinesUpdate.userErrors.length > 0) {
        throw new Error(data.cartLinesUpdate.userErrors[0].message);
    }

    return data.cartLinesUpdate.cart;
}

export async function removeFromCart(
    cartId: string,
    lineId: string,
): Promise<Cart> {
    const query = `
        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
                cart {
                    ...CartFragment
                }
                userErrors {
                    field
                    message
                }
            }
        }
        ${CART_FRAGMENT}
    `;

    const variables = {
        cartId,
        lineIds: [lineId],
    };

    const data = await storefrontFetch<CartLinesRemoveResponse>(
        query,
        variables,
    );

    if (data.cartLinesRemove.userErrors.length > 0) {
        throw new Error(data.cartLinesRemove.userErrors[0].message);
    }

    return data.cartLinesRemove.cart;
}

export function formatPrice(amount: string, currencyCode: string): string {
    const numericAmount = parseFloat(amount);
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: currencyCode,
    }).format(numericAmount);
}

interface VariantPriceResponse {
    productVariant: {
        price: {
            amount: string;
            currencyCode: string;
        } | null;
    } | null;
}

export async function getVariantPrice(
    variantId: string,
    countryCode: string = "GB",
): Promise<
    { amount: string; currencyCode: string; formattedPrice: string } | null
> {
    const query = `
        query getVariantPrice($variantId: ID!, $country: CountryCode) @inContext(country: $country) {
            productVariant(id: $variantId) {
                price {
                    amount
                    currencyCode
                }
            }
        }
    `;

    try {
        const data = await storefrontFetch<VariantPriceResponse>(query, {
            variantId,
            country: countryCode,
        });

        const price = data.productVariant?.price;
        if (!price) {
            return null;
        }

        return {
            amount: price.amount,
            currencyCode: price.currencyCode,
            formattedPrice: formatPrice(price.amount, price.currencyCode),
        };
    } catch (error) {
        console.error("Failed to fetch variant price:", error);
        return null;
    }
}

export type { Cart, CartLine };
