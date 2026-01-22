import React, { useState } from "react";
import { AddToCartButton } from "@/components/cart";
import { Button } from "@thetis/ui/button";
import WhatSizeAmI from "../../WhatSizeAmI";
import { useUserCountry } from "@/hooks/use-user-country";
import { content as allContent } from "../night-splint/content";
import UrgencyMessage from "../../UrgencyMessage";
import MoneyBackGuarantee from "../../MoneyBackGuarantee";
import type { Lang } from "../../../config/languages";

interface BuyButtonVariantsProps {
  productId?: string;
  className?: string;
  lang?: Lang;
}

type Size = "large" | "small";
type Side = "left" | "right";

// Shopify Storefront API variant IDs (gid format)
const VARIANT_IDS = {
  "large-left": "gid://shopify/ProductVariant/47494539673928",
  "large-right": "gid://shopify/ProductVariant/47494539608392",
  "small-left": "gid://shopify/ProductVariant/47494539706696",
  "small-right": "gid://shopify/ProductVariant/47494539641160",
} as const;

const BuyButtonVariants: React.FC<BuyButtonVariantsProps> = ({
  className = "",
  lang = "en",
}) => {
  const [currentSize, setCurrentSize] = useState<Size>("large");
  const [currentSide, setCurrentSide] = useState<Side>("left");
  const { country, isLoading: isCountryLoading } = useUserCountry();
  const t = allContent[lang]?.buyButton || allContent.en.buyButton;

  const getVariantKey = (size: Size, side: Side): keyof typeof VARIANT_IDS => {
    return `${size}-${side}`;
  };

  const getAustralianDistributorUrl = (): string => {
    return "https://www.clubwarehouse.com.au/TH_dash_ATRNS_dash_L_dash_L/Thetis-Achilles-Tendon-Rupture-Night-Splint/pd.php";
  };

  const getCurrentVariantId = () => {
    const key = getVariantKey(currentSize, currentSide);
    return VARIANT_IDS[key];
  };

  const sizes: Size[] = ["large", "small"];
  const sides: Side[] = ["left", "right"];

  return (
    <div className={`text-left w-full flex flex-col ${className}`}>
      <div className="flex flex-col justify-start items-start my-4 w-full">
        <WhatSizeAmI lang={lang} />
        <div className="flex flex-wrap items-center gap-3">
          {/* Size selector */}
          <div className="inline-flex items-center gap-0.5 bg-white dark:bg-neutral-800 px-0.5 py-0.5 border border-neutral-200 rounded-md h-8">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setCurrentSize(size)}
                aria-pressed={currentSize === size}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-md font-medium transition-all ${
                  currentSize === size
                    ? "bg-primary text-white shadow-sm"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>

          {/* Side selector */}
          <div className="inline-flex items-center gap-0.5 bg-white dark:bg-neutral-800 px-0.5 py-0.5 border border-neutral-200 rounded-md h-8">
            {sides.map((side) => (
              <button
                key={side}
                type="button"
                onClick={() => setCurrentSide(side)}
                aria-pressed={currentSide === side}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-md font-medium transition-all ${
                  currentSide === side
                    ? "bg-primary text-white shadow-sm"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
              >
                {side.charAt(0).toUpperCase() + side.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        {isCountryLoading
          ? (
            <div className="mt-4 font-medium text-neutral-950 text-lg md:text-xl lg:text-left text-center italic">
              {t.checkingAvailability}
            </div>
          )
          : country === "AU" || country === "NZ"
          ? (
            <Button asChild className="mt-4 w-full">
              <a
                href={getAustralianDistributorUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.buyFromDistributor}
              </a>
            </Button>
          )
          : (
            <AddToCartButton
              variantId={getCurrentVariantId()}
              size="lg"
              className="mt-4"
            >
              Add to Cart
            </AddToCartButton>
          )}
      </div>
    </div>
  );
};

export default BuyButtonVariants;
