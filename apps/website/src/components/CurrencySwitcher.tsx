"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  normalizeStoredShopMarket,
  SHOP_MARKET_STORAGE_KEY,
} from "@/config/shop-market";
import {
  setStoredShoppingCountryCode,
  SHOPPING_COUNTRY_STORAGE_KEY,
  toShopifyCountryCode,
} from "@/lib/shopping-country";
import {
  isKnownShoppingRegionCode,
  SHOPPING_REGION_OPTIONS,
  type ShoppingRegionCode,
} from "@/config/shopping-region-options";

interface CurrencySwitcherProps {
  className?: string;
}

/** Legacy affiliate grid used only US | GB; keep in sync when those are chosen. */
function syncLegacyShopMarket(iso: ShoppingRegionCode): void {
  localStorage.setItem(SHOP_MARKET_STORAGE_KEY, iso === "GB" ? "GB" : "US");
}

export function CurrencySwitcher({ className }: CurrencySwitcherProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [country, setCountry] = useState<ShoppingRegionCode>("US");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(SHOPPING_COUNTRY_STORAGE_KEY);
    const normalized = raw ? toShopifyCountryCode(raw) : null;
    if (normalized && isKnownShoppingRegionCode(normalized)) {
      setCountry(normalized);
      return;
    }
    const legacyMarket = normalizeStoredShopMarket(
      localStorage.getItem(SHOP_MARKET_STORAGE_KEY),
    );
    setCountry(legacyMarket === "GB" ? "GB" : "US");
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", onDoc, true);
    return () => document.removeEventListener("click", onDoc, true);
  }, [isOpen]);

  function select(code: ShoppingRegionCode) {
    setCountry(code);
    syncLegacyShopMarket(code);
    setStoredShoppingCountryCode(code);
    window.dispatchEvent(new CustomEvent("thetis-shop-market-change"));
    setIsOpen(false);
  }

  const currentOption =
    SHOPPING_REGION_OPTIONS.find((o) => o.code === country) ??
      SHOPPING_REGION_OPTIONS[0];
  const currentLabel = currentOption.label;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 px-2.5 py-2 border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-full min-w-[5.25rem] text-gray-700 dark:text-neutral-200 text-sm transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={currentLabel}
        aria-label={`Shop region: ${currentLabel} (${country})`}
      >
        <MapPin size={16} className="opacity-80 shrink-0" aria-hidden />
        <span className="font-semibold text-xs" aria-hidden>
          {currentOption.currencySymbol}
        </span>
        <span className="min-w-0 font-semibold tabular-nums text-left tracking-tight">
          {country}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform shrink-0",
            isOpen && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {isOpen
        ? (
          <ul
            className="right-0 z-50 absolute bg-white dark:bg-neutral-900 shadow-lg mt-1 py-1 border border-gray-300 dark:border-neutral-600 rounded-md w-56 max-h-[min(22rem,70vh)] overflow-y-auto overscroll-contain"
            role="listbox"
            aria-label="Shop regions"
          >
            {SHOPPING_REGION_OPTIONS.map((opt) => (
              <li
                key={opt.code}
                role="option"
                aria-selected={opt.code === country}
              >
                <button
                  type="button"
                  onClick={() => select(opt.code)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2 w-full text-sm text-left transition-colors",
                    opt.code === country
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
                  )}
                >
                  <span className="w-6 font-semibold text-right shrink-0" aria-hidden>
                    {opt.currencySymbol}
                  </span>
                  <span className="w-7 font-semibold tabular-nums shrink-0">
                    {opt.code}
                  </span>
                  <span className="flex-1 min-w-0 text-left truncate">
                    {opt.label}
                  </span>
                  {opt.code === country
                    ? (
                      <svg
                        className="ml-auto w-4 h-4 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )
                    : null}
                </button>
              </li>
            ))}
          </ul>
        )
        : null}
    </div>
  );
}
