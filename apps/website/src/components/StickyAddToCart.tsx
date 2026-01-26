"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp, Loader2, ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CourseBuyButton } from "@/components/CourseBuyButton";
import { cn } from "@/lib/utils";
import { useShopifyPrice } from "@/hooks/use-shopify-price";
import { SHOPIFY_COURSE_PRODUCTS } from "@/lib/shopify-course-price";
import { addToCart } from "@/lib/shopify/cart-store";
import { NIGHT_SPLINT_VARIANTS } from "@/lib/shopify/variants";
import type { Lang } from "@/config/languages";

export type StickyAddToCartVariant = "splint" | "course";

interface StickyAddToCartProps {
  variant?: StickyAddToCartVariant;
  lang?: Lang;
  productTitle?: string;
  /** Used for splint CTA: link to #order on same page (e.g. /achilles-rupture-splint#order) */
  splintHref?: string;
}

const content: Record<
  Lang,
  {
    splintTitle: string;
    courseTitle: string;
    addToCart: string;
    freeShipping: string;
  }
> = {
  en: {
    splintTitle: "Night Splint",
    courseTitle: "Recovery Course",
    addToCart: "Add to Cart",
    freeShipping: "Free shipping",
  },
  de: {
    splintTitle: "Nachtschiene",
    courseTitle: "Genesungskurs",
    addToCart: "In den Warenkorb",
    freeShipping: "Kostenloser Versand",
  },
  fr: {
    splintTitle: "Attelle de Nuit",
    courseTitle: "Cours de récupération",
    addToCart: "Ajouter au panier",
    freeShipping: "Livraison gratuite",
  },
  es: {
    splintTitle: "Férula Nocturna",
    courseTitle: "Curso de recuperación",
    addToCart: "Añadir al carrito",
    freeShipping: "Envío gratis",
  },
  it: {
    splintTitle: "Férula Notturna",
    courseTitle: "Corso di recupero",
    addToCart: "Aggiungi al carrello",
    freeShipping: "Spedizione gratuita",
  },
};

const StickyAddToCart: React.FC<StickyAddToCartProps> = ({
  variant = "splint",
  lang = "en",
  productTitle,
  splintHref = "/achilles-rupture-splint",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { formattedPrice } = useShopifyPrice();
  const t = content[lang];

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 600;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddSplintToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      // Use large-left as default variant
      await addToCart(NIGHT_SPLINT_VARIANTS.largeLeft, 1);
    } catch (error) {
      console.error("Failed to add splint to cart:", error);
      // Fallback: scroll to order section if add to cart fails
      const orderSection = document.getElementById("order");
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: "smooth" });
      }
    } finally {
      setIsAdding(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "right-0 bottom-0 left-0 z-40 fixed bg-white dark:bg-neutral-900 shadow-lg border-neutral-200 dark:border-neutral-700 border-t transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto px-4 py-3 max-w-7xl">
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-1 items-center gap-3 min-w-0">
            {variant === "splint"
              ? (
                <>
                  <img
                    src="/images/night_splint_square_small.jpg"
                    alt=""
                    className="rounded-lg w-10 h-10 object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm truncate">
                      {productTitle || t.splintTitle}
                    </p>
                    <p className="font-medium text-primary text-xs">
                      {formattedPrice} · {t.freeShipping}
                    </p>
                  </div>
                </>
              )
              : (
                <div className="min-w-0">
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                    {t.courseTitle}
                  </p>
                  <p className="text-neutral-500 text-xs">
                    31 expert lessons
                  </p>
                </div>
              )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {variant === "splint"
              ? (
                <button
                  onClick={handleAddSplintToCart}
                  disabled={isAdding}
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "gap-2 disabled:opacity-50",
                  )}
                >
                  {isAdding
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <ShoppingCart className="w-4 h-4" />}
                  {isAdding ? "Adding..." : t.addToCart}
                </button>
              )
              : (
                <CourseBuyButton
                  productId={SHOPIFY_COURSE_PRODUCTS.ESSENTIALS_COURSE}
                  variant="default"
                  size="lg"
                >
                  {t.addToCart}
                </CourseBuyButton>
              )}

            <button
              onClick={scrollToTop}
              className="hidden md:flex justify-center items-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full w-10 h-10 transition-colors shrink-0"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyAddToCart;
