import type { Lang } from "@/config/languages";
import { languages } from "@/config/languages";
import { type ConditionId, conditions } from "@/content/conditions/registry";
import {
  generateRouteForLanguage,
  getArticleRoutesByConditionId,
  getHubBaseRouteForCondition,
  getRecoveryPhaseRoutesForCondition,
  getRouteBySlugAndLanguage,
  getShopBaseRouteForCondition,
} from "@/content/routes";
import type { Route } from "@/content/routes/types";

export type { ConditionId };

export interface ConditionNavGroup {
  id: ConditionId;
  label: string;
  shortLabel: string;
  hubRoute: Route;
  faqRoutes: Route[];
  /** All guide step pages (weeks or stages). */
  guideStepRoutes: Route[];
}

/** Localized FAQ + recovery-phase links grouped by condition (for nav, footer). */
/** Localized learn hub URL (uses route slug translations + language prefix). */
export function getLocalizedLearnHubHref(
  lang: Lang,
  conditionId: ConditionId,
): string {
  const language = languages.find((l) => l.code === lang);
  if (!language) return "/learn";
  return generateRouteForLanguage(
    getHubBaseRouteForCondition(conditionId),
    language,
  ).href;
}

/** Localized shop hub URL. */
export function getLocalizedShopHubHref(
  lang: Lang,
  conditionId: ConditionId,
): string {
  const language = languages.find((l) => l.code === lang);
  if (!language) return "/shop";
  return generateRouteForLanguage(
    getShopBaseRouteForCondition(conditionId),
    language,
  ).href;
}

/** Canonical `route.slug` for the paid course tied to each condition (shop CTA). */
const SHOP_COURSE_SLUG_BY_CONDITION: Record<ConditionId, string> = {
  "achilles-rupture": "course",
  "plantar-fasciitis": "course/plantar-fasciitis",
  "achilles-tendinitis": "course/achilles-tendinitis",
  "insertional-achilles-tendonitis": "course/insertional-achilles-tendonitis",
};

/** Localized href to buy the course for this condition, or undefined if unmapped. */
export function getLocalizedCourseBuyHrefForCondition(
  lang: Lang,
  conditionId: ConditionId,
): string | undefined {
  const slug = SHOP_COURSE_SLUG_BY_CONDITION[conditionId];
  return getRouteBySlugAndLanguage(slug, lang)?.href;
}

/** Full localized course route for shop “From Thetis” cards, or null if unmapped. */
export function getCourseRouteForShopCondition(
  lang: Lang,
  conditionId: ConditionId,
): Route | null {
  const slug = SHOP_COURSE_SLUG_BY_CONDITION[conditionId];
  return getRouteBySlugAndLanguage(slug, lang) ?? null;
}

export function getConditionNavGroups(lang: Lang): ConditionNavGroup[] {
  const language = languages.find((l) => l.code === lang);
  if (!language) return [];

  return conditions.map((c) => {
    const faqBase = getArticleRoutesByConditionId(c.id);
    const stepBase = getRecoveryPhaseRoutesForCondition(c.id);
    return {
      id: c.id,
      label: c.label,
      shortLabel: c.shortLabel,
      hubRoute: generateRouteForLanguage(
        getHubBaseRouteForCondition(c.id),
        language,
      ),
      faqRoutes: faqBase.map((r) => generateRouteForLanguage(r, language)),
      guideStepRoutes: stepBase.map((r) =>
        generateRouteForLanguage(r, language)
      ),
    };
  });
}
