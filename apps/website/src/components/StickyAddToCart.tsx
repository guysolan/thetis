"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp, ShoppingCart, Star } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useShopifyPrice } from "@/hooks/use-shopify-price";
import type { Lang } from "@/config/languages";

interface StickyAddToCartProps {
  lang?: Lang;
  buyUrl?: string;
  productTitle?: string;
}

const content = {
  en: {
    title: "Night Splint",
    cta: "Buy Now",
    reviews: "4.6 based on 150+ reviews",
    freeShipping: "Free Shipping",
  },
  de: {
    title: "Nachtschiene",
    cta: "Heute Nacht besser schlafen",
    reviews: "4.6 basierend auf 150+ Bewertungen",
    freeShipping: "Kostenloser Versand",
  },
  fr: {
    title: "Attelle de Nuit",
    cta: "Dormez mieux ce soir",
    reviews: "4.6 basé sur 150+ avis",
    freeShipping: "Livraison gratuite",
  },
  es: {
    title: "Férula Nocturna",
    cta: "Duerme mejor esta noche",
    reviews: "4.6 basado en 150+ reseñas",
    freeShipping: "Envío gratis",
  },
  it: {
    title: "Férula Notturna",
    cta: "Dormi meglio stanotte",
    reviews: "4.6 basato su 150+ recensioni",
    freeShipping: "Spedizione gratuita",
  },
};

const StickyAddToCart: React.FC<StickyAddToCartProps> = ({
  lang = "en",
  buyUrl = "/buy-now",
  productTitle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { formattedPrice } = useShopifyPrice();
  const t = content[lang];

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (approximately 600px)
      const scrollThreshold = 600;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "right-0 bottom-0 left-0 z-40 fixed bg-white dark:bg-neutral-900 shadow-lg border-neutral-200 dark:border-neutral-700 border-t transition-transform duration-300 transform",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto px-4 py-3 max-w-7xl">
        <div className="flex justify-between items-center gap-4">
          {/* Product info - hidden on mobile */}
          <div className="hidden sm:flex items-center gap-4">
            <img
              src="/images/night_splint_square_small.jpg"
              alt="Night Splint"
              className="rounded-lg w-12 h-12 object-cover"
            />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                {productTitle || t.title}
              </h4>
              <div className="flex items-center gap-2 text-neutral-500 text-xs">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3 h-3",
                        i < 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-yellow-400/50 text-yellow-400/50",
                      )}
                    />
                  ))}
                </div>
                <span>{t.reviews}</span>
              </div>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex flex-1 sm:flex-none justify-end items-center gap-4">
            <div className="text-right">
              <div className="font-bold text-neutral-900 dark:text-neutral-100 text-lg">
                {formattedPrice}
              </div>
              <div className="font-medium text-primary dark:text-primary/80 text-xs">
                {t.freeShipping}
              </div>
            </div>
            <a
              href={buyUrl}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "gap-2 whitespace-nowrap",
              )}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden xs:inline">{t.cta}</span>
              <span className="xs:hidden">Buy Now</span>
            </a>
          </div>

          {/* Scroll to top button - desktop only */}
          <button
            onClick={scrollToTop}
            className="hidden md:flex justify-center items-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full w-10 h-10 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyAddToCart;
