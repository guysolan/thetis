import { type Language, languages } from "../config/languages";
import { Activity, Calendar, Heart, HelpCircle, Hourglass } from "lucide-react";
import type { ImageMetadata } from "astro";
import {
  Box,
  ClipboardCheck,
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
    ourProduct: "Our Product",
    patientGuides: "Patient Guides",
    professionals: "Professionals",
    contact: "Contact",
    buyNow: "Buy Now",
    learnMore: "Learn More",
    orderWholesale: "Order Wholesale",
    productTitle: "Achilles Tendon Rupture Splint",
    productDescription:
      "Improve recovery time and comfort after Achilles tendon rupture",
  },
  de: {
    ourProduct: "Unser Produkt",
    patientGuides: "Patientenleitfäden",
    professionals: "Fachkräfte",
    contact: "Kontakt",
    buyNow: "Jetzt kaufen",
    learnMore: "Mehr erfahren",
    orderWholesale: "Großhandel bestellen",
    productTitle: "Achillessehnenruptur-Schiene",
    productDescription:
      "Verbessern Sie die Genesungszeit und den Komfort nach einer Achillessehnenruptur",
  },
  fr: {
    ourProduct: "Notre Produit",
    patientGuides: "Guides du Patient",
    professionals: "Professionnels",
    contact: "Contact",
    buyNow: "Acheter maintenant",
    learnMore: "En savoir plus",
    orderWholesale: "Commander en gros",
    productTitle: "Attelle de rupture du tendon d'Achille",
    productDescription:
      "Améliorez le temps de récupération et le confort après une rupture du tendon d'Achille",
  },
  es: {
    ourProduct: "Nuestro Producto",
    patientGuides: "Guías del Paciente",
    professionals: "Profesionales",
    contact: "Contacto",
    buyNow: "Comprar ahora",
    learnMore: "Aprende más",
    orderWholesale: "Pedir al por mayor",
    productTitle: "Férula para rotura del tendón de Aquiles",
    productDescription:
      "Mejore el tiempo de recuperación y la comodidad después de la rotura del tendón de Aquiles",
  },
  it: {
    ourProduct: "Il Nostro Prodotto",
    patientGuides: "Guide del Paziente",
    professionals: "Professionisti",
    contact: "Contatto",
    buyNow: "Compra ora",
    learnMore: "Scopri di più",
    orderWholesale: "Ordina all'ingrosso",
    productTitle: "Férula per rottura del tendine di Achille",
    productDescription:
      "Migliora i tempi di recupero e il comfort dopo la rottura del tendine di Achille",
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
      de: "großhandel-bestellen",
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
