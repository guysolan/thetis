import type { Lang } from "@/config/languages";
import type { ConditionId } from "@/content/conditions/registry";

/** Nav cards, layout meta, and non–Achilles hero tagline on `/shop/[condition]`. */
export const CONDITION_SHOP_HUB_DESCRIPTION: Record<
  ConditionId,
  Record<Lang, string>
> = {
  "achilles-rupture": {
    en: "Patented night splint, VACOped and Aircast boots, EvenUp leveler, straps, wedges, and comfort picks from our rupture guides—with partner links where helpful.",
    de: "Patentierte Nachtschiene, VACOped- und Aircast-Boote, EvenUp-Höhenausgleich, Riemen, Keile und Komfort-Tipps aus unseren Ruptur-Leitfäden—Partnerlinks wo sinnvoll.",
    fr: "Attelle de nuit brevetée, bottes VACOped et Aircast, compensateur EvenUp, sangles, cales et confort tirés de nos guides rupture—liens partenaires si utile.",
    es: "Férula nocturna patentada, botas VACOped y Aircast, elevador EvenUp, correas, cuñas y confort de nuestras guías de rotura—enlaces de socios cuando ayuden.",
    it: "Tutore notturno brevettato, stivali VACOped e Aircast, rialzo EvenUp, cinghie, zeppe e comfort dalle nostre guide sulla rottura—link partner dove utile.",
  },
  "plantar-fasciitis": {
    en: "Recovery course, plantar fascia night splints, slant boards, supportive shoes, compression sleeves, and ice or massage tools from our PF guides—partner links where helpful.",
    de: "Genesungskurs, Plantarfaszien-Nachtschienen, Schrägbretter, stützende Schuhe, Kompressions-Ärmel sowie Kälte- und Massage-Hilfen aus unseren PF-Leitfäden—Partnerlinks wo sinnvoll.",
    fr: "Cours de récupération, attelles de nuit pour fasciite, planches inclinées, chaussures de soutien, manchons de compression, froid et massage d’après nos guides—liens partenaires si utile.",
    es: "Curso de recuperación, férulas nocturnas para la fascia, tablas inclinadas, calzado de soporte, mangas de compresión y frío o masaje según nuestras guías—enlaces de socios cuando ayuden.",
    it: "Corso di recupero, tutori notturni per la fascia, scivoli inclinati, scarpe di supporto, fasce a compressione e ghiaccio o massaggio dalle nostre guide—link partner dove utile.",
  },
  "achilles-tendinitis": {
    en: "Resistance bands, eccentric-loading tools, supportive trainers, heel lifts, and calf unload or massage picks from our tendinopathy guides—partner links where helpful.",
    de: "Therabänder, exzentrische Belastung, stabile Laufschuhe, Fersenerhöhungen und Waden-Entlastung oder Massage aus unseren Tendinopathie-Leitfäden—Partnerlinks wo sinnvoll.",
    fr: "Bandes élastiques, renforcement excentrique, chaussures stables, talonnettes et choix décharge ou massage pour tendinopathie—liens partenaires si utile.",
    es: "Bandas de resistencia, carga excéntrica, zapatillas de apoyo, alzas taloneras y descarga o masaje de pantorrilla según nuestras guías—enlaces de socios cuando ayuden.",
    it: "Fasce elastiche, carico eccentrico, scarpe stabili, rialzi tallone e scarico o massaggio polpaccio dalle nostre guide—link partner dove utile.",
  },
  "insertional-achilles-tendonitis": {
    en: "Heel lifts, softer heel counters and footwear, stretch wedges, taping or pads, and offload picks for insertional Achilles pain from our guides—partner links where helpful.",
    de: "Fersenerhöhungen, weichere Fersenzonen und Schuhe, Stretch-Keile, Taping oder Polster und Entlastung bei insertionaler Achilles-Schmerz-Leitfäden—Partnerlinks wo sinnvoll.",
    fr: "Talonnettes, chaussures à contrefort talon plus souple, cales d’étirement, strapping ou coussinets selon nos guides insertionnels—liens partenaires si utile.",
    es: "Alzas, calzado con talón más flexible, cuñas de estiramiento, vendaje o almohadillas según nuestras guías insercionales—enlaces de socios cuando ayuden.",
    it: "Rialzi del tallone, calzature con contro tallone più morbido, cunei per lo stretching, taping o cuscinetti dalle guide per dolore inserzionale—link partner dove utile.",
  },
};

/** Learn hub nav cards and default layout meta description. */
export const CONDITION_LEARN_HUB_DESCRIPTION: Record<
  ConditionId,
  Record<Lang, string>
> = {
  "achilles-rupture": {
    en: "Week-by-week timeline, rupture FAQs, recovery course, boot and splint guidance, and shop links in one place.",
    de: "Woche-für-Woche-Zeitplan, FAQs zur Ruptur, Genesungskurs, Gehboot und Nachtschiene, Shop — alles gebündelt.",
    fr: "Parcours semaine par semaine, FAQ rupture, cours, botte et attelle de nuit, boutique — au même endroit.",
    es: "Cronograma semanal, FAQs de rotura, curso, bota y férula nocturna, tienda — en un solo sitio.",
    it: "Percorso settimana per settimana, FAQ sulla rottura, corso, stivale e tutore notturno, shop — in un unico hub.",
  },
  "plantar-fasciitis": {
    en: "Staged recovery course, morning-arch and loading FAQs, phase-by-phase guides, and fascia-friendly shop picks.",
    de: "Gestaffelter Kurs, FAQs zu Morgensteifigkeit und Belastung, Phasenleitfäden und passende Shop-Empfehlungen.",
    fr: "Cours par phases, FAQ raideur matinale et charge progressive, guides par étape et sélection boutique adaptée.",
    es: "Curso por fases, FAQs de arco matutino y carga, guías por etapa y selección de tienda alineada con la fascia.",
    it: "Corso a fasi, FAQ rigidità mattutina e carico, guide per fase e selezione shop rispettosa della fascia.",
  },
  "achilles-tendinitis": {
    en: "Mid-Achilles tendinopathy FAQs, staged loading guides, rehab course (where available), and progressive-rehab shop links.",
    de: "FAQs zur nicht-insertionellen Achillestendinopathie, gestaffelte Belastungsleitfäden, Reha-Kurs (falls verfügbar), Shop für progressive Reha.",
    fr: "FAQ tendinopathie moyenne, guides de charge par étapes, cours de rétablissement (si disponible), liens boutique progressifs.",
    es: "FAQs de tendinopatía media, guías de carga por fases, curso de recuperación (cuando exista) y tienda para rehabilitación progresiva.",
    it: "FAQ sulla tendinopatia non inserzionale, guide al carico per fasi, corso rehab (se disponibile) e link shop per rehab progressiva.",
  },
  "insertional-achilles-tendonitis": {
    en: "Insertional heel pain FAQs, staged offload-and-load guides, course (where available), and heel-friendly equipment in the shop.",
    de: "FAQs insertionaler Fersenschmerz, Leitfäden zu Entlastung und Belastung, Kurs (falls verfügbar), fersenschonendes Equipment im Shop.",
    fr: "FAQ douleur talon insertionnelle, guides décharge puis charge, cours (si disponible), équipement talon au shop.",
    es: "FAQs de talón insercional, guías de descarga y carga, curso (cuando exista) y equipo respetuoso con el talón en la tienda.",
    it: "FAQ dolore tallonare inserzionale, guide scarico e carico, corso (se disponibile) e attrezzatura tallo-friendly nello shop.",
  },
};

/** EN-only meta description for `/learn/achilles-rupture` layout (longer SEO blurb). */
export const ACHILLES_RUPTURE_EN_LEARN_META_DESCRIPTION =
  "Complete week-by-week Achilles tendon rupture recovery: emergency care through return to sport—FAQs, course, boot and night-splint guidance, and curated equipment.";
