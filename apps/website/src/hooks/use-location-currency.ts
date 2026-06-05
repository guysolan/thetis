"use client";

import { useEffect, useState } from "react";

export type LocationCurrency = "GBP" | "USD" | "EUR";

const EUROPEAN_TIMEZONE_PREFIXES = [
  "Europe/Amsterdam",
  "Europe/Andorra",
  "Europe/Athens",
  "Europe/Berlin",
  "Europe/Bratislava",
  "Europe/Brussels",
  "Europe/Dublin",
  "Europe/Helsinki",
  "Europe/Lisbon",
  "Europe/Ljubljana",
  "Europe/Luxembourg",
  "Europe/Madrid",
  "Europe/Malta",
  "Europe/Monaco",
  "Europe/Paris",
  "Europe/Podgorica",
  "Europe/Riga",
  "Europe/Rome",
  "Europe/San_Marino",
  "Europe/Tallinn",
  "Europe/Vatican",
  "Europe/Vienna",
  "Europe/Vilnius",
  "Europe/Warsaw",
  "Europe/Zagreb",
];

/**
 * Returns GBP, USD, or EUR based on navigator.language and timezone
 * without a network request.
 */
export function useLocationCurrency(): LocationCurrency {
  const [currency, setCurrency] = useState<LocationCurrency>("GBP");

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const lang = navigator.language || "";
      const isUS = lang.startsWith("en-US") || tz.startsWith("America/");
      const isEuro = lang.includes("-DE") ||
        lang.includes("-FR") ||
        lang.includes("-ES") ||
        lang.includes("-IT") ||
        lang.includes("-PT") ||
        EUROPEAN_TIMEZONE_PREFIXES.some((prefix) => tz.startsWith(prefix));

      setCurrency(isUS ? "USD" : isEuro ? "EUR" : "GBP");
    } catch {
      setCurrency("GBP");
    }
  }, []);

  return currency;
}
