"use client";

import React from "react";
import { useShopifyPrice } from "@/hooks/use-shopify-price";
import { retailPricing } from "@/data/splintPricing";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
    size?: "sm" | "md" | "lg" | "xl";
    showFreeShipping?: boolean;
    className?: string;
    variant?: "default" | "badge" | "inline";
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
    size = "md",
    showFreeShipping = true,
    className,
    variant = "default",
}) => {
    const { formattedPrice, isLoading } = useShopifyPrice();

    const sizeClasses = {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
    };

    if (isLoading) {
        return (
            <div className={cn("animate-pulse", className)}>
                <div
                    className={cn(
                        "bg-neutral-200 dark:bg-neutral-700 rounded w-20 h-8",
                        size === "sm" && "h-6 w-16",
                        size === "lg" && "h-10 w-24",
                        size === "xl" && "h-12 w-28",
                    )}
                />
            </div>
        );
    }

    if (variant === "badge") {
        return (
            <span
                className={cn(
                    "inline-flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full font-semibold text-primary text-sm",
                    className,
                )}
            >
                {formattedPrice}
                {showFreeShipping && (
                    <span className="text-primary/70 text-xs">
                        + Free Shipping
                    </span>
                )}
            </span>
        );
    }

    if (variant === "inline") {
        return (
            <span className={cn("font-medium text-primary", className)}>
                {formattedPrice}
            </span>
        );
    }

    return (
        <div className={cn("flex flex-col", className)}>
            <div className="flex items-baseline gap-2">
                <span
                    className={cn(
                        "font-bold text-neutral-900 dark:text-neutral-100",
                        sizeClasses[size],
                    )}
                >
                    {formattedPrice}
                </span>
            </div>
            {showFreeShipping && (
                <span className="mt-2 font-medium text-primary text-sm">
                    Free Shipping in the UK and US
                </span>
            )}
        </div>
    );
};

// Static version for SSR (shows UK price by default)
export const StaticPriceDisplay: React.FC<{
    region?: "UK" | "US";
    size?: "sm" | "md" | "lg" | "xl";
    showFreeShipping?: boolean;
    className?: string;
}> = ({ region = "UK", size = "md", showFreeShipping = true, className }) => {
    const pricing = retailPricing[region];

    const sizeClasses = {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
    };

    return (
        <div className={cn("flex flex-col", className)}>
            <div className="flex items-baseline gap-2">
                <span
                    className={cn(
                        "font-bold text-neutral-900 dark:text-neutral-100",
                        sizeClasses[size],
                    )}
                >
                    {pricing.formatted}
                </span>
            </div>
            {showFreeShipping && (
                <span className="font-medium text-primary dark:text-primary/80 text-sm">
                    Free Shipping in the UK and US
                </span>
            )}
        </div>
    );
};

export default PriceDisplay;
