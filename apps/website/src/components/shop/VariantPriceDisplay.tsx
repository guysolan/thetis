"use client";

import { useVariantPrice } from "@/hooks/use-variant-price";
import { cn } from "@/lib/utils";

interface VariantPriceDisplayProps {
  variantId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
};

export function VariantPriceDisplay({
  variantId,
  size = "lg",
  className,
}: VariantPriceDisplayProps) {
  const { formattedPrice, isLoading } = useVariantPrice(variantId);

  if (isLoading) {
    return (
      <div
        className={cn(
          "animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-md w-28 h-9",
          className,
        )}
      />
    );
  }

  return (
    <p
      className={cn(
        "font-bold text-neutral-900 dark:text-neutral-100",
        sizeClasses[size],
        className,
      )}
    >
      {formattedPrice ?? "—"}
    </p>
  );
}

export default VariantPriceDisplay;
