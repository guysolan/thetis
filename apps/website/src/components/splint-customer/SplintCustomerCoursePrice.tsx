"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { COURSE_VARIANTS } from "@/lib/shopify/products";
import { getVariantPrice } from "@/lib/shopify/storefront";
import {
  shoppingCountryToCurrencyBucket,
  useShoppingCountryCode,
} from "@/hooks/use-shopping-country-code";

const DISCOUNT_MULTIPLIER = 0.8;

const FALLBACK_PRICES: Record<
  "GBP" | "USD" | "EUR",
  { full: number; currency: string; locale: string }
> = {
  GBP: { full: 29.99, currency: "GBP", locale: "en-GB" },
  USD: { full: 39.99, currency: "USD", locale: "en-US" },
  EUR: { full: 29.99, currency: "EUR", locale: "en-IE" },
};

function formatMoney(amount: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

interface SplintCustomerCoursePriceProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function SplintCustomerCoursePrice({
  size = "sm",
  className,
}: SplintCustomerCoursePriceProps) {
  const countryCode = useShoppingCountryCode();
  const [fullFormatted, setFullFormatted] = useState<string | null>(null);
  const [discountedFormatted, setDiscountedFormatted] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    async function loadPrices() {
      const bucket = shoppingCountryToCurrencyBucket(countryCode);
      const fallback = FALLBACK_PRICES[bucket];

      try {
        const priceData = await getVariantPrice(
          COURSE_VARIANTS.ESSENTIALS,
          countryCode,
        );

        if (cancelled) return;

        if (priceData) {
          const fullAmount = parseFloat(priceData.amount);
          const discountedAmount = fullAmount * DISCOUNT_MULTIPLIER;
          setFullFormatted(priceData.formattedPrice);
          setDiscountedFormatted(
            formatMoney(
              discountedAmount,
              priceData.currencyCode,
              bucket === "GBP" ? "en-GB" : bucket === "EUR" ? "en-IE" : "en-US",
            ),
          );
          return;
        }
      } catch {
        /* fall through to static fallback */
      }

      if (cancelled) return;

      const discountedAmount = fallback.full * DISCOUNT_MULTIPLIER;
      setFullFormatted(
        formatMoney(fallback.full, fallback.currency, fallback.locale),
      );
      setDiscountedFormatted(
        formatMoney(discountedAmount, fallback.currency, fallback.locale),
      );
    }

    void loadPrices();

    return () => {
      cancelled = true;
    };
  }, [countryCode]);

  if (!fullFormatted || !discountedFormatted) {
    return (
      <p
        className={cn(
          "text-neutral-400 animate-pulse",
          size === "lg" ? "text-base" : "text-sm",
          className,
        )}
      >
        Loading price…
      </p>
    );
  }

  return (
    <p
      className={cn(
        "text-neutral-900 dark:text-neutral-100",
        size === "lg" ? "text-base" : "text-sm",
        className,
      )}
    >
      <span className="text-neutral-400 line-through">{fullFormatted}</span>
      {" "}
      <span className={cn("font-bold", size === "lg" ? "text-2xl" : "text-lg")}>
        {discountedFormatted}
      </span>
    </p>
  );
}
