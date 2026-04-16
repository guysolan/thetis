import {
  createSection,
  numberSections,
  type SectionMetadata,
  type SectionStatus,
  type TimingSuggestion,
} from "../section-types";

// 00-practical
import { metadata as recoveryRoadmap } from "./00-practical/recovery-roadmap";
import { metadata as firstWeekChecklist } from "./00-practical/first-week-checklist";
import { metadata as mentalHealthRecovery } from "./00-practical/mental-health-recovery";
import { metadata as drivingGuidelines } from "./00-practical/driving-guidelines";
import { metadata as painManagementThroughoutRecovery } from "./00-practical/pain-management-throughout-recovery";
import { metadata as appendix1Faqs } from "./00-practical/appendix-1-faqs";
import { metadata as courseCompletion } from "./00-practical/course-completion";
import { metadata as courseFeedback } from "./00-practical/course-feedback";

// 01-emergency
import { metadata as emergencyCare } from "./01-emergency/emergency-care";
import { metadata as bloodClotPrevention } from "./01-emergency/blood-clot-prevention";

// 02-early-treatment
import { metadata as choosingYourBoot } from "./02-early-treatment/choosing-your-boot";
import { metadata as specialistAppointment } from "./02-early-treatment/specialist-appointment";
import { metadata as treatmentDecision } from "./02-early-treatment/treatment-decision";
import { metadata as postSurgeryCare } from "./02-early-treatment/post-surgery-care";

// 03-boot-phase
import { metadata as yourWalkingBoot } from "./03-boot-phase/your-walking-boot";
import { metadata as bootAdjustmentAndCare } from "./03-boot-phase/boot-adjustment-and-care";
import { metadata as bootProgressionProtocol } from "./03-boot-phase/boot-progression-protocol";
import { metadata as sleepingWithBoot } from "./03-boot-phase/sleeping-with-boot";
import { metadata as washingAndHygiene } from "./03-boot-phase/washing-and-hygiene";
import { metadata as crutchesAndMobility } from "./03-boot-phase/crutches-and-mobility";
import { metadata as healingProcess } from "./03-boot-phase/healing-process";
import { metadata as nutritionForHealing } from "./03-boot-phase/nutrition-for-healing";
import { metadata as buildingStrengthInBoot } from "./03-boot-phase/building-strength-in-boot";
import { metadata as finalBootPhase } from "./03-boot-phase/final-boot-phase";

// 04-transition
import { metadata as postBootPeriod } from "./04-transition/post-boot-period";

// 05-physiotherapy
import { metadata as startingPhysio } from "./05-physiotherapy/starting-physio";
import { metadata as keyExercises } from "./05-physiotherapy/key-exercises";
import { metadata as walkingProperly } from "./05-physiotherapy/walking-properly";
import { metadata as progressiveStrengthening } from "./05-physiotherapy/progressive-strengthening";

// 06-recovery
import { metadata as buildingCardio } from "./06-recovery/building-cardio";
import { metadata as functionalMilestones } from "./06-recovery/functional-milestones";
import { metadata as returningToLife } from "./06-recovery/returning-to-life";

// 07-advanced
import { metadata as startingToRun } from "./07-advanced/starting-to-run";
import { metadata as plyometrics } from "./07-advanced/plyometrics";
import { metadata as returnToSport } from "./07-advanced/return-to-sport";

// 08-long-term
import { metadata as sixMonthMilestone } from "./08-long-term/six-month-milestone";
import { metadata as preventingRerupture } from "./08-long-term/preventing-rerupture";
import { metadata as newNormal } from "./08-long-term/new-normal";
import { metadata as otherLeg } from "./08-long-term/other-leg";
import { metadata as whenThingsDontGoToPlan } from "./08-long-term/when-things-dont-go-to-plan";

// ── Slug → chapter mapping (single source of truth) ─────────────────

export const slugToChapter: Record<string, string> = {
  "recovery-roadmap": "00-practical",
  "first-week-checklist": "00-practical",
  "mental-health-recovery": "00-practical",
  "driving-guidelines": "00-practical",
  "pain-management-throughout-recovery": "00-practical",
  "appendix-1-faqs": "00-practical",
  "course-completion": "00-practical",
  "course-feedback": "00-practical",
  "emergency-care": "01-emergency",
  "blood-clot-prevention": "01-emergency",
  "choosing-your-boot": "02-early-treatment",
  "specialist-appointment": "02-early-treatment",
  "treatment-decision": "02-early-treatment",
  "post-surgery-care": "02-early-treatment",
  "your-walking-boot": "03-boot-phase",
  "boot-adjustment-and-care": "03-boot-phase",
  "boot-progression-protocol": "03-boot-phase",
  "sleeping-with-boot": "03-boot-phase",
  "washing-and-hygiene": "03-boot-phase",
  "crutches-and-mobility": "03-boot-phase",
  "healing-process": "03-boot-phase",
  "nutrition-for-healing": "03-boot-phase",
  "building-strength-in-boot": "03-boot-phase",
  "final-boot-phase": "03-boot-phase",
  "post-boot-period": "04-transition",
  "starting-physio": "05-physiotherapy",
  "key-exercises": "05-physiotherapy",
  "walking-properly": "05-physiotherapy",
  "progressive-strengthening": "05-physiotherapy",
  "building-cardio": "06-recovery",
  "functional-milestones": "06-recovery",
  "returning-to-life": "06-recovery",
  "starting-to-run": "07-advanced",
  plyometrics: "07-advanced",
  "return-to-sport": "07-advanced",
  "six-month-milestone": "08-long-term",
  "preventing-rerupture": "08-long-term",
  "new-normal": "08-long-term",
  "other-leg": "08-long-term",
  "when-things-dont-go-to-plan": "08-long-term",
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

// ── Ordered sections (chronological by when useful during recovery) ─

const raw: Omit<SectionMetadata, "section_number">[] = [
  s("emergency-care", emergencyCare.title, emergencyCare.description, {
    when_useful: "Immediately after rupture - read this first",
    triggers: ["immediately after injury", "before A&E visit"],
    approximate_days: 0,
  }, emergencyCare.status || "drafting"),
  s("recovery-roadmap", recoveryRoadmap.title, recoveryRoadmap.description, {
    when_useful:
      "Early in recovery — the big picture of your 9–12 month journey",
    triggers: [
      "when you want an overview",
      "when planning ahead",
      "at any stage",
    ],
    approximate_days: 0,
  }, recoveryRoadmap.status || "drafting"),
  s(
    "pain-management-throughout-recovery",
    painManagementThroughoutRecovery.title,
    painManagementThroughoutRecovery.description,
    {
      when_useful: "Throughout recovery - when experiencing pain or discomfort",
      triggers: ["when in pain", "when managing pain", "when pain changes"],
      approximate_days: 0,
    },
    painManagementThroughoutRecovery.status || "drafting",
  ),
  s(
    "mental-health-recovery",
    mentalHealthRecovery.title,
    mentalHealthRecovery.description,
    {
      when_useful:
        "Throughout recovery - when struggling mentally or emotionally",
      triggers: [
        "when feeling frustrated",
        "when feeling anxious",
        "when feeling depressed",
        "when struggling mentally",
      ],
      approximate_days: 0,
    },
    mentalHealthRecovery.status || "drafting",
  ),
  s(
    "blood-clot-prevention",
    bloodClotPrevention.title,
    bloodClotPrevention.description,
    {
      when_useful: "Immediately after rupture - critical safety information",
      triggers: ["immediately after injury", "when immobile"],
      approximate_days: 1,
    },
    bloodClotPrevention.status || "drafting",
  ),
  s(
    "first-week-checklist",
    firstWeekChecklist.title,
    firstWeekChecklist.description,
    {
      when_useful:
        "During first week - know what's normal and what to watch for",
      triggers: ["first week after injury"],
      approximate_days: 7,
    },
    firstWeekChecklist.status || "drafting",
  ),
  s(
    "specialist-appointment",
    specialistAppointment.title,
    specialistAppointment.description,
    {
      when_useful:
        "Before your specialist appointment - prepare questions and know what to expect",
      triggers: [
        "When your appointment is scheduled (usually 1-3 weeks after injury)",
        "Before your first orthopaedic or fracture clinic visit",
        "When you need to prepare questions for your specialist",
      ],
      approximate_days: 10,
    },
    specialistAppointment.status || "drafting",
  ),
  s(
    "treatment-decision",
    treatmentDecision.title,
    treatmentDecision.description,
    {
      when_useful:
        "When deciding between surgery and non-surgical treatment - usually week 1-3",
      triggers: ["when discussing treatment options", "before making decision"],
      approximate_days: 14,
    },
    treatmentDecision.status || "drafting",
  ),
  s("post-surgery-care", postSurgeryCare.title, postSurgeryCare.description, {
    when_useful:
      "If you had surgery - wound care and scar management (weeks 2-4)",
    triggers: [
      "after surgery",
      "wound care",
      "scar management",
      "when to shower",
    ],
    approximate_days: 14,
  }, postSurgeryCare.status || "drafting"),
  s(
    "choosing-your-boot",
    choosingYourBoot.title,
    choosingYourBoot.description,
    {
      when_useful:
        "When you get your boot - understand your options and equipment",
      triggers: [
        "when boot is prescribed",
        "if buying boot privately",
        "when you receive boot",
      ],
      approximate_days: 14,
    },
    choosingYourBoot.status || "drafting",
  ),
  s("your-walking-boot", yourWalkingBoot.title, yourWalkingBoot.description, {
    when_useful: "When you get your boot - essential boot knowledge",
    triggers: ["when boot is fitted", "when you receive boot"],
    approximate_days: 14,
  }, yourWalkingBoot.status || "drafting"),
  s(
    "boot-adjustment-and-care",
    bootAdjustmentAndCare.title,
    bootAdjustmentAndCare.description,
    {
      when_useful: "When you get your boot - fitting and maintenance",
      triggers: ["when boot is fitted", "when adjusting boot"],
      approximate_days: 14,
    },
    bootAdjustmentAndCare.status || "drafting",
  ),
  s(
    "boot-progression-protocol",
    bootProgressionProtocol.title,
    bootProgressionProtocol.description,
    {
      when_useful: "When starting boot protocol - understanding progression",
      triggers: ["when protocol starts", "when reducing angle"],
      approximate_days: 14,
    },
    bootProgressionProtocol.status || "drafting",
  ),
  s(
    "sleeping-with-boot",
    sleepingWithBoot.title,
    sleepingWithBoot.description,
    {
      when_useful: "When struggling with sleep in boot - sleep solutions",
      triggers: ["when having sleep problems", "when considering night splint"],
      approximate_days: 21,
    },
    sleepingWithBoot.status || "drafting",
  ),
  s(
    "washing-and-hygiene",
    washingAndHygiene.title,
    washingAndHygiene.description,
    {
      when_useful: "When needing to wash foot - hygiene and safety",
      triggers: ["when needing to wash", "when having hygiene concerns"],
      approximate_days: 21,
    },
    washingAndHygiene.status || "drafting",
  ),
  s(
    "crutches-and-mobility",
    crutchesAndMobility.title,
    crutchesAndMobility.description,
    {
      when_useful: "When using crutches - comfort and mobility aids",
      triggers: ["when on crutches", "when having back/hip pain"],
      approximate_days: 21,
    },
    crutchesAndMobility.status || "drafting",
  ),
  s("healing-process", healingProcess.title, healingProcess.description, {
    when_useful:
      "Around week 4 - understand what's happening inside your tendon",
    triggers: [
      "when wondering about healing progress",
      "when feeling impatient",
    ],
    approximate_days: 28,
  }, healingProcess.status || "drafting"),
  s(
    "nutrition-for-healing",
    nutritionForHealing.title,
    nutritionForHealing.description,
    {
      when_useful: "Throughout recovery - nutrition supports healing.",
      triggers: [
        "when starting recovery",
        "when building strength",
        "throughout recovery",
      ],
      approximate_days: 28,
    },
    nutritionForHealing.status || "drafting",
  ),
  s(
    "building-strength-in-boot",
    buildingStrengthInBoot.title,
    buildingStrengthInBoot.description,
    {
      when_useful: "When starting Stage 1 exercises - usually around week 6",
      triggers: [
        "when starting exercises",
        "when progressing weight-bearing",
        "when learning about Stage 2 and Stage 3",
      ],
      approximate_days: 42,
    },
    buildingStrengthInBoot.status || "drafting",
  ),
  s("final-boot-phase", finalBootPhase.title, finalBootPhase.description, {
    when_useful: "Approaching boot removal - usually around week 8-9",
    triggers: [
      "when removing final wedges",
      "when preparing for boot removal",
      "when learning about Stage 2 and Stage 3",
    ],
    approximate_days: 63,
  }, finalBootPhase.status || "drafting"),
  s(
    "driving-guidelines",
    drivingGuidelines.title,
    drivingGuidelines.description,
    {
      when_useful:
        "When considering driving - timing depends on which leg is injured",
      triggers: [
        "when considering driving",
        "when planning to drive",
        "when cleared for driving",
      ],
      approximate_days: 70,
    },
    drivingGuidelines.status || "drafting",
  ),
  s("post-boot-period", postBootPeriod.title, postBootPeriod.description, {
    when_useful:
      "When transitioning out of boot and managing post-boot challenges - usually around week 10-14",
    triggers: [
      "when clinician says to remove boot",
      "when preparing to walk in shoes",
      "when experiencing stiffness or swelling after boot removal",
      "when managing post-boot challenges",
    ],
    approximate_days: 74,
  }, postBootPeriod.status || "drafting"),
  s("starting-physio", startingPhysio.title, startingPhysio.description, {
    when_useful:
      "When starting physiotherapy out of boot - usually around week 11",
    triggers: [
      "when first physio session is scheduled post-boot",
      "when starting rehab",
    ],
    approximate_days: 77,
  }, startingPhysio.status || "drafting"),
  s("key-exercises", keyExercises.title, keyExercises.description, {
    when_useful:
      "During early physiotherapy - learn key exercises for this stage",
    triggers: ["when physio introduces exercises", "when doing home exercises"],
    approximate_days: 84,
  }, keyExercises.status || "drafting"),
  s("walking-properly", walkingProperly.title, walkingProperly.description, {
    when_useful:
      "When learning to walk normally again - usually around week 13",
    triggers: [
      "when out of boot",
      "when working on gait",
      "when correcting limp",
    ],
    approximate_days: 91,
  }, walkingProperly.status || "drafting"),
  s(
    "progressive-strengthening",
    progressiveStrengthening.title,
    progressiveStrengthening.description,
    {
      when_useful: "During strengthening stage - usually around week 15",
      triggers: [
        "when building strength",
        "when doing heel raises",
        "when progressing exercises",
      ],
      approximate_days: 105,
    },
    progressiveStrengthening.status || "drafting",
  ),
  s("building-cardio", buildingCardio.title, buildingCardio.description, {
    when_useful: "When ready for cardio exercise - usually around week 17",
    triggers: [
      "when cleared for cardio",
      "when wanting to exercise",
      "when building fitness",
    ],
    approximate_days: 120,
  }, buildingCardio.status || "drafting"),
  s(
    "functional-milestones",
    functionalMilestones.title,
    functionalMilestones.description,
    {
      when_useful:
        "When working toward functional goals - usually around week 20",
      triggers: ["when tracking progress", "when working toward milestones"],
      approximate_days: 140,
    },
    functionalMilestones.status || "drafting",
  ),
  s("returning-to-life", returningToLife.title, returningToLife.description, {
    when_useful: "When returning to normal activities - usually around week 22",
    triggers: [
      "when returning to work",
      "when resuming normal life",
      "when feeling stronger",
    ],
    approximate_days: 160,
  }, returningToLife.status || "drafting"),
  s(
    "six-month-milestone",
    sixMonthMilestone.title,
    sixMonthMilestone.description,
    {
      when_useful: "At six months - assess progress and plan ahead",
      triggers: ["at 6 month mark", "when evaluating progress"],
      approximate_days: 180,
    },
    sixMonthMilestone.status || "drafting",
  ),
  s(
    "preventing-rerupture",
    preventingRerupture.title,
    preventingRerupture.description,
    {
      when_useful:
        "When returning to activities - ongoing prevention strategies",
      triggers: [
        "when returning to sport",
        "when increasing activity",
        "ongoing",
      ],
      approximate_days: 184,
    },
    preventingRerupture.status || "drafting",
  ),
  s("starting-to-run", startingToRun.title, startingToRun.description, {
    when_useful:
      "When ready to start running - usually around week 28 (must meet criteria first)",
    triggers: [
      "when meeting running criteria",
      "when cleared to run",
      "when 25+ heel raises achieved",
    ],
    approximate_days: 200,
  }, startingToRun.status || "drafting"),
  s("plyometrics", plyometrics.title, plyometrics.description, {
    when_useful:
      "When ready for jumping and plyometric training - usually around week 31",
    triggers: [
      "when cleared for jumping",
      "when preparing for sport",
      "when building power",
    ],
    approximate_days: 220,
  }, plyometrics.status || "drafting"),
  s("return-to-sport", returnToSport.title, returnToSport.description, {
    when_useful:
      "When preparing to return to sport - usually around week 30-32 (must meet criteria first)",
    triggers: [
      "when meeting return criteria",
      "when cleared for sport",
      "when preparing for return",
    ],
    approximate_days: 224,
  }, returnToSport.status || "drafting"),
  s(
    "when-things-dont-go-to-plan",
    whenThingsDontGoToPlan.title,
    whenThingsDontGoToPlan.description,
    {
      when_useful:
        "If recovery isn't progressing as expected - when to seek help",
      triggers: [
        "when not progressing",
        "when concerned about recovery",
        "when experiencing problems",
      ],
      approximate_days: 240,
    },
    whenThingsDontGoToPlan.status || "drafting",
  ),
  s("new-normal", newNormal.title, newNormal.description, {
    when_useful:
      "Long-term perspective - understanding life after Achilles rupture",
    triggers: [
      "when wondering about long-term",
      "when adjusting to new normal",
      "when recovery stages are complete",
    ],
    approximate_days: 250,
  }, newNormal.status || "drafting"),
  s("other-leg", otherLeg.title, otherLeg.description, {
    when_useful:
      "When wondering about risk to your other leg - rehab should include both",
    triggers: [
      "when wondering about other leg",
      "when doing rehab",
      "when strengthening",
    ],
    approximate_days: 200,
  }, otherLeg.status || "drafting"),
  s("course-completion", courseCompletion.title, courseCompletion.description, {
    when_useful: "When you've completed all course content",
    triggers: ["course complete", "congratulations"],
    approximate_days: 365,
  }, courseCompletion.status || "drafting"),
  s("course-feedback", courseFeedback.title, courseFeedback.description, {
    when_useful: "After completing the course",
    triggers: ["share feedback", "course review"],
    approximate_days: 365,
  }, courseFeedback.status || "drafting"),
  s("appendix-1-faqs", appendix1Faqs.title, appendix1Faqs.description, {
    when_useful: "Quick reference - all course FAQs in one place",
    triggers: [
      "when looking for a specific answer",
      "when reviewing key questions",
      "as reference",
    ],
    approximate_days: 365,
  }, appendix1Faqs.status || "drafting"),
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
