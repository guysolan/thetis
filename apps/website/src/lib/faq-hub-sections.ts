import type { Lang } from "@/config/languages";
import { articleRoutes } from "@/content/routes";
import type { BaseRoute } from "@/content/routes/types";
import { conditions } from "@/content/conditions/registry";

export interface FAQHubSection {
  title: string;
  links: Array<{ href: string; text: string }>;
  readMoreLink: string;
}

function localizedArticleHref(baseRoute: BaseRoute, lang: Lang): string {
  const translatedSlug = baseRoute.slugTranslations?.[lang] || baseRoute.slug;
  return lang === "en" ? `/${translatedSlug}` : `/${lang}/${translatedSlug}`;
}

/** One hub section per FAQ article, ordered by condition registry then route order. */
export function buildFaqHubSections(lang: Lang): FAQHubSection[] {
  const sections: FAQHubSection[] = [];

  for (const c of conditions) {
    const routes = articleRoutes.filter((r) => r.conditionId === c.id);
    for (const route of routes) {
      const hrefBase = localizedArticleHref(route, lang);
      const title = route.title[lang] || route.title.en;
      const sq = route.subQuestions?.[lang] || route.subQuestions?.en || {};
      const keys = Object.keys(sq).sort();
      if (keys.length === 0) {
        sections.push({
          title,
          links: [{ href: hrefBase, text: title }],
          readMoreLink: hrefBase,
        });
        continue;
      }
      sections.push({
        title,
        links: keys.map((k) => ({
          href: `${hrefBase}#${k}`,
          text: String((sq as Record<string, string>)[k] ?? k),
        })),
        readMoreLink: hrefBase,
      });
    }
  }

  return sections;
}
