import type { Lang } from "@/config/languages";
import { languages } from "@/config/languages";

export type SplintCustomerPage =
  | "index"
  | "review"
  | "course"
  | "claim-cashback"
  | "share-doctor";

/** Localized base path segment (no leading slash, no lang prefix). */
export const SPLINT_CUSTOMER_BASE_SLUG: Record<Lang, string> = {
  en: "splint-customer",
  de: "schienen-kunde",
  fr: "client-attelle",
  es: "cliente-ferula",
  it: "cliente-tutore",
};

/** Localized subpath segment per page (empty for index). */
export const SPLINT_CUSTOMER_SUBPAGE_SLUG: Record<
  Exclude<SplintCustomerPage, "index">,
  Record<Lang, string>
> = {
  review: {
    en: "review",
    de: "bewertung",
    fr: "avis-video",
    es: "resena",
    it: "recensione",
  },
  course: {
    en: "course",
    de: "kurs",
    fr: "cours",
    es: "curso",
    it: "corso",
  },
  "claim-cashback": {
    en: "claim-cashback",
    de: "cashback-anfordern",
    fr: "reclamer-cashback",
    es: "reclamar-cashback",
    it: "richiedi-cashback",
  },
  "share-doctor": {
    en: "share-doctor",
    de: "mit-kliniker-teilen",
    fr: "partager-clinicien",
    es: "compartir-clinico",
    it: "condividi-clinico",
  },
};

export function getSplintCustomerPath(
  page: SplintCustomerPage,
  lang: Lang = "en",
): string {
  const base = SPLINT_CUSTOMER_BASE_SLUG[lang];
  if (page === "index") {
    return lang === "en" ? `/${base}` : `/${lang}/${base}`;
  }

  const sub = SPLINT_CUSTOMER_SUBPAGE_SLUG[page][lang];
  return lang === "en" ? `/${base}/${sub}` : `/${lang}/${base}/${sub}`;
}

function langForBaseSlug(baseSlug: string): Lang | null {
  for (const language of languages) {
    if (SPLINT_CUSTOMER_BASE_SLUG[language.code] === baseSlug) {
      return language.code;
    }
  }
  return null;
}

/** Parse a slug without language prefix, e.g. `schienen-kunde/bewertung`. */
export function parseSplintCustomerSlug(
  slug: string,
): { page: SplintCustomerPage; lang: Lang } | null {
  const decoded = decodeURIComponent(slug).replace(/\/+$/, "");
  if (!decoded) return null;

  const [baseSlug, subSlug] = decoded.split("/");
  const lang = langForBaseSlug(baseSlug);
  if (!lang) return null;

  if (!subSlug) return { page: "index", lang };

  for (
    const page of Object.keys(
      SPLINT_CUSTOMER_SUBPAGE_SLUG,
    ) as Exclude<SplintCustomerPage, "index">[]
  ) {
    if (SPLINT_CUSTOMER_SUBPAGE_SLUG[page][lang] === subSlug) {
      return { page, lang };
    }
  }

  return null;
}

/** Map any splint-customer URL path to the same page in another language. */
export function translateSplintCustomerPath(
  currentPath: string,
  targetLang: Lang,
): string | null {
  let slug = currentPath.replace(/^\//, "");

  for (const language of languages) {
    if (language.code === "en") continue;
    const prefix = `${language.code}/`;
    if (slug.startsWith(prefix)) {
      slug = slug.slice(prefix.length);
      break;
    }
    if (slug === language.code) {
      slug = "";
      break;
    }
  }

  const parsed = parseSplintCustomerSlug(slug);
  if (!parsed) return null;

  return getSplintCustomerPath(parsed.page, targetLang);
}
