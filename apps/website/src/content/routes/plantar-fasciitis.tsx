import { BookOpen, Calendar, HelpCircle } from "lucide-react";
import type { BaseRoute } from "./types";

const pfFaq = (
    slug: string,
    title: Record<string, string>,
): BaseRoute => ({
    conditionId: "plantar-fasciitis",
    slug: `FAQs/${slug}`,
    title,
    description: {
        en: "Placeholder — content coming soon.",
        de: "Placeholder — content coming soon.",
        fr: "Placeholder — content coming soon.",
        es: "Placeholder — content coming soon.",
        it: "Placeholder — content coming soon.",
    },
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
            en: "Plantar fasciitis — Stage 1: Acute phase (placeholder)",
            de: "Plantar fasciitis — Stage 1: Acute phase (placeholder)",
            fr: "Plantar fasciitis — Stage 1: Acute phase (placeholder)",
            es: "Plantar fasciitis — Stage 1: Acute phase (placeholder)",
            it: "Plantar fasciitis — Stage 1: Acute phase (placeholder)",
        },
        {
            en: "Placeholder — content coming soon.",
            de: "Placeholder — content coming soon.",
            fr: "Placeholder — content coming soon.",
            es: "Placeholder — content coming soon.",
            it: "Placeholder — content coming soon.",
        },
    ),
    ph(
        "stage-2",
        {
            en: "Plantar fasciitis — Stage 2: Subacute / loading (placeholder)",
            de: "Plantar fasciitis — Stage 2: Subacute / loading (placeholder)",
            fr: "Plantar fasciitis — Stage 2: Subacute / loading (placeholder)",
            es: "Plantar fasciitis — Stage 2: Subacute / loading (placeholder)",
            it: "Plantar fasciitis — Stage 2: Subacute / loading (placeholder)",
        },
        {
            en: "Placeholder — content coming soon.",
            de: "Placeholder — content coming soon.",
            fr: "Placeholder — content coming soon.",
            es: "Placeholder — content coming soon.",
            it: "Placeholder — content coming soon.",
        },
    ),
    ph(
        "stage-3",
        {
            en: "Plantar fasciitis — Stage 3: Strengthening (placeholder)",
            de: "Plantar fasciitis — Stage 3: Strengthening (placeholder)",
            fr: "Plantar fasciitis — Stage 3: Strengthening (placeholder)",
            es: "Plantar fasciitis — Stage 3: Strengthening (placeholder)",
            it: "Plantar fasciitis — Stage 3: Strengthening (placeholder)",
        },
        {
            en: "Placeholder — content coming soon.",
            de: "Placeholder — content coming soon.",
            fr: "Placeholder — content coming soon.",
            es: "Placeholder — content coming soon.",
            it: "Placeholder — content coming soon.",
        },
    ),
    ph(
        "stage-4",
        {
            en: "Plantar fasciitis — Stage 4: Return to activity (placeholder)",
            de: "Plantar fasciitis — Stage 4: Return to activity (placeholder)",
            fr: "Plantar fasciitis — Stage 4: Return to activity (placeholder)",
            es: "Plantar fasciitis — Stage 4: Return to activity (placeholder)",
            it: "Plantar fasciitis — Stage 4: Return to activity (placeholder)",
        },
        {
            en: "Placeholder — content coming soon.",
            de: "Placeholder — content coming soon.",
            fr: "Placeholder — content coming soon.",
            es: "Placeholder — content coming soon.",
            it: "Placeholder — content coming soon.",
        },
    ),
    ph(
        "stage-5",
        {
            en: "Plantar fasciitis — Stage 5: Maintenance & long-term (placeholder)",
            de: "Plantar fasciitis — Stage 5: Maintenance & long-term (placeholder)",
            fr: "Plantar fasciitis — Stage 5: Maintenance & long-term (placeholder)",
            es: "Plantar fasciitis — Stage 5: Maintenance & long-term (placeholder)",
            it: "Plantar fasciitis — Stage 5: Maintenance & long-term (placeholder)",
        },
        {
            en: "Placeholder — content coming soon.",
            de: "Placeholder — content coming soon.",
            fr: "Placeholder — content coming soon.",
            es: "Placeholder — content coming soon.",
            it: "Placeholder — content coming soon.",
        },
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
    description: {
        en: "Course, FAQs, staged patient guides, and shop for plantar fasciitis.",
        de: "Kurs, FAQs, gestaffelte Leitfäden und Shop bei Plantarfasziitis.",
        fr: "Cours, FAQ, guides par étapes et boutique.",
        es: "Curso, preguntas frecuentes, guías por fases y tienda.",
        it: "Corso, FAQ, guide per fasi e shop.",
    },
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

/** FAQ / article routes — plantar fasciitis (4 placeholders) */
export const plantarFasciitisArticleRoutes: BaseRoute[] = [
    pfFaq("plantar-fasciitis-overview", {
        en: "Plantar fasciitis — overview (placeholder)",
        de: "Plantar fasciitis — overview (placeholder)",
        fr: "Plantar fasciitis — overview (placeholder)",
        es: "Plantar fasciitis — overview (placeholder)",
        it: "Plantar fasciitis — overview (placeholder)",
    }),
    pfFaq("plantar-fasciitis-diagnosis-and-symptoms", {
        en: "Plantar fasciitis — diagnosis & symptoms (placeholder)",
        de: "Plantar fasciitis — diagnosis & symptoms (placeholder)",
        fr: "Plantar fasciitis — diagnosis & symptoms (placeholder)",
        es: "Plantar fasciitis — diagnosis & symptoms (placeholder)",
        it: "Plantar fasciitis — diagnosis & symptoms (placeholder)",
    }),
    pfFaq("plantar-fasciitis-treatment-and-footwear", {
        en: "Plantar fasciitis — treatment & footwear (placeholder)",
        de: "Plantar fasciitis — treatment & footwear (placeholder)",
        fr: "Plantar fasciitis — treatment & footwear (placeholder)",
        es: "Plantar fasciitis — treatment & footwear (placeholder)",
        it: "Plantar fasciitis — treatment & footwear (placeholder)",
    }),
    pfFaq("plantar-fasciitis-exercises-and-return", {
        en: "Plantar fasciitis — exercises & return to activity (placeholder)",
        de: "Plantar fasciitis — exercises & return to activity (placeholder)",
        fr: "Plantar fasciitis — exercises & return to activity (placeholder)",
        es: "Plantar fasciitis — exercises & return to activity (placeholder)",
        it: "Plantar fasciitis — exercises & return to activity (placeholder)",
    }),
];

export const plantarFasciitisCourseRoutes: BaseRoute[] = [
    {
        conditionId: "plantar-fasciitis",
        slug: "course/plantar-fasciitis",
        title: {
            en: "Plantar fasciitis course (placeholder)",
            de: "Plantar fasciitis course (placeholder)",
            fr: "Plantar fasciitis course (placeholder)",
            es: "Plantar fasciitis course (placeholder)",
            it: "Plantar fasciitis course (placeholder)",
        },
        description: {
            en: "Placeholder — content coming soon.",
            de: "Placeholder — content coming soon.",
            fr: "Placeholder — content coming soon.",
            es: "Placeholder — content coming soon.",
            it: "Placeholder — content coming soon.",
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
