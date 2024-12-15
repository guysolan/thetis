import React, { useState, useEffect } from "react";
import ShopifyBuyButton from "./ShopifyBuyButton";
import { Button } from "../../components/ui/button";

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
  const [currentSize, setCurrentSize] = useState<Size>("large");
  const [currentSide, setCurrentSide] = useState<Side>("left");
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

  // Get current variant ID based on size and side
  const getCurrentVariantId = () => {
    const key = `${currentSize}-${currentSide}` as keyof typeof variantIds;
    return variantIds[key];
  };

  return (
    <div className={`my-5 ${className}`}>
      <div className="flex flex-wrap gap-5 mb-5">
        {/* Size Selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-medium">Size:</span>
          {(["large", "small"] as const).map((size) => (
            <Button
              key={size}
              variant={currentSize === size ? "default" : "outline"}
              onClick={() => setCurrentSize(size)}
              aria-pressed={currentSize === size}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </Button>
          ))}
        </div>

        {/* Side Selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-medium font-raleway">Side:</span>
          {(["left", "right"] as const).map((side) => (
            <Button
              key={side}
              variant={currentSide === side ? "default" : "outline"}
              onClick={() => setCurrentSide(side)}
              aria-pressed={currentSide === side}
            >
              {side.charAt(0).toUpperCase() + side.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Button Variants */}
      <div className="buttons">
        <ShopifyBuyButton
          key={key}
          productId={productId}
          variantId={getCurrentVariantId()}
          position={currentSide}
          size={currentSize}
          options={{
            product: {
              option: {
                contents: {
                  select: false,
                  button: true,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BuyButtonVariants;
