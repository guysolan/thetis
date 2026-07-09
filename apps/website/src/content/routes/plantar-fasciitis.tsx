import { BookOpen, Calendar, HelpCircle } from "lucide-react";
import type { BaseRoute } from "./types";
import { CONDITION_LEARN_HUB_DESCRIPTION } from "../condition-hub-copy";
import {
    COMING_SOON_ROUTE_DESCRIPTION,
    PLANTAR_OVERVIEW_ROUTE_DESCRIPTION,
    PLANTAR_STAGE_1_ROUTE_DESCRIPTION,
} from "./coming-soon-copy";

const pfFaq = (
    slug: string,
    title: Record<string, string>,
    desc: Record<string, string> = COMING_SOON_ROUTE_DESCRIPTION,
): BaseRoute => ({
    conditionId: "plantar-fasciitis",
    slug: `FAQs/${slug}`,
    title,
    description: desc,
    slugTranslations: {
        en: `FAQs/${slug}`,
        de: `FAQs/${slug}`,
        fr: `FAQs/${slug}`,
        es: `FAQs/${slug}`,
        it: `FAQs/${slug}`,
    },
    icon: <HelpCircle />,
});

const ph = (
    slug: string,
    title: Record<string, string>,
    desc: Record<string, string>,
): BaseRoute => ({
    conditionId: "plantar-fasciitis",
    slug: `guide/plantar-fasciitis/${slug}`,
    title,
    description: desc,
    slugTranslations: {
        en: `guide/plantar-fasciitis/${slug}`,
        de: `leitfaden/plantar-fasciitis/${slug}`,
        fr: `guide/plantar-fasciitis/${slug}`,
        es: `guia/plantar-fasciitis/${slug}`,
        it: `guida/plantar-fasciitis/${slug}`,
    },
    icon: <Calendar />,
});

/** On-site guide stages — plantar fasciitis */
export const plantarFasciitisGuideRoutes: BaseRoute[] = [
    ph(
        "stage-1",
        {
            en: "Plantar fasciitis — Stage 1: Foundation",
            de: "Plantar fasciitis — Stage 1: Foundation",
            fr: "Plantar fasciitis — Stage 1: Foundation",
            es: "Plantar fasciitis — Stage 1: Foundation",
            it: "Plantar fasciitis — Stage 1: Foundation",
        },
        PLANTAR_STAGE_1_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-2",
        {
            en: "Plantar fasciitis — Stage 2: Subacute / loading",
            de: "Plantar fasciitis — Stage 2: Subacute / loading",
            fr: "Plantar fasciitis — Stage 2: Subacute / loading",
            es: "Plantar fasciitis — Stage 2: Subacute / loading",
            it: "Plantar fasciitis — Stage 2: Subacute / loading",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-3",
        {
            en: "Plantar fasciitis — Stage 3: Strengthening",
            de: "Plantar fasciitis — Stage 3: Strengthening",
            fr: "Plantar fasciitis — Stage 3: Strengthening",
            es: "Plantar fasciitis — Stage 3: Strengthening",
            it: "Plantar fasciitis — Stage 3: Strengthening",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-4",
        {
            en: "Plantar fasciitis — Stage 4: Return to activity",
            de: "Plantar fasciitis — Stage 4: Return to activity",
            fr: "Plantar fasciitis — Stage 4: Return to activity",
            es: "Plantar fasciitis — Stage 4: Return to activity",
            it: "Plantar fasciitis — Stage 4: Return to activity",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-5",
        {
            en: "Plantar fasciitis — Stage 5: Maintenance & long-term",
            de: "Plantar fasciitis — Stage 5: Maintenance & long-term",
            fr: "Plantar fasciitis — Stage 5: Maintenance & long-term",
            es: "Plantar fasciitis — Stage 5: Maintenance & long-term",
            it: "Plantar fasciitis — Stage 5: Maintenance & long-term",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
];

/** Learn hub — nav/footer for this condition. */
export const plantarFasciitisGuideHubNavRoute: BaseRoute = {
    conditionId: "plantar-fasciitis",
    slug: "learn/plantar-fasciitis",
    title: {
        en: "Plantar fasciitis — learn",
        de: "Plantar fasciitis — Lernen",
        fr: "Plantar fasciitis — apprendre",
        es: "Plantar fasciitis — aprender",
        it: "Plantar fasciitis — approfondisci",
    },
    description: CONDITION_LEARN_HUB_DESCRIPTION["plantar-fasciitis"],
    slugTranslations: {
        en: "learn/plantar-fasciitis",
        de: "learn/plantar-fasciitis",
        fr: "learn/plantar-fasciitis",
        es: "learn/plantar-fasciitis",
        it: "learn/plantar-fasciitis",
    },
    legacySlugs: ["guide/plantar-fasciitis", "leitfaden/plantar-fasciitis"],
    icon: <BookOpen />,
};

/** FAQ routes — plantar fasciitis */
export const plantarFasciitisArticleRoutes: BaseRoute[] = [
    pfFaq(
        "plantar-fasciitis-overview",
        {
            en: "Plantar fasciitis — overview",
            de: "Plantar fasciitis — overview",
            fr: "Plantar fasciitis — overview",
            es: "Plantar fasciitis — overview",
            it: "Plantar fasciitis — overview",
        },
        PLANTAR_OVERVIEW_ROUTE_DESCRIPTION,
    ),
    pfFaq("plantar-fasciitis-diagnosis-and-symptoms", {
        en: "Plantar fasciitis — diagnosis & symptoms",
        de: "Plantar fasciitis — diagnosis & symptoms",
        fr: "Plantar fasciitis — diagnosis & symptoms",
        es: "Plantar fasciitis — diagnosis & symptoms",
        it: "Plantar fasciitis — diagnosis & symptoms",
    }),
    pfFaq("plantar-fasciitis-treatment-and-footwear", {
        en: "Plantar fasciitis — treatment & footwear",
        de: "Plantar fasciitis — treatment & footwear",
        fr: "Plantar fasciitis — treatment & footwear",
        es: "Plantar fasciitis — treatment & footwear",
        it: "Plantar fasciitis — treatment & footwear",
    }),
    pfFaq("plantar-fasciitis-exercises-and-return", {
        en: "Plantar fasciitis — exercises & return to activity",
        de: "Plantar fasciitis — exercises & return to activity",
        fr: "Plantar fasciitis — exercises & return to activity",
        es: "Plantar fasciitis — exercises & return to activity",
        it: "Plantar fasciitis — exercises & return to activity",
    }),
];

export const plantarFasciitisCourseRoutes: BaseRoute[] = [
    {
        conditionId: "plantar-fasciitis",
        slug: "course/plantar-fasciitis",
        title: {
            en: "Plantar fasciitis course",
            de: "Kurs: Plantarfasziitis",
            fr: "Cours fasciite plantaire",
            es: "Curso de fascitis plantar",
            it: "Corso fascite plantare",
        },
        description: {
            en: "Stretching, loading, footwear, and treatment steps you can follow at home — instant access after checkout.",
            de: "Dehnung, Belastung, Schuhwerk und Behandlungsschritte für zu Hause — sofortiger Zugang nach dem Kauf.",
            fr: "Étirements, charge, chaussures et traitement à la maison — accès immédiat après l’achat.",
            es: "Estiramientos, carga, calzado y tratamiento en casa — acceso inmediato tras el pago.",
            it: "Stretching, carico, calzature e trattamento a casa — accesso immediato dopo l’acquisto.",
        },
        slugTranslations: {
            en: "course/plantar-fasciitis",
            de: "kurs/plantar-fasciitis",
            fr: "cours/plantar-fasciitis",
            es: "curso/plantar-fasciitis",
            it: "corso/plantar-fasciitis",
        },
        icon: <BookOpen />,
        variant: "default",
    },
];
