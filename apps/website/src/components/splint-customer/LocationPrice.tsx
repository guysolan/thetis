"use client";

import { useLocationCurrency } from "@/hooks/use-location-currency";
import { cn } from "@thetis/ui/cn";

interface LocationPriceProps {
    gbp: number;
    usd: number;
    className?: string;
}

/**
 * Renders a cashback/claim amount in £ (GBP) or $ (USD) based on visitor location.
 * Used on splint-customer pages (share-doctor, review, claim-cashback).
 */
export default function LocationPrice(
    { gbp, usd, className }: LocationPriceProps,
) {
    const currency = useLocationCurrency();
    const amount = currency === "GBP" ? gbp : usd;
    const formatted = currency === "GBP" ? `£${amount}` : `$${amount}`;
    return <span className={cn(className, "font-bold")}>{formatted}</span>;
}
