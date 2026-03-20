export type Currency = Database["public"]["Enums"]["currency_type"];

import type { Database } from "../database.types";

type CurrencyConfig = {
  symbol: string;
  code: string;
  name: string;
  decimal_digits: number;
  decimal_separator: string;
  thousands_separator: string;
};

export const currencies: Record<Currency, CurrencyConfig> = {
  USD: {
    symbol: "$",
    code: "USD",
    name: "US Dollar",
    decimal_digits: 2,
    decimal_separator: ".",
    thousands_separator: ",",
  },
  GBP: {
    symbol: "£",
    code: "GBP",
    name: "British Pound",
    decimal_digits: 2,
    decimal_separator: ".",
    thousands_separator: ",",
  },
  EUR: {
    symbol: "€",
    code: "EUR",
    name: "Euro",
    decimal_digits: 2,
    decimal_separator: ",",
    thousands_separator: ".",
  },
  AUD: {
    symbol: "A$",
    code: "AUD",
    name: "Australian Dollar",
    decimal_digits: 2,
    decimal_separator: ".",
    thousands_separator: ",",
  },
  CAD: {
    symbol: "C$",
    code: "CAD",
    name: "Canadian Dollar",
    decimal_digits: 2,
    decimal_separator: ".",
    thousands_separator: ",",
  },
  JPY: {
    symbol: "¥",
    code: "JPY",
    name: "Japanese Yen",
    decimal_digits: 0,
    decimal_separator: ".",
    thousands_separator: ",",
  },
  NZD: {
    symbol: "NZ$",
    code: "NZD",
    name: "New Zealand Dollar",
    decimal_digits: 2,
    decimal_separator: ".",
    thousands_separator: ",",
  },
} as const;

export const currencyKeys = Object.keys(currencies);

export type CurrencyFormatError =
  | { type: "INVALID_CURRENCY"; message: string }
  | { type: "INVALID_AMOUNT"; message: string }
  | { type: "FORMAT_ERROR"; message: string };

/** Locale per currency so Intl displays the correct symbol (e.g. £ not $ for GBP) */
export const currencyLocale: Record<Currency, string> = {
  GBP: "en-GB",
  USD: "en-US",
  EUR: "de-DE",
  AUD: "en-AU",
  CAD: "en-CA",
  JPY: "ja-JP",
  NZD: "en-NZ",
};

export const formatCurrency = (
  amount: number,
  currencyCode: Currency,
): string | CurrencyFormatError => {
  const code = currencyCode?.toString().toUpperCase() as Currency;
  if (!currencies[code]) {
    return {
      type: "INVALID_CURRENCY",
      message: `Invalid currency code: ${currencyCode}`,
    };
  }

  if (typeof Number(amount) !== "number" || isNaN(Number(amount))) {
    return {
      type: "INVALID_AMOUNT",
      message: "Amount must be a valid number",
    };
  }

  const currency = currencies[code];
  const locale = currencyLocale[code] ?? "en-GB";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      minimumFractionDigits: currency.decimal_digits,
      maximumFractionDigits: currency.decimal_digits,
    }).format(amount);
  } catch (error) {
    return {
      type: "FORMAT_ERROR",
      message: `Failed to format currency: ${(error as Error).message}`,
    };
  }
};

/** Format + locale for NumberFlow so currency displays with correct symbol (e.g. £ not $ for GBP) */
export function getCurrencyFormatOptions(currency: Currency): {
  format: { style: "currency"; currency: Currency };
  locales: string;
} {
  const code = (currency?.toString().toUpperCase() ?? "GBP") as Currency;
  const locale = currencies[code] ? (currencyLocale[code] ?? "en-GB") : "en-GB";
  return {
    format: { style: "currency", currency: code },
    locales: locale,
  };
}

export const defaultCurrency: Currency = "GBP";
