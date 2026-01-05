// Nanostores-based cart store for Shopify Storefront API
// Works across React islands in Astro

import { atom, computed } from "nanostores";
import {
    addToCart as addToCartApi,
    type Cart,
    createCart,
    getCart,
    removeFromCart as removeFromCartApi,
    updateCartLine,
} from "./storefront";

export type { Cart } from "./storefront";

const CART_ID_KEY = "thetis_cart_id";

// Core state atoms
export const $cart = atom<Cart | null>(null);
export const $isCartOpen = atom(false);
export const $isLoading = atom(false);
export const $error = atom<string | null>(null);

// Computed values
export const $cartCount = computed($cart, (cart) => cart?.totalQuantity ?? 0);

export const $cartLines = computed(
    $cart,
    (cart) => cart?.lines.edges.map((edge) => edge.node) ?? [],
);

export const $subtotal = computed($cart, (cart) => cart?.cost?.subtotalAmount);

export const $checkoutUrl = computed($cart, (cart) => cart?.checkoutUrl);

// Actions
export function openCart() {
    $isCartOpen.set(true);
}

export function closeCart() {
    $isCartOpen.set(false);
}

export function toggleCart() {
    $isCartOpen.set(!$isCartOpen.get());
}

export async function initializeCart(): Promise<Cart | null> {
    if (typeof window === "undefined") return null;

    // Don't re-initialize if we already have a cart
    const currentCart = $cart.get();
    if (currentCart) return currentCart;

    $isLoading.set(true);
    $error.set(null);

    try {
        const cartId = localStorage.getItem(CART_ID_KEY);
        if (cartId) {
            const existingCart = await getCart(cartId);
            if (existingCart) {
                $cart.set(existingCart);
                $isLoading.set(false);
                return existingCart;
            }
            // Cart expired or invalid, remove from storage
            localStorage.removeItem(CART_ID_KEY);
        }
    } catch (error) {
        console.error("Error loading cart:", error);
        localStorage.removeItem(CART_ID_KEY);
    }

    $isLoading.set(false);
    return null;
}

export async function addToCart(
    variantId: string,
    quantity: number = 1,
    shouldOpenCart: boolean = true,
): Promise<Cart> {
    $isLoading.set(true);
    $error.set(null);

    try {
        const currentCart = $cart.get();
        let updatedCart: Cart;

        if (currentCart?.id) {
            updatedCart = await addToCartApi(
                currentCart.id,
                variantId,
                quantity,
            );
        } else {
            updatedCart = await createCart(variantId, quantity);
            if (typeof window !== "undefined") {
                localStorage.setItem(CART_ID_KEY, updatedCart.id);
            }
        }

        $cart.set(updatedCart);
        $isLoading.set(false);

        // Only open cart drawer if explicitly requested (defaults to true for backwards compatibility)
        if (shouldOpenCart) {
            openCart();
        }

        return updatedCart;
    } catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Failed to add to cart";
        $error.set(message);
        $isLoading.set(false);
        throw error;
    }
}

export async function updateQuantity(
    lineId: string,
    quantity: number,
): Promise<Cart | null> {
    const currentCart = $cart.get();
    if (!currentCart?.id) return null;

    $isLoading.set(true);
    $error.set(null);

    try {
        const updatedCart = await updateCartLine(
            currentCart.id,
            lineId,
            quantity,
        );
        $cart.set(updatedCart);
        $isLoading.set(false);
        return updatedCart;
    } catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Failed to update quantity";
        $error.set(message);
        $isLoading.set(false);
        throw error;
    }
}

export async function removeItem(lineId: string): Promise<Cart | null> {
    const currentCart = $cart.get();
    if (!currentCart?.id) return null;

    $isLoading.set(true);
    $error.set(null);

    try {
        const updatedCart = await removeFromCartApi(currentCart.id, lineId);
        $cart.set(updatedCart);
        $isLoading.set(false);
        return updatedCart;
    } catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Failed to remove item";
        $error.set(message);
        $isLoading.set(false);
        throw error;
    }
}

// For backwards compatibility with existing event-based code
// These are now just aliases to the nanostore actions
export const emitCartOpen = openCart;
export const emitCartClose = closeCart;
export function getCartCache(): Cart | null {
    return $cart.get();
}

// Subscription helpers for non-React usage
export function subscribeToCartUpdates(
    callback: (cart: Cart | null) => void,
): () => void {
    return $cart.subscribe(callback);
}

export function subscribeToCartOpen(callback: () => void): () => void {
    return $isCartOpen.subscribe((isOpen) => {
        if (isOpen) callback();
    });
}

export function subscribeToCartClose(callback: () => void): () => void {
    return $isCartOpen.subscribe((isOpen) => {
        if (!isOpen) callback();
    });
}
