import type { Lang } from "@/config/languages";
import type { ConditionId } from "@/content/conditions/registry";
import { getConditionById } from "@/content/conditions/registry";

export function getLearnLayoutSeo(
  conditionId: ConditionId,
  lang: Lang,
): { title: string; description: string } {
  const c = getConditionById(conditionId);
  if (conditionId === "achilles-rupture" && lang === "en") {
    return {
      title: "Achilles Rupture Recovery Guide - Week by Week Timeline",
      description:
        "Complete week-by-week guide to Achilles tendon rupture recovery. From first week to return to sport, learn what to expect at each stage.",
    };
  }
  const label = c.label;
  const t: Record<
    Lang,
    { title: string; description: string }
  > = {
    en: {
      title: `${label} — learn`,
      description:
        `Course, FAQs, patient guides, and shop for ${label.toLowerCase()}.`,
    },
    de: {
      title: `${label} — Lernen`,
      description: `Kurs, FAQs, Patientenleitfäden und Shop: ${label}.`,
    },
    fr: {
      title: `${label} — apprendre`,
      description: `Cours, FAQ, guides et boutique : ${label}.`,
    },
    es: {
      title: `${label} — aprender`,
      description: `Curso, preguntas frecuentes, guías y tienda: ${label}.`,
    },
    it: {
      title: `${label} — approfondisci`,
      description: `Corso, FAQ, guide e shop: ${label}.`,
    },
  };
  return t[lang];
}

export function getShopLayoutSeo(
  conditionId: ConditionId,
  lang: Lang,
): { title: string; description: string } {
  const c = getConditionById(conditionId);
  const label = c.label;
  const t: Record<Lang, { title: string; description: string }> = {
    en: {
      title: `${label} — shop`,
      description:
        `Thetis products and curated recovery gear for ${label.toLowerCase()}.`,
    },
    de: {
      title: `${label} — Shop`,
      description: `Thetis-Produkte und ausgewähltes Equipment: ${label}.`,
    },
    fr: {
      title: `${label} — boutique`,
      description: `Produits Thetis et sélection d'équipement : ${label}.`,
    },
    es: {
      title: `${label} — tienda`,
      description: `Productos Thetis y equipo seleccionado: ${label}.`,
    },
    it: {
      title: `${label} — shop`,
      description: `Prodotti Thetis e attrezzatura selezionata: ${label}.`,
    },
  };
  return t[lang];
}
