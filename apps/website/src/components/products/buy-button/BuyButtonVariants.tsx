import React, { useState, useEffect } from "react";
import ShopifyBuyButton from "./ShopifyBuyButton";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, ArrowRight } from "lucide-react";

interface BuyButtonVariantsProps {
  productId?: string;
  className?: string;
}

type Size = "large" | "small";
type Side = "left" | "right";

const BuyButtonVariants: React.FC<BuyButtonVariantsProps> = ({
  productId = "8572432253256",
  className = "",
}) => {
  const [currentSize, setCurrentSize] = useState<Size | undefined>(undefined);
  const [currentSide, setCurrentSide] = useState<Side | undefined>(undefined);
  const [key, setKey] = useState(0);

  const variantIds = {
    "large-left": "47494539673928",
    "large-right": "47494539608392",
    "small-left": "47494539706696",
    "small-right": "47494539641160",
  } as const;

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [currentSize, currentSide]);

  const getCurrentVariantId = () => {
    const key = `${currentSize}-${currentSide}` as keyof typeof variantIds;
    return variantIds[key];
  };

  const isSelectionComplete = currentSize && currentSide;

  return (
    <div className={`text-left flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col justify-start items-start my-4">
        <h3 className="mb-2 font-semibold text-left text-lg">
          Choose Your Options
        </h3>
        <div className="space-y-4 w-full">
          <div className="flex flex-col justify-start items-start space-y-2">
            <label className="font-semibold text-base text-left text-neutral-600">
              Size:
            </label>
            <div className="flex gap-2 w-full">
              {(["large", "small"] as const).map((size) => (
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
            <label className="font-semibold text-base text-left text-neutral-600">
              Side:
            </label>
            <div className="flex gap-2 w-full">
              {(["left", "right"] as const).map((side) => (
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

      {isSelectionComplete && (
        <div className="relative flex-col justify-start items-start mx-0 w-fit">
          <ShopifyBuyButton
            key={key}
            productId={productId}
            variantId={getCurrentVariantId()}
            position={currentSide}
            size={currentSize}
          />
        </div>
      )}

      <div className="gap-4 grid grid-cols-2 mt-auto text-primary text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle size={20} />
          <span className="text-left text-neutral-800">Free Shipping</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield size={20} />
          <span className="text-left text-neutral-800">Secure Payment</span>
        </div>
      </div>

      <Button asChild variant="link">
        <a href="/bulk-orders">
          Bulk Orders & Special Pricing
          <ArrowRight size={16} />
        </a>
      </Button>
    </div>
  );
};

export default BuyButtonVariants;
