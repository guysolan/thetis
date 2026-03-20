import type { Currency } from "@/constants/currencies";

export const PRICE_BAND_QUANTITIES = [24, 48, 96, 150, 300] as const;
export type PriceBandQuantity = (typeof PRICE_BAND_QUANTITIES)[number];

export type PriceBands = Record<string, number>;

export interface Quote {
  id: number;
  created_at: string;
  currency: Currency;
  price_bands: PriceBands;
}

export interface QuoteInsert {
  currency: Currency;
  price_bands: PriceBands;
  order_date?: string | Date;
}
