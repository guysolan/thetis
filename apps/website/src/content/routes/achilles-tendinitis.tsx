import { BookOpen, Calendar, HelpCircle } from "lucide-react";
import type { BaseRoute } from "./types";
import { CONDITION_LEARN_HUB_DESCRIPTION } from "../condition-hub-copy";
import { COMING_SOON_ROUTE_DESCRIPTION } from "./coming-soon-copy";

const atFaq = (
    slug: string,
    title: Record<string, string>,
): BaseRoute => ({
    conditionId: "achilles-tendinitis",
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
            en: "Achilles tendinitis — Stage 1: Acute phase",
            de: "Achilles tendinitis — Stage 1: Acute phase",
            fr: "Achilles tendinitis — Stage 1: Acute phase",
            es: "Achilles tendinitis — Stage 1: Acute phase",
            it: "Achilles tendinitis — Stage 1: Acute phase",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-2",
        {
            en: "Achilles tendinitis — Stage 2: Subacute / loading",
            de: "Achilles tendinitis — Stage 2: Subacute / loading",
            fr: "Achilles tendinitis — Stage 2: Subacute / loading",
            es: "Achilles tendinitis — Stage 2: Subacute / loading",
            it: "Achilles tendinitis — Stage 2: Subacute / loading",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-3",
        {
            en: "Achilles tendinitis — Stage 3: Strengthening",
            de: "Achilles tendinitis — Stage 3: Strengthening",
            fr: "Achilles tendinitis — Stage 3: Strengthening",
            es: "Achilles tendinitis — Stage 3: Strengthening",
            it: "Achilles tendinitis — Stage 3: Strengthening",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-4",
        {
            en: "Achilles tendinitis — Stage 4: Return to activity",
            de: "Achilles tendinitis — Stage 4: Return to activity",
            fr: "Achilles tendinitis — Stage 4: Return to activity",
            es: "Achilles tendinitis — Stage 4: Return to activity",
            it: "Achilles tendinitis — Stage 4: Return to activity",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
    ),
    ph(
        "stage-5",
        {
            en: "Achilles tendinitis — Stage 5: Maintenance & long-term",
            de: "Achilles tendinitis — Stage 5: Maintenance & long-term",
            fr: "Achilles tendinitis — Stage 5: Maintenance & long-term",
            es: "Achilles tendinitis — Stage 5: Maintenance & long-term",
            it: "Achilles tendinitis — Stage 5: Maintenance & long-term",
        },
        COMING_SOON_ROUTE_DESCRIPTION,
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
    description: CONDITION_LEARN_HUB_DESCRIPTION["achilles-tendinitis"],
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
        en: "Achilles tendinitis — overview",
        de: "Achilles tendinitis — overview",
        fr: "Achilles tendinitis — overview",
        es: "Achilles tendinitis — overview",
        it: "Achilles tendinitis — overview",
    }),
    atFaq("achilles-tendinitis-pain-and-diagnosis", {
        en: "Achilles tendinitis — pain & diagnosis",
        de: "Achilles tendinitis — pain & diagnosis",
        fr: "Achilles tendinitis — pain & diagnosis",
        es: "Achilles tendinitis — pain & diagnosis",
        it: "Achilles tendinitis — pain & diagnosis",
    }),
    atFaq("achilles-tendinitis-load-and-rehab", {
        en: "Achilles tendinitis — load management & rehab",
        de: "Achilles tendinitis — load management & rehab",
        fr: "Achilles tendinitis — load management & rehab",
        es: "Achilles tendinitis — load management & rehab",
        it: "Achilles tendinitis — load management & rehab",
    }),
    atFaq("achilles-tendinitis-return-to-running", {
        en: "Achilles tendinitis — return to running",
        de: "Achilles tendinitis — return to running",
        fr: "Achilles tendinitis — return to running",
        es: "Achilles tendinitis — return to running",
        it: "Achilles tendinitis — return to running",
    }),
];

export const achillesTendinitisCourseRoutes: BaseRoute[] = [
    {
        conditionId: "achilles-tendinitis",
        slug: "course/achilles-tendinitis",
        title: {
            en: "Achilles tendinitis course",
            de: "Kurs: Achilles-Tendinitis",
            fr: "Cours tendinite d’Achille",
            es: "Curso de tendinitis de Aquiles",
            it: "Corso tendinite di Achille",
        },
        description: {
            en: "Full course coming soon — free guides and FAQs are available on the learn hub now.",
            de: "Vollständiger Kurs folgt — kostenlose Leitfäden und FAQs gibt es jetzt im Lern-Hub.",
            fr: "Cours complet bientôt — guides et FAQ gratuits dès maintenant dans l’espace d’apprentissage.",
            es: "Curso completo próximamente — guías y preguntas frecuentes gratuitas ya en el centro de aprendizaje.",
            it: "Corso completo in arrivo — guide e FAQ gratuite già disponibili nell’area learning.",
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
