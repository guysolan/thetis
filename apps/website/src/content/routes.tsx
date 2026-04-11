import { type Language, languages } from "../config/languages";
import { type ConditionId, conditions } from "./conditions/registry";
import { Activity, Calendar, Heart, HelpCircle, Hourglass } from "lucide-react";
import type { ImageMetadata } from "astro";
import {
  BookOpen,
  Box,
  ClipboardCheck,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Mail,
  Microscope,
  Moon,
  Rewind,
  ShoppingCart,
  Star,
  Stethoscope,
} from "lucide-react";

import type { BaseRoute, Route } from "./routes/types";
export type { BaseRoute, Route } from "./routes/types";
import {
  achillesRuptureArticleRoutes,
  achillesRuptureGuideHubNavRoute,
  recoveryPhaseRoutes,
} from "./routes/achilles-rupture";
import {
  plantarFasciitisArticleRoutes,
  plantarFasciitisCourseRoutes,
  plantarFasciitisGuideHubNavRoute,
  plantarFasciitisGuideRoutes,
} from "./routes/plantar-fasciitis";
import {
  achillesTendinitisArticleRoutes,
  achillesTendinitisCourseRoutes,
  achillesTendinitisGuideHubNavRoute,
  achillesTendinitisGuideRoutes,
} from "./routes/achilles-tendinitis";
import {
  insertionalAchillesTendonitisArticleRoutes,
  insertionalAchillesTendonitisCourseRoutes,
  insertionalAchillesTendonitisGuideHubNavRoute,
  insertionalAchillesTendonitisGuideRoutes,
} from "./routes/insertional-achilles-tendonitis";

// Navigation content for DesktopNav
export const navigationContent = {
  en: {
    ourProducts: "Products",
    courses: "Courses",
    patientGuides: "Patient Guides",
    professionals: "Professionals",
    contact: "Contact",
    buyNow: "Buy Now",
    learnMore: "Learn More",
    orderWholesale: "Order Wholesale",
    productTitle: "Achilles Tendon Rupture Splint",
    productDescription:
      "Improve comfort during recovery after Achilles tendon rupture",
    coursesTitle: "Recovery Courses",
    coursesDescription:
      "Expert-led courses to guide you through every step of your Achilles recovery",
    conditionsMenu: "Conditions",
    conditionsMenuDescription:
      "Products, course, FAQs, and guides for each condition.",
    learnMenu: "Learn",
    learnMenuDescription:
      "Courses, FAQs, and patient guides for each condition.",
    shopMenu: "Shop",
    shopMenuDescription: "Our products and curated recovery gear by condition.",
    learnAsideTitle: "Your recovery, explained",
    learnAsideBody:
      "Week-by-week guides, FAQs, and courses — organized by condition.",
    shopAsideTitle: "Shop with clarity",
    shopAsideBody:
      "Thetis products first, then vetted boots, wedges, and comfort picks from our guides.",
    learnBlogSectionTitle: "Articles by condition",
    learnBlogLinkSuffix: "Articles",
  },
  de: {
    ourProducts: "Produkte",
    courses: "Kurse",
    patientGuides: "Patientenleitfäden",
    professionals: "Fachkräfte",
    contact: "Kontakt",
    buyNow: "Jetzt kaufen",
    learnMore: "Mehr erfahren",
    orderWholesale: "Großhandel bestellen",
    productTitle: "Achillessehnenruptur-Schiene",
    productDescription:
      "Verbessern Sie die Genesungszeit und den Komfort nach einer Achillessehnenruptur",
    coursesTitle: "Genesungskurse",
    coursesDescription:
      "Expertenkurse, die Sie durch jeden Schritt Ihrer Achilles-Genesung führen",
    conditionsMenu: "Beschwerden",
    conditionsMenuDescription: "Produkte, Kurs, FAQs und Leitfäden pro Thema.",
    learnMenu: "Lernen",
    learnMenuDescription: "Kurse, FAQs und Patientenleitfäden pro Thema.",
    shopMenu: "Shop",
    shopMenuDescription:
      "Unsere Produkte und ausgewähltes Genesungs-Equipment pro Thema.",
    learnAsideTitle: "Ihre Genesung, verständlich",
    learnAsideBody:
      "Wöchentliche Leitfäden, FAQs und Kurse — sortiert nach Thema.",
    shopAsideTitle: "Klar einkaufen",
    shopAsideBody:
      "Zuerst Thetis-Produkte, dann geprüfte Schuhe, Keile und Komfort-Artikel.",
    learnBlogSectionTitle: "Artikel nach Thema",
    learnBlogLinkSuffix: "Artikel",
  },
  fr: {
    ourProducts: "Produits",
    courses: "Cours",
    patientGuides: "Guides du Patient",
    professionals: "Professionnels",
    contact: "Contact",
    buyNow: "Acheter maintenant",
    learnMore: "En savoir plus",
    orderWholesale: "Commander en gros",
    productTitle: "Attelle de rupture du tendon d'Achille",
    productDescription:
      "Améliorez le temps de récupération et le confort après une rupture du tendon d'Achille",
    coursesTitle: "Cours de récupération",
    coursesDescription:
      "Cours dirigés par des experts pour vous guider à chaque étape de votre récupération d'Achille",
    conditionsMenu: "Pathologies",
    conditionsMenuDescription:
      "Produits, cours, FAQ et guides pour chaque problème.",
    learnMenu: "Apprendre",
    learnMenuDescription:
      "Cours, FAQ et guides patient pour chaque pathologie.",
    shopMenu: "Boutique",
    shopMenuDescription:
      "Nos produits et une sélection d'équipement par pathologie.",
    learnAsideTitle: "Votre récupération, décryptée",
    learnAsideBody:
      "Guides semaine par semaine, FAQ et cours — par pathologie.",
    shopAsideTitle: "Acheter sereinement",
    shopAsideBody:
      "Produits Thetis d'abord, puis bottes, cales et confort sélectionnés.",
    learnBlogSectionTitle: "Articles par pathologie",
    learnBlogLinkSuffix: "Articles",
  },
  es: {
    ourProducts: "Productos",
    courses: "Cursos",
    patientGuides: "Guías del Paciente",
    professionals: "Profesionales",
    contact: "Contacto",
    buyNow: "Comprar ahora",
    learnMore: "Aprende más",
    orderWholesale: "Pedir al por mayor",
    productTitle: "Férula para rotura del tendón de Aquiles",
    productDescription:
      "Mejore el tiempo de recuperación y la comodidad después de la rotura del tendón de Aquiles",
    coursesTitle: "Cursos de recuperación",
    coursesDescription:
      "Cursos dirigidos por expertos para guiarte en cada paso de tu recuperación de Aquiles",
    conditionsMenu: "Condiciones",
    conditionsMenuDescription:
      "Productos, curso, preguntas frecuentes y guías por condición.",
    learnMenu: "Aprender",
    learnMenuDescription: "Cursos, preguntas frecuentes y guías por condición.",
    shopMenu: "Tienda",
    shopMenuDescription:
      "Nuestros productos y equipo de recuperación por condición.",
    learnAsideTitle: "Tu recuperación, explicada",
    learnAsideBody:
      "Guías semana a semana, preguntas frecuentes y cursos por condición.",
    shopAsideTitle: "Comprar con criterio",
    shopAsideBody:
      "Productos Thetis y luego botas, cuñas y artículos de confort revisados.",
    learnBlogSectionTitle: "Artículos por condición",
    learnBlogLinkSuffix: "Artículos",
  },
  it: {
    ourProducts: "Prodotti",
    courses: "Corsi",
    patientGuides: "Guide del Paziente",
    professionals: "Professionisti",
    contact: "Contatto",
    buyNow: "Compra ora",
    learnMore: "Scopri di più",
    orderWholesale: "Ordina all'ingrosso",
    productTitle: "Férula per rottura del tendine di Achille",
    productDescription:
      "Migliora i tempi di recupero e il comfort dopo la rottura del tendine di Achille",
    coursesTitle: "Corsi di recupero",
    coursesDescription:
      "Corsi guidati da esperti per accompagnarti in ogni fase del tuo recupero di Achille",
    conditionsMenu: "Patologie",
    conditionsMenuDescription:
      "Prodotti, corso, FAQ e guide per ogni condizione.",
    learnMenu: "Approfondisci",
    learnMenuDescription: "Corsi, FAQ e guide per ogni condizione.",
    shopMenu: "Shop",
    shopMenuDescription:
      "I nostri prodotti e attrezzatura per il recupero per condizione.",
    learnAsideTitle: "Il tuo recupero, spiegato",
    learnAsideBody:
      "Guide settimana per settimana, FAQ e corsi per condizione.",
    shopAsideTitle: "Acquista in modo chiaro",
    shopAsideBody:
      "Prodotti Thetis prima, poi stivali, zeppe e articoli per il comfort selezionati.",
    learnBlogSectionTitle: "Articoli per condizione",
    learnBlogLinkSuffix: "Articoli",
  },
};

/**
 * Flexible URL Mapping System
 *
 * This system allows multiple URLs to map to the same content across languages.
 *
 * Examples:
 * - Any of these URLs: ['/splint', '/night-splint', '/achilles-splint', '/de/achillessehnenriss-schiene']
 *   will map to '/it/ferula-rottura-tendine-achille' when switching to Italian
 *
 * - Any of these URLs: ['/reviews', '/customer-reviews', '/testimonials', '/de/bewertungen']
 *   will map to '/it/recensioni' when switching to Italian
 *
 * The system handles:
 * 1. Translated slugs (e.g., 'splint' -> 'achillessehnenriss-schiene' in German)
 * 2. Legacy slugs (e.g., 'night-splint' -> 'achillessehnenriss-schiene' in German)
 * 3. Base slugs (e.g., 'splint' -> 'splint' in English)
 * 4. Fallback to simple language prefix if no route is found
 */

// Course routes (paid courses at /course/)
export const courseRoutes: BaseRoute[] = [
  {
    slug: "course",
    title: {
      en: "Recovery Course",
      de: "Grundlagen-Kurs",
      fr: "Cours Essentiels",
      es: "Curso Esenciales",
      it: "Corso Fondamentali",
    },
    description: {
      en:
        "31 structured lessons covering every stage of Achilles rupture recovery. Expert guidance for £29.",
      de:
        "31 strukturierte Lektionen zu jeder Phase der Achillessehnenruptur-Genesung. Expertenführung für 29 €.",
      fr:
        "31 leçons structurées couvrant chaque étape de la récupération de rupture d'Achille. Conseils d'experts pour 29 €.",
      es:
        "31 lecciones estructuradas que cubren cada etapa de la recuperación de rotura de Aquiles. Orientación experta por 29 €.",
      it:
        "31 lezioni strutturate che coprono ogni fase del recupero dalla rottura di Achille. Guida esperta per 29 €.",
    },
    slugTranslations: {
      en: "course",
      de: "kurs",
      fr: "cours",
      es: "curso",
      it: "corso",
    },
    icon: <BookOpen />,
    variant: "default",
  },
  {
    slug: "course/professionals",
    title: {
      en: "Pro Course",
      de: "Professioneller Kurs",
      fr: "Cours Professionnel",
      es: "Curso Profesional",
      it: "Corso Professionale",
    },
    description: {
      en:
        "Expert video lessons and personalized guidance from specialist surgeons. Premium recovery for £99.",
      de:
        "Experten-Videolektionen und persönliche Anleitung von Fachärzten. Premium-Genesung für 99 €.",
      fr:
        "Leçons vidéo d'experts et conseils personnalisés de chirurgiens spécialistes. Récupération premium pour 99 €.",
      es:
        "Lecciones en video de expertos y orientación personalizada de cirujanos especialistas. Recuperación premium por 99 €.",
      it:
        "Lezioni video di esperti e guida personalizzata da chirurghi specialisti. Recupero premium per 99 €.",
    },
    slugTranslations: {
      en: "course/professionals",
      de: "kurs/professionell",
      fr: "cours/professionnel",
      es: "curso/profesional",
      it: "corso/professionale",
    },
    icon: <GraduationCap />,
    variant: "default",
  },
  ...plantarFasciitisCourseRoutes,
  ...achillesTendinitisCourseRoutes,
  ...insertionalAchillesTendonitisCourseRoutes,
];

// Guide page routes (kept for backwards compatibility, now redirects to /course/)
export const guidePageRoutes: BaseRoute[] = [
  {
    slug: "guide/articles",
    title: {
      en: "Recovery Articles",
      de: "Genesungsartikel",
      fr: "Articles de Récupération",
      es: "Artículos de Recuperación",
      it: "Articoli di Recupero",
    },
    description: {
      en:
        "Free recovery guides for each phase of your Achilles rupture journey - from injury to returning to sport.",
      de:
        "Kostenlose Genesungsleitfäden für jede Phase Ihrer Achillessehnenruptur-Reise - von der Verletzung bis zur Rückkehr zum Sport.",
      fr:
        "Guides de récupération gratuits pour chaque phase de votre parcours de rupture d'Achille - de la blessure au retour au sport.",
      es:
        "Guías de recuperación gratuitas para cada fase de tu viaje de rotura de Aquiles - desde la lesión hasta volver al deporte.",
      it:
        "Guide di recupero gratuite per ogni fase del tuo percorso di rottura di Achille - dalla lesione al ritorno allo sport.",
    },
    slugTranslations: {
      en: "guide/articles",
      de: "leitfaden/artikel",
      fr: "guide/articles",
      es: "guia/articulos",
      it: "guida/articoli",
    },
    icon: <BookOpen />,
    variant: "outline",
  },
];

// Legacy course index route (redirects to /course/)
export const legacyCourseRoute: BaseRoute = {
  slug: "courses",
  title: {
    en: "Recovery Courses",
    de: "Genesungskurse",
    fr: "Cours de Récupération",
    es: "Cursos de Recuperación",
    it: "Corsi di Recupero",
  },
  description: {
    en:
      "Expert-led courses to guide you through every step of your Achilles rupture recovery.",
    de:
      "Expertenkurse, die Sie durch jeden Schritt Ihrer Achillessehnenruptur-Genesung führen.",
    fr:
      "Cours dirigés par des experts pour vous guider à chaque étape de votre récupération de rupture d'Achille.",
    es:
      "Cursos dirigidos por expertos para guiarte en cada paso de tu recuperación de la rotura de Aquiles.",
    it:
      "Corsi guidati da esperti per accompagnarti in ogni fase del tuo recupero dalla rottura di Achille.",
  },
  slugTranslations: {
    en: "courses",
    de: "kurse",
    fr: "cours",
    es: "cursos",
    it: "corsi",
  },
  icon: <GraduationCap />,
  variant: "default",
};

// External guide routes (hosted on guide.thetismedical.com)
export const guideRoutes = {
  standard: {
    href: "https://guide.thetismedical.com/standard",
    title: {
      en: "Patient Recovery Guide",
      de: "Patienten-Genesungsleitfaden",
      fr: "Guide de Récupération Patient",
      es: "Guía de Recuperación del Paciente",
      it: "Guida al Recupero del Paziente",
    },
    description: {
      en:
        "Week-by-week guidance for Achilles rupture recovery - from injury to full mobility.",
      de:
        "Wöchentliche Anleitung für die Achillessehnenruptur-Genesung - von der Verletzung bis zur vollen Mobilität.",
      fr:
        "Guide semaine par semaine pour la récupération de rupture d'Achille - de la blessure à la mobilité complète.",
      es:
        "Guía semana a semana para la recuperación de rotura de Aquiles - desde la lesión hasta la movilidad completa.",
      it:
        "Guida settimana per settimana per il recupero dalla rottura di Achille - dalla lesione alla mobilità completa.",
    },
    icon: <BookOpen />,
  },
  premium: {
    href: "https://guide.thetismedical.com/premium",
    title: {
      en: "Clinician Guide",
      de: "Klinikerleitfaden",
      fr: "Guide du Clinicien",
      es: "Guía del Clínico",
      it: "Guida del Clinico",
    },
    description: {
      en:
        "Evidence-based protocols and resources by healthcare professionals managing Achilles rupture patients.",
      de:
        "Evidenzbasierte Protokolle und Ressourcen für Gesundheitsfachkräfte, die Achillessehnenruptur-Patienten betreuen.",
      fr:
        "Protocoles et ressources basés sur les preuves pour les professionnels de santé gérant les patients avec rupture d'Achille.",
      es:
        "Protocolos y recursos basados en evidencia para profesionales de la salud que manejan pacientes con rotura de Aquiles.",
      it:
        "Protocolli e risorse basate su evidenze per i professionisti sanitari che gestiscono pazienti con rottura di Achille.",
    },
    icon: <Stethoscope />,
  },
};

// Product routes
export const productRoutes: BaseRoute[] = [
  {
    slug: "achilles-rupture-splint",
    title: {
      en: "Achilles Rupture Splint",
      de: "Achillessehnen-Ruptur-Schiene",
      fr: "Attelle de Rupture d'Achille",
      es: "Férula de Ruptura de Aquiles",
      it: "Férula per Rottura di Achille",
    },
    description: {
      en: "Recovery quicker and more comfortably from achilles tendon rupture.",
      de: "Schnellere und komfortablere Genesung von Achillessehnenriss.",
      fr:
        "Récupération plus rapide et plus confortable de la rupture du tendon d'Achille.",
      es:
        "Recuperación más rápida y cómoda de la ruptura del tendón de Aquiles.",
      it:
        "Recupero più veloce e confortevole dalla rottura del tendine di Achille.",
    },
    slugTranslations: {
      en: "achilles-rupture-splint",
      de: "achillessehnenriss-schiene",
      fr: "attelle-rupture-tendon-achille",
      es: "bota-ortopedica-tendon-aquiles",
      it: "tutore-tendine-achille",
    },
    legacySlugs: [
      "splint",
      "night-splint",
      "achilles-tendon-splint",
      "achilles-splint",
      "rupturas-tendon-aquiles",
    ],
    icon: <Moon />,
    variant: "outline",
  },
  {
    slug: "reviews",
    title: {
      en: "Reviews",
      de: "Bewertungen",
      fr: "Avis",
      es: "Reseñas",
      it: "Recensioni",
    },
    description: {
      en: "Read why people love our products.",
      de: "Lesen Sie, warum Menschen unsere Produkte lieben.",
      fr: "Découvrez pourquoi nos produits plaisent tant.",
      es: "Descubra por qué la gente adora nuestros productos.",
      it: "Scopri perché le persone amano i nostri prodotti.",
    },
    slugTranslations: {
      en: "reviews",
      de: "bewertungen",
      fr: "avis",
      es: "resenas",
      it: "recensioni",
    },
    legacySlugs: ["customer-reviews", "testimonials", "feedback"],
    icon: <Star />,
    variant: "outline",
  },
  {
    slug: "sleeping-with-torn-achilles",
    title: {
      en: "Sleeping with Achilles Rupture",
      de: "Schlafen mit Achillessehnenruptur",
      fr: "Dormir avec Rupture d'Achille",
      es: "Dormir con Rotura de Aquiles",
      it: "Dormire con Rottura di Achille",
    },
    description: {
      en:
        "Remove the heavy boot at night. Sleep safely with proper plantarflexion.",
      de:
        "Entfernen Sie den schweren Stiefel nachts. Schlafen Sie sicher mit richtiger Plantarflexion.",
      fr:
        "Retirez la botte lourde la nuit. Dormez en toute sécurité avec la bonne flexion plantaire.",
      es:
        "Quítese la bota pesada por la noche. Duerma de forma segura con flexión plantar adecuada.",
      it:
        "Rimuovi lo stivale pesante di notte. Dormi in sicurezza con la corretta flessione plantare.",
    },
    variant: "outline",
  },
  {
    slug: "washing-with-torn-achilles",
    title: {
      en: "Washing with Achilles Rupture",
      de: "Waschen mit Achillessehnenruptur",
      fr: "Se Laver avec Rupture d'Achille",
      es: "Lavarse con Rotura de Aquiles",
      it: "Lavarsi con Rottura di Achille",
    },
    description: {
      en: "Safer and more convenient than Limbo covers for showering.",
      de: "Sicherer und bequemer als Limbo-Abdeckungen zum Duschen.",
      fr: "Plus sûr et pratique que les couvres Limbo pour se doucher.",
      es: "Más seguro y conveniente que las cubiertas Limbo para ducharse.",
      it: "Più sicuro e conveniente delle coperture Limbo per la doccia.",
    },
    variant: "outline",
  },
  {
    slug: "swimming-with-torn-achilles",
    title: {
      en: "Swimming with Achilles Rupture",
      de: "Schwimmen mit Achillessehnenruptur",
      fr: "Nager avec Rupture d'Achille",
      es: "Nadar con Rotura de Aquiles",
      it: "Nuotare con Rottura di Achille",
    },
    description: {
      en: "Safe aquatic exercise and water therapy during recovery.",
      de: "Sichere Wasserübungen und Wassertherapie während der Genesung.",
      fr:
        "Exercice aquatique sûr et thérapie par l'eau pendant la récupération.",
      es:
        "Ejercicio acuático seguro y terapia acuática durante la recuperación.",
      it: "Esercizio acquatico sicuro e terapia acquatica durante il recupero.",
    },
    variant: "outline",
  },
  {
    slug: "hygiene-with-torn-achilles",
    title: {
      en: "Hygiene with Achilles Rupture",
      de: "Hygiene mit Achillessehnenruptur",
      fr: "Hygiène avec Rupture d'Achille",
      es: "Higiene con Rotura de Aquiles",
      it: "Igiene con Rottura di Achille",
    },
    description: {
      en: "Keep your bed clean during recovery with washable liner.",
      de:
        "Halten Sie Ihr Bett während der Genesung mit waschbarer Innenschicht sauber.",
      fr:
        "Gardez votre lit propre pendant la récupération avec doublure lavable.",
      es: "Mantenga su cama limpia durante la recuperación con forro lavable.",
      it:
        "Mantieni il tuo letto pulito durante il recupero con rivestimento lavabile.",
    },
    variant: "outline",
  },
  {
    slug: "products-for-torn-achilles",
    title: {
      en: "Products for Achilles Rupture",
      de: "Produkte für Achillessehnenruptur",
      fr: "Produits pour Rupture d'Achille",
      es: "Productos para Rotura de Aquiles",
      it: "Prodotti per Rottura di Achille",
    },
    description: {
      en: "Complete recovery solution for Achilles rupture recovery.",
      de:
        "Komplette Erholungslösung für die Genesung nach Achillessehnenruptur.",
      fr: "Solution de récupération complète pour la rupture d'Achille.",
      es: "Solución de recuperación completa para rotura de Aquiles.",
      it: "Soluzione di recupero completa per la rottura dell'Achille.",
    },
    variant: "outline",
  },
];

// Partner routes
export const partnerRoutes: BaseRoute[] = [
  {
    slug: "professionals",
    title: {
      en: "Professionals",
      de: "Fachkräfte",
      fr: "Professionnels",
      es: "Profesionales",
      it: "Professionisti",
    },
    description: {
      en: "Join other clinicians improving patient recovery.",
      de:
        "Schließen Sie sich anderen Klinikern an, die die Patientengenesung verbessern.",
      fr:
        "Rejoignez d'autres cliniciens qui améliorent la récupération des patients.",
      es: "Únase a otros médicos que mejoran la recuperación de los pacientes.",
      it:
        "Unisciti ad altri clinici che migliorano la guarigione dei pazienti.",
    },
    slugTranslations: {
      en: "professionals",
      de: "aerzte",
      fr: "professionnels",
      es: "profesionales",
      it: "professionisti",
    },
    legacySlugs: ["clinicians", "healthcare-professionals", "doctors"],
    icon: <Stethoscope />,
    variant: "default",
  },
  {
    slug: "partners",
    title: {
      en: "Our Partners",
      de: "Unsere Partner",
      fr: "Nos Partenaires",
      es: "Nuestros Socios",
      it: "I Nostri Partner",
    },
    description: {
      en: "Our partners are the best in the business.",
      de: "Unsere Partner sind die Besten in der Branche.",
      fr: "Nos partenaires sont les meilleurs du secteur.",
      es: "Nuestros socios son los mejores del negocio.",
      it: "I nostri partner sono i migliori del settore.",
    },
    icon: <HeartHandshake />,
    variant: "outline",
    slugTranslations: {
      en: "partners",
      de: "partner",
      fr: "partenaires",
      es: "socios",
      it: "partner",
    },
  },
  {
    slug: "research",
    title: {
      en: "Our Research",
      de: "Unsere Forschung",
      fr: "Notre Recherche",
      es: "Nuestra Investigación",
      it: "La Nostra Ricerca",
    },
    description: {
      en: "Our analysis of Achilles Rupture Recovery.",
      de: "Unsere Analyse der Achillessehnenriss-Genesung.",
      fr: "Notre analyse de la récupération de la rupture d'Achille.",
      es: "Nuestro análisis de la recuperación de la ruptura de Aquiles.",
      it: "La nostra analisi della guarigione della rottura di Achille.",
    },
    icon: <Microscope />,
    variant: "outline",
    slugTranslations: {
      en: "research",
      de: "forschung",
      fr: "recherche",
      es: "investigación",
      it: "ricerca",
    },
  },
  {
    slug: "evidence",
    title: {
      en: "Evidence",
      de: "Nachweis",
      fr: "Preuves",
      es: "Evidencia",
      it: "Prove",
    },
    description: {
      en: "Proven to shorten time to care and improve patient experience.",
      de:
        "Nachweislich verkürzt die Zeit bis zur Versorgung und verbessert die Patientenerfahrung.",
      fr:
        "Prouvé pour raccourcir le temps de soins et améliorer l'expérience patient.",
      es:
        "Comprobado para acortar el tiempo de atención y mejorar la experiencia del paciente.",
      it:
        "Dimostrato per ridurre i tempi di cura e migliorare l'esperienza del paziente.",
    },
    icon: <ClipboardCheck />,
    variant: "outline",
    slugTranslations: {
      en: "evidence",
      de: "nachweis",
      fr: "preuves",
      es: "evidencia",
      it: "prove",
    },
  },
  {
    slug: "affiliates",
    title: {
      en: "Affiliate Program",
      de: "Affiliate-Programm",
      fr: "Programme d'Affiliation",
      es: "Programa de Afiliados",
      it: "Programma di Affiliazione",
    },
    description: {
      en: "Give your patients a discount and earn for referrals.",
      de:
        "Geben Sie Ihren Patienten einen Rabatt und verdienen Sie für Weiterempfehlungen.",
      fr:
        "Offrez une réduction à vos patients et gagnez pour vos recommandations.",
      es: "Ofrezca descuento a sus pacientes y gane por referidos.",
      it: "Offri uno sconto ai tuoi pazienti e guadagna con i referral.",
    },
    icon: <Handshake />,
    variant: "outline",
    slugTranslations: {
      en: "affiliates",
      de: "affiliate-programm",
      fr: "programme-affiliation",
      es: "programa-afiliados",
      it: "programma-affiliazione",
    },
  },
];

// Contact routes
export const contactRoutes: BaseRoute[] = [
  {
    slug: "contact",
    title: {
      en: "Contact Us",
      de: "Kontaktieren Sie uns",
      fr: "Contactez-nous",
      es: "Contáctanos",
      it: "Contattaci",
    },
    description: {
      en: "Contact us for more information.",
      de: "Kontaktieren Sie uns für weitere Informationen.",
      fr: "Contactez-nous pour plus d'informations.",
      es: "Contáctenos para más información.",
      it: "Contattaci per maggiori informazioni.",
    },
    icon: <Mail />,
    variant: "default",
    slugTranslations: {
      en: "contact",
      de: "kontakt",
      fr: "contact",
      es: "contacto",
      it: "contatto",
    },
  },
  {
    slug: "leave-review",
    title: {
      en: "Leave a Review",
      de: "Bewertung abgeben",
      fr: "Laisser un avis",
      es: "Dejar una reseña",
      it: "Lascia una recensione",
    },
    description: {
      en: "Share your experience and earn cashback.",
      de: "Teilen Sie Ihre Erfahrung und erhalten Sie Cashback.",
      fr: "Partagez votre expérience et gagnez du cashback.",
      es: "Comparte tu experiencia y gana cashback.",
      it: "Condividi la tua esperienza e guadagna cashback.",
    },
    icon: <Star />,
    variant: "default",
    slugTranslations: {
      en: "leave-review",
      de: "bewertung-abgeben",
      fr: "laisser-avis",
      es: "dejar-resena",
      it: "lascia-recensione",
    },
  },
  {
    slug: "order-wholesale",
    title: {
      en: "Order Wholesale",
      de: "Großhandel bestellen",
      fr: "Commander en Gros",
      es: "Pedido al Por Mayor",
      it: "Ordina all'ingrosso",
    },
    description: {
      en: "Order wholesale products for your clinic.",
      de: "Bestellen Sie Großhandelsprodukte für Ihre Klinik.",
      fr: "Commandez des produits en gros pour votre clinique.",
      es: "Solicite productos al por mayor para su clínica.",
      it: "Ordina prodotti all'ingrosso per la tua clinica.",
    },
    icon: <Box />,
    variant: "outline",
    slugTranslations: {
      en: "order-wholesale",
      de: "grosshandel-bestellen",
      fr: "commander-en-gros",
      es: "pedido-al-por-mayor",
      it: "ordina-all-ingrosso",
    },
  },
  {
    slug: "become-a-partner",
    title: {
      en: "Become a Partner",
      de: "Partner werden",
      fr: "Devenir Partenaire",
      es: "Convertirse en Socio",
      it: "Diventa Partner",
    },
    description: {
      en: "Become a partner and help us spread the word.",
      de: "Werden Sie Partner und helfen Sie uns, das Wort zu verbreiten.",
      fr: "Devenez partenaire et aidez-nous à faire passer le mot.",
      es: "Conviértase en socio y ayúdenos a correr la voz.",
      it: "Diventa partner e aiutaci a diffondere la parola.",
    },
    icon: <Handshake />,
    variant: "outline",
    slugTranslations: {
      en: "become-a-partner",
      de: "partner-werden",
      fr: "devenir-partenaire",
      es: "convertirse-en-socio",
      it: "diventa-partner",
    },
  },
  {
    slug: "request-a-return",
    title: {
      en: "Request a Return",
      de: "Rücksendung anfordern",
      fr: "Demander un Retour",
      es: "Solicitar una Devolución",
      it: "Richiedi un Reso",
    },
    description: {
      en: "Request a return for your product.",
      de: "Fordern Sie eine Rücksendung für Ihr Produkt an.",
      fr: "Demandez un retour pour votre produit.",
      es: "Solicite una devolución para su producto.",
      it: "Richiedi un reso per il tuo prodotto.",
    },
    icon: <Rewind />,
    variant: "outline",
    slugTranslations: {
      en: "request-a-return",
      de: "ruecksendung-anfordern",
      fr: "demander-un-retour",
      es: "solicitar-una-devolucion",
      it: "richiedere-un-reso",
    },
  },
];

// Video routes
export const videoRoutes: BaseRoute[] = [
  {
    slug: "video/night-splint-instructions",
    title: {
      en: "Splint Instructions",
      de: "Schienen-Anweisungen",
      fr: "Instructions d'Attelle",
      es: "Instrucciones de Férula",
      it: "Istruzioni per il Tutore",
    },
    description: {
      en: "How to use your night splint properly.",
      de: "So verwenden Sie Ihre Nachtschiene richtig.",
      fr: "Comment utiliser correctement votre attelle de nuit.",
      es: "Cómo usar correctamente su férula nocturna.",
      it: "Come usare correttamente il tuo tutore notturno.",
    },
    slugTranslations: {
      en: "video/night-splint-instructions",
      de: "video/schienen-anweisungen",
      fr: "video/instructions-attelle",
      es: "video/instrucciones-ferula",
      it: "video/istruzioni-tutore",
    },
  },
  {
    slug: "video/night-splint-presentation",
    title: {
      en: "Splint Presentation",
      de: "Schienen-Präsentation",
      fr: "Présentation d'Attelle",
      es: "Presentación de Férula",
      it: "Presentazione del Tutore",
    },
    description: {
      en: "Professional presentation of our night splint.",
      de: "Professionelle Präsentation unserer Nachtschiene.",
      fr: "Présentation professionnelle de notre attelle de nuit.",
      es: "Presentación profesional de nuestra férula nocturna.",
      it: "Presentazione professionale del nostro tutore notturno.",
    },
    slugTranslations: {
      en: "video/night-splint-presentation",
      de: "video/schienen-praesentation",
      fr: "video/presentation-attelle",
      es: "video/presentacion-ferula",
      it: "video/presentazione-tutore",
    },
  },
];

// Article routes (FAQ style) — composed per condition module
export const articleRoutes: BaseRoute[] = [
  ...achillesRuptureArticleRoutes,
  ...plantarFasciitisArticleRoutes,
  ...achillesTendinitisArticleRoutes,
  ...insertionalAchillesTendonitisArticleRoutes,
];

// Main page routes
export const routes: BaseRoute[] = [
  {
    slug: "",
    title: {
      en: "Home",
      de: "Startseite",
      fr: "Accueil",
      es: "Inicio",
      it: "Home",
    },
    description: {
      en: "Thetis Medical - Achilles Splint Specialists",
      de: "Thetis Medical - Achillessehnen-Schienen-Spezialisten",
      fr: "Thetis Medical - Spécialistes d'Attelles d'Achille",
      es: "Thetis Medical - Especialistas en Férulas de Aquiles",
      it: "Thetis Medical - Specialisti in Tutori di Achille",
    },
    slugTranslations: {
      en: "",
      de: "",
      fr: "",
      es: "",
      it: "",
    },
  },
  {
    slug: "night-splint",
    title: {
      en: "Night Splint",
      de: "Nachtschiene",
      fr: "Attelle de Nuit",
      es: "Férula Nocturna",
      it: "Tutore Notturno",
    },
    description: {
      en: "Our specialized night splint for Achilles recovery.",
      de: "Unsere spezialisierte Nachtschiene für die Achilles-Genesung.",
      fr: "Notre attelle de nuit spécialisée pour la récupération d'Achille.",
      es:
        "Nuestra férula nocturna especializada para la recuperación de Aquiles.",
      it:
        "Il nostro tutore notturno specializzato per la guarigione di Achille.",
    },
    slugTranslations: {
      en: "night-splint",
      de: "achillessehnenriss-schiene",
      fr: "attelle-rupture-tendon-achille",
      es: "bota-ortopedica-tendon-aquiles",
      it: "tutore-tendine-achille",
    },
  },
  {
    slug: "trauma-splint",
    title: {
      en: "Trauma Splint",
      de: "Traumaschiene",
      fr: "Attelle de Traumatisme",
      es: "Férula de Trauma",
      it: "Tutore per Trauma",
    },
    description: {
      en: "Emergency splint for acute Achilles injuries.",
      de: "Notfallschiene für akute Achillesverletzungen.",
      fr: "Attelle d'urgence pour les blessures aiguës d'Achille.",
      es: "Férula de emergencia para lesiones agudas de Aquiles.",
      it: "Tutore di emergenza per lesioni acute di Achille.",
    },
    slugTranslations: {
      en: "trauma-splint",
      de: "traumaschiene",
      fr: "attelle-traumatisme",
      es: "ferula-trauma",
      it: "tutore-trauma",
    },
  },
  {
    slug: "achilles-ruptures",
    title: {
      en: "Achilles Ruptures",
      de: "Achillessehnenrisse",
      fr: "Ruptures d'Achille",
      es: "Rupturas de Aquiles",
      it: "Rotture di Achille",
    },
    description: {
      en: "Understanding Achilles ruptures and treatment options.",
      de: "Verstehen von Achillessehnenrissen und Behandlungsoptionen.",
      fr: "Comprendre les ruptures d'Achille et les options de traitement.",
      es: "Entendiendo las rupturas de Aquiles y opciones de tratamiento.",
      it: "Comprendere le rotture di Achille e le opzioni di trattamento.",
    },
    slugTranslations: {
      en: "achilles-ruptures",
      de: "achillessehnenrisse",
      fr: "ruptures-achille",
      es: "rupturas-aquiles",
      it: "rotture-achille",
    },
  },
  {
    slug: "recovery-pathway",
    title: {
      en: "Recovery Pathway",
      de: "Genesungsweg",
      fr: "Voie de Récupération",
      es: "Vía de Recuperación",
      it: "Percorso di Recupero",
    },
    description: {
      en: "Your guided path to full recovery from Achilles injury.",
      de:
        "Ihr geführter Weg zur vollständigen Genesung von Achillesverletzungen.",
      fr:
        "Votre chemin guidé vers une récupération complète de la blessure d'Achille.",
      es:
        "Su camino guiado hacia la recuperación completa de la lesión de Aquiles.",
      it:
        "Il tuo percorso guidato verso la guarigione completa dalla lesione di Achille.",
    },
    slugTranslations: {
      en: "recovery-pathway",
      de: "genesungsweg",
      fr: "voie-recuperation",
      es: "via-recuperacion",
      it: "percorso-recupero",
    },
  },
  {
    slug: "evidence-based-recovery",
    title: {
      en: "Evidence Based Recovery",
      de: "Evidenzbasierte Genesung",
      fr: "Récupération Basée sur les Preuves",
      es: "Recuperación Basada en Evidencia",
      it: "Recupero Basato su Evidenze",
    },
    description: {
      en: "Scientific approach to Achilles tendon recovery.",
      de: "Wissenschaftlicher Ansatz zur Achillessehnen-Genesung.",
      fr: "Approche scientifique de la récupération du tendon d'Achille.",
      es: "Enfoque científico para la recuperación del tendón de Aquiles.",
      it: "Approccio scientifico per la guarigione del tendine di Achille.",
    },
    slugTranslations: {
      en: "evidence-based-recovery",
      de: "evidenzbasierte-genesung",
      fr: "recuperation-basee-preuves",
      es: "recuperacion-basada-evidencia",
      it: "recupero-basato-evidenze",
    },
  },
  {
    slug: "sitemap",
    title: {
      en: "Sitemap",
      de: "Sitemap",
      fr: "Plan du Site",
      es: "Mapa del Sitio",
      it: "Mappa del Sito",
    },
    description: {
      en: "Complete site navigation and page listing.",
      de: "Vollständige Website-Navigation und Seitenliste.",
      fr: "Navigation complète du site et liste des pages.",
      es: "Navegación completa del sitio y lista de páginas.",
      it: "Navigazione completa del sito e lista delle pagine.",
    },
    slugTranslations: {
      en: "sitemap",
      de: "sitemap",
      fr: "plan-du-site",
      es: "mapa-del-sitio",
      it: "mappa-del-sito",
    },
  },
];

// Legal routes
export const legalRoutes: BaseRoute[] = [
  {
    slug: "return-policy",
    title: {
      en: "Returns Policy",
      de: "Rückgaberichtlinie",
      fr: "Politique de Retour",
      es: "Política de Devoluciones",
      it: "Politica di Reso",
    },
    description: {
      en: "Our product return and refund policy.",
      de: "Unsere Produktrückgabe- und Erstattungsrichtlinie.",
      fr: "Notre politique de retour et de remboursement de produits.",
      es: "Nuestra política de devolución y reembolso de productos.",
      it: "La nostra politica di reso e rimborso dei prodotti.",
    },
    slugTranslations: {
      en: "return-policy",
      de: "rueckgaberichtlinie",
      fr: "politique-retour",
      es: "politica-devoluciones",
      it: "politica-reso",
    },
  },
];

/** Per-condition shop hubs (/shop/<condition-id>). */
export const conditionShopHubRoutes: BaseRoute[] = conditions.map((c) => ({
  conditionId: c.id,
  slug: `shop/${c.id}`,
  title: {
    en: `${c.label} — shop`,
    de: `${c.label} — Shop`,
    fr: `${c.label} — boutique`,
    es: `${c.label} — tienda`,
    it: `${c.label} — shop`,
  },
  description: {
    en:
      "Thetis products and curated recovery gear (including partner links where helpful).",
    de:
      "Thetis-Produkte und ausgewählte Genesungsartikel (inkl. Partnerlinks).",
    fr:
      "Produits Thetis et sélection d'équipement (liens partenaires le cas échéant).",
    es:
      "Productos Thetis y equipo de recuperación seleccionado (enlaces de socios).",
    it: "Prodotti Thetis e articoli per il recupero (link partner dove utile).",
  },
  slugTranslations: {
    en: `shop/${c.id}`,
    de: `shop/${c.id}`,
    fr: `shop/${c.id}`,
    es: `shop/${c.id}`,
    it: `shop/${c.id}`,
  },
  icon: <ShoppingCart />,
}));

// All routes combined
export const allBaseRoutes: BaseRoute[] = [
  ...routes,
  ...guidePageRoutes,
  ...recoveryPhaseRoutes,
  achillesRuptureGuideHubNavRoute,
  ...plantarFasciitisGuideRoutes,
  plantarFasciitisGuideHubNavRoute,
  ...achillesTendinitisGuideRoutes,
  achillesTendinitisGuideHubNavRoute,
  ...insertionalAchillesTendonitisGuideRoutes,
  insertionalAchillesTendonitisGuideHubNavRoute,
  ...conditionShopHubRoutes,
  ...courseRoutes,
  legacyCourseRoute,
  ...productRoutes,
  ...partnerRoutes,
  ...contactRoutes,
  ...videoRoutes,
  ...articleRoutes,
  ...legalRoutes,
];

// Helper functions
export function getArticleRoutesByConditionId(
  conditionId: ConditionId,
): BaseRoute[] {
  return articleRoutes.filter((r) => r.conditionId === conditionId);
}

/** All guide step routes for a condition (sitemap, hubs, language switcher). */
export function getRecoveryPhaseRoutesForCondition(
  conditionId: ConditionId,
): BaseRoute[] {
  switch (conditionId) {
    case "achilles-rupture":
      return recoveryPhaseRoutes;
    case "plantar-fasciitis":
      return plantarFasciitisGuideRoutes;
    case "achilles-tendinitis":
      return achillesTendinitisGuideRoutes;
    case "insertional-achilles-tendonitis":
      return insertionalAchillesTendonitisGuideRoutes;
    default:
      return [];
  }
}

/** Single hub URL per condition (nav/footer “overview” link). */
export function getHubBaseRouteForCondition(
  conditionId: ConditionId,
): BaseRoute {
  switch (conditionId) {
    case "achilles-rupture":
      return achillesRuptureGuideHubNavRoute;
    case "plantar-fasciitis":
      return plantarFasciitisGuideHubNavRoute;
    case "achilles-tendinitis":
      return achillesTendinitisGuideHubNavRoute;
    case "insertional-achilles-tendonitis":
      return insertionalAchillesTendonitisGuideHubNavRoute;
    default:
      return achillesRuptureGuideHubNavRoute;
  }
}

/** @deprecated Use getHubBaseRouteForCondition — kept name for imports; returns hub only. */
export function getPatientGuideNavRoutesForCondition(
  conditionId: ConditionId,
): BaseRoute[] {
  return [getHubBaseRouteForCondition(conditionId)];
}

/** One card per condition → localized learn hub. */
export function getConditionHubNavRoutes(langCode: string): Route[] {
  const language = languages.find((l) => l.code === langCode);
  if (!language) return [];

  return conditions.map((c) =>
    generateRouteForLanguage(getHubBaseRouteForCondition(c.id), language)
  );
}

export function getShopBaseRouteForCondition(
  conditionId: ConditionId,
): BaseRoute {
  const r = conditionShopHubRoutes.find((x) => x.conditionId === conditionId);
  if (!r) throw new Error(`No shop hub for condition: ${conditionId}`);
  return r;
}

/** One card per condition → localized shop hub. */
export function getConditionShopNavRoutes(langCode: string): Route[] {
  const language = languages.find((l) => l.code === langCode);
  if (!language) return [];

  return conditions.map((c) =>
    generateRouteForLanguage(getShopBaseRouteForCondition(c.id), language)
  );
}

/** One course landing per condition (Achilles rupture + three scaffold conditions). */
export function getConditionCourseNavRoutes(langCode: string): Route[] {
  const language = languages.find((l) => l.code === langCode);
  if (!language) return [];

  return conditions
    .map((c) => {
      const slugEn = c.coursePath.replace(/^\//, "");
      const baseRoute = allBaseRoutes.find(
        (r) =>
          r.slug === slugEn ||
          r.slugTranslations?.en === slugEn,
      );
      if (!baseRoute) return null;
      return generateRouteForLanguage(baseRoute, language);
    })
    .filter((r): r is Route => r != null);
}

/** Localized course landing for one condition. */
export function getCourseRouteForCondition(
  conditionId: ConditionId,
  langCode: string,
): Route | null {
  const language = languages.find((l) => l.code === langCode);
  if (!language) return null;
  const c = conditions.find((x) => x.id === conditionId);
  if (!c) return null;
  const slugEn = c.coursePath.replace(/^\//, "");
  const baseRoute = allBaseRoutes.find(
    (r) => r.slug === slugEn || r.slugTranslations?.en === slugEn,
  );
  if (!baseRoute) return null;
  return generateRouteForLanguage(baseRoute, language);
}

export function generateRouteForLanguage(
  baseRoute: BaseRoute,
  language: Language,
): Route {
  // Use translated slug if available, otherwise fall back to base slug
  const translatedSlug = baseRoute.slugTranslations?.[language.code] ||
    baseRoute.slug;

  // Don't encode the slug - let the browser handle URL encoding naturally
  // Handle empty slug (home route) specially to avoid double slashes
  let href: string;
  if (translatedSlug === "" || translatedSlug === undefined) {
    href = language.dir === "/" ? "/" : language.dir;
  } else {
    href = language.dir === "/"
      ? `/${translatedSlug}`
      : `${language.dir}/${translatedSlug}`;
  }

  return {
    href: href.replace(/\/+/g, "/").replace(/\/$/, "") || "/",
    title: baseRoute.title[language.code] || baseRoute.title.en,
    description: baseRoute.description[language.code] ||
      baseRoute.description.en,
    icon: baseRoute.icon,
    variant: baseRoute.variant,
    image: baseRoute.image,
    tags: baseRoute.tags,
    lang: language.code,
    slug: translatedSlug,
  };
}

export function generateAllRoutes(): Route[] {
  const allRoutes: Route[] = [];

  for (const language of languages) {
    for (const baseRoute of allBaseRoutes) {
      allRoutes.push(generateRouteForLanguage(baseRoute, language));
    }
  }

  return allRoutes;
}

export function getRoutesByLanguage(langCode: string): Route[] {
  const language = languages.find((lang) => lang.code === langCode);
  if (!language) return [];

  return allBaseRoutes.map((baseRoute) =>
    generateRouteForLanguage(baseRoute, language)
  );
}

export function getArticleRoutesByLanguage(langCode: string): Route[] {
  const language = languages.find((lang) => lang.code === langCode);
  if (!language) return [];

  return articleRoutes.map((baseRoute) =>
    generateRouteForLanguage(baseRoute, language)
  );
}

export function getPartnerRoutesByLanguage(langCode: string): Route[] {
  const language = languages.find((lang) => lang.code === langCode);
  if (!language) return [];

  return partnerRoutes.map((baseRoute) =>
    generateRouteForLanguage(baseRoute, language)
  );
}

export function getContactRoutesByLanguage(langCode: string): Route[] {
  const language = languages.find((lang) => lang.code === langCode);
  if (!language) return [];

  return contactRoutes.map((baseRoute) =>
    generateRouteForLanguage(baseRoute, language)
  );
}

export function getProductRoutesByLanguage(langCode: string): Route[] {
  const language = languages.find((lang) => lang.code === langCode);
  if (!language) return [];

  return productRoutes.map((baseRoute) =>
    generateRouteForLanguage(baseRoute, language)
  );
}

export function getCourseRoutesByLanguage(langCode: string): Route[] {
  const language = languages.find((lang) => lang.code === langCode);
  if (!language) return [];

  return courseRoutes.map((baseRoute) =>
    generateRouteForLanguage(baseRoute, language)
  );
}

export function getGuidePageRoutesByLanguage(langCode: string): Route[] {
  const language = languages.find((lang) => lang.code === langCode);
  if (!language) return [];

  return guidePageRoutes.map((baseRoute) =>
    generateRouteForLanguage(baseRoute, language)
  );
}

export function getRecoveryPhaseRoutesByLanguage(langCode: string): Route[] {
  const language = languages.find((lang) => lang.code === langCode);
  if (!language) return [];

  return recoveryPhaseRoutes.map((baseRoute) =>
    generateRouteForLanguage(baseRoute, language)
  );
}

export function getRouteBySlugAndLanguage(
  slug: string,
  langCode: string,
): Route | undefined {
  // Decode the URL to handle special characters like ñ -> %C3%B1
  const decodedSlug = decodeURIComponent(slug);

  // First try to find by translated slug, then by base slug, then by legacy slugs
  const baseRoute = allBaseRoutes.find(
    (route) =>
      route.slugTranslations?.[langCode] === decodedSlug ||
      route.slug === decodedSlug ||
      route.legacySlugs?.includes(decodedSlug),
  );
  const language = languages.find((lang) => lang.code === langCode);

  if (!baseRoute || !language) return undefined;

  return generateRouteForLanguage(baseRoute, language);
}

export function getAlternateRoutesForSlug(
  slug: string,
  currentLangCode: string,
): Array<{ lang: string; href: string }> {
  // Decode the URL to handle special characters like ñ -> %C3%B1
  const decodedSlug = decodeURIComponent(slug);

  // First try to find by translated slug, then by base slug, then by legacy slugs
  const baseRoute = allBaseRoutes.find(
    (route) =>
      route.slugTranslations?.[currentLangCode] === decodedSlug ||
      route.slug === decodedSlug ||
      route.legacySlugs?.includes(decodedSlug),
  );
  if (!baseRoute) return [];

  return languages
    .filter((lang) => lang.code !== currentLangCode)
    .map((lang) => ({
      lang: lang.hreflang,
      href: generateRouteForLanguage(baseRoute, lang).href,
    }));
}

/**
 * Get alternate language URLs for hreflang tags. Uses route-aware translation
 * so each language gets the correct translated slug (e.g. /de/evidenzbasierte-genesung
 * for en alternate, not /evidenzbasierte-genesung). Returns empty array for unknown routes.
 */
export function getAlternateLanguagesForPath(
  currentPath: string,
  currentLangCode: string,
  baseUrl = "https://thetismedical.com",
): Array<{ lang: string; url: string }> {
  let slug = currentPath.replace(/^\//, "");
  const langCodes = ["de", "fr", "es", "it"];
  for (const code of langCodes) {
    if (slug.startsWith(`${code}/`)) {
      slug = slug.substring(code.length + 1);
      break;
    }
    if (slug === code) {
      slug = "";
      break;
    }
  }

  const alternates = getAlternateRoutesForSlug(slug, currentLangCode);
  return alternates.map((alt) => ({
    lang: alt.lang,
    url: `${baseUrl}${alt.href}`,
  }));
}

// Language switcher function - maps any URL to the correct translated URL for a given language
export function getTranslatedUrlForLanguage(
  currentUrl: string,
  targetLangCode: string,
): string {
  // Remove leading slash and get the slug
  let slug = currentUrl.replace(/^\//, "");

  // If the URL starts with a language code, extract the slug after it
  const languagePrefixes = languages.map((lang) => lang.code);
  for (const langCode of languagePrefixes) {
    if (slug.startsWith(`${langCode}/`)) {
      slug = slug.substring(langCode.length + 1); // +1 for the slash
      break;
    } else if (slug === langCode) {
      // Handle case where URL is exactly "/de" (no trailing slash)
      slug = "";
      break;
    }
  }

  // Decode the URL to handle special characters like ñ -> %C3%B1
  const decodedSlug = decodeURIComponent(slug);

  // Special handling for home route (empty slug)
  if (
    decodedSlug === "" || decodedSlug === "index" ||
    decodedSlug === "index.html"
  ) {
    const language = languages.find((lang) => lang.code === targetLangCode);
    if (language && language.code !== "en") {
      return language.dir;
    }
    return "/";
  }

  // Find the base route that matches this slug (including legacy slugs)
  const baseRoute = allBaseRoutes.find((route) => {
    // Check if this slug matches any of the translated slugs for any language
    const matchesTranslatedSlug = Object.values(route.slugTranslations || {})
      .includes(decodedSlug);
    // Check if this slug matches the base slug
    const matchesBaseSlug = route.slug === decodedSlug;
    // Check if this slug matches any legacy slug
    const matchesLegacySlug = route.legacySlugs?.includes(decodedSlug);

    return matchesTranslatedSlug || matchesBaseSlug || matchesLegacySlug;
  });

  if (!baseRoute) {
    // For other routes, just add language prefix as fallback
    const language = languages.find((lang) => lang.code === targetLangCode);
    if (language && language.code !== "en") {
      return `${language.dir}/${slug}`;
    }
    return `/${slug}`;
  }

  // Generate the route for the target language
  const language = languages.find((lang) => lang.code === targetLangCode);
  if (!language) return `/${slug}`;

  return generateRouteForLanguage(baseRoute, language).href;
}

// Backward compatibility exports
export const pages = getRoutesByLanguage("en");
export const articles = articleRoutes.map((route) =>
  generateRouteForLanguage(route, languages[0])
);

// Category exports for easy access
export const productLinks = productRoutes.map((route) =>
  generateRouteForLanguage(route, languages[0])
);
export const partnerLinks = partnerRoutes.map((route) =>
  generateRouteForLanguage(route, languages[0])
);
export const contactLinks = contactRoutes.map((route) =>
  generateRouteForLanguage(route, languages[0])
);
export const videoPages = videoRoutes.map((route) =>
  generateRouteForLanguage(route, languages[0])
);
export const faqLinks = articleRoutes.map((route) =>
  generateRouteForLanguage(route, languages[0])
);
export const legalLinks = legalRoutes.map((route) =>
  generateRouteForLanguage(route, languages[0])
);
export const courseLinks = courseRoutes.map((route) =>
  generateRouteForLanguage(route, languages[0])
);
export const guidePageLinks = guidePageRoutes.map((route) =>
  generateRouteForLanguage(route, languages[0])
);
export const recoveryPhaseLinks = recoveryPhaseRoutes.map((route) =>
  generateRouteForLanguage(route, languages[0])
);
