export type TradeDeckProduct = {
  name: string;
  brand: "partner" | "thetis";
  role: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type TradeDeckPartner = {
  id: string;
  name: string;
  meta: { title: string; description: string };
  landing: {
    eyebrow: string;
    title: string;
    tagline: string;
    note: string;
    badges: [string, string, string];
    primaryCta: string;
    primaryCtaHref: string;
  };
  ecosystem: {
    title: string;
    intro: string;
    products: TradeDeckProduct[];
  };
  pathway: {
    title: string;
    intro: string;
    dayLabel: string;
    dayText: string;
    nightLabel: string;
    nightText: string;
    note: string;
  };
  /** Section keys from the shared trade deck to omit for this partner. */
  hiddenSections?: readonly (
    | "market"
    | "commercial"
    | "pricing"
    | "channels"
    | "territories"
    | "partnership"
  )[];
};
