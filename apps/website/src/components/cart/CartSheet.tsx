import React, { useEffect, useMemo, useState } from "react";
import { useStore } from "@nanostores/react";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@thetis/ui/sheet";
import { Button } from "@thetis/ui/button";
import {
    $cart,
    $cartCount,
    $cartLines,
    $checkoutUrl,
    $isCartOpen,
    $isLoading,
    $subtotal,
    addToCart,
    closeCart,
    initializeCart,
    removeItem,
    updateQuantity,
} from "@/lib/shopify/cart-store";
import { formatPrice } from "@/lib/shopify/storefront";
import { getUpsellSuggestions } from "@/lib/shopify/products";
import { Loader2, Minus, Plus, ShoppingBag, Sparkles, X } from "lucide-react";
import { PaymentIcons } from "@/components/PaymentIcons";

export function CartSheet() {
    const cart = useStore($cart);
    const isOpen = useStore($isCartOpen);
    const isLoading = useStore($isLoading);
    const cartLines = useStore($cartLines);
    const totalQuantity = useStore($cartCount);
    const subtotal = useStore($subtotal);
    const checkoutUrl = useStore($checkoutUrl);

    // Get variant IDs from cart for upsell logic
    const cartVariantIds = useMemo(
        () => cartLines.map((line) => line.merchandise.id),
        [cartLines],
    );

    const upsellSuggestions = useMemo(
        () => getUpsellSuggestions(cartVariantIds),
        [cartVariantIds],
    );

    useEffect(() => {
        initializeCart();
    }, []);

    const handleClose = () => {
        closeCart();
    };

    const handleCheckoutClick = () => {
        // If there are no upsell suggestions, go straight to Shopify checkout
        // Otherwise, go to the confirm page where user can add/remove items
        closeCart();
        if (upsellSuggestions.length === 0) {
            proceedToCheckout();
        } else {
            window.location.href = "/checkout";
        }
    };

    const proceedToCheckout = () => {
        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <SheetContent
                side="right"
                className="flex flex-col w-full sm:max-w-md"
            >
                <SheetHeader className="pb-4 border-b">
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Your Cart
                        {totalQuantity > 0 && (
                            <span className="bg-primary px-2 py-0.5 rounded-full font-medium text-white text-xs">
                                {totalQuantity}
                            </span>
                        )}
                    </SheetTitle>
                    {cartLines.length > 0 && (
                        <p className="mt-3 font-medium text-neutral-600 dark:text-neutral-400 text-sm">
                            Your items aren't reserved, checkout quickly to make
                            sure you don't miss out.
                        </p>
                    )}
                </SheetHeader>

                {isLoading && !cart
                    ? (
                        <div className="flex flex-1 justify-center items-center">
                            <div className="border-primary border-b-2 rounded-full w-8 h-8 animate-spin" />
                        </div>
                    )
                    : cartLines.length === 0
                    ? (
                        <div className="flex flex-col flex-1 justify-center items-center p-8 text-center">
                            <ShoppingBag className="mb-4 w-16 h-16 text-neutral-300" />
                            <h3 className="mb-2 font-semibold text-lg">
                                Your cart is empty
                            </h3>
                            <p className="mb-6 text-neutral-500 text-sm">
                                Add items to your cart to see them here.
                            </p>
                            <Button onClick={handleClose} variant="outline">
                                Continue Shopping
                            </Button>
                        </div>
                    )
                    : (
                        <>
                            {/* Cart Items */}
                            <div className="flex-1 space-y-4 py-4 overflow-y-auto">
                                {cartLines.map((line) => (
                                    <CartLineItem
                                        key={line.id}
                                        line={line}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeItem}
                                    />
                                ))}

                                {/* Upsell Suggestions */}
                                {upsellSuggestions.length > 0 && (
                                    <div className="pt-4 border-neutral-200 border-t">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                            <span className="font-medium text-neutral-700 text-sm">
                                                Complete your recovery
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            {upsellSuggestions.map((
                                                product,
                                            ) => (
                                                <UpsellItem
                                                    key={product.variantId}
                                                    product={product}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <SheetFooter className="pt-6 border-neutral-200 dark:border-neutral-700 border-t">
                                <div className="space-y-4 w-full">
                                    {/* Satisfaction Guarantee and Free Shipping */}
                                    <div className="space-y-2 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 rounded-lg">
                                        <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm text-center">
                                            100% Satisfaction Guarantee Or Your
                                            Money Back!
                                        </p>
                                        <p className="font-medium text-primary text-sm text-center">
                                            ✓ Free shipping included
                                        </p>
                                        <p className="font-bold text-primary text-sm text-center">
                                            5,000+ Patients Trust Thetis
                                        </p>
                                    </div>

                                    {/* Total */}
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-medium text-neutral-600 dark:text-neutral-400">
                                            Total
                                        </span>
                                        <span className="font-bold text-neutral-900 dark:text-neutral-100 text-2xl">
                                            {subtotal
                                                ? formatPrice(
                                                    subtotal.amount,
                                                    subtotal.currencyCode,
                                                )
                                                : "£0.00"}
                                        </span>
                                    </div>

                                    {/* Checkout and Continue Shopping buttons */}
                                    <div className="flex flex-col gap-3">
                                        <Button
                                            onClick={handleCheckoutClick}
                                            size="lg"
                                            className="w-full"
                                        >
                                            Checkout
                                        </Button>
                                        <button
                                            onClick={handleClose}
                                            className="py-2 w-full text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 text-sm text-center underline underline-offset-2"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>

                                    {/* Payment Icons */}
                                    <div className="py-2">
                                        <PaymentIcons className="justify-center" />
                                    </div>
                                </div>
                            </SheetFooter>
                        </>
                    )}
            </SheetContent>
        </Sheet>
    );
}

interface CartLineItemProps {
    line: {
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
    };
    onUpdateQuantity: (lineId: string, quantity: number) => Promise<unknown>;
    onRemove: (lineId: string) => Promise<unknown>;
}

function CartLineItem({ line, onUpdateQuantity, onRemove }: CartLineItemProps) {
    const [isUpdating, setIsUpdating] = React.useState(false);

    const handleQuantityChange = async (newQuantity: number) => {
        if (newQuantity < 0) return;
        setIsUpdating(true);
        try {
            if (newQuantity === 0) {
                // Remove item when quantity reaches 0
                await onRemove(line.id);
            } else {
                await onUpdateQuantity(line.id, newQuantity);
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRemove = async () => {
        setIsUpdating(true);
        try {
            await onRemove(line.id);
        } finally {
            setIsUpdating(false);
        }
    };

    const variantTitle = line.merchandise.title !== "Default Title"
        ? line.merchandise.title
        : "";

    const lineTotal = (
        parseFloat(line.merchandise.price.amount) * line.quantity
    ).toFixed(2);

    return (
        <div
            className={`flex gap-4 p-3 bg-neutral-50 rounded-lg ${
                isUpdating ? "opacity-50" : ""
            }`}
        >
            {/* Product Image */}
            {line.merchandise.product.featuredImage?.url
                ? (
                    <img
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.featuredImage.altText ||
                            line.merchandise.product.title}
                        className="border border-neutral-200 rounded-md w-20 h-20 object-cover"
                    />
                )
                : (
                    <div className="flex justify-center items-center bg-neutral-200 rounded-md w-20 h-20">
                        <ShoppingBag className="w-8 h-8 text-neutral-400" />
                    </div>
                )}

            {/* Product Details */}
            <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-medium text-sm line-clamp-1">
                            {line.merchandise.product.title}
                        </h4>
                        {variantTitle && (
                            <p className="text-neutral-500 text-xs">
                                {variantTitle}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleRemove}
                        disabled={isUpdating}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex justify-between items-center mt-auto pt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-md">
                        <button
                            onClick={() =>
                                handleQuantityChange(line.quantity - 1)}
                            disabled={isUpdating}
                            className="hover:bg-neutral-100 disabled:opacity-50 p-1.5 transition-colors disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 font-medium text-sm text-center">
                            {line.quantity}
                        </span>
                        <button
                            onClick={() =>
                                handleQuantityChange(line.quantity + 1)}
                            disabled={isUpdating}
                            className="hover:bg-neutral-100 disabled:opacity-50 p-1.5 transition-colors disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Price */}
                    <span className="font-semibold">
                        {formatPrice(
                            lineTotal,
                            line.merchandise.price.currencyCode,
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

// Upsell item component
interface UpsellItemProps {
    product: {
        title: string;
        description: string;
        price: string;
        image?: string;
        href: string;
        variantId: string;
        canAddToCart?: boolean;
    };
}

function UpsellItem({ product }: UpsellItemProps) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = async () => {
        if (!product.canAddToCart) {
            // Close cart and navigate to product page
            closeCart();
            window.location.href = product.href;
            return;
        }

        setIsAdding(true);
        try {
            await addToCart(product.variantId, 1);
        } catch (error) {
            console.error("Failed to add upsell item:", error);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="flex items-center gap-3 bg-primary/5 hover:bg-primary/10 p-3 border border-primary/20 rounded-lg transition-colors">
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-neutral-900 text-sm truncate">
                    {product.title}
                </h4>
                <p className="text-neutral-500 text-xs truncate">
                    {product.description}
                </p>
                <span className="font-semibold text-primary text-sm">
                    {product.price}
                </span>
            </div>
            <Button
                size="sm"
                variant="outline"
                onClick={handleAdd}
                disabled={isAdding}
                className="hover:bg-primary border-primary text-primary hover:text-white shrink-0"
            >
                {isAdding
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : product.canAddToCart
                    ? (
                        "Add"
                    )
                    : (
                        "View"
                    )}
            </Button>
        </div>
    );
}

export default CartSheet;
