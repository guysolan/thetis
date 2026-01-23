"use client";

import React from "react";
import { Button } from "@thetis/ui/button";
import { ArrowRight, Mail, ShoppingBag, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { addToCart } from "@/lib/shopify/cart-store";
import { Loader2 } from "lucide-react";
import type { Lang } from "@/config/languages";
import { useVariantPrice } from "@/hooks/use-variant-price";
import { useShopifyPrice } from "@/hooks/use-shopify-price";

interface BundlesAndRecommendationsProps {
    lang?: Lang;
}

const content = {
    en: {
        bundles: {
            title: "Complete Recovery Bundle",
            description: "Everything you need for a comfortable recovery",
        },
        frequentlyBought: {
            title: "Frequently Bought Together",
            description: "Complete your recovery kit",
        },
    },
};

export function BundlesAndRecommendations({
    lang = "en",
}: BundlesAndRecommendationsProps) {
    const t = lang in content
        ? content[lang as keyof typeof content]
        : content.en;
    const [isAdding, setIsAdding] = React.useState<string | null>(null);

    // Fetch prices dynamically
    const courseVariantId = "gid://shopify/ProductVariant/52265314353480";
    const splintVariantId = "gid://shopify/ProductVariant/47494539673928";
    const { formattedPrice: coursePrice, isLoading: coursePriceLoading } =
        useVariantPrice(courseVariantId);
    const { formattedPrice: splintPrice, isLoading: splintPriceLoading } =
        useVariantPrice(splintVariantId);

    // Calculate bundle price (splint + course)
    const bundlePrice = React.useMemo(() => {
        if (!splintPrice || !coursePrice) return null;
        // Parse prices and add them
        const splintAmount = parseFloat(splintPrice.replace(/[^0-9.]/g, ""));
        const courseAmount = parseFloat(coursePrice.replace(/[^0-9.]/g, ""));
        const total = splintAmount + courseAmount;

        // Format based on currency (assume same currency for both)
        const currency = splintPrice.includes("£") ? "GBP" : "USD";
        const symbol = currency === "GBP" ? "£" : "$";
        return `${symbol}${total.toFixed(2)}`;
    }, [splintPrice, coursePrice]);

    // Calculate original price (for strikethrough)
    const originalPrice = React.useMemo(() => {
        if (!bundlePrice) return null;
        const bundleAmount = parseFloat(bundlePrice.replace(/[^0-9.]/g, ""));
        const original = bundleAmount + 10; // Add £10/$10 for original price
        const currency = bundlePrice.includes("£") ? "£" : "$";
        return `${currency}${original.toFixed(2)}`;
    }, [bundlePrice]);

    const handleAddToCart = async (variantId: string) => {
        setIsAdding(variantId);
        try {
            await addToCart(variantId, 1);
        } catch (error) {
            console.error("Failed to add to cart:", error);
        } finally {
            setIsAdding(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Frequently Bought Together */}
            <section className="bg-neutral-50 dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-700 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                        {t.frequentlyBought.title}
                    </h3>
                </div>
                <p className="mb-4 text-neutral-600 dark:text-neutral-400 text-sm">
                    {t.frequentlyBought.description}
                </p>

                <div className="space-y-3">
                    {/* Essentials Course */}
                    <div className="flex items-center gap-4 bg-white dark:bg-neutral-800 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                        <div className="flex-shrink-0">
                            <div className="flex justify-center items-center bg-primary/10 rounded-lg w-12 h-12">
                                <ShoppingBag className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                                Recovery Course
                            </h4>
                            <p className="mt-0.5 text-neutral-500 dark:text-neutral-400 text-xs">
                                30+ lessons to guide your recovery
                            </p>
                            {coursePriceLoading
                                ? (
                                    <div className="bg-neutral-200 dark:bg-neutral-700 mt-1 rounded w-16 h-4 animate-pulse" />
                                )
                                : (
                                    <span className="inline-block mt-1 font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                                        {coursePrice || "—"}
                                    </span>
                                )}
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                                handleAddToCart(
                                    "gid://shopify/ProductVariant/52265314353480",
                                )}
                            disabled={isAdding ===
                                "gid://shopify/ProductVariant/52265314353480"}
                            className="shrink-0"
                        >
                            {isAdding ===
                                    "gid://shopify/ProductVariant/52265314353480"
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : (
                                    "Add"
                                )}
                        </Button>
                    </div>
                </div>
            </section>

            {/* Recovery Bundle */}
            <section className="bg-gradient-to-r from-primary/5 dark:from-primary/10 to-primary/10 dark:to-primary/20 p-6 border-2 border-primary/30 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                        {t.bundles.title}
                    </h3>
                </div>
                <p className="mb-4 text-neutral-600 dark:text-neutral-400 text-sm">
                    {t.bundles.description}
                </p>

                <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                        <span className="text-primary">✓</span>
                        <span>Night Splint</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                        <span className="text-primary">✓</span>
                        <span>Recovery Course</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        {splintPriceLoading || coursePriceLoading
                            ? (
                                <div className="bg-neutral-200 dark:bg-neutral-700 rounded w-24 h-6 animate-pulse" />
                            )
                            : bundlePrice
                            ? (
                                <>
                                    <span className="font-bold text-neutral-900 dark:text-neutral-100 text-xl">
                                        {bundlePrice}
                                    </span>
                                    {originalPrice && (
                                        <span className="ml-2 text-neutral-500 dark:text-neutral-400 text-sm line-through">
                                            {originalPrice}
                                        </span>
                                    )}
                                </>
                            )
                            : (
                                <span className="font-bold text-neutral-900 dark:text-neutral-100 text-xl">
                                    —
                                </span>
                            )}
                    </div>
                    <Button
                        size="sm"
                        onClick={() => {
                            // Add both to cart
                            handleAddToCart(
                                "gid://shopify/ProductVariant/47494539673928",
                            );
                            setTimeout(() => {
                                handleAddToCart(
                                    "gid://shopify/ProductVariant/52265314353480",
                                );
                            }, 500);
                        }}
                        disabled={!!isAdding}
                        className="shrink-0"
                    >
                        {isAdding
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : (
                                <>
                                    Add Bundle
                                    <ShoppingBag className="ml-2 w-4 h-4" />
                                </>
                            )}
                    </Button>
                </div>
            </section>
        </div>
    );
}
