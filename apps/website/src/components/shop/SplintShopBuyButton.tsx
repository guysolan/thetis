"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@thetis/ui/button";
import AddToCartButton from "@/components/cart/AddToCartButton";
import {
  isShopifyHostedSplintUrl,
  splintMatrixUrl,
  splintPurchaseRegionFromCountryCode,
} from "@thetis/catalogue";
import type { SplintVariantId } from "@thetis/catalogue";
import {
  getCountryCodeForPricing,
  SHOPPING_COUNTRY_CHANGE_EVENT,
} from "@/lib/shopping-country";
import { cn } from "@/lib/utils";
import { ExternalLink, Loader2 } from "lucide-react";

export interface SplintShopBuyButtonProps {
  variantId: string;
  splintVariant?: SplintVariantId;
  size?: "default" | "sm" | "lg" | "xl";
  className?: string;
  addToCartLabel: React.ReactNode;
  externalBuyLabel: React.ReactNode;
}

export default function SplintShopBuyButton({
  variantId,
  splintVariant = "LL",
  size = "lg",
  className,
  addToCartLabel,
  externalBuyLabel,
}: SplintShopBuyButtonProps) {
  const [loading, setLoading] = useState(true);
  const [useShopify, setUseShopify] = useState(true);
  const [externalHref, setExternalHref] = useState<string | null>(null);

  const sync = useCallback(async () => {
    setLoading(true);
    try {
      const country = await getCountryCodeForPricing();
      const href = splintMatrixUrl(
        splintPurchaseRegionFromCountryCode(country),
        splintVariant,
      );
      const shopify = isShopifyHostedSplintUrl(href);
      setUseShopify(shopify);
      setExternalHref(shopify ? null : href);
    } finally {
      setLoading(false);
    }
  }, [splintVariant]);

  useEffect(() => {
    sync();
    window.addEventListener(SHOPPING_COUNTRY_CHANGE_EVENT, sync);
    return () =>
      window.removeEventListener(SHOPPING_COUNTRY_CHANGE_EVENT, sync);
  }, [sync]);

  if (loading) {
    return (
      <Button disabled size={size} className={cn("gap-2", className)}>
        <Loader2 className="w-5 h-5 animate-spin shrink-0" aria-hidden />
        <span className="sr-only">Loading</span>
      </Button>
    );
  }

  if (useShopify) {
    return (
      <AddToCartButton
        variantId={variantId}
        size={size}
        className={className}
      >
        {addToCartLabel}
      </AddToCartButton>
    );
  }

  if (!externalHref) {
    return (
      <Button disabled size={size} className={className}>
        {externalBuyLabel}
      </Button>
    );
  }

  return (
    <Button asChild size={size} className={cn("gap-2", className)}>
      <a href={externalHref} target="_blank" rel="noopener noreferrer">
        {externalBuyLabel}
        <ExternalLink className="opacity-90 w-4 h-4 shrink-0" aria-hidden />
      </a>
    </Button>
  );
}
