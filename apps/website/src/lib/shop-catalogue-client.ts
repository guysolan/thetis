import {
  catalogueMarketFromCountryCode,
  isExternalCatalogueProductUrl,
} from "@thetis/catalogue";
import {
  SHOPPING_COUNTRY_CHANGE_EVENT,
  SHOPPING_COUNTRY_STORAGE_KEY,
  toShopifyCountryCode,
} from "@/lib/shopping-country";
import { SHOP_MARKET_STORAGE_KEY } from "@/config/shop-market";

function effectiveShoppingCountryCode(): string {
  const stored = localStorage.getItem(SHOPPING_COUNTRY_STORAGE_KEY);
  if (stored) return toShopifyCountryCode(stored);
  const legacy = localStorage.getItem(SHOP_MARKET_STORAGE_KEY);
  if (legacy === "GB" || legacy === "gb") return "GB";
  return "US";
}

function applyShopCatalogueLinks(): void {
  const country = effectiveShoppingCountryCode().toLowerCase();

  document.querySelectorAll("a.catalogue-buy-link").forEach((node) => {
    const a = node as HTMLAnchorElement;
    const isNightSplint = a.dataset.nightSplint === "true";
    let href: string | null = null;
    if (isNightSplint) {
      href = a.getAttribute(`data-href-${country}`) ||
        a.getAttribute("data-href-us");
    } else {
      const market = catalogueMarketFromCountryCode(country.toUpperCase());
      href = market === "GB"
        ? a.getAttribute("data-href-gb") || a.getAttribute("data-href-us")
        : a.getAttribute("data-href-us") || a.getAttribute("data-href-gb");
    }
    if (href) {
      a.setAttribute("href", href);
      const external = isExternalCatalogueProductUrl(href);
      if (external) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      } else {
        a.removeAttribute("target");
        a.removeAttribute("rel");
      }
    }
  });

  document.querySelectorAll("p.catalogue-price").forEach((el) => {
    const us = el.getAttribute("data-shop-price-us") || "";
    const gb = el.getAttribute("data-shop-price-gb") || "";
    const market = catalogueMarketFromCountryCode(
      effectiveShoppingCountryCode(),
    );
    const next = market === "GB" ? gb || us : us || gb;
    el.textContent = next;
  });
}

let listenersAttached = false;

if (typeof window !== "undefined") {
  applyShopCatalogueLinks();
  if (!listenersAttached) {
    listenersAttached = true;
    window.addEventListener(
      SHOPPING_COUNTRY_CHANGE_EVENT,
      applyShopCatalogueLinks,
    );
    window.addEventListener(
      "thetis-shop-market-change",
      applyShopCatalogueLinks,
    );
    window.addEventListener("storage", (e) => {
      if (
        e.key === SHOPPING_COUNTRY_STORAGE_KEY ||
        e.key === SHOP_MARKET_STORAGE_KEY
      ) {
        applyShopCatalogueLinks();
      }
    });
  }
}
