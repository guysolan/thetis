/** Re-exports pitch deck constants; legacy trade carousel data kept for /trade page only. */
export {
  OPED_DECK_SLIDE_COUNT,
  opedPitchClinicianQuotes,
  opedPitchMarketing,
  opedPitchPatientQuotes,
  opedPitchSales,
} from "@/features/oped-deck/opedDeckPitchContent";

export { opedDeck } from "@/content/trade/decks/oped";

import { opedDeck } from "@/content/trade/decks/oped";
import { tradePageContent } from "@/content/trade/tradePageContent";

export const pathway = opedDeck.pathway;
export const t = tradePageContent.en;
