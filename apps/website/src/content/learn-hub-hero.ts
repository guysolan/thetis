import type { ConditionId } from "@/content/conditions/registry";
import type { Lang } from "@/config/languages";

export type LearnHubHeroIconId = "footprints" | "activity" | "stethoscope";

export interface LearnHubHeroCopy {
  kicker: string;
  /** Second line of title (primary color), after condition label */
  titleAccent: string;
  description: string;
  bullets: [string, string, string];
  cta: string;
  icon: LearnHubHeroIconId;
}

const plantar: Record<Lang, LearnHubHeroCopy> = {
  en: {
    kicker: "Patient hub",
    titleAccent: "Guides & support",
    description:
      "Step-by-step rehab stages, practical FAQs, and trusted reads — so you know what to do week by week and when to get help.",
    bullets: [
      "Stage-based patient guide",
      "Condition FAQs answered",
      "Recovery gear when it helps",
    ],
    cta: "Explore resources",
    icon: "footprints",
  },
  de: {
    kicker: "Patienten-Hub",
    titleAccent: "Leitfäden & Support",
    description:
      "Rehab-Phasen, praktische FAQs und fundierte Artikel — damit Sie wissen, was wann sinnvoll ist und wann Sie Hilfe holen sollten.",
    bullets: [
      "Stufenbasierter Patientenleitfaden",
      "FAQs zu dieser Beschwerde",
      "Recovery-Equipment bei Bedarf",
    ],
    cta: "Zu den Ressourcen",
    icon: "footprints",
  },
  fr: {
    kicker: "Espace patient",
    titleAccent: "guides & accompagnement",
    description:
      "Phases de rééducation, FAQ utiles et contenus fiables — pour savoir quoi faire semaine après semaine et quand consulter.",
    bullets: [
      "Guide patient par étapes",
      "FAQ sur cette pathologie",
      "Équipement de récupération si besoin",
    ],
    cta: "Voir les ressources",
    icon: "footprints",
  },
  es: {
    kicker: "Centro para pacientes",
    titleAccent: "guías y apoyo",
    description:
      "Etapas de rehabilitación, FAQs prácticas y lecturas fiables — para saber qué hacer semana a semana y cuándo pedir ayuda.",
    bullets: [
      "Guía por fases",
      "Preguntas frecuentes",
      "Equipo de recuperación cuando ayuda",
    ],
    cta: "Ver recursos",
    icon: "footprints",
  },
  it: {
    kicker: "Hub pazienti",
    titleAccent: "guide e supporto",
    description:
      "Fasi di riabilitazione, FAQ pratiche e letture attendibili — per sapere cosa fare settimana dopo settimana e quando chiedere aiuto.",
    bullets: [
      "Guida per fasi",
      "FAQ sulla condizione",
      "Attrezzatura per il recupero se serve",
    ],
    cta: "Esplora le risorse",
    icon: "footprints",
  },
};

const achillesTendinitis: Record<Lang, LearnHubHeroCopy> = {
  en: {
    kicker: "Load & rehab hub",
    titleAccent: "Evidence-led recovery",
    description:
      "Understand pain vs load, progress training safely, and use our FAQs and staged guide — built for real-world return to sport.",
    bullets: [
      "Tendon load principles",
      "FAQ on pain & training",
      "Staged guide to running",
    ],
    cta: "Explore resources",
    icon: "activity",
  },
  de: {
    kicker: "Belastung & Reha",
    titleAccent: "evidenzbasiert",
    description:
      "Schmerz vs. Belastung verstehen, Training sicher steigern — FAQs und gestufter Leitfaden für den Weg zurück zum Sport.",
    bullets: [
      "Prinzipien Sehnenbelastung",
      "FAQs zu Schmerz & Training",
      "Gestufter Leitfaden bis Laufen",
    ],
    cta: "Zu den Ressourcen",
    icon: "activity",
  },
  fr: {
    kicker: "Charge & rééducation",
    titleAccent: "récupération fondée sur les preuves",
    description:
      "Comprendre douleur vs charge, progresser en sécurité — FAQ et guide par étapes pour le retour au sport.",
    bullets: [
      "Principes de charge tendineuse",
      "FAQ douleur & entraînement",
      "Guide progressif jusqu’à la course",
    ],
    cta: "Voir les ressources",
    icon: "activity",
  },
  es: {
    kicker: "Carga y rehabilitación",
    titleAccent: "recuperación basada en evidencia",
    description:
      "Entiende dolor vs carga, progresa con seguridad — FAQs y guía por etapas para volver al deporte.",
    bullets: [
      "Principios de carga del tendón",
      "FAQs sobre dolor y entrenamiento",
      "Guía progresiva hasta correr",
    ],
    cta: "Ver recursos",
    icon: "activity",
  },
  it: {
    kicker: "Carico & riabilitazione",
    titleAccent: "recupero guidato dall’evidenza",
    description:
      "Dolore vs carico, progressione sicura — FAQ e guida a fasi per il ritorno all’attività.",
    bullets: [
      "Principi di carico del tendine",
      "FAQ su dolore e allenamento",
      "Guida progressiva fino alla corsa",
    ],
    cta: "Esplora le risorse",
    icon: "activity",
  },
};

const insertional: Record<Lang, LearnHubHeroCopy> = {
  en: {
    kicker: "Heel & tendon hub",
    titleAccent: "Guides & FAQs",
    description:
      "Different from mid-tendon pain: focus on footwear, load, and exercises for the back of the heel — with FAQs and a clear staged plan.",
    bullets: [
      "Insertional-specific FAQs",
      "Exercise & loading guidance",
      "When surgery is discussed",
    ],
    cta: "Explore resources",
    icon: "stethoscope",
  },
  de: {
    kicker: "Ferse & Sehne",
    titleAccent: "Leitfäden & FAQs",
    description:
      "Anders als Mittelsehnenschmerz: Schuhe, Belastung und Übungen für die Ferse — FAQs und klarer Stufenplan.",
    bullets: [
      "FAQs zur Insertionstendopathie",
      "Übungen & Belastung",
      "Wann OP diskutiert wird",
    ],
    cta: "Zu den Ressourcen",
    icon: "stethoscope",
  },
  fr: {
    kicker: "Talon & tendon",
    titleAccent: "guides & FAQ",
    description:
      "Différent de la tendinopathie moyenne : chaussures, charge et exercices pour l’arrière du talon — FAQ et plan par étapes.",
    bullets: [
      "FAQ spécifiques insertion",
      "Exercices & charge",
      "Quand la chirurgie est évoquée",
    ],
    cta: "Voir les ressources",
    icon: "stethoscope",
  },
  es: {
    kicker: "Talón y tendón",
    titleAccent: "guías y preguntas frecuentes",
    description:
      "Distinto del dolor a mitad del tendón: calzado, carga y ejercicios para el talón — FAQs y plan por etapas.",
    bullets: [
      "FAQs específicas de inserción",
      "Ejercicios y carga",
      "Cuándo se habla de cirugía",
    ],
    cta: "Ver recursos",
    icon: "stethoscope",
  },
  it: {
    kicker: "Tallone & tendine",
    titleAccent: "guide e FAQ",
    description:
      "Diverso dal dolore a metà tendine: calzature, carico ed esercizi per il tallone — FAQ e piano a fasi.",
    bullets: [
      "FAQ specifiche inserzionali",
      "Esercizi e carico",
      "Quando si discute l’intervento",
    ],
    cta: "Esplora le risorse",
    icon: "stethoscope",
  },
};

/** Localized Achilles rupture hero (all languages except EN bespoke layout). */
const achillesRuptureLocalized: Record<Lang, LearnHubHeroCopy> = {
  en: {
    kicker: "Recovery timeline",
    titleAccent: "recovery guide",
    description:
      "Your complete week-by-week guide from injury to full activity — evidence-based guidance at every stage.",
    bullets: [
      "Seven detailed phases",
      "Evidence-based milestones",
      "Surgeon-reviewed content",
    ],
    cta: "Explore resources",
    icon: "activity",
  },
  de: {
    kicker: "Genesungs-Timeline",
    titleAccent: "Patientenleitfaden",
    description:
      "Woche für Woche von der Verletzung bis zur vollen Belastung — evidenzbasiert und strukturiert.",
    bullets: [
      "Sieben detaillierte Phasen",
      "Evidenzbasierte Meilensteine",
      "Von Chirurgen geprüfte Inhalte",
    ],
    cta: "Zu den Ressourcen",
    icon: "activity",
  },
  fr: {
    kicker: "Parcours de récupération",
    titleAccent: "guide patient",
    description:
      "Semaine après semaine, de la blessure au retour à l’effort — repères fondés sur les données.",
    bullets: [
      "Sept phases détaillées",
      "Repères fondés sur les preuves",
      "Contenu relu par des chirurgiens",
    ],
    cta: "Voir les ressources",
    icon: "activity",
  },
  es: {
    kicker: "Cronología de recuperación",
    titleAccent: "guía del paciente",
    description:
      "Semana a semana desde la lesión hasta la actividad completa — orientación basada en evidencia.",
    bullets: [
      "Siete fases detalladas",
      "Hitos basados en evidencia",
      "Contenido revisado por cirujanos",
    ],
    cta: "Ver recursos",
    icon: "activity",
  },
  it: {
    kicker: "Percorso di recupero",
    titleAccent: "guida per il paziente",
    description:
      "Settimana dopo settimana dall’infortunio all’attività piena — indicazioni basate su evidenze.",
    bullets: [
      "Sette fasi dettagliate",
      "Tappe basate su evidenze",
      "Contenuti revisionati da chirurghi",
    ],
    cta: "Esplora le risorse",
    icon: "activity",
  },
};

export const learnHubHeroByCondition: Record<
  ConditionId,
  Record<Lang, LearnHubHeroCopy>
> = {
  "achilles-rupture": achillesRuptureLocalized,
  "plantar-fasciitis": plantar,
  "achilles-tendinitis": achillesTendinitis,
  "insertional-achilles-tendonitis": insertional,
};

export function getLearnHubHeroCopy(
  conditionId: ConditionId,
  lang: Lang,
): LearnHubHeroCopy {
  return learnHubHeroByCondition[conditionId][lang];
}
