import { BookOpen, Calendar, HelpCircle } from "lucide-react";
import type { BaseRoute } from "./types";

const atFaq = (
    slug: string,
    title: Record<string, string>,
): BaseRoute => ({
    conditionId: "achilles-tendinitis",
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
    conditionId: "achilles-tendinitis",
    slug: `guide/achilles-tendinitis/${slug}`,
    title,
    description: desc,
    slugTranslations: {
        en: `guide/achilles-tendinitis/${slug}`,
        de: `leitfaden/achilles-tendinitis/${slug}`,
        fr: `guide/achilles-tendinitis/${slug}`,
        es: `guia/achilles-tendinitis/${slug}`,
        it: `guida/achilles-tendinitis/${slug}`,
    },
    icon: <Calendar />,
});

export const achillesTendinitisGuideRoutes: BaseRoute[] = [
    ph(
        "stage-1",
        {
            en: "Achilles tendinitis — Stage 1: Acute phase (placeholder)",
            de: "Achilles tendinitis — Stage 1: Acute phase (placeholder)",
            fr: "Achilles tendinitis — Stage 1: Acute phase (placeholder)",
            es: "Achilles tendinitis — Stage 1: Acute phase (placeholder)",
            it: "Achilles tendinitis — Stage 1: Acute phase (placeholder)",
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
            en: "Achilles tendinitis — Stage 2: Subacute / loading (placeholder)",
            de: "Achilles tendinitis — Stage 2: Subacute / loading (placeholder)",
            fr: "Achilles tendinitis — Stage 2: Subacute / loading (placeholder)",
            es: "Achilles tendinitis — Stage 2: Subacute / loading (placeholder)",
            it: "Achilles tendinitis — Stage 2: Subacute / loading (placeholder)",
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
            en: "Achilles tendinitis — Stage 3: Strengthening (placeholder)",
            de: "Achilles tendinitis — Stage 3: Strengthening (placeholder)",
            fr: "Achilles tendinitis — Stage 3: Strengthening (placeholder)",
            es: "Achilles tendinitis — Stage 3: Strengthening (placeholder)",
            it: "Achilles tendinitis — Stage 3: Strengthening (placeholder)",
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
            en: "Achilles tendinitis — Stage 4: Return to activity (placeholder)",
            de: "Achilles tendinitis — Stage 4: Return to activity (placeholder)",
            fr: "Achilles tendinitis — Stage 4: Return to activity (placeholder)",
            es: "Achilles tendinitis — Stage 4: Return to activity (placeholder)",
            it: "Achilles tendinitis — Stage 4: Return to activity (placeholder)",
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
            en: "Achilles tendinitis — Stage 5: Maintenance & long-term (placeholder)",
            de: "Achilles tendinitis — Stage 5: Maintenance & long-term (placeholder)",
            fr: "Achilles tendinitis — Stage 5: Maintenance & long-term (placeholder)",
            es: "Achilles tendinitis — Stage 5: Maintenance & long-term (placeholder)",
            it: "Achilles tendinitis — Stage 5: Maintenance & long-term (placeholder)",
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

export const achillesTendinitisGuideHubNavRoute: BaseRoute = {
    conditionId: "achilles-tendinitis",
    slug: "learn/achilles-tendinitis",
    title: {
        en: "Achilles tendinitis — learn",
        de: "Achilles tendinitis — Lernen",
        fr: "Achilles tendinitis — apprendre",
        es: "Achilles tendinitis — aprender",
        it: "Achilles tendinitis — approfondisci",
    },
    description: {
        en: "Course, FAQs, staged patient guides, and shop for Achilles tendinitis.",
        de: "Kurs, FAQs, gestaffelte Leitfäden und Shop.",
        fr: "Cours, FAQ, guides par étapes et boutique.",
        es: "Curso, preguntas frecuentes, guías por fases y tienda.",
        it: "Corso, FAQ, guide per fasi e shop.",
    },
    slugTranslations: {
        en: "learn/achilles-tendinitis",
        de: "learn/achilles-tendinitis",
        fr: "learn/achilles-tendinitis",
        es: "learn/achilles-tendinitis",
        it: "learn/achilles-tendinitis",
    },
    legacySlugs: ["guide/achilles-tendinitis", "leitfaden/achilles-tendinitis"],
    icon: <BookOpen />,
};

export const achillesTendinitisArticleRoutes: BaseRoute[] = [
    atFaq("achilles-tendinitis-overview", {
        en: "Achilles tendinitis — overview (placeholder)",
        de: "Achilles tendinitis — overview (placeholder)",
        fr: "Achilles tendinitis — overview (placeholder)",
        es: "Achilles tendinitis — overview (placeholder)",
        it: "Achilles tendinitis — overview (placeholder)",
    }),
    atFaq("achilles-tendinitis-pain-and-diagnosis", {
        en: "Achilles tendinitis — pain & diagnosis (placeholder)",
        de: "Achilles tendinitis — pain & diagnosis (placeholder)",
        fr: "Achilles tendinitis — pain & diagnosis (placeholder)",
        es: "Achilles tendinitis — pain & diagnosis (placeholder)",
        it: "Achilles tendinitis — pain & diagnosis (placeholder)",
    }),
    atFaq("achilles-tendinitis-load-and-rehab", {
        en: "Achilles tendinitis — load management & rehab (placeholder)",
        de: "Achilles tendinitis — load management & rehab (placeholder)",
        fr: "Achilles tendinitis — load management & rehab (placeholder)",
        es: "Achilles tendinitis — load management & rehab (placeholder)",
        it: "Achilles tendinitis — load management & rehab (placeholder)",
    }),
    atFaq("achilles-tendinitis-return-to-running", {
        en: "Achilles tendinitis — return to running (placeholder)",
        de: "Achilles tendinitis — return to running (placeholder)",
        fr: "Achilles tendinitis — return to running (placeholder)",
        es: "Achilles tendinitis — return to running (placeholder)",
        it: "Achilles tendinitis — return to running (placeholder)",
    }),
];

export const achillesTendinitisCourseRoutes: BaseRoute[] = [
    {
        conditionId: "achilles-tendinitis",
        slug: "course/achilles-tendinitis",
        title: {
            en: "Achilles tendinitis course (placeholder)",
            de: "Achilles tendinitis course (placeholder)",
            fr: "Achilles tendinitis course (placeholder)",
            es: "Achilles tendinitis course (placeholder)",
            it: "Achilles tendinitis course (placeholder)",
        },
        description: {
            en: "Placeholder — content coming soon.",
            de: "Placeholder — content coming soon.",
            fr: "Placeholder — content coming soon.",
            es: "Placeholder — content coming soon.",
            it: "Placeholder — content coming soon.",
        },
        slugTranslations: {
            en: "course/achilles-tendinitis",
            de: "kurs/achilles-tendinitis",
            fr: "cours/achilles-tendinite",
            es: "curso/tendinitis-aquiles",
            it: "corso/tendinite-achille",
        },
        icon: <BookOpen />,
        variant: "default",
    },
];
