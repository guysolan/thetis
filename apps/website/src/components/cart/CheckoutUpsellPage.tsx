"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { Button } from "@thetis/ui/button";
import {
    $cartLines,
    $checkoutUrl,
    $isLoading,
    $subtotal,
    addToCart,
    initializeCart,
    removeItem,
} from "@/lib/shopify/cart-store";
import { formatPrice } from "@/lib/shopify/storefront";
import { useVariantPrice } from "@/hooks/use-variant-price";
import { getUpsellSuggestions } from "@/lib/shopify/products";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@thetis/ui/accordion";
import { courseData } from "@/lib/course-data";
import { cn } from "@/lib/utils";
import {
    ArrowRight,
    Check,
    Loader2,
    Lock,
    Shield,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Video,
    X,
} from "lucide-react";
import TrustClaims from "../TrustClaims";
import { PaymentIcons } from "../PaymentIcons";

export function CheckoutUpsellPage() {
    const cartLines = useStore($cartLines);
    const subtotal = useStore($subtotal);
    const isLoading = useStore($isLoading);
    const checkoutUrl = useStore($checkoutUrl);
    const [isAdding, setIsAdding] = useState(false);
    const [addedItems, setAddedItems] = useState<string[]>([]);
    const [isRemoving, setIsRemoving] = useState<string | null>(null);

    useEffect(() => {
        initializeCart();
    }, []);

    // Get variant IDs from cart
    const cartVariantIds = cartLines.map((line) => line.merchandise.id);

    // Get upsell suggestions (filter out premium course - coming soon)
    const upsellSuggestions = getUpsellSuggestions(cartVariantIds).filter(
        (product) =>
            product.variantId !== "gid://shopify/ProductVariant/52265315828040",
    );

    // If no cart, redirect to home
    useEffect(() => {
        if (isLoading) return;

        const timer = setTimeout(() => {
            if (cartLines.length === 0) {
                window.location.href = "/";
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [cartLines.length, isLoading]);

    const handleAddItem = async (variantId: string) => {
        setIsAdding(true);
        try {
            // Don't open cart sheet when adding from checkout page
            await addToCart(variantId, 1, false);
            setAddedItems((prev) => [...prev, variantId]);
        } catch (error) {
            console.error("Failed to add upsell item:", error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleContinueToCheckout = () => {
        if (checkoutUrl) {
            // Apply discount code if available (for Amazon customers)
            const discountCode = sessionStorage.getItem("amazonDiscountCode");
            if (discountCode) {
                try {
                    const url = new URL(checkoutUrl);
                    url.searchParams.set("discount", discountCode);
                    window.location.href = url.toString();
                    return;
                } catch {
                    // If URL parsing fails, use original URL
                }
            }
            window.location.href = checkoutUrl;
        }
    };

    const handleContinueShopping = () => {
        window.location.href = "/achilles-rupture-splint";
    };

    const handleRemoveItem = async (lineId: string) => {
        setIsRemoving(lineId);
        try {
            await removeItem(lineId);
        } catch (error) {
            console.error("Failed to remove item:", error);
        } finally {
            setIsRemoving(null);
        }
    };

    const primaryUpsell = upsellSuggestions.length > 0
        ? upsellSuggestions[0]
        : null;
    const isSplintUpsell = primaryUpsell
        ? primaryUpsell.variantId.includes("47494539")
        : false; // Splint variant IDs start with this

    return (
        <main className="bg-neutral-50 dark:bg-neutral-900 px-4 py-12 min-h-screen">
            <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <ShoppingBag className="w-6 h-6 text-primary" />
                        <h1 className="font-bold text-neutral-900 dark:text-neutral-100 text-3xl">
                            Review Your Order
                        </h1>
                    </div>
                    <p className="mx-auto max-w-xl text-neutral-600 dark:text-neutral-400 text-lg">
                        Review your items below and add any additional products
                        before checkout.
                    </p>
                </div>

                {/* Current Cart Items */}
                <div className="space-y-3 mb-8">
                    <h2 className="mb-4 font-semibold text-neutral-900 dark:text-neutral-100 text-xl">
                        Your Cart
                    </h2>
                    {cartLines.map((line) => {
                        const lineTotal = (
                            parseFloat(line.merchandise.price.amount) *
                            line.quantity
                        ).toFixed(2);
                        const variantTitle = line.merchandise.title !==
                                "Default Title"
                            ? line.merchandise.title
                            : "";

                        return (
                            <div
                                key={line.id}
                                className="flex justify-between items-start gap-4 bg-white dark:bg-neutral-800 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                            >
                                {/* Product Image */}
                                {line.merchandise.product.featuredImage?.url
                                    ? (
                                        <img
                                            src={line.merchandise.product
                                                .featuredImage.url}
                                            alt={line.merchandise.product
                                                .featuredImage.altText ||
                                                line.merchandise.product.title}
                                            className="border border-neutral-200 dark:border-neutral-700 rounded-md w-20 h-20 object-cover shrink-0"
                                        />
                                    )
                                    : (
                                        <div className="flex justify-center items-center bg-neutral-200 dark:bg-neutral-700 rounded-md w-20 h-20 shrink-0">
                                            <ShoppingBag className="w-8 h-8 text-neutral-400" />
                                        </div>
                                    )}

                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                                        {line.merchandise.product.title}
                                    </p>
                                    {variantTitle && (
                                        <p className="mt-0.5 text-neutral-500 dark:text-neutral-400 text-xs">
                                            {variantTitle}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-4 mt-2">
                                        <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                                            Qty: {line.quantity}
                                        </p>
                                        <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                                            {formatPrice(
                                                lineTotal,
                                                line.merchandise.price
                                                    .currencyCode,
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(line.id)}
                                    disabled={isRemoving === line.id}
                                    className="disabled:opacity-50 p-2 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors shrink-0"
                                    aria-label="Remove item"
                                >
                                    {isRemoving === line.id
                                        ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        )
                                        : <X className="w-4 h-4" />}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Upsell Products */}
                {upsellSuggestions.length > 0 && (
                    <div className="mb-8">
                        <h2 className="mb-4 font-semibold text-neutral-900 dark:text-neutral-100 text-xl">
                            Recommended Additions
                        </h2>
                        <div className="space-y-4">
                            {upsellSuggestions.map((product) => {
                                const isAdded = addedItems.includes(
                                    product.variantId,
                                );
                                const isCourse = product.variantId.includes(
                                    "522653",
                                );

                                return (
                                    <UpsellProductCard
                                        key={product.variantId}
                                        product={product}
                                        isAdded={isAdded}
                                        isCourse={isCourse}
                                        isPrimaryUpsell={product ===
                                            primaryUpsell}
                                        isSplintUpsell={isSplintUpsell}
                                        onAdd={() =>
                                            handleAddItem(product.variantId)}
                                        isAdding={isAdding}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Order Summary & Actions */}
                <div className="bg-white dark:bg-neutral-800 shadow-sm p-6 border border-neutral-200 dark:border-neutral-700 rounded-xl">
                    {/* Order Total */}
                    <div className="flex justify-between items-center mb-6 pb-6 border-neutral-200 dark:border-neutral-700 border-b">
                        <span className="font-medium text-neutral-600 dark:text-neutral-400 text-lg">
                            Order Total
                        </span>
                        <span className="font-bold text-neutral-800 dark:text-neutral-100 text-xl">
                            {subtotal
                                ? formatPrice(
                                    subtotal.amount,
                                    subtotal.currencyCode,
                                )
                                : "£0.00"}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-6">
                        {/* Trust Badges */}

                        <Button
                            onClick={handleContinueToCheckout}
                            size="lg"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? (
                                    <>
                                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                                        Loading...
                                    </>
                                )
                                : (
                                    <>
                                        Continue to Checkout
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </>
                                )}
                        </Button>

                        <PaymentIcons className="justify-center" />
                    </div>
                </div>

                <TrustClaims className="mt-6" variant="expanded" />
            </div>
        </main>
    );
}

// Upsell Product Card Component with Shopify API price fetching
interface UpsellProductCardProps {
    product: {
        title: string;
        description: string;
        price: string | null; // Fetched dynamically via useVariantPrice hook
        image?: string;
        href: string;
        variantId: string;
        canAddToCart?: boolean;
    };
    isAdded: boolean;
    isCourse: boolean;
    isPrimaryUpsell: boolean;
    isSplintUpsell: boolean;
    onAdd: () => void;
    isAdding: boolean;
}

function UpsellProductCard({
    product,
    isAdded,
    isCourse,
    isPrimaryUpsell,
    isSplintUpsell,
    onAdd,
    isAdding,
}: UpsellProductCardProps) {
    // Fetch price from Shopify API using hook (same pattern as BuyButtonVariants/useShopifyPrice)
    const { formattedPrice, isLoading: isLoadingPrice } = useVariantPrice(
        product.variantId,
        product.price || undefined,
    );

    const isEssentials = product.variantId.includes("52265314353480");
    const isProfessionals = product.variantId.includes("52265315828040");
    const courseType = isEssentials
        ? "standard"
        : isProfessionals
        ? "premium"
        : null;
    const course = courseType ? courseData[courseType] : null;

    return (
        <div
            className={`p-6 rounded-xl border-2 transition-all bg-white dark:bg-neutral-800 ${
                isAdded
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-primary/30 hover:border-primary shadow-sm"
            }`}
        >
            <div className="flex items-start gap-4">
                <div className="flex justify-center items-center bg-neutral-100 dark:bg-neutral-700 rounded-lg w-24 h-24 shrink-0">
                    <ShoppingBag className="w-10 h-10 text-neutral-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                        {product.title}
                    </h3>
                    <p className="mb-4 text-neutral-500 dark:text-neutral-400 text-sm">
                        {product.description}
                    </p>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-primary text-xl">
                            {isLoadingPrice
                                ? (
                                    <span className="inline-flex items-center gap-1">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Loading...
                                    </span>
                                )
                                : formattedPrice || product.price}
                        </span>
                        {isAdded
                            ? (
                                <span className="flex items-center gap-2 font-medium text-green-600 dark:text-green-400">
                                    <Check className="w-5 h-5" />
                                    Added to Order
                                </span>
                            )
                            : (
                                <Button
                                    size="default"
                                    onClick={onAdd}
                                    disabled={isAdding || !product.canAddToCart}
                                >
                                    {isAdding
                                        ? (
                                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                        )
                                        : null}
                                    Add to Order
                                </Button>
                            )}
                    </div>
                    {/* Course Info Accordion */}
                    {isCourse && course && (
                        <Accordion
                            type="single"
                            collapsible
                            className="mt-2 w-full"
                        >
                            <AccordionItem
                                value="course-info"
                                className="border-none"
                            >
                                <AccordionTrigger className="py-2 font-medium text-primary text-sm hover:no-underline">
                                    Learn more about this course
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-0">
                                    <div className="space-y-4">
                                        {/* Description */}
                                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                            {course.description}
                                        </p>

                                        {/* Features */}
                                        <div>
                                            <h5 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                                                What's Included
                                            </h5>
                                            <div className="space-y-1.5">
                                                {course.features.map((
                                                    feature,
                                                    index,
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-2"
                                                    >
                                                        <Check className="mt-0.5 w-3.5 h-3.5 text-primary shrink-0" />
                                                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* What You'll Learn (Standard) or Video Topics (Premium) */}
                                        {courseType === "standard" &&
                                            "whatYoullLearn" in course &&
                                            course.whatYoullLearn && (
                                            <div>
                                                <h5 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                                                    What You'll Learn
                                                </h5>
                                                <div className="space-y-2">
                                                    {course.whatYoullLearn.map((
                                                        item: {
                                                            title: string;
                                                            description: string;
                                                        },
                                                        index: number,
                                                    ) => (
                                                        <div
                                                            key={index}
                                                            className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded text-sm"
                                                        >
                                                            <h6 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                                                                {item.title}
                                                            </h6>
                                                            <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                                                                {item
                                                                    .description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {courseType === "premium" &&
                                            "videoTopics" in course &&
                                            course.videoTopics && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Video className="w-4 h-4 text-primary" />
                                                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                                                        Expert Video Lessons
                                                    </h5>
                                                </div>
                                                <div className="space-y-2">
                                                    {course.videoTopics.map((
                                                        topic: {
                                                            title: string;
                                                            description: string;
                                                        },
                                                        index: number,
                                                    ) => (
                                                        <div
                                                            key={index}
                                                            className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded text-sm"
                                                        >
                                                            <h6 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                                                                {topic.title}
                                                            </h6>
                                                            <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                                                                {topic
                                                                    .description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )}
                </div>
            </div>

            {/* Benefits */}
            {!isAdded && isPrimaryUpsell && (
                <div className="mt-6 pt-6 border-primary/20 border-t">
                    <ul className="space-y-3">
                        {isSplintUpsell
                            ? (
                                <>
                                    <li className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                                        <Check className="w-5 h-5 text-primary shrink-0" />
                                        Sleep comfortably without the heavy boot
                                    </li>
                                    <li className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                                        <Check className="w-5 h-5 text-primary shrink-0" />
                                        Shower safely with protection
                                    </li>
                                    <li className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                                        <Check className="w-5 h-5 text-primary shrink-0" />
                                        Trusted by 5,000+ patients
                                    </li>
                                </>
                            )
                            : (
                                <>
                                    <li className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                                        <Check className="w-5 h-5 text-primary shrink-0" />
                                        31 structured lessons
                                    </li>
                                    <li className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                                        <Check className="w-5 h-5 text-primary shrink-0" />
                                        Boot comparison guide
                                    </li>
                                    <li className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                                        <Check className="w-5 h-5 text-primary shrink-0" />
                                        Week-by-week timeline
                                    </li>
                                </>
                            )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CheckoutUpsellPage;
