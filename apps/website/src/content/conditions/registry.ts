/**
 * Single source of truth for recovery conditions surfaced on the website.
 * Used by nav, footers, route grouping, and future i18n.
 */
export type ConditionId =
  | "achilles-rupture"
  | "plantar-fasciitis"
  | "achilles-tendinitis"
  | "insertional-achilles-tendonitis";

export interface Condition {
  id: ConditionId;
  /** Full display name (EN) */
  label: string;
  /** Short nav label (EN) */
  shortLabel: string;
  /** Condition learning hub: course, FAQs, guide index (no trailing slash) */
  learnPath: string;
  /** Shopping hub: our products + curated catalogue links (no trailing slash) */
  shopPath: string;
  /** Prefix for FAQ route slugs e.g. achilles-rupture-timeline */
  faqSlugPrefix: string;
  /** Primary course landing path (EN, no trailing slash) */
  coursePath: string;
  sortOrder: number;
  /**
   * Product page base slugs (EN) linked from the condition hub, e.g. achilles-rupture-splint.
   */
  productRouteSlugs?: string[];
}

export const conditions: Condition[] = [
  {
    id: "achilles-rupture",
    label: "Achilles rupture",
    shortLabel: "Achilles rupture",
    learnPath: "/learn/achilles-rupture",
    shopPath: "/shop/achilles-rupture",
    faqSlugPrefix: "achilles-rupture",
    coursePath: "/course",
    sortOrder: 0,
    productRouteSlugs: ["achilles-rupture-splint"],
  },
  {
    id: "plantar-fasciitis",
    label: "Plantar fasciitis",
    shortLabel: "Plantar fasciitis",
    learnPath: "/learn/plantar-fasciitis",
    shopPath: "/shop/plantar-fasciitis",
    faqSlugPrefix: "plantar-fasciitis",
    coursePath: "/course/plantar-fasciitis",
    sortOrder: 1,
  },
  {
    id: "achilles-tendinitis",
    label: "Achilles tendinitis",
    shortLabel: "Achilles tendinitis",
    learnPath: "/learn/achilles-tendinitis",
    shopPath: "/shop/achilles-tendinitis",
    faqSlugPrefix: "achilles-tendinitis",
    coursePath: "/course/achilles-tendinitis",
    sortOrder: 2,
  },
  {
    id: "insertional-achilles-tendonitis",
    label: "Insertional Achilles tendonitis",
    shortLabel: "Insertional tendonitis",
    learnPath: "/learn/insertional-achilles-tendonitis",
    shopPath: "/shop/insertional-achilles-tendonitis",
    faqSlugPrefix: "insertional-achilles-tendonitis",
    coursePath: "/course/insertional-achilles-tendonitis",
    sortOrder: 3,
  },
];

export function getConditionById(id: ConditionId): Condition {
  const c = conditions.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown condition: ${id}`);
  return c;
}
