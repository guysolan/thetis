import type { Lang } from "@/config/languages";
import type { ConditionId } from "@/content/conditions/registry";
import { getConditionById } from "@/content/conditions/registry";
import {
  ACHILLES_RUPTURE_EN_LEARN_META_DESCRIPTION,
  CONDITION_LEARN_HUB_DESCRIPTION,
  CONDITION_SHOP_HUB_DESCRIPTION,
} from "@/content/condition-hub-copy";

export function getLearnLayoutSeo(
  conditionId: ConditionId,
  lang: Lang,
): { title: string; description: string } {
  const c = getConditionById(conditionId);
  if (conditionId === "achilles-rupture" && lang === "en") {
    return {
      title: "Achilles Rupture Recovery Guide - Week by Week Timeline",
      description: ACHILLES_RUPTURE_EN_LEARN_META_DESCRIPTION,
    };
  }
  const label = c.label;
  const titleByLang: Record<Lang, string> = {
    en: `${label} — learn`,
    de: `${label} — Lernen`,
    fr: `${label} — apprendre`,
    es: `${label} — aprender`,
    it: `${label} — approfondisci`,
  };
  return {
    title: titleByLang[lang],
    description: CONDITION_LEARN_HUB_DESCRIPTION[conditionId][lang],
  };
}

export function getShopLayoutSeo(
  conditionId: ConditionId,
  lang: Lang,
): { title: string; description: string } {
  const c = getConditionById(conditionId);
  const label = c.label;
  const titleByLang: Record<Lang, string> = {
    en: `${label} — shop`,
    de: `${label} — Shop`,
    fr: `${label} — boutique`,
    es: `${label} — tienda`,
    it: `${label} — shop`,
  };
  return {
    title: titleByLang[lang],
    description: CONDITION_SHOP_HUB_DESCRIPTION[conditionId][lang],
  };
}
