import {
  Box,
  ClipboardCheck,
  Handshake,
  HeartHandshake,
  Mail,
  Microscope,
  Moon,
  Rewind,
  Star,
  Stethoscope,
  Calendar,
  Activity,
  HelpCircle,
  Heart,
  Hourglass,
} from "lucide-react";
import nightSplintImage from "./night_splint_bed_side.jpg";
import AchillesDrawing from "../assets/drawings/achilles-drawing.svg";
import { languages, Language } from "../config/languages";

// Base route definition
export interface BaseRoute {
  slug: string; // Base slug without language prefix
  title: Record<string, string>; // Titles for each language
  description: Record<string, string>; // Descriptions for each language
  icon?: React.ReactNode;
  variant?: "default" | "outline";
  image?: ImageMetadata;
  tags?: Array<{ words: string; color: string }>;
}

// Resolved route with language-specific information
export interface Route {
  href: string; // Full href including language prefix
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: "default" | "outline";
  image?: ImageMetadata;
  tags?: Array<{ words: string; color: string }>;
  lang: string;
  slug: string;
}

// Product routes
export const productRoutes: BaseRoute[] = [
  {
    slug: "splint",
    title: {
      en: "Achilles Rupture Splint",
      de: "Achillessehnen-Ruptur-Schiene",
      fr: "Attelle de Rupture d'Achille",
      es: "Férula de Ruptura de Aquiles",
    },
    description: {
      en: "Recovery quicker and more comfortably from achilles tendon rupture.",
      de: "Schnellere und komfortablere Genesung von Achillessehnenriss.",
      fr: "Récupération plus rapide et plus confortable de la rupture du tendon d'Achille.",
      es: "Recuperación más rápida y cómoda de la ruptura del tendón de Aquiles.",
    },
    image: nightSplintImage,
    icon: <Moon size={20} />,
    variant: "outline",
  },
  {
    slug: "reviews",
    title: {
      en: "Reviews",
      de: "Bewertungen",
      fr: "Avis",
      es: "Reseñas",
    },
    description: {
      en: "Read what our customers have to say about our products.",
      de: "Lesen Sie, was unsere Kunden über unsere Produkte sagen.",
      fr: "Lisez ce que nos clients disent de nos produits.",
      es: "Lea lo que nuestros clientes dicen sobre nuestros productos.",
    },
    icon: <Star size={20} />,
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
    },
    description: {
      en: "Join other clinicians improving patient recovery.",
      de: "Schließen Sie sich anderen Klinikern an, die die Patientengenesung verbessern.",
      fr: "Rejoignez d'autres cliniciens qui améliorent la récupération des patients.",
      es: "Únase a otros médicos que mejoran la recuperación de los pacientes.",
    },
    icon: <Stethoscope size={20} />,
    variant: "default",
  },
  {
    slug: "partners",
    title: {
      en: "Our Partners",
      de: "Unsere Partner",
      fr: "Nos Partenaires",
      es: "Nuestros Socios",
    },
    description: {
      en: "Our partners are the best in the business.",
      de: "Unsere Partner sind die Besten in der Branche.",
      fr: "Nos partenaires sont les meilleurs du secteur.",
      es: "Nuestros socios son los mejores del negocio.",
    },
    icon: <HeartHandshake size={20} />,
    variant: "outline",
  },
  {
    slug: "research",
    title: {
      en: "Our Research",
      de: "Unsere Forschung",
      fr: "Notre Recherche",
      es: "Nuestra Investigación",
    },
    description: {
      en: "Our analysis of Achilles Rupture Recovery.",
      de: "Unsere Analyse der Achillessehnenriss-Genesung.",
      fr: "Notre analyse de la récupération de la rupture d'Achille.",
      es: "Nuestro análisis de la recuperación de la ruptura de Aquiles.",
    },
    icon: <Microscope size={20} />,
    variant: "outline",
  },
  {
    slug: "evidence",
    title: {
      en: "Evidence",
      de: "Nachweis",
      fr: "Preuves",
      es: "Evidencia",
    },
    description: {
      en: "Proven to shorten time to care and improve patient experience.",
      de: "Nachweislich verkürzt die Zeit bis zur Versorgung und verbessert die Patientenerfahrung.",
      fr: "Prouvé pour raccourcir le temps de soins et améliorer l'expérience patient.",
      es: "Comprobado para acortar el tiempo de atención y mejorar la experiencia del paciente.",
    },
    icon: <ClipboardCheck size={20} />,
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
    },
    description: {
      en: "Contact us for more information.",
      de: "Kontaktieren Sie uns für weitere Informationen.",
      fr: "Contactez-nous pour plus d'informations.",
      es: "Contáctenos para más información.",
    },
    icon: <Mail size={20} />,
    variant: "default",
  },
  {
    slug: "become-a-partner",
    title: {
      en: "Become a Partner",
      de: "Partner werden",
      fr: "Devenir Partenaire",
      es: "Convertirse en Socio",
    },
    description: {
      en: "Become a partner and help us spread the word.",
      de: "Werden Sie Partner und helfen Sie uns, das Wort zu verbreiten.",
      fr: "Devenez partenaire et aidez-nous à faire passer le mot.",
      es: "Conviértase en socio y ayúdenos a correr la voz.",
    },
    icon: <Handshake size={20} />,
    variant: "outline",
  },
  {
    slug: "order-wholesale",
    title: {
      en: "Order Wholesale",
      de: "Großhandel bestellen",
      fr: "Commander en Gros",
      es: "Pedido al Por Mayor",
    },
    description: {
      en: "Order wholesale products for your clinic.",
      de: "Bestellen Sie Großhandelsprodukte für Ihre Klinik.",
      fr: "Commandez des produits en gros pour votre clinique.",
      es: "Solicite productos al por mayor para su clínica.",
    },
    icon: <Box size={20} />,
    variant: "outline",
  },
  {
    slug: "request-a-return",
    title: {
      en: "Request a Return",
      de: "Rücksendung anfordern",
      fr: "Demander un Retour",
      es: "Solicitar una Devolución",
    },
    description: {
      en: "Request a return for your product.",
      de: "Fordern Sie eine Rücksendung für Ihr Produkt an.",
      fr: "Demandez un retour pour votre produit.",
      es: "Solicite una devolución para su producto.",
    },
    icon: <Rewind size={20} />,
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
      en: "Explore a detailed timeline outlining the treatment and recovery journey of an Achilles Tendon Rupture, from the moment of injury to regaining unrestricted activity. Discover the crucial phases and milestones along the way.",
      de: "Erkunden Sie eine detaillierte Zeitleiste, die die Behandlungs- und Genesungsreise eines Achillessehnenrisses umreißt, vom Moment der Verletzung bis zur Wiedererlangung uneingeschränkter Aktivität. Entdecken Sie die entscheidenden Phasen und Meilensteine auf dem Weg.",
      fr: "Explorez une chronologie détaillée décrivant le parcours de traitement et de récupération d'une rupture du tendon d'Achille, du moment de la blessure à la reprise d'activité sans restriction. Découvrez les phases cruciales et les jalons en cours de route.",
      es: "Explore una cronología detallada que describe el viaje de tratamiento y recuperación de una ruptura del tendón de Aquiles, desde el momento de la lesión hasta recuperar la actividad sin restricciones. Descubra las fases cruciales y los hitos en el camino.",
    },
    tags: [
      { words: "Treatment", color: "bg-orange-200" },
      { words: "Recovery", color: "bg-purple-200" },
    ],
    image: AchillesDrawing,
    icon: <Calendar size={20} />,
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
      en: "Navigate through a comprehensive guide dedicated to understanding the treatment options for a ruptured Achilles tendon. Delve into aspects like surgical considerations, post-surgery pain management, and the path to recovery.",
      de: "Navigieren Sie durch einen umfassenden Leitfaden zur Verstehen der Behandlungsoptionen für eine gerissene Achillessehne. Vertiefen Sie sich in Aspekte wie chirurgische Überlegungen, postoperative Schmerzbehandlung und den Weg zur Genesung.",
      fr: "Naviguez à travers un guide complet dédié à la compréhension des options de traitement pour un tendon d'Achille rompu. Plongez dans des aspects comme les considérations chirurgicales, la gestion de la douleur post-chirurgicale et le chemin vers la récupération.",
      es: "Navegue a través de una guía completa dedicada a entender las opciones de tratamiento para un tendón de Aquiles roto. Profundice en aspectos como consideraciones quirúrgicas, manejo del dolor post-cirugía y el camino hacia la recuperación.",
    },
    tags: [{ words: "Treatment", color: "bg-orange-200" }],
    image: AchillesDrawing,
    icon: <Activity size={20} />,
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
      en: "Uncover all you need to determine if you have experienced a ruptured Achilles tendon. Learn about the causes, symptoms, and the severity of the injury.",
      de: "Entdecken Sie alles, was Sie brauchen, um festzustellen, ob Sie eine gerissene Achillessehne erlebt haben. Lernen Sie über die Ursachen, Symptome und die Schwere der Verletzung.",
      fr: "Découvrez tout ce dont vous avez besoin pour déterminer si vous avez subi une rupture du tendon d'Achille. Apprenez les causes, les symptômes et la gravité de la blessure.",
      es: "Descubra todo lo que necesita para determinar si ha experimentado una ruptura del tendón de Aquiles. Aprenda sobre las causas, síntomas y la gravedad de la lesión.",
    },
    tags: [{ words: "Diagnosis", color: "bg-rose-100" }],
    icon: <Stethoscope size={20} />,
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
      en: "Find a comprehensive resource on torn Achilles recovery, covering aspects such as recovery duration with or without surgery, casts versus boots, and sleep considerations during recovery.",
      de: "Finden Sie eine umfassende Ressource zur Genesung von gerissener Achillessehne, die Aspekte wie Genesungsdauer mit oder ohne Operation, Gips versus Stiefel und Schlafüberlegungen während der Genesung abdeckt.",
      fr: "Trouvez une ressource complète sur la récupération d'Achille déchiré, couvrant des aspects tels que la durée de récupération avec ou sans chirurgie, plâtres versus bottes, et considérations de sommeil pendant la récupération.",
      es: "Encuentre un recurso completo sobre la recuperación de Aquiles desgarrado, cubriendo aspectos como duración de recuperación con o sin cirugía, yesos versus botas, y consideraciones de sueño durante la recuperación.",
    },
    tags: [{ words: "Recovery", color: "bg-purple-200" }],
    image: AchillesDrawing,
    icon: <Hourglass size={20} />,
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
      en: "Gain insights about what to expect if you have a ruptured Achilles tendon, including initial treatment in A&E, physiotherapy recommendations, and the number of required check-ups.",
      de: "Gewinnen Sie Einblicke darüber, was zu erwarten ist, wenn Sie eine gerissene Achillessehne haben, einschließlich Erstbehandlung in der Notaufnahme, Physiotherapie-Empfehlungen und die Anzahl der erforderlichen Nachuntersuchungen.",
      fr: "Obtenez des aperçus sur ce à quoi s'attendre si vous avez un tendon d'Achille rompu, y compris le traitement initial aux urgences, les recommandations de physiothérapie et le nombre de contrôles requis.",
      es: "Obtenga información sobre qué esperar si tiene un tendón de Aquiles roto, incluyendo tratamiento inicial en urgencias, recomendaciones de fisioterapia y el número de chequeos requeridos.",
    },
    tags: [{ words: "Treatment", color: "bg-orange-200" }],
    image: AchillesDrawing,
    icon: <HelpCircle size={20} />,
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
      en: "Discover insights on life after an Achilles rupture, including when you can resume walking, working, and engaging in sports.",
      de: "Entdecken Sie Einblicke in das Leben nach einem Achillessehnenriss, einschließlich wann Sie wieder gehen, arbeiten und Sport treiben können.",
      fr: "Découvrez des aperçus sur la vie après une rupture d'Achille, y compris quand vous pouvez reprendre la marche, le travail et la pratique du sport.",
      es: "Descubra información sobre la vida después de una ruptura de Aquiles, incluyendo cuándo puede reanudar caminar, trabajar y participar en deportes.",
    },
    tags: [{ words: "Recovery", color: "bg-purple-200" }],
    image: AchillesDrawing,
    icon: <Heart size={20} />,
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
      es: "Nuestra férula nocturna especializada para la recuperación de Aquiles.",
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
      de: "Ihr geführter Weg zur vollständigen Genesung von Achillesverletzungen.",
      fr: "Votre chemin guidé vers une récupération complète de la blessure d'Achille.",
      es: "Su camino guiado hacia la recuperación completa de la lesión de Aquiles.",
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
export function generateRouteForLanguage(baseRoute: BaseRoute, language: Language): Route {
  const href = language.dir === "/" 
    ? `/${baseRoute.slug}` 
    : `${language.dir}/${baseRoute.slug}`;
  
  return {
    href: href.replace(/\/+/g, '/').replace(/\/$/, '') || '/',
    title: baseRoute.title[language.code] || baseRoute.title.en,
    description: baseRoute.description[language.code] || baseRoute.description.en,
    icon: baseRoute.icon,
    variant: baseRoute.variant,
    image: baseRoute.image,
    tags: baseRoute.tags,
    lang: language.code,
    slug: baseRoute.slug,
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
  const language = languages.find(lang => lang.code === langCode);
  if (!language) return [];
  
  return allBaseRoutes.map(baseRoute => generateRouteForLanguage(baseRoute, language));
}

export function getRouteBySlugAndLanguage(slug: string, langCode: string): Route | undefined {
  const baseRoute = allBaseRoutes.find(route => route.slug === slug);
  const language = languages.find(lang => lang.code === langCode);
  
  if (!baseRoute || !language) return undefined;
  
  return generateRouteForLanguage(baseRoute, language);
}

export function getAlternateRoutesForSlug(slug: string, currentLangCode: string): Array<{lang: string; href: string}> {
  const baseRoute = allBaseRoutes.find(route => route.slug === slug);
  if (!baseRoute) return [];
  
  return languages
    .filter(lang => lang.code !== currentLangCode)
    .map(lang => ({
      lang: lang.hreflang,
      href: generateRouteForLanguage(baseRoute, lang).href,
    }));
}

// Backward compatibility exports
export const pages = getRoutesByLanguage('en');
export const articles = articleRoutes.map(route => generateRouteForLanguage(route, languages[0]));

// Category exports for easy access
export const productLinks = productRoutes.map(route => generateRouteForLanguage(route, languages[0]));
export const partnerLinks = partnerRoutes.map(route => generateRouteForLanguage(route, languages[0]));
export const contactLinks = contactRoutes.map(route => generateRouteForLanguage(route, languages[0]));
export const videoPages = videoRoutes.map(route => generateRouteForLanguage(route, languages[0]));
export const faqLinks = articleRoutes.map(route => generateRouteForLanguage(route, languages[0]));
export const legalLinks = legalRoutes.map(route => generateRouteForLanguage(route, languages[0]));