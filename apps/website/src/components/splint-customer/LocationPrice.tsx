"use client";

import { cn } from "@thetis/ui/cn";
import {
  shoppingCountryToCurrencyBucket,
  useShoppingCountryCode,
} from "@/hooks/use-shopping-country-code";

interface LocationPriceProps {
  gbp: number;
  usd: number;
  eur?: number;
  className?: string;
}

/**
 * Cashback/claim amount in £, $, or € based on the shop region switcher
 * (stored shopping country, with geo-detect on first visit).
 */
export default function LocationPrice({
  gbp,
  usd,
  eur = gbp,
  className,
}: LocationPriceProps) {
  const countryCode = useShoppingCountryCode();
  const bucket = shoppingCountryToCurrencyBucket(countryCode);
  const amount = bucket === "USD" ? usd : bucket === "EUR" ? eur : gbp;
  const formatted = bucket === "USD"
    ? `$${amount}`
    : bucket === "EUR"
    ? `€${amount}`
    : `£${amount}`;

  return <span className={cn(className, "font-bold")}>{formatted}</span>;
}
