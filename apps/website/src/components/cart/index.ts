export { CartSheet } from "./CartSheet";
export { CartIcon } from "./CartIcon";
export { AddToCartButton } from "./AddToCartButton";
export { CheckoutUpsell } from "./CheckoutUpsell";

// Re-export cart store actions and state
export {
    // State atoms
    $cart,
    $cartCount,
    $cartLines,
    $checkoutUrl,
    $error,
    $isCartOpen,
    $isLoading,
    $subtotal,
    // Actions
    addToCart,
    closeCart,
    emitCartClose,
    // Legacy compatibility
    emitCartOpen,
    getCartCache,
    initializeCart,
    openCart,
    removeItem,
    toggleCart,
    updateQuantity,
} from "@/lib/shopify/cart-store";
