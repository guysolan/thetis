import { opedDeck } from "./oped";
import type { TradeDeckPartner } from "./types";

export type { TradeDeckPartner, TradeDeckProduct } from "./types";

export const tradeDecks: Record<string, TradeDeckPartner> = {
  oped: opedDeck,
};

export function getTradeDeck(id: string): TradeDeckPartner | undefined {
  return tradeDecks[id];
}
