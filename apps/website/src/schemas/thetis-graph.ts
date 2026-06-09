import type { Lang } from "@/config/languages";
import { languages } from "@/config/languages";
import type { ConditionId } from "@/content/conditions/registry";
import { THETIS_COMPANY_ADDRESS } from "@/content/companyAddress";
import {
  GLOBAL_REVIEW_AVERAGE,
  GLOBAL_REVIEW_COUNT,
} from "@/features/reviews/productReviewStats";

export const THETIS_BASE_URL = "https://thetismedical.com";
export const THETIS_ORG_ID = `${THETIS_BASE_URL}#organization`;
export const THETIS_WEBSITE_ID = `${THETIS_BASE_URL}#website`;
export const THETIS_LOGO_ID = `${THETIS_BASE_URL}#logo`;
export const NIGHT_SPLINT_PRODUCT_ID = `${THETIS_BASE_URL}/achilles-rupture-splint#product`;

const ORG_DESCRIPTION =
  "UK medical device company making the patented Achilles Rupture Night Splint and publishing evidence-based recovery guides, courses, and FAQs for Achilles tendon rupture and related foot conditions. Trusted by 5,000+ patients and recommended by foot and ankle surgeons.";

const WEBSITE_DESCRIPTION =
  "Patented Achilles rupture night splint, week-by-week recovery guides, surgeon-reviewed courses, and patient FAQs — from injury to return to sport.";

const LANG_TO_SCHEMA_LANGUAGE: Record<Lang, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  it: "it-IT",
};

const HOME_BREADCRUMB_NAME: Record<Lang, string> = {
  en: "Home",
  de: "Startseite",
  fr: "Accueil",
  es: "Inicio",
  it: "Home",
};

const SHOP_BREADCRUMB_NAME: Record<Lang, string> = {
  en: "Shop",
  de: "Shop",
  fr: "Boutique",
  es: "Tienda",
  it: "Shop",
};

export function getThetisHomeUrl(lang: Lang = "en"): string {
  const language = languages.find((l) => l.code === lang);
  if (!language || language.dir === "/") return `${THETIS_BASE_URL}/`;
  return `${THETIS_BASE_URL}${language.dir}/`;
}

export function getThetisShopIndexUrl(lang: Lang = "en"): string {
  const language = languages.find((l) => l.code === lang);
  if (!language || language.dir === "/") return `${THETIS_BASE_URL}/shop/`;
  return `${THETIS_BASE_URL}${language.dir}/shop/`;
}

export function toAbsoluteThetisUrl(path: string): string {
  if (path.startsWith("http")) return path;
  let normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized !== "/" && !normalized.endsWith("/")) {
    normalized += "/";
  }
  return `${THETIS_BASE_URL}${normalized}`;
}

export interface PageGraphBreadcrumbItem {
  name: string;
  item: string;
}

export function buildSimplePageBreadcrumbItems(
  lang: Lang,
  title: string,
  pageUrl: string,
): PageGraphBreadcrumbItem[] {
  return [
    { name: HOME_BREADCRUMB_NAME[lang], item: getThetisHomeUrl(lang) },
    { name: title, item: pageUrl },
  ];
}

export function buildPageGraphSchema(options: {
  lang: Lang;
  title: string;
  description: string;
  pageUrl: string;
  breadcrumbItems: PageGraphBreadcrumbItem[];
  primaryImageUrl?: string;
  mainEntityId?: string;
  extraNodes?: Record<string, unknown>[];
}) {
  const {
    lang,
    title,
    description,
    pageUrl,
    breadcrumbItems,
    primaryImageUrl,
    mainEntityId,
    extraNodes = [],
  } = options;
  const pageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": pageId,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { "@id": THETIS_WEBSITE_ID },
    about: { "@id": THETIS_ORG_ID },
    inLanguage: LANG_TO_SCHEMA_LANGUAGE[lang],
    breadcrumb: { "@id": breadcrumbId },
    potentialAction: [
      {
        "@type": "ReadAction",
        target: [pageUrl],
      },
    ],
  };

  if (primaryImageUrl) {
    webPage.primaryImageOfPage = {
      "@type": "ImageObject",
      url: primaryImageUrl,
      contentUrl: primaryImageUrl,
    };
  }

  if (mainEntityId) {
    webPage.mainEntity = { "@id": mainEntityId };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage,
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.item,
        })),
      },
      ...extraNodes,
    ],
  };
}

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": THETIS_ORG_ID,
    name: "Thetis Medical",
    legalName: THETIS_COMPANY_ADDRESS.name,
    alternateName: ["Thetis Medical Ltd"],
    url: THETIS_BASE_URL,
    description: ORG_DESCRIPTION,
    slogan: "Sleep Better. Recover Better.",
    logo: {
      "@type": "ImageObject",
      "@id": THETIS_LOGO_ID,
      url: `${THETIS_BASE_URL}/images/dotty-logo.svg`,
      contentUrl: `${THETIS_BASE_URL}/images/dotty-logo.svg`,
      caption: "Thetis Medical logo",
    },
    image: {
      "@type": "ImageObject",
      url: `${THETIS_BASE_URL}/images/night-splint.png`,
      contentUrl: `${THETIS_BASE_URL}/images/night-splint.png`,
      caption: "Achilles Rupture Night Splint by Thetis Medical",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: THETIS_COMPANY_ADDRESS.streetAddress,
      addressLocality: THETIS_COMPANY_ADDRESS.locality,
      postalCode: THETIS_COMPANY_ADDRESS.postalCode,
      addressCountry: "GB",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    knowsAbout: [
      "Achilles tendon rupture",
      "Achilles rupture recovery",
      "Achilles rupture night splint",
      "Walking boot",
      "Plantar fasciitis",
      "Achilles tendinitis",
      "Foot and ankle rehabilitation",
    ],
    brand: {
      "@type": "Brand",
      name: "Thetis Medical",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${THETIS_BASE_URL}/contact`,
      availableLanguage: ["English", "German", "French", "Spanish", "Italian"],
    },
    sameAs: [
      "https://www.linkedin.com/company/thetis-medical-ltd",
      "https://www.instagram.com/thetismedical",
      "https://www.facebook.com/thetismedical",
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": THETIS_WEBSITE_ID,
    name: "Thetis Medical",
    url: THETIS_BASE_URL,
    description: WEBSITE_DESCRIPTION,
    inLanguage: Object.values(LANG_TO_SCHEMA_LANGUAGE),
    publisher: { "@id": THETIS_ORG_ID },
    about: { "@id": THETIS_ORG_ID },
    copyrightHolder: { "@id": THETIS_ORG_ID },
    hasPart: [
      {
        "@type": "WebPage",
        name: "Achilles Rupture Night Splint",
        url: `${THETIS_BASE_URL}/achilles-rupture-splint`,
      },
      {
        "@type": "WebPage",
        name: "Recovery Course",
        url: `${THETIS_BASE_URL}/course`,
      },
      {
        "@type": "WebPage",
        name: "Achilles Rupture Learn Hub",
        url: `${THETIS_BASE_URL}/learn/achilles-rupture`,
      },
    ],
  };
}

export function buildHomeWebPageSchema(options: {
  lang: Lang;
  title: string;
  description: string;
}) {
  const { lang, title, description } = options;
  const pageUrl = getThetisHomeUrl(lang);

  return buildPageGraphSchema({
    lang,
    title,
    description,
    pageUrl,
    primaryImageUrl: `${THETIS_BASE_URL}/images/night-splint.png`,
    breadcrumbItems: [
      { name: HOME_BREADCRUMB_NAME[lang], item: pageUrl },
    ],
  })["@graph"][0];
}

export function buildHomeBreadcrumbSchema(lang: Lang = "en") {
  const pageUrl = getThetisHomeUrl(lang);

  return buildPageGraphSchema({
    lang,
    title: HOME_BREADCRUMB_NAME[lang],
    description: WEBSITE_DESCRIPTION,
    pageUrl,
    breadcrumbItems: [
      { name: HOME_BREADCRUMB_NAME[lang], item: pageUrl },
    ],
  })["@graph"][1];
}

export function buildSiteGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganizationSchema(), buildWebSiteSchema()],
  };
}

export function buildHomePageGraphSchema(options: {
  lang: Lang;
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildHomeWebPageSchema(options),
      buildHomeBreadcrumbSchema(options.lang),
    ],
  };
}

function buildNightSplintProductSchema() {
  return {
    "@type": "Product",
    "@id": NIGHT_SPLINT_PRODUCT_ID,
    name: "Achilles Rupture Night Splint",
    description:
      "Patented night splint for safe Achilles rupture recovery sleep without the walking boot.",
    image: [
      `${THETIS_BASE_URL}/images/night-splint.png`,
      `${THETIS_BASE_URL}/images/night_splint_bed_top_square.jpg`,
    ],
    sku: "7B-QYCY-8JID",
    gtin13: "5065005394047",
    brand: {
      "@type": "Brand",
      name: "Thetis Medical",
    },
    manufacturer: { "@id": THETIS_ORG_ID },
    url: `${THETIS_BASE_URL}/achilles-rupture-splint`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(GLOBAL_REVIEW_AVERAGE),
      reviewCount: String(GLOBAL_REVIEW_COUNT),
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function buildShopConditionPageGraphSchema(options: {
  lang: Lang;
  conditionId: ConditionId;
  title: string;
  description: string;
  pageUrl: string;
}) {
  const { lang, conditionId, title, description, pageUrl } = options;

  return buildPageGraphSchema({
    lang,
    title,
    description,
    pageUrl,
    breadcrumbItems: [
      { name: HOME_BREADCRUMB_NAME[lang], item: getThetisHomeUrl(lang) },
      { name: SHOP_BREADCRUMB_NAME[lang], item: getThetisShopIndexUrl(lang) },
      { name: title, item: pageUrl },
    ],
    extraNodes:
      conditionId === "achilles-rupture"
        ? [buildNightSplintProductSchema()]
        : [],
  });
}

/** Static JSON export for /public/schemas/thetis.json */
export function buildPublicOrganizationJson() {
  return {
    "@context": "https://schema.org",
    ...buildOrganizationSchema(),
  };
}
