import { BookOpen, Calendar, HelpCircle } from "lucide-react";
import type { BaseRoute } from "./types";
import { CONDITION_LEARN_HUB_DESCRIPTION } from "../condition-hub-copy";
import { COMING_SOON_ROUTE_DESCRIPTION } from "./coming-soon-copy";

const iatFaq = (
    slug: string,
    title: Record<string, string>,
): BaseRoute => ({
    conditionId: "insertional-achilles-tendonitis",
    slug: `FAQs/${slug}`,
    title,
    description: COMING_SOON_ROUTE_DESCRIPTION,
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
            en: "Insertional Achilles tendonitis — Stage 1: Acute phase",
            de: "Insertional Achilles tendonitis — Stage 1: Acute phase",
            fr: "Insertional Achilles tendonitis — Stage 1: Acute phase",
            es: "Insertional Achilles tendonitis — Stage 1: Acute phase",
            it: "Insertional Achilles tendonitis — Stage 1: Acute phase",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-2",
        {
            en: "Insertional Achilles tendonitis — Stage 2: Subacute / loading",
            de: "Insertional Achilles tendonitis — Stage 2: Subacute / loading",
            fr: "Insertional Achilles tendonitis — Stage 2: Subacute / loading",
            es: "Insertional Achilles tendonitis — Stage 2: Subacute / loading",
            it: "Insertional Achilles tendonitis — Stage 2: Subacute / loading",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-3",
        {
            en: "Insertional Achilles tendonitis — Stage 3: Strengthening",
            de: "Insertional Achilles tendonitis — Stage 3: Strengthening",
            fr: "Insertional Achilles tendonitis — Stage 3: Strengthening",
            es: "Insertional Achilles tendonitis — Stage 3: Strengthening",
            it: "Insertional Achilles tendonitis — Stage 3: Strengthening",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-4",
        {
            en: "Insertional Achilles tendonitis — Stage 4: Return to activity",
            de: "Insertional Achilles tendonitis — Stage 4: Return to activity",
            fr: "Insertional Achilles tendonitis — Stage 4: Return to activity",
            es: "Insertional Achilles tendonitis — Stage 4: Return to activity",
            it: "Insertional Achilles tendonitis — Stage 4: Return to activity",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-5",
        {
            en: "Insertional Achilles tendonitis — Stage 5: Maintenance & long-term",
            de: "Insertional Achilles tendonitis — Stage 5: Maintenance & long-term",
            fr: "Insertional Achilles tendonitis — Stage 5: Maintenance & long-term",
            es: "Insertional Achilles tendonitis — Stage 5: Maintenance & long-term",
            it: "Insertional Achilles tendonitis — Stage 5: Maintenance & long-term",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
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
    description: CONDITION_LEARN_HUB_DESCRIPTION["insertional-achilles-tendonitis"],
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
        en: "Insertional Achilles tendonitis — overview",
        de: "Insertional Achilles tendonitis — overview",
        fr: "Insertional Achilles tendonitis — overview",
        es: "Insertional Achilles tendonitis — overview",
        it: "Insertional Achilles tendonitis — overview",
    }),
    iatFaq("insertional-achilles-tendonitis-heel-pain-and-causes", {
        en: "Insertional tendonitis — heel pain & causes",
        de: "Insertional tendonitis — heel pain & causes",
        fr: "Insertional tendonitis — heel pain & causes",
        es: "Insertional tendonitis — heel pain & causes",
        it: "Insertional tendonitis — heel pain & causes",
    }),
    iatFaq("insertional-achilles-tendonitis-treatment-and-footwear", {
        en: "Insertional tendonitis — treatment & footwear",
        de: "Insertional tendonitis — treatment & footwear",
        fr: "Insertional tendonitis — treatment & footwear",
        es: "Insertional tendonitis — treatment & footwear",
        it: "Insertional tendonitis — treatment & footwear",
    }),
    iatFaq("insertional-achilles-tendonitis-exercises-and-loading", {
        en: "Insertional tendonitis — exercises & loading",
        de: "Insertional tendonitis — exercises & loading",
        fr: "Insertional tendonitis — exercises & loading",
        es: "Insertional tendonitis — exercises & loading",
        it: "Insertional tendonitis — exercises & loading",
    }),
    iatFaq("insertional-achilles-tendonitis-surgery-when-considered", {
        en: "Insertional tendonitis — when surgery is considered",
        de: "Insertional tendonitis — when surgery is considered",
        fr: "Insertional tendonitis — when surgery is considered",
        es: "Insertional tendonitis — when surgery is considered",
        it: "Insertional tendonitis — when surgery is considered",
    }),
];

export const insertionalAchillesTendonitisCourseRoutes: BaseRoute[] = [
    {
        conditionId: "insertional-achilles-tendonitis",
        slug: "course/insertional-achilles-tendonitis",
        title: {
            en: "Insertional Achilles tendonitis course",
            de: "Kurs: insertionelle Achillessehnenentzündung",
            fr: "Cours tendinite d’Achille insertionnelle",
            es: "Curso de tendinitis insercional de Aquiles",
            it: "Corso tendinite achillea inserzionale",
        },
        description: {
            en: "Full course coming soon — free guides and FAQs are available on the learn hub now.",
            de: "Vollständiger Kurs folgt — kostenlose Leitfäden und FAQs gibt es jetzt im Lern-Hub.",
            fr: "Cours complet bientôt — guides et FAQ gratuits dès maintenant dans l’espace d’apprentissage.",
            es: "Curso completo próximamente — guías y preguntas frecuentes gratuitas ya en el centro de aprendizaje.",
            it: "Corso completo in arrivo — guide e FAQ gratuite già disponibili nell’area learning.",
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
