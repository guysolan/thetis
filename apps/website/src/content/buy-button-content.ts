import type { Lang } from "../config/languages";

export const buyButtonContent: Record<
  Lang,
  {
    addToCart: string;
    buyNow: string;
    viewOptions: string;
    checkingLocation: string;
    freeShipping: string;
    selectSize: string;
    selectSide: string;
  }
> = {
  en: {
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    viewOptions: "View Options",
    checkingLocation: "Checking availability...",
    freeShipping: "Free Shipping",
    selectSize: "Size",
    selectSide: "Side",
  },
  de: {
    addToCart: "In den Warenkorb",
    buyNow: "Jetzt kaufen",
    viewOptions: "Optionen anzeigen",
    checkingLocation: "Verfügbarkeit prüfen...",
    freeShipping: "Kostenloser Versand",
    selectSize: "Größe",
    selectSide: "Seite",
  },
  fr: {
    addToCart: "Ajouter au panier",
    buyNow: "Acheter maintenant",
    viewOptions: "Voir les options",
    checkingLocation: "Vérification de la disponibilité...",
    freeShipping: "Livraison gratuite",
    selectSize: "Taille",
    selectSide: "Côté",
  },
  es: {
    addToCart: "Añadir al carrito",
    buyNow: "Comprar ahora",
    viewOptions: "Ver opciones",
    checkingLocation: "Comprobando disponibilidad...",
    freeShipping: "Envío gratis",
    selectSize: "Tamaño",
    selectSide: "Lado",
  },
  it: {
    addToCart: "Aggiungi al carrello",
    buyNow: "Acquista ora",
    viewOptions: "Vedi opzioni",
    checkingLocation: "Controllo disponibilità...",
    freeShipping: "Spedizione gratuita",
    selectSize: "Taglia",
    selectSide: "Lato",
  },
};

// Countries where we use the Shopify direct checkout (UK, US, AU)
export const shopifyCountries = ["GB", "UK", "US", "AU"];

// Countries we ship to directly
export const directShipCountries = ["GB", "UK", "US", "AU"];

// Countries with Amazon links
export const amazonCountries = ["DE", "IT", "FR", "BE", "NL", "PL", "ES"];

// Countries with partner distributors (AU: direct Shopify on splint PDP; NZ still partner)
export const partnerCountries = ["NZ", "PT", "CA"];

// Get the purchase URL for a specific country and variant
export function getPurchaseUrl(
  country: string | null,
  size: "large" | "small",
  side: "left" | "right",
): { url: string; type: "shopify" | "amazon" | "partner" | "how-to-buy" } {
  const sizeCode = size === "large" ? "L" : "S";
  const sideCode = side === "left" ? "L" : "R";
  const variantCode = `${sizeCode}${sideCode}` as "LL" | "LR" | "SL" | "SR";

  // UK, US, AU use Shopify / direct
  if (country === "GB" || country === "UK" || country === "US" || country === "AU") {
    return { url: "", type: "shopify" };
  }

  // Import purchase links dynamically to avoid circular deps
  const purchaseLinks: Record<string, Record<string, string>> = {
    US: {
      LL: "https://www.thetismedical.com/splint/large/left?region=us",
      LR: "https://www.thetismedical.com/splint/large/right?region=us",
      SL: "https://www.thetismedical.com/splint/small/left?region=us",
      SR: "https://www.thetismedical.com/splint/small/right?region=us",
    },
    AU: {
      LL: "https://www.thetismedical.com/splint/large/left?region=au",
      LR: "https://www.thetismedical.com/splint/large/right?region=au",
      SL: "https://www.thetismedical.com/splint/small/left?region=au",
      SR: "https://www.thetismedical.com/splint/small/right?region=au",
    },
    CA: {
      LL: "https://swiftbrace.com/products/thetis-achilles-night-splint",
      LR: "https://swiftbrace.com/products/thetis-achilles-night-splint",
      SL: "https://swiftbrace.com/products/thetis-achilles-night-splint",
      SR: "https://swiftbrace.com/products/thetis-achilles-night-splint",
    },
    DE: {
      LL: "https://www.amazon.de/dp/B09N5HBBKQ",
      LR: "https://www.amazon.de/dp/B09N5MVY1Q",
      SL: "https://www.amazon.de/dp/B09N5KH4F3",
      SR: "https://www.amazon.de/dp/B09N58H79F",
    },
    IT: {
      LL: "https://www.amazon.it/dp/B09N5HBBKQ",
      LR: "https://www.amazon.it/dp/B09N5MVY1Q",
      SL: "https://www.amazon.it/dp/B09N5KH4F3",
      SR: "https://www.amazon.it/dp/B09N58H79F",
    },
    FR: {
      LL: "https://www.amazon.fr/dp/B09N5HBBKQ",
      LR: "https://www.amazon.fr/dp/B09N5MVY1Q",
      SL: "https://www.amazon.fr/dp/B09N5KH4F3",
      SR: "https://www.amazon.fr/dp/B09N58H79F",
    },
    BE: {
      LL: "https://www.amazon.com.be/dp/B09N5HBBKQ",
      LR: "https://www.amazon.com.be/dp/B09N5MVY1Q",
      SL: "https://www.amazon.com.be/dp/B09N5KH4F3",
      SR: "https://www.amazon.com.be/dp/B09N58H79F",
    },
    NL: {
      LL: "https://www.amazon.nl/dp/B09N5HBBKQ",
      LR: "https://www.amazon.nl/dp/B09N5MVY1Q",
      SL: "https://www.amazon.nl/dp/B09N5KH4F3",
      SR: "https://www.amazon.nl/dp/B09N58H79F",
    },
    PL: {
      LL: "https://www.amazon.pl/dp/B09N5HBBKQ",
      LR: "https://www.amazon.pl/dp/B09N5MVY1Q",
      SL: "https://www.amazon.pl/dp/B09N5KH4F3",
      SR: "https://www.amazon.pl/dp/B09N58H79F",
    },
    ES: {
      LL: "https://www.amazon.es/dp/B09N5HBBKQ",
      LR: "https://www.amazon.es/dp/B09N5MVY1Q",
      SL: "https://www.amazon.es/dp/B09N5KH4F3",
      SR: "https://www.amazon.es/dp/B09N58H79F",
    },
    NZ: {
      LL: "https://www.clubwarehouse.com.au/TH_dash_ATRNS_dash_L_dash_L/Thetis-Achilles-Tendon-Rupture-Night-Splint/pd.php",
      LR: "https://www.clubwarehouse.com.au/TH_dash_ATRNS_dash_L_dash_L/Thetis-Achilles-Tendon-Rupture-Night-Splint/pd.php",
      SL: "https://www.clubwarehouse.com.au/TH_dash_ATRNS_dash_L_dash_L/Thetis-Achilles-Tendon-Rupture-Night-Splint/pd.php",
      SR: "https://www.clubwarehouse.com.au/TH_dash_ATRNS_dash_L_dash_L/Thetis-Achilles-Tendon-Rupture-Night-Splint/pd.php",
    },
    PT: {
      LL: "https://orthodirect.pt/product/tala-noturna-tendao-de-aquiles/",
      LR: "https://orthodirect.pt/product/tala-noturna-tendao-de-aquiles/",
      SL: "https://orthodirect.pt/product/tala-noturna-tendao-de-aquiles/",
      SR: "https://orthodirect.pt/product/tala-noturna-tendao-de-aquiles/",
    },
  };

  if (country && purchaseLinks[country]) {
    const url = purchaseLinks[country][variantCode];
    if (url) {
      const isAmazon = url.includes("amazon");
      const isPartner = !isAmazon;
      return { url, type: isAmazon ? "amazon" : "partner" };
    }
  }

  // Default: redirect to how-to-buy page
  return { url: "/how-to-buy", type: "how-to-buy" };
}
