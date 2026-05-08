import { BookOpen, Calendar, HelpCircle } from "lucide-react";
import type { BaseRoute } from "./types";

const iatFaq = (
    slug: string,
    title: Record<string, string>,
): BaseRoute => ({
    conditionId: "insertional-achilles-tendonitis",
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
    conditionId: "insertional-achilles-tendonitis",
    slug: `guide/insertional-achilles-tendonitis/${slug}`,
    title,
    description: desc,
    slugTranslations: {
        en: `guide/insertional-achilles-tendonitis/${slug}`,
        de: `leitfaden/insertional-achilles-tendonitis/${slug}`,
        fr: `guide/insertional-achilles-tendonitis/${slug}`,
        es: `guia/insertional-achilles-tendonitis/${slug}`,
        it: `guida/insertional-achilles-tendonitis/${slug}`,
    },
    icon: <Calendar />,
});

export const insertionalAchillesTendonitisGuideRoutes: BaseRoute[] = [
    ph(
        "stage-1",
        {
            en: "Insertional Achilles tendonitis — Stage 1: Acute phase (placeholder)",
            de: "Insertional Achilles tendonitis — Stage 1: Acute phase (placeholder)",
            fr: "Insertional Achilles tendonitis — Stage 1: Acute phase (placeholder)",
            es: "Insertional Achilles tendonitis — Stage 1: Acute phase (placeholder)",
            it: "Insertional Achilles tendonitis — Stage 1: Acute phase (placeholder)",
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
            en: "Insertional Achilles tendonitis — Stage 2: Subacute / loading (placeholder)",
            de: "Insertional Achilles tendonitis — Stage 2: Subacute / loading (placeholder)",
            fr: "Insertional Achilles tendonitis — Stage 2: Subacute / loading (placeholder)",
            es: "Insertional Achilles tendonitis — Stage 2: Subacute / loading (placeholder)",
            it: "Insertional Achilles tendonitis — Stage 2: Subacute / loading (placeholder)",
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
            en: "Insertional Achilles tendonitis — Stage 3: Strengthening (placeholder)",
            de: "Insertional Achilles tendonitis — Stage 3: Strengthening (placeholder)",
            fr: "Insertional Achilles tendonitis — Stage 3: Strengthening (placeholder)",
            es: "Insertional Achilles tendonitis — Stage 3: Strengthening (placeholder)",
            it: "Insertional Achilles tendonitis — Stage 3: Strengthening (placeholder)",
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
            en: "Insertional Achilles tendonitis — Stage 4: Return to activity (placeholder)",
            de: "Insertional Achilles tendonitis — Stage 4: Return to activity (placeholder)",
            fr: "Insertional Achilles tendonitis — Stage 4: Return to activity (placeholder)",
            es: "Insertional Achilles tendonitis — Stage 4: Return to activity (placeholder)",
            it: "Insertional Achilles tendonitis — Stage 4: Return to activity (placeholder)",
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
            en: "Insertional Achilles tendonitis — Stage 5: Maintenance & long-term (placeholder)",
            de: "Insertional Achilles tendonitis — Stage 5: Maintenance & long-term (placeholder)",
            fr: "Insertional Achilles tendonitis — Stage 5: Maintenance & long-term (placeholder)",
            es: "Insertional Achilles tendonitis — Stage 5: Maintenance & long-term (placeholder)",
            it: "Insertional Achilles tendonitis — Stage 5: Maintenance & long-term (placeholder)",
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

export const insertionalAchillesTendonitisGuideHubNavRoute: BaseRoute = {
    conditionId: "insertional-achilles-tendonitis",
    slug: "learn/insertional-achilles-tendonitis",
    title: {
        en: "Insertional Achilles tendonitis — learn",
        de: "Insertional Achilles tendonitis — Lernen",
        fr: "Insertional Achilles tendonitis — apprendre",
        es: "Insertional Achilles tendonitis — aprender",
        it: "Insertional Achilles tendonitis — approfondisci",
    },
    description: {
        en: "Course, FAQs, staged patient guides, and shop for insertional Achilles tendonitis.",
        de: "Kurs, FAQs, gestaffelte Leitfäden und Shop.",
        fr: "Cours, FAQ, guides par étapes et boutique.",
        es: "Curso, preguntas frecuentes, guías por fases y tienda.",
        it: "Corso, FAQ, guide per fasi e shop.",
    },
    slugTranslations: {
        en: "learn/insertional-achilles-tendonitis",
        de: "learn/insertional-achilles-tendonitis",
        fr: "learn/insertional-achilles-tendonitis",
        es: "learn/insertional-achilles-tendonitis",
        it: "learn/insertional-achilles-tendonitis",
    },
    legacySlugs: [
        "guide/insertional-achilles-tendonitis",
        "leitfaden/insertional-achilles-tendonitis",
    ],
    icon: <BookOpen />,
};

export const insertionalAchillesTendonitisArticleRoutes: BaseRoute[] = [
    iatFaq("insertional-achilles-tendonitis-overview", {
        en: "Insertional Achilles tendonitis — overview (placeholder)",
        de: "Insertional Achilles tendonitis — overview (placeholder)",
        fr: "Insertional Achilles tendonitis — overview (placeholder)",
        es: "Insertional Achilles tendonitis — overview (placeholder)",
        it: "Insertional Achilles tendonitis — overview (placeholder)",
    }),
    iatFaq("insertional-achilles-tendonitis-heel-pain-and-causes", {
        en: "Insertional tendonitis — heel pain & causes (placeholder)",
        de: "Insertional tendonitis — heel pain & causes (placeholder)",
        fr: "Insertional tendonitis — heel pain & causes (placeholder)",
        es: "Insertional tendonitis — heel pain & causes (placeholder)",
        it: "Insertional tendonitis — heel pain & causes (placeholder)",
    }),
    iatFaq("insertional-achilles-tendonitis-treatment-and-footwear", {
        en: "Insertional tendonitis — treatment & footwear (placeholder)",
        de: "Insertional tendonitis — treatment & footwear (placeholder)",
        fr: "Insertional tendonitis — treatment & footwear (placeholder)",
        es: "Insertional tendonitis — treatment & footwear (placeholder)",
        it: "Insertional tendonitis — treatment & footwear (placeholder)",
    }),
    iatFaq("insertional-achilles-tendonitis-exercises-and-loading", {
        en: "Insertional tendonitis — exercises & loading (placeholder)",
        de: "Insertional tendonitis — exercises & loading (placeholder)",
        fr: "Insertional tendonitis — exercises & loading (placeholder)",
        es: "Insertional tendonitis — exercises & loading (placeholder)",
        it: "Insertional tendonitis — exercises & loading (placeholder)",
    }),
    iatFaq("insertional-achilles-tendonitis-surgery-when-considered", {
        en: "Insertional tendonitis — when surgery is considered (placeholder)",
        de: "Insertional tendonitis — when surgery is considered (placeholder)",
        fr: "Insertional tendonitis — when surgery is considered (placeholder)",
        es: "Insertional tendonitis — when surgery is considered (placeholder)",
        it: "Insertional tendonitis — when surgery is considered (placeholder)",
    }),
];

export const insertionalAchillesTendonitisCourseRoutes: BaseRoute[] = [
    {
        conditionId: "insertional-achilles-tendonitis",
        slug: "course/insertional-achilles-tendonitis",
        title: {
            en: "Insertional Achilles tendonitis course (placeholder)",
            de: "Insertional Achilles tendonitis course (placeholder)",
            fr: "Insertional Achilles tendonitis course (placeholder)",
            es: "Insertional Achilles tendonitis course (placeholder)",
            it: "Insertional Achilles tendonitis course (placeholder)",
        },
        description: {
            en: "Placeholder — content coming soon.",
            de: "Placeholder — content coming soon.",
            fr: "Placeholder — content coming soon.",
            es: "Placeholder — content coming soon.",
            it: "Placeholder — content coming soon.",
        },
        slugTranslations: {
            en: "course/insertional-achilles-tendonitis",
            de: "kurs/insertionelle-achillessehnenentzundung",
            fr: "cours/tendinite-achille-insertionnelle",
            es: "curso/tendinitis-aquiles-insercional",
            it: "corso/tendinite-achille-inserzionale",
        },
        icon: <BookOpen />,
        variant: "default",
    },
];
