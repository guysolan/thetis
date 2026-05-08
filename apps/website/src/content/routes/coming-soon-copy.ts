import type { Lang } from "@/config/languages";

/** Short nav / SEO description for routes whose pages are not fully written yet. */
export const COMING_SOON_ROUTE_DESCRIPTION: Record<Lang, string> = {
  en: "Coming soon.",
  de: "Demnächst.",
  fr: "Bientôt disponible.",
  es: "Próximamente.",
  it: "In arrivo.",
};

/** Plantar fasciitis stage 1 guide is published — match hub nav to guide metadata (EN copy for all locales until translated). */
export const PLANTAR_STAGE_1_ROUTE_DESCRIPTION: Record<Lang, string> = {
  en: "Stretching-focused foundation stage: simple daily habits, slant-board work, and realistic expectations.",
  de: "Stretching-focused foundation stage: simple daily habits, slant-board work, and realistic expectations.",
  fr: "Stretching-focused foundation stage: simple daily habits, slant-board work, and realistic expectations.",
  es: "Stretching-focused foundation stage: simple daily habits, slant-board work, and realistic expectations.",
  it: "Stretching-focused foundation stage: simple daily habits, slant-board work, and realistic expectations.",
};
