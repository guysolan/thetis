"use client";

import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { Button } from "@thetis/ui/button";
import {
    $cartLines,
    $checkoutUrl,
    $isLoading,
    $subtotal,
    addToCart,
    closeCart,
} from "@/lib/shopify/cart-store";
import { formatPrice } from "@/lib/shopify/storefront";
import { getUpsellSuggestions, UPSELL_PRODUCTS } from "@/lib/shopify/products";
import {
    ArrowRight,
    Check,
    Loader2,
    ShoppingBag,
    Sparkles,
    X,
} from "lucide-react";

interface CheckoutUpsellProps {
    onContinueToCheckout: () => void;
    onClose: () => void;
}

export function CheckoutUpsell({
    onContinueToCheckout,
    onClose,
}: CheckoutUpsellProps) {
    const cartLines = useStore($cartLines);
    const subtotal = useStore($subtotal);
    const isLoading = useStore($isLoading);
    const [isAdding, setIsAdding] = useState(false);
    const [addedItems, setAddedItems] = useState<string[]>([]);

    // Get variant IDs from cart
    const cartVariantIds = cartLines.map((line) => line.merchandise.id);

    // Get upsell suggestions
    const upsellSuggestions = getUpsellSuggestions(cartVariantIds);

    // If no upsells, go straight to checkout
    if (upsellSuggestions.length === 0) {
        onContinueToCheckout();
        return null;
    }

    const handleAddItem = async (variantId: string) => {
        setIsAdding(true);
        try {
            // Don't open cart sheet when adding from checkout
            await addToCart(variantId, 1, false);
            setAddedItems((prev) => [...prev, variantId]);
        } catch (error) {
            console.error("Failed to add upsell item:", error);
        } finally {
            setIsAdding(false);
        }
    };

    const primaryUpsell = upsellSuggestions[0];
    const isSplintUpsell = primaryUpsell.variantId.includes("47494539"); // Splint variant IDs start with this

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-neutral-200 dark:border-neutral-700 border-b">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h2 className="font-bold text-neutral-900 dark:text-neutral-100 text-xl">
                            Complete Your Recovery
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-neutral-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                        {isSplintUpsell
                            ? "80% of Achilles patients struggle to sleep in their boot. Add our night splint for better rest during recovery."
                            : "Get the most out of your recovery with our comprehensive course. 31 lessons to guide you from injury to full strength."}
                    </p>

                    {/* Upsell Products */}
                    <div className="space-y-4">
                        {upsellSuggestions.map((product) => {
                            const isAdded = addedItems.includes(
                                product.variantId,
                            );

                            return (
                                <div
                                    key={product.variantId}
                                    className={`p-4 rounded-xl border-2 transition-all ${
                                        isAdded
                                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                            : "border-primary/30 bg-primary/5 hover:border-primary"
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex justify-center items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg w-20 h-20 shrink-0">
                                            <ShoppingBag className="w-8 h-8 text-neutral-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                                {product.title}
                                            </h3>
                                            <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm">
                                                {product.description}
                                            </p>
                                            <div className="flex justify-between items-center mt-3">
                                                <span className="font-bold text-primary text-lg">
                                                    {product.price}
                                                </span>
                                                {isAdded
                                                    ? (
                                                        <span className="flex items-center gap-1 font-medium text-green-600 text-sm">
                                                            <Check className="w-4 h-4" />
                                                            Added
                                                        </span>
                                                    )
                                                    : (
                                                        <Button
                                                            size="sm"
                                                            onClick={() =>
                                                                handleAddItem(
                                                                    product
                                                                        .variantId,
                                                                )}
                                                            disabled={isAdding ||
                                                                !product
                                                                    .canAddToCart}
                                                        >
                                                            {isAdding
                                                                ? (
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                )
                                                                : (
                                                                    "Add to Order"
                                                                )}
                                                        </Button>
                                                    )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Benefits */}
                                    {!isAdded && product === primaryUpsell && (
                                        <div className="mt-4 pt-4 border-primary/20 border-t">
                                            <ul className="space-y-2">
                                                {isSplintUpsell
                                                    ? (
                                                        <>
                                                            <li className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm">
                                                                <Check className="w-4 h-4 text-primary shrink-0" />
                                                                Sleep
                                                                comfortably
                                                                without the
                                                                heavy boot
                                                            </li>
                                                            <li className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm">
                                                                <Check className="w-4 h-4 text-primary shrink-0" />
                                                                Shower safely
                                                                with protection
                                                            </li>
                                                            <li className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm">
                                                                <Check className="w-4 h-4 text-primary shrink-0" />
                                                                Trusted by
                                                                5,000+ patients
                                                            </li>
                                                        </>
                                                    )
                                                    : (
                                                        <>
                                                            <li className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm">
                                                                <Check className="w-4 h-4 text-primary shrink-0" />
                                                                31 structured
                                                                lessons
                                                            </li>
                                                            <li className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm">
                                                                <Check className="w-4 h-4 text-primary shrink-0" />
                                                                Boot comparison
                                                                guide
                                                            </li>
                                                            <li className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm">
                                                                <Check className="w-4 h-4 text-primary shrink-0" />
                                                                Week-by-week
                                                                timeline
                                                            </li>
                                                        </>
                                                    )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 border-neutral-200 dark:border-neutral-700 border-t rounded-b-2xl">
                    {/* Updated subtotal */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-neutral-600 dark:text-neutral-400">
                            Order Total
                        </span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 text-xl">
                            {subtotal
                                ? formatPrice(
                                    subtotal.amount,
                                    subtotal.currencyCode,
                                )
                                : "£0.00"}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={onContinueToCheckout}
                            size="lg"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? (
                                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                                )
                                : (
                                    <ArrowRight className="mr-2 w-5 h-5" />
                                )}
                            Continue to Checkout
                        </Button>

                        <button
                            onClick={onClose}
                            className="w-full text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 text-sm text-center underline underline-offset-2"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutUpsell;

