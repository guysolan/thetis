"use client";

import { useEffect, useState } from "react";

export type LocationCurrency = "GBP" | "USD";

/**
 * Returns GBP for UK (and rest of world) or USD for US based on
 * navigator.language and timezone (no network request).
 */
export function useLocationCurrency(): LocationCurrency {
  const [currency, setCurrency] = useState<LocationCurrency>("GBP");

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const lang = navigator.language || "";
      const isUS = lang.startsWith("en-US") || tz.startsWith("America/");
      setCurrency(isUS ? "USD" : "GBP");
    } catch {
      setCurrency("GBP");
    }
  }, []);

  return currency;
}
