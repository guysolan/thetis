import React, { useEffect, useState } from "react";
import { Button, type ButtonProps } from "@thetis/ui/button";
import { addToCart } from "@/lib/shopify/cart-store";
import { Check, Loader2, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  isCourseShopifyCheckoutAllowed,
  SHOPIFY_COURSE_PRODUCTS,
  SHOPIFY_COURSE_VARIANTS,
} from "@/lib/shopify-course-price";
import {
  getCountryCodeForPricing,
  SHOPPING_COUNTRY_CHANGE_EVENT,
} from "@/lib/shopping-country";

interface CourseBuyButtonProps
  extends Omit<ButtonProps, "onClick" | "disabled"> {
  productId: string;
  quantity?: number;
  children?: React.ReactNode;
}

// Map product IDs to variant IDs
const getVariantId = (productId: string): string | null => {
  if (productId === SHOPIFY_COURSE_PRODUCTS.ESSENTIALS_COURSE) {
    return SHOPIFY_COURSE_VARIANTS.ESSENTIALS_COURSE;
  }
  if (productId === SHOPIFY_COURSE_PRODUCTS.PROFESSIONALS_COURSE) {
    return SHOPIFY_COURSE_VARIANTS.PROFESSIONALS_COURSE;
  }
  return null;
};

export function CourseBuyButton({
  productId,
  quantity = 1,
  className,
  size = "lg",
  children,
  ...buttonProps
}: CourseBuyButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [checkoutAllowed, setCheckoutAllowed] = useState<boolean | null>(null);

  const variantId = getVariantId(productId);

  useEffect(() => {
    let cancelled = false;
    async function syncRegion() {
      const code = await getCountryCodeForPricing();
      if (!cancelled) setCheckoutAllowed(isCourseShopifyCheckoutAllowed(code));
    }
    syncRegion();
    function onShoppingCountryChange() {
      syncRegion();
    }
    window.addEventListener(
      SHOPPING_COUNTRY_CHANGE_EVENT,
      onShoppingCountryChange,
    );
    return () => {
      cancelled = true;
      window.removeEventListener(
        SHOPPING_COUNTRY_CHANGE_EVENT,
        onShoppingCountryChange,
      );
    };
  }, []);

  const handleClick = async () => {
    if (!variantId) {
      console.error("Unknown course product ID:", productId);
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(variantId, quantity);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (error) {
      console.error("Failed to add course to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  if (!variantId) {
    return (
      <Button disabled className={className} size={size} {...buttonProps}>
        {children || "Product unavailable"}
      </Button>
    );
  }

  if (checkoutAllowed === false) {
    return (
      <Button disabled className={className} size={size} {...buttonProps}>
        Not available in your region
      </Button>
    );
  }

  if (checkoutAllowed === null) {
    return (
      <Button disabled className={className} size={size} {...buttonProps}>
        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
        Loading…
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isAdding}
      size={size}
      className={cn(
        "transition-all duration-200",
        justAdded && "bg-primary hover:bg-primary",
        className,
      )}
      {...buttonProps}
    >
      {isAdding
        ? (
          <>
            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
            Adding...
          </>
        )
        : justAdded
        ? (
          <>
            <Check className="mr-2 w-5 h-5" />
            Added!
          </>
        )
        : (
          <>
            <ShoppingCart className="mr-2 w-5 h-5" />
            {children || "Add to Cart"}
          </>
        )}
    </Button>
  );
}

export default CourseBuyButton;
