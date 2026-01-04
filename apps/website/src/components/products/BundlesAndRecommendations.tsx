"use client";

import React from "react";
import { Button } from "@thetis/ui/button";
import { ArrowRight, Mail, ShoppingBag, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { addToCart } from "@/lib/shopify/cart-store";
import { Loader2 } from "lucide-react";
import type { Lang } from "@/config/languages";

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
        freeCourse: {
            title: "Free Recovery Email Course",
            description: "Week-by-week guidance timed to your injury",
            cta: "Get Free Course",
        },
    },
};

export function BundlesAndRecommendations({
    lang = "en",
}: BundlesAndRecommendationsProps) {
    const t = content[lang];
    const [isAdding, setIsAdding] = React.useState<string | null>(null);

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

    const handleEmailCourse = () => {
        window.location.href = "/course/emails";
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
                    {/* Free Email Course */}
                    <div className="flex items-center gap-4 bg-white dark:bg-neutral-800 p-4 border border-primary/20 rounded-lg">
                        <div className="flex-shrink-0">
                            <div className="flex justify-center items-center bg-primary/10 rounded-lg w-12 h-12">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                                {t.freeCourse.title}
                            </h4>
                            <p className="mt-0.5 text-neutral-500 dark:text-neutral-400 text-xs">
                                {t.freeCourse.description}
                            </p>
                            <span className="inline-block mt-1 font-semibold text-green-600 text-xs">
                                FREE
                            </span>
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleEmailCourse}
                            className="hover:bg-primary border-primary text-primary hover:text-white shrink-0"
                        >
                            {t.freeCourse.cta}
                            <ArrowRight className="ml-1 w-3 h-3" />
                        </Button>
                    </div>

                    {/* Essentials Course */}
                    <div className="flex items-center gap-4 bg-white dark:bg-neutral-800 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                        <div className="flex-shrink-0">
                            <div className="flex justify-center items-center bg-primary/10 rounded-lg w-12 h-12">
                                <ShoppingBag className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                                Recovery Essentials Course
                            </h4>
                            <p className="mt-0.5 text-neutral-500 dark:text-neutral-400 text-xs">
                                31 lessons to guide your recovery
                            </p>
                            <span className="inline-block mt-1 font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                                £29.99
                            </span>
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
                        <span>Recovery Essentials Course</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                        <span className="text-primary">✓</span>
                        <span>Free Email Course</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 text-xl">
                            £99.98
                        </span>
                        <span className="ml-2 text-neutral-500 dark:text-neutral-400 text-sm line-through">
                            £109.98
                        </span>
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
