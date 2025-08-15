import nightSplintImage from "./night_splint_bed_side.jpg";
import AchillesDrawing from "../assets/drawings/achilles-drawing.svg";
import { type Language, languages } from "../config/languages";
import type { ImageMetadata } from "astro";
import {
  Box,
  ClipboardCheck,
  Handshake,
  HeartHandshake,
  Mail,
  Microscope,
  Rewind,
  ShoppingCart,
  Stethoscope,
} from "lucide-react";

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
    image: nightSplintImage,
    icon: "Moon",
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
    legacySlugs: ["customer-reviews", "testimonials", "feedback"],
    icon: "Star",
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
    },
    description: {
      en: "How to use your night splint properly.",
      de: "So verwenden Sie Ihre Nachtschiene richtig.",
      fr: "Comment utiliser correctement votre attelle de nuit.",
      es: "Cómo usar correctamente su férula nocturna.",
    },
  },
  {
    slug: "video/night-splint-presentation",
    title: {
      en: "Splint Presentation",
      de: "Schienen-Präsentation",
      fr: "Présentation d'Attelle",
      es: "Presentación de Férula",
    },
    description: {
      en: "Professional presentation of our night splint.",
      de: "Professionelle Präsentation unserer Nachtschiene.",
      fr: "Présentation professionnelle de notre attelle de nuit.",
      es: "Presentación profesional de nuestra férula nocturna.",
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
    },
    tags: [
      { words: "Treatment", color: "bg-orange-200" },
      { words: "Recovery", color: "bg-purple-200" },
    ],
    image: AchillesDrawing,
    icon: "Calendar",
  },
  {
    slug: "FAQs/achilles-tear-treatment",
    title: {
      en: "Torn Achilles Treatment Pathway",
      de: "Behandlungsweg für gerissene Achillessehne",
      fr: "Voie de Traitement d'Achille Déchiré",
      es: "Vía de Tratamiento de Aquiles Desgarrado",
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
    },
    tags: [{ words: "Treatment", color: "bg-orange-200" }],
    image: AchillesDrawing,
    icon: "Activity",
  },
  {
    slug: "FAQs/is-my-achilles-ruptured",
    title: {
      en: "Is My Achilles Ruptured?",
      de: "Ist meine Achillessehne gerissen?",
      fr: "Mon Achille est-il Rompu?",
      es: "¿Está Roto mi Aquiles?",
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
    },
    tags: [{ words: "Diagnosis", color: "bg-rose-100" }],
    icon: "Stethoscope",
  },
  {
    slug: "FAQs/torn-achilles-recovery",
    title: {
      en: "Torn Achilles Recovery",
      de: "Genesung von gerissener Achillessehne",
      fr: "Récupération d'Achille Déchiré",
      es: "Recuperación de Aquiles Desgarrado",
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
    },
    tags: [{ words: "Recovery", color: "bg-purple-200" }],
    image: AchillesDrawing,
    icon: "Hourglass",
  },
  {
    slug: "FAQs/what-happens-if-my-achilles-is-ruptured",
    title: {
      en: "What Happens If My Achilles Is Ruptured?",
      de: "Was passiert, wenn meine Achillessehne gerissen ist?",
      fr: "Que se Passe-t-il si Mon Achille est Rompu?",
      es: "¿Qué Sucede si mi Aquiles está Roto?",
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
    },
    tags: [{ words: "Treatment", color: "bg-orange-200" }],
    image: AchillesDrawing,
    icon: "HelpCircle",
  },
  {
    slug: "FAQs/life-after-achilles-rupture",
    title: {
      en: "Life After Achilles Rupture",
      de: "Leben nach Achillessehnenriss",
      fr: "Vie Après la Rupture d'Achille",
      es: "Vida Después de la Ruptura de Aquiles",
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
    },
    tags: [{ words: "Recovery", color: "bg-purple-200" }],
    image: AchillesDrawing,
    icon: "Heart",
  },
];

// Main page routes
export const mainPageRoutes: BaseRoute[] = [
  {
    slug: "",
    title: {
      en: "Home",
      de: "Startseite",
      fr: "Accueil",
      es: "Inicio",
    },
    description: {
      en: "Thetis Medical - Achilles Splint Specialists",
      de: "Thetis Medical - Achillessehnen-Schienen-Spezialisten",
      fr: "Thetis Medical - Spécialistes d'Attelles d'Achille",
      es: "Thetis Medical - Especialistas en Férulas de Aquiles",
    },
  },
  {
    slug: "night-splint",
    title: {
      en: "Night Splint",
      de: "Nachtschiene",
      fr: "Attelle de Nuit",
      es: "Férula Nocturna",
    },
    description: {
      en: "Our specialized night splint for Achilles recovery.",
      de: "Unsere spezialisierte Nachtschiene für die Achilles-Genesung.",
      fr: "Notre attelle de nuit spécialisée pour la récupération d'Achille.",
      es:
        "Nuestra férula nocturna especializada para la recuperación de Aquiles.",
    },
  },
  {
    slug: "trauma-splint",
    title: {
      en: "Trauma Splint",
      de: "Traumaschiene",
      fr: "Attelle de Traumatisme",
      es: "Férula de Trauma",
    },
    description: {
      en: "Emergency splint for acute Achilles injuries.",
      de: "Notfallschiene für akute Achillesverletzungen.",
      fr: "Attelle d'urgence pour les blessures aiguës d'Achille.",
      es: "Férula de emergencia para lesiones agudas de Aquiles.",
    },
  },
  {
    slug: "achilles-ruptures",
    title: {
      en: "Achilles Ruptures",
      de: "Achillessehnenrisse",
      fr: "Ruptures d'Achille",
      es: "Rupturas de Aquiles",
    },
    description: {
      en: "Understanding Achilles ruptures and treatment options.",
      de: "Verstehen von Achillessehnenrissen und Behandlungsoptionen.",
      fr: "Comprendre les ruptures d'Achille et les options de traitement.",
      es: "Entendiendo las rupturas de Aquiles y opciones de tratamiento.",
    },
  },
  {
    slug: "recovery-pathway",
    title: {
      en: "Recovery Pathway",
      de: "Genesungsweg",
      fr: "Voie de Récupération",
      es: "Vía de Recuperación",
    },
    description: {
      en: "Your guided path to full recovery from Achilles injury.",
      de:
        "Ihr geführter Weg zur vollständigen Genesung von Achillesverletzungen.",
      fr:
        "Votre chemin guidé vers une récupération complète de la blessure d'Achille.",
      es:
        "Su camino guiado hacia la recuperación completa de la lesión de Aquiles.",
    },
  },
  {
    slug: "evidence-based-recovery",
    title: {
      en: "Evidence Based Recovery",
      de: "Evidenzbasierte Genesung",
      fr: "Récupération Basée sur les Preuves",
      es: "Recuperación Basada en Evidencia",
    },
    description: {
      en: "Scientific approach to Achilles tendon recovery.",
      de: "Wissenschaftlicher Ansatz zur Achillessehnen-Genesung.",
      fr: "Approche scientifique de la récupération du tendon d'Achille.",
      es: "Enfoque científico para la recuperación del tendón de Aquiles.",
    },
  },
  {
    slug: "sitemap",
    title: {
      en: "Sitemap",
      de: "Sitemap",
      fr: "Plan du Site",
      es: "Mapa del Sitio",
    },
    description: {
      en: "Complete site navigation and page listing.",
      de: "Vollständige Website-Navigation und Seitenliste.",
      fr: "Navigation complète du site et liste des pages.",
      es: "Navegación completa del sitio y lista de páginas.",
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
    },
    description: {
      en: "Our product return and refund policy.",
      de: "Unsere Produktrückgabe- und Erstattungsrichtlinie.",
      fr: "Notre politique de retour et de remboursement de produits.",
      es: "Nuestra política de devolución y reembolso de productos.",
    },
  },
];

// All routes combined
export const allBaseRoutes: BaseRoute[] = [
  ...mainPageRoutes,
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

  const href = language.dir === "/"
    ? `/${translatedSlug}`
    : `${language.dir}/${translatedSlug}`;

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

export function getRouteBySlugAndLanguage(
  slug: string,
  langCode: string,
): Route | undefined {
  // First try to find by translated slug, then by base slug, then by legacy slugs
  const baseRoute = allBaseRoutes.find((route) =>
    route.slugTranslations?.[langCode] === slug ||
    route.slug === slug ||
    route.legacySlugs?.includes(slug)
  );
  const language = languages.find((lang) => lang.code === langCode);

  if (!baseRoute || !language) return undefined;

  return generateRouteForLanguage(baseRoute, language);
}

export function getAlternateRoutesForSlug(
  slug: string,
  currentLangCode: string,
): Array<{ lang: string; href: string }> {
  // First try to find by translated slug, then by base slug, then by legacy slugs
  const baseRoute = allBaseRoutes.find((route) =>
    route.slugTranslations?.[currentLangCode] === slug ||
    route.slug === slug ||
    route.legacySlugs?.includes(slug)
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
    }
  }

  // Find the base route that matches this slug (including legacy slugs)
  const baseRoute = allBaseRoutes.find((route) => {
    // Check if this slug matches any of the translated slugs for any language
    const matchesTranslatedSlug = Object.values(route.slugTranslations || {})
      .includes(slug);
    // Check if this slug matches the base slug
    const matchesBaseSlug = route.slug === slug;
    // Check if this slug matches any legacy slug
    const matchesLegacySlug = route.legacySlugs?.includes(slug);

    return matchesTranslatedSlug || matchesBaseSlug || matchesLegacySlug;
  });

  if (!baseRoute) {
    // If no route found, just add language prefix as fallback
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

// Test function to verify URL mapping (for debugging)
export function testUrlMapping() {
  const testCases = [
    {
      from: "/de/achillessehnenriss-schiene",
      to: "fr",
      expected: "/fr/attelle-rupture-tendon-achille",
    },
    { from: "/splint", to: "de", expected: "/de/achillessehnenriss-schiene" },
    {
      from: "/night-splint",
      to: "fr",
      expected: "/fr/attelle-rupture-tendon-achille",
    },
    { from: "/reviews", to: "de", expected: "/de/bewertungen" },
  ];

  console.log("Testing URL mapping:");
  testCases.forEach(({ from, to, expected }) => {
    const result = getTranslatedUrlForLanguage(from, to);
    const passed = result === expected;
    console.log(
      `${from} -> ${to}: ${result} ${
        passed ? "✅" : "❌ (expected: " + expected + ")"
      }`,
    );
  });
}
