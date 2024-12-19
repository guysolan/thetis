import React, { useState, useEffect } from "react";
import ShopifyBuyButton from "./ShopifyBuyButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Shield, CheckCircle, ArrowRight, Info } from "lucide-react";
import SizeChart from "../../SizeChart.tsx";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@thetis/ui/popover";
import { cn } from "../../../lib/utils.ts";
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
        <div className="flex flex-row justify-between items-center my-4 w-full">
          <h3 className="font-semibold text-left text-lg">
            Choose Your Options
          </h3>
          <Popover>
            <PopoverTrigger
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex flex-row items-center gap-2",
              )}
            >
              Size Guide <Info />
            </PopoverTrigger>
            <PopoverContent className="p-0 min-w-96">
              <SizeChart />
            </PopoverContent>
          </Popover>
        </div>
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

      <div className="h-40">
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
      </div>
    </div>
  );
};

export default BuyButtonVariants;
