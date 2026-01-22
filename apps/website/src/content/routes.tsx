import { type Language, languages } from "../config/languages";
import {
  Activity,
  Calendar,
  Heart,
  HelpCircle,
  Hourglass,
  List,
} from "lucide-react";
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
// Base route definition
export interface BaseRoute {
  slug: string; // Base slug without language prefix
  title: Record<string, string>; // Titles for each language
  description: Record<string, string>; // Descriptions for each language
  slugTranslations?: Record<string, string>; // Translated slugs for each language
  legacySlugs?: string[]; // Array of legacy/alternative slugs that should map to this route
  icon?: string | React.ReactNode; // Icon name as string or React component
  variant?: "default" | "outline";
  image?: ImageMetadata; // ImageMetadata
  tags?: Array<{ words: string; color: string }>;
  subQuestions?: Record<string, Record<string, string>>; // Translated sub-questions for each language
}

// Resolved route with language-specific information
export interface Route {
  href: string; // Full href including language prefix
  title: string;
  description: string;
  icon?: React.ReactNode; // Icon as React component
  variant?: "default" | "outline";
  image?: ImageMetadata; // ImageMetadata
  tags?: Array<{ words: string; color: string }>;
  lang: string;
  slug: string;
}

// Course routes (paid and free courses at /course/)
export const courseRoutes: BaseRoute[] = [
  {
    slug: "course/emails",
    title: {
      en: "Email Course",
      de: "E-Mail-Kurs",
      fr: "Cours par Email",
      es: "Curso por Email",
      it: "Corso Email",
    },
    description: {
      en:
        "Free personalized emails timed to your injury date. Recovery guidance arrives exactly when you need it.",
      de:
        "Kostenlose personalisierte E-Mails basierend auf Ihrem Verletzungsdatum. Genesungsanleitung kommt genau dann, wenn Sie sie brauchen.",
      fr:
        "Emails personnalisés gratuits basés sur votre date de blessure. Les conseils arrivent exactement quand vous en avez besoin.",
      es:
        "Correos personalizados gratuitos basados en tu fecha de lesión. La orientación llega exactamente cuando la necesitas.",
      it:
        "Email personalizzate gratuite basate sulla tua data di infortunio. I consigli arrivano esattamente quando ne hai bisogno.",
    },
    slugTranslations: {
      en: "course/emails",
      de: "kurs/emails",
      fr: "cours/emails",
      es: "curso/emails",
      it: "corso/emails",
    },
    icon: <Mail />,
    variant: "outline",
  },
  {
    slug: "course",
    title: {
      en: "Recovery Essentials Course",
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

// Recovery phase routes (timeline-based articles)
export const recoveryPhaseRoutes: BaseRoute[] = [
  {
    slug: "guide/weeks-0-1",
    title: {
      en: "Week 0-1: First Week After Rupture",
      de: "Woche 0-1: Erste Woche nach der Ruptur",
      fr: "Semaine 0-1: Première Semaine Après la Rupture",
      es: "Semana 0-1: Primera Semana Después de la Rotura",
      it: "Settimana 0-1: Prima Settimana Dopo la Rottura",
    },
    description: {
      en:
        "Emergency care, A&E expectations, blood clot prevention, and essential first-week survival tips.",
      de:
        "Notfallversorgung, Erwartungen in der Notaufnahme, Blutgerinnselprävention und wichtige Überlebenstipps für die erste Woche.",
      fr:
        "Soins d'urgence, attentes aux urgences, prévention des caillots sanguins et conseils de survie essentiels pour la première semaine.",
      es:
        "Atención de emergencia, expectativas en urgencias, prevención de coágulos y consejos esenciales para la primera semana.",
      it:
        "Cure d'emergenza, aspettative al pronto soccorso, prevenzione dei coaguli e consigli essenziali per la prima settimana.",
    },
    slugTranslations: {
      en: "guide/weeks-0-1",
      de: "leitfaden/wochen-0-1",
      fr: "guide/semaines-0-1",
      es: "guia/semanas-0-1",
      it: "guida/settimane-0-1",
    },
    icon: <Calendar />,
  },
  {
    slug: "guide/weeks-1-3",
    title: {
      en: "Weeks 1-3: Treatment Decision",
      de: "Wochen 1-3: Behandlungsentscheidung",
      fr: "Semaines 1-3: Décision de Traitement",
      es: "Semanas 1-3: Decisión de Tratamiento",
      it: "Settimane 1-3: Decisione del Trattamento",
    },
    description: {
      en:
        "Surgery vs conservative treatment, choosing your walking boot, and setting up for recovery.",
      de:
        "Operation vs konservative Behandlung, Auswahl des Gehstiefels und Vorbereitung auf die Genesung.",
      fr:
        "Chirurgie vs traitement conservateur, choix de votre botte de marche et préparation à la récupération.",
      es:
        "Cirugía vs tratamiento conservador, elección de tu bota ortopédica y preparación para la recuperación.",
      it:
        "Chirurgia vs trattamento conservativo, scelta dello stivale da deambulazione e preparazione al recupero.",
    },
    slugTranslations: {
      en: "guide/weeks-1-3",
      de: "leitfaden/wochen-1-3",
      fr: "guide/semaines-1-3",
      es: "guia/semanas-1-3",
      it: "guida/settimane-1-3",
    },
    icon: <Calendar />,
  },
  {
    slug: "guide/weeks-4-6",
    title: {
      en: "Weeks 4-6: Progressive Recovery",
      de: "Wochen 4-6: Progressive Genesung",
      fr: "Semaines 4-6: Récupération Progressive",
      es: "Semanas 4-6: Recuperación Progresiva",
      it: "Settimane 4-6: Recupero Progressivo",
    },
    description: {
      en:
        "Weight bearing progression, early exercises, and managing daily life during recovery.",
      de:
        "Belastungsprogression, frühe Übungen und Bewältigung des Alltags während der Genesung.",
      fr:
        "Progression de la mise en charge, exercices précoces et gestion de la vie quotidienne pendant la récupération.",
      es:
        "Progresión del apoyo, ejercicios tempranos y gestión de la vida diaria durante la recuperación.",
      it:
        "Progressione del carico, esercizi precoci e gestione della vita quotidiana durante il recupero.",
    },
    slugTranslations: {
      en: "guide/weeks-4-6",
      de: "leitfaden/wochen-4-6",
      fr: "guide/semaines-4-6",
      es: "guia/semanas-4-6",
      it: "guida/settimane-4-6",
    },
    icon: <Calendar />,
  },
  {
    slug: "guide/weeks-7-9",
    title: {
      en: "Weeks 7-9: Final Boot Phase",
      de: "Wochen 7-9: Letzte Stiefelphase",
      fr: "Semaines 7-9: Phase Finale de la Botte",
      es: "Semanas 7-9: Fase Final de la Bota",
      it: "Settimane 7-9: Fase Finale dello Stivale",
    },
    description: {
      en:
        "Preparing to transition out of your boot, increasing activity, and building confidence.",
      de:
        "Vorbereitung auf den Übergang aus dem Stiefel, Steigerung der Aktivität und Aufbau von Vertrauen.",
      fr:
        "Préparation à la transition hors de la botte, augmentation de l'activité et renforcement de la confiance.",
      es:
        "Preparación para la transición fuera de la bota, aumento de la actividad y construcción de confianza.",
      it:
        "Preparazione alla transizione fuori dallo stivale, aumento dell'attività e costruzione della fiducia.",
    },
    slugTranslations: {
      en: "guide/weeks-7-9",
      de: "leitfaden/wochen-7-9",
      fr: "guide/semaines-7-9",
      es: "guia/semanas-7-9",
      it: "guida/settimane-7-9",
    },
    icon: <Calendar />,
  },
  {
    slug: "guide/weeks-10-12",
    title: {
      en: "Weeks 10-12: Boot Transition",
      de: "Wochen 10-12: Stiefelübergang",
      fr: "Semaines 10-12: Transition de la Botte",
      es: "Semanas 10-12: Transición de la Bota",
      it: "Settimane 10-12: Transizione dello Stivale",
    },
    description: {
      en:
        "Moving from boot to shoes, building strength, and returning to normal walking.",
      de:
        "Übergang vom Stiefel zu Schuhen, Kraftaufbau und Rückkehr zum normalen Gehen.",
      fr:
        "Passage de la botte aux chaussures, renforcement musculaire et retour à la marche normale.",
      es:
        "Transición de la bota a zapatos, construcción de fuerza y vuelta a caminar normal.",
      it:
        "Passaggio dallo stivale alle scarpe, costruzione della forza e ritorno alla camminata normale.",
    },
    slugTranslations: {
      en: "guide/weeks-10-12",
      de: "leitfaden/wochen-10-12",
      fr: "guide/semaines-10-12",
      es: "guia/semanas-10-12",
      it: "guida/settimane-10-12",
    },
    icon: <Calendar />,
  },
  {
    slug: "guide/weeks-13-25",
    title: {
      en: "Weeks 13-25: Progressive Strengthening",
      de: "Wochen 13-25: Progressive Kräftigung",
      fr: "Semaines 13-25: Renforcement Progressif",
      es: "Semanas 13-25: Fortalecimiento Progresivo",
      it: "Settimane 13-25: Rafforzamento Progressivo",
    },
    description: {
      en:
        "Building strength and endurance, returning to activities, and preventing re-injury.",
      de:
        "Aufbau von Kraft und Ausdauer, Rückkehr zu Aktivitäten und Vermeidung von Wiederverletzungen.",
      fr:
        "Développement de la force et de l'endurance, retour aux activités et prévention des rechutes.",
      es:
        "Construcción de fuerza y resistencia, vuelta a las actividades y prevención de nuevas lesiones.",
      it:
        "Costruzione di forza e resistenza, ritorno alle attività e prevenzione di nuove lesioni.",
    },
    slugTranslations: {
      en: "guide/weeks-13-25",
      de: "leitfaden/wochen-13-25",
      fr: "guide/semaines-13-25",
      es: "guia/semanas-13-25",
      it: "guida/settimane-13-25",
    },
    icon: <Calendar />,
  },
  {
    slug: "guide/week-26-plus",
    title: {
      en: "Week 26+: Return to Sport",
      de: "Woche 26+: Rückkehr zum Sport",
      fr: "Semaine 26+: Retour au Sport",
      es: "Semana 26+: Vuelta al Deporte",
      it: "Settimana 26+: Ritorno allo Sport",
    },
    description: {
      en:
        "Full recovery assessment, return to running and sport, and long-term outlook.",
      de:
        "Vollständige Genesungsbewertung, Rückkehr zum Laufen und Sport und langfristige Aussichten.",
      fr:
        "Évaluation de récupération complète, retour à la course et au sport, et perspectives à long terme.",
      es:
        "Evaluación de recuperación completa, vuelta a correr y al deporte, y perspectivas a largo plazo.",
      it:
        "Valutazione del recupero completo, ritorno alla corsa e allo sport, e prospettive a lungo termine.",
    },
    slugTranslations: {
      en: "guide/week-26-plus",
      de: "leitfaden/woche-26-plus",
      fr: "guide/semaine-26-plus",
      es: "guia/semana-26-plus",
      it: "guida/settimana-26-plus",
    },
    icon: <Calendar />,
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
      en: "Read what our customers have to say about our products.",
      de: "Lesen Sie, was unsere Kunden über unsere Produkte sagen.",
      fr: "Lisez ce que nos clients disent de nos produits.",
      es: "Lea lo que nuestros clientes dicen sobre nuestros productos.",
      it: "Leggi cosa dicono i nostri clienti sui nostri prodotti.",
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
      en: "Complete recovery solution, better than VACOped and generic boots.",
      de:
        "Komplette Erholungslösung, besser als VACOped und generische Stiefel.",
      fr:
        "Solution de récupération complète, meilleure que VACOped et bottes génériques.",
      es:
        "Solución de recuperación completa, mejor que VACOped y botas genéricas.",
      it:
        "Soluzione di recupero completa, migliore di VACOped e stivali generici.",
    },
    variant: "outline",
  },
];

// Partner routes
export const partnerRoutes: BaseRoute[] = [
  {
    slug: "premium",
    title: {
      en: "Premium",
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
      en:
        "Join our affiliate program and earn 10% commission while helping your patients save.",
      de:
        "Werden Sie unser Affiliate-Partner und verdienen Sie 10% Provision, während Sie Ihren Patienten helfen, zu sparen.",
      fr:
        "Rejoignez notre programme d'affiliation et gagnez 10% de commission tout en aidant vos patients à économiser.",
      es:
        "Únase a nuestro programa de afiliados y gane un 10% de comisión mientras ayuda a sus pacientes a ahorrar.",
      it:
        "Unisciti al nostro programma di affiliazione e guadagna il 10% di commissione mentre aiuti i tuoi pazienti a risparmiare.",
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
    slug: "buy-now",
    title: {
      en: "Buy Now",
      de: "Jetzt kaufen",
      fr: "Acheter maintenant",
      es: "Comprar ahora",
      it: "Compra ora",
    },
    description: {
      en: "Purchase our Achilles rupture splint.",
      de: "Kaufen Sie unsere Achillessehnenruptur-Schiene.",
      fr: "Achetez notre attelle de rupture d'Achille.",
      es: "Compre nuestra férula de ruptura de Aquiles.",
      it: "Acquista la nostra férula per rottura di Achille.",
    },
    icon: <ShoppingCart />,
    variant: "default",
    slugTranslations: {
      en: "buy-now",
      de: "jetzt-kaufen",
      fr: "acheter-maintenant",
      es: "comprar-ahora",
      it: "compra-ora",
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

// Article routes (FAQ style)
export const articleRoutes: BaseRoute[] = [
  {
    slug: "FAQs/achilles-rupture-timeline",
    title: {
      en: "Achilles Rupture Timeline",
      de: "Achillessehnenriss-Zeitplan",
      fr: "Chronologie de la Rupture d'Achille",
      es: "Cronología de la Ruptura de Aquiles",
      it: "Cronologia della Rottura di Achille",
    },
    description: {
      en:
        "Explore a detailed timeline outlining the treatment and recovery journey of an Achilles Tendon Rupture, from the moment of injury to regaining unrestricted activity. Discover the crucial phases and milestones along the way.",
      de:
        "Erkunden Sie eine detaillierte Zeitleiste, die die Behandlungs- und Genesungsreise eines Achillessehnenrisses umreißt, vom Moment der Verletzung bis zur Wiedererlangung uneingeschränkter Aktivität. Entdecken Sie die entscheidenden Phasen und Meilensteine auf dem Weg.",
      fr:
        "Explorez une chronologie détaillée décrivant le parcours de traitement et de récupération d'une rupture du tendon d'Achille, du moment de la blessure à la reprise d'activité sans restriction. Découvrez les phases cruciales et les jalons en cours de route.",
      es:
        "Explore una cronología detallada que describe el viaje de tratamiento y recuperación de una ruptura del tendón de Aquiles, desde el momento de la lesión hasta recuperar la actividad sin restricciones. Descubra las fases cruciales y los hitos en el camino.",
      it:
        "Esplora una cronologia dettagliata che delinea il percorso di trattamento e recupero di una rottura del tendine di Achille, dal momento della lesione al ritorno all'attività senza restrizioni. Scopri le fasi cruciali e le tappe lungo il percorso.",
    },
    slugTranslations: {
      en: "FAQs/achilles-rupture-timeline",
      de: "FAQs/achillessehnenriss-heilungsverlauf",
      fr: "FAQs/chronologie-rupture-achille",
      es: "FAQs/cronologia-ruptura-aquiles",
      it: "FAQs/cronologia-rottura-achille",
    },
    tags: [
      { words: "Treatment", color: "bg-orange-200" },
      { words: "Recovery", color: "bg-purple-200" },
    ],
    icon: <Calendar />,
  },
  {
    slug: "FAQs/achilles-tear-treatment",
    title: {
      en: "Torn Achilles Treatment Pathway",
      de: "Behandlungsweg für gerissene Achillessehne",
      fr: "Voie de Traitement d'Achille Déchiré",
      es: "Vía de Tratamiento de Aquiles Desgarrado",
      it: "Percorso di Trattamento per Achille Strappato",
    },
    description: {
      en:
        "Navigate through a comprehensive guide dedicated to understanding the treatment options for a ruptured Achilles tendon. Delve into aspects like surgical considerations, post-surgery pain management, and the path to recovery.",
      de:
        "Navigieren Sie durch einen umfassenden Leitfaden zur Verstehen der Behandlungsoptionen für eine gerissene Achillessehne. Vertiefen Sie sich in Aspekte wie chirurgische Überlegungen, postoperative Schmerzbehandlung und den Weg zur Genesung.",
      fr:
        "Naviguez à travers un guide complet dédié à la compréhension des options de traitement pour un tendon d'Achille rompu. Plongez dans des aspects comme les considérations chirurgicales, la gestion de la douleur post-chirurgicale et le chemin vers la récupération.",
      es:
        "Navegue a través de una guía completa dedicada a entender las opciones de tratamiento para un tendón de Aquiles roto. Profundice en aspectos como consideraciones quirúrgicas, manejo del dolor post-cirugía y el camino hacia la recuperación.",
      it:
        "Naviga attraverso una guida completa dedicata alla comprensione delle opzioni di trattamento per un tendine di Achille rotto. Approfondisci aspetti come considerazioni chirurgiche, gestione del dolore post-operatorio e il percorso verso la guarigione.",
    },
    subQuestions: {
      en: {
        q1: "How to treat a torn Achilles tendon / Op vs Non-Op?",
        q2: "How long can you wait for Achilles tendon surgery?",
        q3: "How long does Achilles tendon surgery take?",
        q4: "Recovery from Achilles Rupture Surgery",
        q5: "Pain after Achilles tendon rupture / surgery",
      },
      de: {
        q1: "Wie behandelt man eine gerissene Achillessehne / OP vs Nicht-OP?",
        q2: "Wie lange kann man mit einer Achillessehnen-OP warten?",
        q3: "Wie lange dauert eine Achillessehnen-Operation?",
        q4: "Genesung nach Achillessehnen-Operation",
        q5: "Schmerzen nach Achillessehnenriss / Operation",
      },
      fr: {
        q1:
          "Comment traiter un tendon d'Achille déchiré / Opération vs Non-Op?",
        q2:
          "Combien de temps peut-on attendre pour une chirurgie du tendon d'Achille?",
        q3: "Combien de temps dure une chirurgie du tendon d'Achille?",
        q4: "Récupération après chirurgie de rupture d'Achille",
        q5: "Douleur après rupture / chirurgie du tendon d'Achille",
      },
      es: {
        q1: "¿Cómo tratar un tendón de Aquiles roto / Cirugía vs No Cirugía?",
        q2:
          "¿Cuánto tiempo se puede esperar para la cirugía del tendón de Aquiles?",
        q3: "¿Cuánto dura la cirugía del tendón de Aquiles?",
        q4: "Recuperación después de la cirugía de ruptura de Aquiles",
        q5: "Dolor después de ruptura / cirugía del tendón de Aquiles",
      },
      it: {
        q1: "Come trattare un tendine di Achille rotto / Operazione vs Non-Op?",
        q2:
          "Quanto tempo si può aspettare per la chirurgia del tendine di Achille?",
        q3: "Quanto dura l'operazione del tendine di Achille?",
        q4: "Recupero dopo chirurgia della rottura di Achille",
        q5: "Dolore dopo rottura / chirurgia del tendine di Achille",
      },
    },
    slugTranslations: {
      en: "FAQs/achilles-tear-treatment",
      de: "FAQs/achillessehnenriss-behandlung",
      fr: "FAQs/traitement-rupture-achille",
      es: "FAQs/tratamiento-ruptura-aquiles",
      it: "FAQs/trattamento-rottura-achille",
    },
    tags: [{ words: "Treatment", color: "bg-orange-200" }],
    icon: <Activity />,
  },
  {
    slug: "FAQs/is-my-achilles-ruptured",
    title: {
      en: "Is My Achilles Ruptured?",
      de: "Ist meine Achillessehne gerissen?",
      fr: "Mon Achille est-il Rompu?",
      es: "¿Está Roto mi Aquiles?",
      it: "Il Mio Achille è Rotto?",
    },
    description: {
      en:
        "Uncover all you need to determine if you have experienced a ruptured Achilles tendon. Learn about the causes, symptoms, and the severity of the injury.",
      de:
        "Entdecken Sie alles, was Sie brauchen, um festzustellen, ob Sie eine gerissene Achillessehne erlebt haben. Lernen Sie über die Ursachen, Symptome und die Schwere der Verletzung.",
      fr:
        "Découvrez tout ce dont vous avez besoin pour déterminer si vous avez subi une rupture du tendon d'Achille. Apprenez les causes, les symptômes et la gravité de la blessure.",
      es:
        "Descubra todo lo que necesita para determinar si ha experimentado una ruptura del tendón de Aquiles. Aprenda sobre las causas, síntomas y la gravedad de la lesión.",
      it:
        "Scopri tutto quello che devi sapere per determinare se hai subito una rottura del tendine di Achille. Impara le cause, i sintomi e la gravità della lesione.",
    },
    subQuestions: {
      en: {
        q1: "Is my Achilles Ruptured?",
        q2: "What happens when you tear your Achilles?",
      },
      de: {
        q1: "Ist meine Achillessehne gerissen?",
        q2: "Was passiert, wenn Sie Ihre Achillessehne reißen?",
      },
      fr: {
        q1: "Mon tendon d'Achille est-il rompu?",
        q2: "Que se passe-t-il quand vous déchirez votre tendon d'Achille?",
      },
      es: {
        q1: "¿Está roto mi tendón de Aquiles?",
        q2: "¿Qué sucede cuando te rompes el tendón de Aquiles?",
      },
      it: {
        q1: "Il mio tendine di Achille è rotto?",
        q2: "Cosa succede quando ti rompi il tendine di Achille?",
      },
    },
    slugTranslations: {
      en: "FAQs/is-my-achilles-ruptured",
      de: "FAQs/achillessehnenriss-erkennen",
      fr: "FAQs/mon-achille-est-il-rompu",
      es: "FAQs/esta-roto-mi-aquiles",
      it: "FAQs/il-mio-achille-e-rotto",
    },
    tags: [{ words: "Diagnosis", color: "bg-rose-100" }],
    icon: <Stethoscope />,
  },
  {
    slug: "FAQs/torn-achilles-recovery",
    title: {
      en: "Torn Achilles Recovery",
      de: "Genesung von gerissener Achillessehne",
      fr: "Récupération d'Achille Déchiré",
      es: "Recuperación de Aquiles Desgarrado",
      it: "Recupero di Achille Strappato",
    },
    description: {
      en:
        "Find a comprehensive resource on torn Achilles recovery, covering aspects such as recovery duration with or without surgery, casts versus boots, and sleep considerations during recovery.",
      de:
        "Finden Sie eine umfassende Ressource zur Genesung von gerissener Achillessehne, die Aspekte wie Genesungsdauer mit oder ohne Operation, Gips versus Stiefel und Schlafüberlegungen während der Genesung abdeckt.",
      fr:
        "Trouvez une ressource complète sur la récupération d'Achille déchiré, couvrant des aspects tels que la durée de récupération avec ou sans chirurgie, plâtres versus bottes, et considérations de sommeil pendant la récupération.",
      es:
        "Encuentre un recurso completo sobre la recuperación de Aquiles desgarrado, cubriendo aspectos como duración de recuperación con o sin cirugía, yesos versus botas, y consideraciones de sueño durante la recuperación.",
      it:
        "Trova una risorsa completa sul recupero di Achille strappato, che copre aspetti come la durata del recupero con o senza chirurgia, gessi versus stivali, e considerazioni sul sonno durante il recupero.",
    },
    subQuestions: {
      en: {
        q1: "Walking casts vs boots",
        q2: "Which Achilles tendon rupture boot is best?",
        q3: "How to sleep with torn Achilles tendon?",
        q4: "How long for an Achilles tendon rupture to heal?",
      },
      de: {
        q1: "Gehgips vs. Stiefel",
        q2: "Welcher Stiefel ist am besten für einen Achillessehnenriss?",
        q3: "Wie schläft man mit gerissener Achillessehne?",
        q4: "Wie lange dauert die Heilung eines Achillessehnenrisses?",
      },
      fr: {
        q1: "Plâtres de marche vs bottes",
        q2:
          "Quelle botte est la meilleure pour une rupture du tendon d'Achille?",
        q3: "Comment dormir avec un tendon d'Achille déchiré?",
        q4:
          "Combien de temps faut-il pour guérir une rupture du tendon d'Achille?",
      },
      es: {
        q1: "Yesos vs botas para caminar",
        q2: "¿Qué bota es mejor para una ruptura del tendón de Aquiles?",
        q3: "¿Cómo dormir con un tendón de Aquiles roto?",
        q4: "¿Cuánto tarda en sanar una ruptura del tendón de Aquiles?",
      },
      it: {
        q1: "Gessi vs stivali per camminare",
        q2: "Quale stivale è migliore per una rottura del tendine di Achille?",
        q3: "Come dormire con un tendine di Achille rotto?",
        q4:
          "Quanto tempo ci vuole per guarire una rottura del tendine di Achille?",
      },
    },
    slugTranslations: {
      en: "FAQs/torn-achilles-recovery",
      de: "FAQs/achillessehnenriss-genesung",
      fr: "FAQs/recuperation-achille-dechire",
      es: "FAQs/recuperacion-aquiles-desgarrado",
      it: "FAQs/recupero-achille-strappato",
    },
    tags: [{ words: "Recovery", color: "bg-purple-200" }],
    icon: <Hourglass />,
  },
  {
    slug: "FAQs/what-happens-if-my-achilles-is-ruptured",
    title: {
      en: "What Happens If My Achilles Is Ruptured?",
      de: "Was passiert, wenn meine Achillessehne gerissen ist?",
      fr: "Que se Passe-t-il si Mon Achille est Rompu?",
      es: "¿Qué Sucede si mi Aquiles está Roto?",
      it: "Cosa Succede se il Mio Achille è Rotto?",
    },
    description: {
      en:
        "Gain insights about what to expect if you have a ruptured Achilles tendon, including initial treatment in A&E, physiotherapy recommendations, and the number of required check-ups.",
      de:
        "Gewinnen Sie Einblicke darüber, was zu erwarten ist, wenn Sie eine gerissene Achillessehne haben, einschließlich Erstbehandlung in der Notaufnahme, Physiotherapie-Empfehlungen und die Anzahl der erforderlichen Nachuntersuchungen.",
      fr:
        "Obtenez des aperçus sur ce à quoi s'attendre si vous avez un tendon d'Achille rompu, y compris le traitement initial aux urgences, les recommandations de physiothérapie et le nombre de contrôles requis.",
      es:
        "Obtenga información sobre qué esperar si tiene un tendón de Aquiles roto, incluyendo tratamiento inicial en urgencias, recomendaciones de fisioterapia y el número de chequeos requeridos.",
      it:
        "Ottieni informazioni su cosa aspettarti se hai un tendine di Achille rotto, inclusi il trattamento iniziale al pronto soccorso, le raccomandazioni di fisioterapia e il numero di controlli richiesti.",
    },
    subQuestions: {
      en: {
        q1: "What will happen in A&E?",
        q2: "What will the specialist do?",
        q3: "How many check-ups?",
        q4: "When should I see a physio?",
        q5: "Should I take blood-thinners?",
      },
      de: {
        q1: "Was passiert in der Notaufnahme?",
        q2: "Was wird der Spezialist tun?",
        q3: "Wie viele Kontrolluntersuchungen?",
        q4: "Wann sollte ich zur Physiotherapie gehen?",
        q5: "Sollte ich Blutverdünner nehmen?",
      },
      fr: {
        q1: "Que se passera-t-il aux urgences?",
        q2: "Que fera le spécialiste?",
        q3: "Combien de contrôles?",
        q4: "Quand dois-je voir un kinésithérapeute?",
        q5: "Dois-je prendre des anticoagulants?",
      },
      es: {
        q1: "¿Qué sucederá en urgencias?",
        q2: "¿Qué hará el especialista?",
        q3: "¿Cuántos chequeos?",
        q4: "¿Cuándo debo ver un fisioterapeuta?",
        q5: "¿Debo tomar anticoagulantes?",
      },
      it: {
        q1: "Cosa succederà al pronto soccorso?",
        q2: "Cosa farà lo specialista?",
        q3: "Quanti controlli?",
        q4: "Quando devo vedere un fisioterapista?",
        q5: "Devo prendere anticoagulanti?",
      },
    },
    slugTranslations: {
      en: "FAQs/what-happens-if-my-achilles-is-ruptured",
      de: "FAQs/achillessehnenriss-folgen",
      fr: "FAQs/que-se-passe-t-il-si-mon-achille-est-rompu",
      es: "FAQs/que-sucede-si-mi-aquiles-esta-roto",
      it: "FAQs/cosa-succede-se-il-mio-achille-e-rotto",
    },
    tags: [{ words: "Treatment", color: "bg-orange-200" }],
    icon: <HelpCircle />,
  },
  {
    slug: "FAQs/life-after-achilles-rupture",
    title: {
      en: "Life After Achilles Rupture",
      de: "Leben nach Achillessehnenriss",
      fr: "Vie Après la Rupture d'Achille",
      es: "Vida Después de la Ruptura de Aquiles",
      it: "Vita Dopo la Rottura di Achille",
    },
    description: {
      en:
        "Discover insights on life after an Achilles rupture, including when you can resume walking, working, and engaging in sports.",
      de:
        "Entdecken Sie Einblicke in das Leben nach einem Achillessehnenriss, einschließlich wann Sie wieder gehen, arbeiten und Sport treiben können.",
      fr:
        "Découvrez des aperçus sur la vie après une rupture d'Achille, y compris quand vous pouvez reprendre la marche, le travail et la pratique du sport.",
      es:
        "Descubra información sobre la vida después de una ruptura de Aquiles, incluyendo cuándo puede reanudar caminar, trabajar y participar en deportes.",
      it:
        "Scopri informazioni sulla vita dopo una rottura di Achille, inclusi quando puoi riprendere a camminare, lavorare e praticare sport.",
    },
    subQuestions: {
      en: {
        q1: "Life after Achilles tendon rupture",
        q2: "When can I play sport again?",
        q3: "When can I go back to physical work?",
        q4: "When can I walk after Achilles rupture?",
      },
      de: {
        q1: "Leben nach Achillessehnenriss",
        q2: "Wann kann ich wieder Sport treiben?",
        q3: "Wann kann ich wieder körperlich arbeiten?",
        q4: "Wann kann ich nach einem Achillessehnenriss wieder gehen?",
      },
      fr: {
        q1: "La vie après une rupture du tendon d'Achille",
        q2: "Quand puis-je reprendre le sport?",
        q3: "Quand puis-je reprendre le travail physique?",
        q4: "Quand puis-je marcher après une rupture d'Achille?",
      },
      es: {
        q1: "La vida después de una ruptura del tendón de Aquiles",
        q2: "¿Cuándo puedo volver a hacer deporte?",
        q3: "¿Cuándo puedo volver al trabajo físico?",
        q4: "¿Cuándo puedo caminar después de una ruptura de Aquiles?",
      },
      it: {
        q1: "La vita dopo una rottura del tendine di Achille",
        q2: "Quando posso riprendere lo sport?",
        q3: "Quando posso tornare al lavoro fisico?",
        q4: "Quando posso camminare dopo una rottura di Achille?",
      },
    },
    slugTranslations: {
      en: "FAQs/life-after-achilles-rupture",
      de: "FAQs/leben-nach-achillessehnenriss",
      fr: "FAQs/vie-apres-rupture-achille",
      es: "FAQs/vida-despues-ruptura-aquiles",
      it: "FAQs/vita-dopo-rottura-achille",
    },
    tags: [{ words: "Recovery", color: "bg-purple-200" }],
    icon: <Heart />,
  },
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
    slug: "returns-policy",
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
      en: "returns-policy",
      de: "rueckgaberichtlinie",
      fr: "politique-retour",
      es: "politica-devoluciones",
      it: "politica-reso",
    },
  },
];

// All routes combined
export const allBaseRoutes: BaseRoute[] = [
  ...routes,
  ...guidePageRoutes,
  ...recoveryPhaseRoutes,
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
  const baseRoute = allBaseRoutes.find((route) =>
    route.slugTranslations?.[langCode] === decodedSlug ||
    route.slug === decodedSlug ||
    route.legacySlugs?.includes(decodedSlug)
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
  const baseRoute = allBaseRoutes.find((route) =>
    route.slugTranslations?.[currentLangCode] === decodedSlug ||
    route.slug === decodedSlug ||
    route.legacySlugs?.includes(decodedSlug)
  );
  if (!baseRoute) return [];

  return languages
    .filter((lang) => lang.code !== currentLangCode)
    .map((lang) => ({
      lang: lang.hreflang,
      href: generateRouteForLanguage(baseRoute, lang).href,
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
