"use client";

import { useEffect, useState } from "react";
import {
  ensureShoppingCountryCode,
  getStoredShoppingCountryCode,
  SHOPPING_COUNTRY_CHANGE_EVENT,
  toShopifyCountryCode,
} from "@/lib/shopping-country";
import { SHOP_MARKET_STORAGE_KEY } from "@/config/shop-market";

const LEGACY_MARKET_CHANGE_EVENT = "thetis-shop-market-change";

function readStoredCountryCode(): string | null {
  const stored = getStoredShoppingCountryCode();
  if (stored) return toShopifyCountryCode(stored);

  if (typeof window === "undefined") return null;

  const legacyMarket = localStorage.getItem(SHOP_MARKET_STORAGE_KEY);
  if (legacyMarket === "GB") return "GB";
  if (legacyMarket === "US") return "US";

  return null;
}

/** Stored shopping region, with geo-detect on first visit. Updates when region switcher changes. */
export function useShoppingCountryCode(): string {
  const [countryCode, setCountryCode] = useState<string>(() => {
    return readStoredCountryCode() ?? "GB";
  });

  useEffect(() => {
    let cancelled = false;

    async function syncFromStorage() {
      const stored = readStoredCountryCode();
      if (stored && !cancelled) {
        setCountryCode(stored);
        return;
      }

      const detected = await ensureShoppingCountryCode();
      if (!cancelled) setCountryCode(detected);
    }

    void syncFromStorage();

    function onRegionChange() {
      void syncFromStorage();
    }

    window.addEventListener(SHOPPING_COUNTRY_CHANGE_EVENT, onRegionChange);
    window.addEventListener(LEGACY_MARKET_CHANGE_EVENT, onRegionChange);

    return () => {
      cancelled = true;
      window.removeEventListener(SHOPPING_COUNTRY_CHANGE_EVENT, onRegionChange);
      window.removeEventListener(LEGACY_MARKET_CHANGE_EVENT, onRegionChange);
    };
  }, []);

  return countryCode;
}

export type ShoppingCurrencyBucket = "GBP" | "USD" | "EUR";

export function shoppingCountryToCurrencyBucket(
  countryCode: string,
): ShoppingCurrencyBucket {
  const country = toShopifyCountryCode(countryCode);
  if (country === "GB") return "GBP";
  if (["US", "CA", "AU", "NZ"].includes(country)) return "USD";
  if (
    ["IE", "BE", "DE", "ES", "FR", "IT", "NL", "PL", "PT"].includes(country)
  ) {
    return "EUR";
  }
  return "GBP";
}
