// GA4 E-commerce Analytics Helper
// Pushes standard e-commerce events to the dataLayer for GTM

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
    }
}

interface Product {
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
    item_variant?: string;
    currency?: string;
}

// Ensure dataLayer exists
function getDataLayer(): Record<string, unknown>[] {
    if (typeof window === "undefined") return [];
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
}

/**
 * Track when a user views a product
 */
export function trackViewItem(product: {
    id: string;
    name: string;
    price: number;
    currency?: string;
    variant?: string;
}) {
    const dataLayer = getDataLayer();
    const currency = product.currency || "GBP";

    dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data
    dataLayer.push({
        event: "view_item",
        ecommerce: {
            currency,
            value: product.price,
            items: [
                {
                    item_id: product.id,
                    item_name: product.name,
                    price: product.price,
                    quantity: 1,
                    item_variant: product.variant,
                },
            ],
        },
    });
}

/**
 * Track when a user adds an item to cart
 */
export function trackAddToCart(product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    currency?: string;
    variant?: string;
}) {
    const dataLayer = getDataLayer();
    const currency = product.currency || "GBP";

    dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data
    dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
            currency,
            value: product.price * product.quantity,
            items: [
                {
                    item_id: product.id,
                    item_name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    item_variant: product.variant,
                },
            ],
        },
    });
}

/**
 * Track when a user removes an item from cart
 */
export function trackRemoveFromCart(product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    currency?: string;
    variant?: string;
}) {
    const dataLayer = getDataLayer();
    const currency = product.currency || "GBP";

    dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data
    dataLayer.push({
        event: "remove_from_cart",
        ecommerce: {
            currency,
            value: product.price * product.quantity,
            items: [
                {
                    item_id: product.id,
                    item_name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    item_variant: product.variant,
                },
            ],
        },
    });
}

/**
 * Track when a user begins checkout
 */
export function trackBeginCheckout(items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    currency?: string;
    variant?: string;
}[]) {
    const dataLayer = getDataLayer();
    const currency = items[0]?.currency || "GBP";
    const value = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data
    dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
            currency,
            value,
            items: items.map((item) => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_variant: item.variant,
            })),
        },
    });
}

/**
 * Track a completed purchase
 * Note: This should be called from the thank you page or webhook
 */
export function trackPurchase(order: {
    transaction_id: string;
    value: number;
    currency?: string;
    items: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        variant?: string;
    }[];
}) {
    const dataLayer = getDataLayer();
    const currency = order.currency || "GBP";

    dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data
    dataLayer.push({
        event: "purchase",
        ecommerce: {
            transaction_id: order.transaction_id,
            currency,
            value: order.value,
            items: order.items.map((item) => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_variant: item.variant,
            })),
        },
    });
}
