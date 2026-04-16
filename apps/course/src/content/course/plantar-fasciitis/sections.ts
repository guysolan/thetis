import {
  createSection,
  numberSections,
  type SectionMetadata,
  type SectionStatus,
  type TimingSuggestion,
} from "../section-types";

// 00-understanding
import { metadata as introduction } from "./00-understanding/introduction";
import { metadata as commonMyths } from "./00-understanding/common-myths";
import { metadata as anatomy } from "./00-understanding/anatomy";
import { metadata as whatWentWrong } from "./00-understanding/what-went-wrong";
import { metadata as whyItPersists } from "./00-understanding/why-it-persists";

// 01-level-1-foundation
import { metadata as treatmentOverview } from "./01-level-1-foundation/treatment-overview";
import { metadata as restAndWeightManagement } from "./01-level-1-foundation/rest-and-weight-management";
import { metadata as stretchingProgramme } from "./01-level-1-foundation/stretching-programme";
import { metadata as slantBoardGuide } from "./01-level-1-foundation/slant-board-guide";
import { metadata as weeklyProgression } from "./01-level-1-foundation/weekly-progression";
import { metadata as footwearAndInsoles } from "./01-level-1-foundation/footwear-and-insoles";
import { metadata as toeStretchesAndNightSplints } from "./01-level-1-foundation/toe-stretches-and-night-splints";
import { metadata as maintainingProgress } from "./01-level-1-foundation/maintaining-progress";

// 02-level-2-further-treatment
import { metadata as whenToSeekHelp } from "./02-level-2-further-treatment/when-to-seek-help";
import { metadata as scansAndDiagnosis } from "./02-level-2-further-treatment/scans-and-diagnosis";
import { metadata as steroidInjections } from "./02-level-2-further-treatment/steroid-injections";
import { metadata as shockwaveTherapy } from "./02-level-2-further-treatment/shockwave-therapy";
import { metadata as prpInjections } from "./02-level-2-further-treatment/prp-injections";

// 03-level-3-surgery
import { metadata as surgeryOverview } from "./03-level-3-surgery/surgery-overview";
import { metadata as gastrocnemiusRecession } from "./03-level-3-surgery/gastrocnemius-recession";
import { metadata as plantarFasciaRelease } from "./03-level-3-surgery/plantar-fascia-release";

// ── Slug → chapter mapping ──────────────────────────────────────────

export const slugToChapter: Record<string, string> = {
  introduction: "00-understanding",
  "common-myths": "00-understanding",
  anatomy: "00-understanding",
  "what-went-wrong": "00-understanding",
  "why-it-persists": "00-understanding",
  "treatment-overview": "01-level-1-foundation",
  "rest-and-weight-management": "01-level-1-foundation",
  "stretching-programme": "01-level-1-foundation",
  "slant-board-guide": "01-level-1-foundation",
  "weekly-progression": "01-level-1-foundation",
  "footwear-and-insoles": "01-level-1-foundation",
  "toe-stretches-and-night-splints": "01-level-1-foundation",
  "maintaining-progress": "01-level-1-foundation",
  "when-to-seek-help": "02-level-2-further-treatment",
  "scans-and-diagnosis": "02-level-2-further-treatment",
  "steroid-injections": "02-level-2-further-treatment",
  "shockwave-therapy": "02-level-2-further-treatment",
  "prp-injections": "02-level-2-further-treatment",
  "surgery-overview": "03-level-3-surgery",
  "gastrocnemius-recession": "03-level-3-surgery",
  "plantar-fascia-release": "03-level-3-surgery",
};

// ── Section builder shorthand ───────────────────────────────────────

function s(
  slug: string,
  title: string,
  description: string,
  timing: TimingSuggestion,
  status?: SectionStatus,
) {
  return createSection(
    slug,
    title,
    description,
    timing,
    slugToChapter,
    "standard",
    status,
  );
}

// ── Ordered sections ────────────────────────────────────────────────

const raw: Omit<SectionMetadata, "section_number">[] = [
  // Understanding your condition
  s("introduction", introduction.title, introduction.description, {
    when_useful: "Start here – understand what heel pain is and what to expect",
    triggers: ["just diagnosed", "new heel pain", "first visit"],
    approximate_days: 0,
  }, introduction.status || "todo"),
  s("common-myths", commonMyths.title, commonMyths.description, {
    when_useful: "Early on – dispel anxiety from common misconceptions",
    triggers: [
      "worried it won't get better",
      "considering injection",
      "considering surgery",
    ],
    approximate_days: 0,
  }, commonMyths.status || "todo"),
  s("anatomy", anatomy.title, anatomy.description, {
    when_useful:
      "Early on – understand the structures involved in your heel pain",
    triggers: ["want to understand anatomy", "what is plantar fascia"],
    approximate_days: 0,
  }, anatomy.status || "todo"),
  s("what-went-wrong", whatWentWrong.title, whatWentWrong.description, {
    when_useful: "Early on – understand why daily wear and tear led to injury",
    triggers: ["why does it hurt", "what caused this"],
    approximate_days: 0,
  }, whatWentWrong.status || "todo"),
  s("why-it-persists", whyItPersists.title, whyItPersists.description, {
    when_useful: "Early on – identify which factors are slowing your recovery",
    triggers: ["why isn't it getting better", "risk factors"],
    approximate_days: 0,
  }, whyItPersists.status || "todo"),

  // Level 1: Foundation (allow 3 months)
  s(
    "treatment-overview",
    treatmentOverview.title,
    treatmentOverview.description,
    {
      when_useful:
        "Before starting treatment – understand the three-level approach",
      triggers: ["starting treatment", "what are my options"],
      approximate_days: 1,
    },
    treatmentOverview.status || "todo",
  ),
  s(
    "rest-and-weight-management",
    restAndWeightManagement.title,
    restAndWeightManagement.description,
    {
      when_useful: "Immediately – the first changes to make today",
      triggers: ["starting Level 1", "weight loss", "activity modification"],
      approximate_days: 1,
    },
    restAndWeightManagement.status || "todo",
  ),
  s(
    "stretching-programme",
    stretchingProgramme.title,
    stretchingProgramme.description,
    {
      when_useful: "Immediately – the cornerstone of your treatment",
      triggers: ["starting stretches", "which exercises"],
      approximate_days: 1,
    },
    stretchingProgramme.status || "todo",
  ),
  s("slant-board-guide", slantBoardGuide.title, slantBoardGuide.description, {
    when_useful: "When you get your slant board – detailed usage instructions",
    triggers: [
      "bought slant board",
      "how to use slant board",
      "slant board progression",
    ],
    approximate_days: 7,
  }, slantBoardGuide.status || "todo"),
  s(
    "footwear-and-insoles",
    footwearAndInsoles.title,
    footwearAndInsoles.description,
    {
      when_useful: "Early on – choose the right shoes to support recovery",
      triggers: ["which shoes", "need insoles", "barefoot"],
      approximate_days: 7,
    },
    footwearAndInsoles.status || "todo",
  ),
  s(
    "toe-stretches-and-night-splints",
    toeStretchesAndNightSplints.title,
    toeStretchesAndNightSplints.description,
    {
      when_useful:
        "During Level 1 – additional techniques to complement slant board work",
      triggers: ["morning pain", "first steps hurt", "night splint"],
      approximate_days: 7,
    },
    toeStretchesAndNightSplints.status || "todo",
  ),
  s(
    "weekly-progression",
    weeklyProgression.title,
    weeklyProgression.description,
    {
      when_useful: "Weeks 1–6+ – follow the structured progression plan",
      triggers: ["week 1", "how to progress", "not improving yet"],
      approximate_days: 7,
    },
    weeklyProgression.status || "todo",
  ),
  s(
    "maintaining-progress",
    maintainingProgress.title,
    maintainingProgress.description,
    {
      when_useful: "Once improving – don't stop stretching too soon",
      triggers: [
        "pain settling",
        "can I stop stretching",
        "relapse prevention",
      ],
      approximate_days: 42,
    },
    maintainingProgress.status || "todo",
  ),

  // Level 2: Further treatment (after 3+ months of Level 1)
  s("when-to-seek-help", whenToSeekHelp.title, whenToSeekHelp.description, {
    when_useful: "After 3 months of Level 1 with no improvement",
    triggers: ["no improvement", "still hurting", "need specialist"],
    approximate_days: 90,
  }, whenToSeekHelp.status || "todo"),
  s(
    "scans-and-diagnosis",
    scansAndDiagnosis.title,
    scansAndDiagnosis.description,
    {
      when_useful: "When your specialist recommends imaging",
      triggers: ["ultrasound", "MRI", "is it something else"],
      approximate_days: 90,
    },
    scansAndDiagnosis.status || "todo",
  ),
  s(
    "steroid-injections",
    steroidInjections.title,
    steroidInjections.description,
    {
      when_useful: "When considering injection treatment",
      triggers: ["injection", "cortisone", "steroid"],
      approximate_days: 90,
    },
    steroidInjections.status || "todo",
  ),
  s("shockwave-therapy", shockwaveTherapy.title, shockwaveTherapy.description, {
    when_useful: "When considering shockwave as a Level 2 option",
    triggers: ["shockwave", "ESWL", "not responding to stretches"],
    approximate_days: 90,
  }, shockwaveTherapy.status || "todo"),
  s("prp-injections", prpInjections.title, prpInjections.description, {
    when_useful: "If PRP has been suggested to you – understand the evidence",
    triggers: ["PRP", "platelet rich plasma", "blood injection"],
    approximate_days: 90,
  }, prpInjections.status || "todo"),

  // Level 3: Surgery (rare, after 12+ months)
  s("surgery-overview", surgeryOverview.title, surgeryOverview.description, {
    when_useful: "Only after Levels 1 and 2 have been exhausted",
    triggers: ["surgery", "operation", "nothing else worked"],
    approximate_days: 365,
  }, surgeryOverview.status || "todo"),
  s(
    "gastrocnemius-recession",
    gastrocnemiusRecession.title,
    gastrocnemiusRecession.description,
    {
      when_useful: "If calf release surgery is being discussed",
      triggers: [
        "gastrocnemius recession",
        "calf release",
        "tight calf surgery",
      ],
      approximate_days: 365,
    },
    gastrocnemiusRecession.status || "todo",
  ),
  s(
    "plantar-fascia-release",
    plantarFasciaRelease.title,
    plantarFasciaRelease.description,
    {
      when_useful: "If plantar fascia release is being discussed",
      triggers: ["fasciotomy", "plantar fascia release", "foot surgery"],
      approximate_days: 365,
    },
    plantarFasciaRelease.status || "todo",
  ),
];

export const sections: SectionMetadata[] = numberSections(raw);

// ── Bound helper functions (operate on this module's sections array) ─

export function getSectionBySlug(slug: string): SectionMetadata | undefined {
  return sections.find((s) => s.slug === slug);
}

export function getSectionsByCourseType(
  courseType: "standard" | "premium",
): SectionMetadata[] {
  return sections.filter((s) => s.course_type === courseType);
}

export function getNextSection(currentSlug: string): SectionMetadata | null {
  const idx = sections.findIndex((s) => s.slug === currentSlug);
  if (idx === -1 || idx === sections.length - 1) return null;
  return sections[idx + 1];
}

export function getPrevSection(currentSlug: string): SectionMetadata | null {
  const idx = sections.findIndex((s) => s.slug === currentSlug);
  if (idx <= 0) return null;
  return sections[idx - 1];
}

export function getSectionIndex(slug: string): number {
  return sections.findIndex((s) => s.slug === slug);
}

export function getSectionsByTrigger(trigger: string): SectionMetadata[] {
  return sections.filter((s) =>
    s.timing.triggers?.some((t) =>
      t.toLowerCase().includes(trigger.toLowerCase())
    )
  );
}

export function getSectionsByApproximateDays(
  days: number,
  range: number = 7,
): SectionMetadata[] {
  return sections.filter((s) => {
    if (!s.timing.approximate_days) return false;
    return (
      s.timing.approximate_days >= days - range &&
      s.timing.approximate_days <= days + range
    );
  });
}
