import React, { useEffect, useState } from "react";
import ShopifyBuyButton from "./ShopifyBuyButton";
import { Button } from "@/components/ui/button";
import WhatSizeAmI from "../../WhatSizeAmI";
import { useUserCountry } from "@/hooks/use-user-country";
import { content as allContent } from "../night-splint/content";
import type { Lang } from "../../../config/languages";

interface BuyButtonVariantsProps {
  productId?: string;
  className?: string;
  lang: Lang;
}

type Size = "large" | "small";
type Side = "left" | "right";

const content = {
  variants: {
    size: ["large", "small"] as const,
    side: ["left", "right"] as const,
  },
  variantIds: {
    "large-left": "47494539673928",
    "large-right": "47494539608392",
    "small-left": "47494539706696",
    "small-right": "47494539641160",
  } as const,
} as const;

const BuyButtonVariants: React.FC<BuyButtonVariantsProps> = ({
  productId = "8572432253256",
  className = "",
  lang = "en",
}) => {
  const [currentSize, setCurrentSize] = useState<Size | undefined>("large");
  const [currentSide, setCurrentSide] = useState<Side | undefined>("right");
  const [key, setKey] = useState(() => Date.now());
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { country, isLoading: isCountryLoading } = useUserCountry();
  const t = allContent[lang]?.buyButton || allContent.en.buyButton;

  const variantIds = content.variantIds;

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    setKey((prevKey) => prevKey + 1);
  }, [currentSize, currentSide]);

  const getVariantKey = (size?: Size, side?: Side): string => {
    if (!size || !side) return "";
    return `${size}-${side}`;
  };

  const getAustralianDistributorUrl = (size?: Size, side?: Side): string => {
    if (!size || !side) return "";
    const sizeChar = size === "large" ? "L" : "S";
    const sideChar = side === "left" ? "L" : "R";
    return "https://www.clubwarehouse.com.au/TH_dash_ATRNS_dash_L_dash_L/Thetis-Achilles-Tendon-Rupture-Night-Splint/pd.php";
  };

  const getCurrentVariantId = () => {
    const key = getVariantKey(currentSize, currentSide);
    return key ? variantIds[key as keyof typeof variantIds] : undefined;
  };

  const isSelectionComplete = currentSize && currentSide;

  return (
    <div className={`text-left w-full flex flex-col ${className}`}>
      <div className="flex flex-col justify-start items-start my-4 w-full">
        <WhatSizeAmI lang={lang} />
        <div className="space-y-4 w-full">
          <div className="flex flex-col justify-start items-start space-y-2">
            <label className="font-semibold text-neutral-600 text-base text-left">
              {t.size}
            </label>
            <div className="flex gap-2 w-full">
              {content.variants.size.map((size) => (
                <Button
                  key={size}
                  variant={currentSize === size ? "default" : "outline"}
                  onClick={() => setCurrentSize(size)}
                  aria-pressed={currentSize === size}
                  className={`flex-1 min-w-[100px] text-left ${
                    currentSize === size
                      ? "ring-2 ring-offset-2 ring-primary"
                      : ""
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start items-start space-y-2">
            <label className="font-semibold text-neutral-600 text-base text-left">
              {t.side}
            </label>
            <div className="flex gap-2 w-full">
              {content.variants.side.map((side) => (
                <Button
                  key={side}
                  variant={currentSide === side ? "default" : "outline"}
                  onClick={() => setCurrentSide(side)}
                  aria-pressed={currentSide === side}
                  className={`flex-1 min-w-[100px] text-left ${
                    currentSide === side
                      ? "ring-2 ring-offset-2 ring-primary"
                      : ""
                  }`}
                >
                  {side.charAt(0).toUpperCase() + side.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 h-16">
        {isCountryLoading
          ? (
            <div className="mt-8 font-medium text-neutral-950 text-lg md:text-xl lg:text-left text-center italic">
              {t.checkingAvailability}
            </div>
          )
          : country === "AU" || country === "NZ"
          ? (
            isSelectionComplete && (
              <Button asChild className="mt-4 w-full">
                <a
                  href={getAustralianDistributorUrl(currentSize, currentSide)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.buyFromDistributor}
                </a>
              </Button>
            )
          )
          : isSelectionComplete && getCurrentVariantId()
          ? (
            <div className="relative flex-col justify-start items-start mx-0 w-fit">
              <ShopifyBuyButton
                key={key}
                productId={productId}
                variantId={getCurrentVariantId() || ""}
                position={currentSide || "left"}
                size={currentSize || "small"}
              />
            </div>
          )
          : (
            <div className="mt-8 font-medium text-neutral-950 text-lg md:text-xl lg:text-left text-center italic animate-bounce">
              {t.selectionPrompt}
            </div>
          )}
      </div>
    </div>
  );
};

export default BuyButtonVariants;
