// Import all course sections from chronological folders
// 00-practical - Throughout recovery
import { metadata as firstWeekChecklist } from "./standard/00-practical/first-week-checklist";
import { metadata as mentalHealthRecovery } from "./standard/00-practical/mental-health-recovery";
import { metadata as drivingGuidelines } from "./standard/00-practical/driving-guidelines";
import { metadata as painManagementThroughoutRecovery } from "./standard/00-practical/pain-management-throughout-recovery";

// 01-emergency - Days 0-3
import { metadata as emergencyCare } from "./standard/01-emergency/emergency-care";
import { metadata as bloodClotPrevention } from "./standard/01-emergency/blood-clot-prevention";

// 02-early-treatment - Days 2-14
import { metadata as choosingYourBoot } from "./standard/02-early-treatment/choosing-your-boot";
import { metadata as specialistAppointment } from "./standard/02-early-treatment/specialist-appointment";
import { metadata as treatmentDecision } from "./standard/02-early-treatment/treatment-decision";
import { metadata as postSurgeryCare } from "./standard/02-early-treatment/post-surgery-care";

// 03-boot-phase - Days 14-56
import { metadata as yourWalkingBoot } from "./standard/03-boot-phase/your-walking-boot";
import { metadata as bootAdjustmentAndCare } from "./standard/03-boot-phase/boot-adjustment-and-care";
import { metadata as bootProgressionProtocol } from "./standard/03-boot-phase/boot-progression-protocol";
import { metadata as sleepingWithBoot } from "./standard/03-boot-phase/sleeping-with-boot";
import { metadata as washingAndHygiene } from "./standard/03-boot-phase/washing-and-hygiene";
import { metadata as crutchesAndMobility } from "./standard/03-boot-phase/crutches-and-mobility";
import { metadata as healingProcess } from "./standard/03-boot-phase/healing-process";
import { metadata as nutritionForHealing } from "./standard/03-boot-phase/nutrition-for-healing";
import { metadata as buildingStrengthInBoot } from "./standard/03-boot-phase/building-strength-in-boot";
import { metadata as finalBootPhase } from "./standard/03-boot-phase/final-boot-phase";

// 04-transition - Days 74-98
import { metadata as postBootPeriod } from "./standard/04-transition/post-boot-period";

// 05-physiotherapy - Days 63-105
import { metadata as startingPhysio } from "./standard/05-physiotherapy/starting-physio";
import { metadata as keyExercises } from "./standard/05-physiotherapy/key-exercises";
import { metadata as walkingProperly } from "./standard/05-physiotherapy/walking-properly";
import { metadata as progressiveStrengthening } from "./standard/05-physiotherapy/progressive-strengthening";

// 06-recovery - Days 84-160
import { metadata as buildingCardio } from "./standard/06-recovery/building-cardio";
import { metadata as functionalMilestones } from "./standard/06-recovery/functional-milestones";
import { metadata as returningToLife } from "./standard/06-recovery/returning-to-life";

// 07-advanced - Days 200-220
import { metadata as startingToRun } from "./standard/07-advanced/starting-to-run";
import { metadata as plyometrics } from "./standard/07-advanced/plyometrics";
import { metadata as returnToSport } from "./standard/07-advanced/return-to-sport";

// 08-long-term - Days 180-240
import { metadata as sixMonthMilestone } from "./standard/08-long-term/six-month-milestone";
import { metadata as preventingRerupture } from "./standard/08-long-term/preventing-rerupture";
import { metadata as newNormal } from "./standard/08-long-term/new-normal";
import { metadata as whenThingsDontGoToPlan } from "./standard/08-long-term/when-things-dont-go-to-plan";

export type SectionStatus = "todo" | "drafting";

export interface TimingSuggestion {
  /** When this lesson becomes useful (e.g., "immediately", "when you get your boot", "after week 4") */
  when_useful: string;
  /** Optional: specific trigger events (e.g., "when you get your boot", "when starting physio") */
  triggers?: string[];
  /** Optional: approximate time after rupture (in days) - for reference only */
  approximate_days?: number;
}

export interface SectionMetadata {
  slug: string;
  title: string;
  description: string;
  section_number: number; // Auto-calculated from array position
  chapter: string; // Derived from folder structure (emergency, boot, transition, etc.)
  course_type: "standard" | "premium";
  status: SectionStatus;
  /** When this lesson will be useful - allows patients to access content based on their situation */
  timing: TimingSuggestion;
}

// Map slugs to their chapter (folder name) - now organized chronologically
// This is the SINGLE SOURCE OF TRUTH for slug-to-folder mapping
export const slugToChapter: Record<string, string> = {
  // 00-practical - Throughout recovery
  "first-week-checklist": "00-practical",
  "mental-health-recovery": "00-practical",
  "driving-guidelines": "00-practical",
  "pain-management-throughout-recovery": "00-practical",
  // 01-emergency - Days 0-3
  "emergency-care": "01-emergency",
  "blood-clot-prevention": "01-emergency",
  // 02-early-treatment - Days 2-14
  "choosing-your-boot": "02-early-treatment",
  "specialist-appointment": "02-early-treatment",
  "treatment-decision": "02-early-treatment",
  "post-surgery-care": "02-early-treatment",
  // 03-boot-phase - Days 14-56
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
  // 04-transition - Days 74-98
  "post-boot-period": "04-transition",
  // 05-physiotherapy - Days 63-105
  "starting-physio": "05-physiotherapy",
  "key-exercises": "05-physiotherapy",
  "walking-properly": "05-physiotherapy",
  "progressive-strengthening": "05-physiotherapy",
  // 06-recovery - Days 84-160
  "building-cardio": "06-recovery",
  "functional-milestones": "06-recovery",
  "returning-to-life": "06-recovery",
  // 07-advanced - Days 200-220
  "starting-to-run": "07-advanced",
  "plyometrics": "07-advanced",
  "return-to-sport": "07-advanced",
  // 08-long-term - Days 180-240
  "six-month-milestone": "08-long-term",
  "preventing-rerupture": "08-long-term",
  "new-normal": "08-long-term",
  "when-things-dont-go-to-plan": "08-long-term",
};

// Helper to create section with timing information
function createSection(
  slug: string,
  title: string,
  description: string,
  timing: TimingSuggestion,
  status: SectionStatus = "drafting",
): Omit<SectionMetadata, "section_number"> {
  const chapter = slugToChapter[slug] || "unknown";
  return {
    slug,
    title,
    description,
    chapter,
    course_type: "standard",
    status,
    timing,
  };
}

// Sections ordered chronologically by when they're useful during recovery
// Section numbers are auto-calculated from array position (index + 1)
const sectionsWithoutNumbers: Omit<SectionMetadata, "section_number">[] = [
  // DAY 0 - Immediately after rupture
  createSection(
    "emergency-care",
    emergencyCare.title,
    emergencyCare.description,
    {
      when_useful: "Immediately after rupture - read this first",
      triggers: ["immediately after injury", "before A&E visit"],
      approximate_days: 0,
    },
    emergencyCare.status || "drafting",
  ),
  createSection(
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
  createSection(
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

  // DAY 1-3 - First few days
  createSection(
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

  // WEEK 1 - First week
  createSection(
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
  createSection(
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

  // WEEK 2 - Treatment decisions
  createSection(
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
  createSection(
    "post-surgery-care",
    postSurgeryCare.title,
    postSurgeryCare.description,
    {
      when_useful:
        "If you had surgery - wound care and scar management (weeks 2-4)",
      triggers: [
        "after surgery",
        "wound care",
        "scar management",
        "when to shower",
      ],
      approximate_days: 14,
    },
    postSurgeryCare.status || "drafting",
  ),

  // WEEK 2+ - All boot content grouped together
  createSection(
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
  createSection(
    "your-walking-boot",
    yourWalkingBoot.title,
    yourWalkingBoot.description,
    {
      when_useful: "When you get your boot - essential boot knowledge",
      triggers: ["when boot is fitted", "when you receive boot"],
      approximate_days: 14,
    },
    yourWalkingBoot.status || "drafting",
  ),
  createSection(
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
  createSection(
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

  // WEEK 3 - Living with boot
  createSection(
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
  createSection(
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
  createSection(
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

  // WEEK 4 - Healing and nutrition
  createSection(
    "healing-process",
    healingProcess.title,
    healingProcess.description,
    {
      when_useful:
        "Around week 4 - understand what's happening inside your tendon",
      triggers: [
        "when wondering about healing progress",
        "when feeling impatient",
      ],
      approximate_days: 28,
    },
    healingProcess.status || "drafting",
  ),
  createSection(
    "nutrition-for-healing",
    nutritionForHealing.title,
    nutritionForHealing.description,
    {
      when_useful:
        "Throughout recovery - nutrition supports healing from week 4 onwards",
      triggers: [
        "when starting recovery",
        "when building strength",
        "throughout recovery",
      ],
      approximate_days: 28,
    },
    nutritionForHealing.status || "drafting",
  ),

  // WEEK 6 - Building strength
  createSection(
    "building-strength-in-boot",
    buildingStrengthInBoot.title,
    buildingStrengthInBoot.description,
    {
      when_useful: "When starting Phase 1 exercises - usually around week 6",
      triggers: [
        "when starting exercises",
        "when progressing weight-bearing",
        "when learning about Phase 2 and Phase 3",
      ],
      approximate_days: 42,
    },
    buildingStrengthInBoot.status || "drafting",
  ),

  // WEEK 9 - Final boot phase
  createSection(
    "final-boot-phase",
    finalBootPhase.title,
    finalBootPhase.description,
    {
      when_useful: "Approaching boot removal - usually around week 8-9",
      triggers: [
        "when removing final wedges",
        "when preparing for boot removal",
        "when learning about Phase 2 and Phase 3",
      ],
      approximate_days: 63,
    },
    finalBootPhase.status || "drafting",
  ),

  // WEEK 10 - Boot transition
  createSection(
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
  createSection(
    "post-boot-period",
    postBootPeriod.title,
    postBootPeriod.description,
    {
      when_useful:
        "When transitioning out of boot and managing post-boot challenges - usually around week 10-14",
      triggers: [
        "when clinician says to remove boot",
        "when preparing to walk in shoes",
        "when experiencing stiffness or swelling after boot removal",
        "when managing post-boot challenges",
      ],
      approximate_days: 74,
    },
    postBootPeriod.status || "drafting",
  ),

  // WEEK 11-12 - Starting physio and post-boot
  createSection(
    "starting-physio",
    startingPhysio.title,
    startingPhysio.description,
    {
      when_useful: "When starting physiotherapy - usually around week 11",
      triggers: [
        "when first physio session is scheduled",
        "when starting rehab",
      ],
      approximate_days: 77,
    },
    startingPhysio.status || "drafting",
  ),
  createSection(
    "key-exercises",
    keyExercises.title,
    keyExercises.description,
    {
      when_useful:
        "During early physiotherapy - learn key exercises for this phase",
      triggers: [
        "when physio introduces exercises",
        "when doing home exercises",
      ],
      approximate_days: 84,
    },
    keyExercises.status || "drafting",
  ),
  // WEEK 13-14 - Walking properly
  createSection(
    "walking-properly",
    walkingProperly.title,
    walkingProperly.description,
    {
      when_useful:
        "When learning to walk normally again - usually around week 13",
      triggers: [
        "when out of boot",
        "when working on gait",
        "when correcting limp",
      ],
      approximate_days: 91,
    },
    walkingProperly.status || "drafting",
  ),
  // WEEK 15 - Progressive strengthening
  createSection(
    "progressive-strengthening",
    progressiveStrengthening.title,
    progressiveStrengthening.description,
    {
      when_useful: "During strengthening phase - usually around week 15",
      triggers: [
        "when building strength",
        "when doing heel raises",
        "when progressing exercises",
      ],
      approximate_days: 105,
    },
    progressiveStrengthening.status || "drafting",
  ),

  // WEEK 17 - Building cardio
  createSection(
    "building-cardio",
    buildingCardio.title,
    buildingCardio.description,
    {
      when_useful: "When ready for cardio exercise - usually around week 17",
      triggers: [
        "when cleared for cardio",
        "when wanting to exercise",
        "when building fitness",
      ],
      approximate_days: 120,
    },
    buildingCardio.status || "drafting",
  ),

  // WEEK 20 - Functional milestones
  createSection(
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

  // WEEK 22 - Returning to life
  createSection(
    "returning-to-life",
    returningToLife.title,
    returningToLife.description,
    {
      when_useful:
        "When returning to normal activities - usually around week 22",
      triggers: [
        "when returning to work",
        "when resuming normal life",
        "when feeling stronger",
      ],
      approximate_days: 160,
    },
    returningToLife.status || "drafting",
  ),

  // WEEK 25-26 - Six month milestone and prevention
  createSection(
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
  createSection(
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

  // WEEK 28 - Starting to run
  createSection(
    "starting-to-run",
    startingToRun.title,
    startingToRun.description,
    {
      when_useful:
        "When ready to start running - usually around week 28 (must meet criteria first)",
      triggers: [
        "when meeting running criteria",
        "when cleared to run",
        "when 25+ heel raises achieved",
      ],
      approximate_days: 200,
    },
    startingToRun.status || "drafting",
  ),

  // WEEK 31 - Plyometrics
  createSection(
    "plyometrics",
    plyometrics.title,
    plyometrics.description,
    {
      when_useful:
        "When ready for jumping and plyometric training - usually around week 31",
      triggers: [
        "when cleared for jumping",
        "when preparing for sport",
        "when building power",
      ],
      approximate_days: 220,
    },
    plyometrics.status || "drafting",
  ),

  // WEEK 32 - Return to Sport
  createSection(
    "return-to-sport",
    returnToSport.title,
    returnToSport.description,
    {
      when_useful:
        "When preparing to return to sport - usually around week 30-32 (must meet criteria first)",
      triggers: [
        "when meeting return criteria",
        "when cleared for sport",
        "when preparing for return",
      ],
      approximate_days: 224,
    },
    returnToSport.status || "drafting",
  ),

  // WEEK 34 - When things don't go to plan
  createSection(
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

  // LONG-TERM - Life After Achilles Rupture (Final Section)
  createSection(
    "new-normal",
    newNormal.title,
    newNormal.description,
    {
      when_useful:
        "Long-term perspective - understanding life after Achilles rupture",
      triggers: [
        "when wondering about long-term",
        "when adjusting to new normal",
        "when recovery phases are complete",
      ],
      approximate_days: 250,
    },
    newNormal.status || "drafting",
  ),
];

// Auto-calculate section_number from array position
export const sections: SectionMetadata[] = sectionsWithoutNumbers.map(
  (section, index) => ({
    ...section,
    section_number: index + 1,
  }),
);

// Helper functions
export function getSectionBySlug(slug: string): SectionMetadata | undefined {
  return sections.find((s) => s.slug === slug);
}

export function getSectionsByCourseType(
  courseType: "standard" | "premium",
): SectionMetadata[] {
  return sections.filter((s) => s.course_type === courseType);
}

export function getNextSection(currentSlug: string): SectionMetadata | null {
  const currentIndex = sections.findIndex((s) => s.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === sections.length - 1) return null;
  return sections[currentIndex + 1];
}

export function getPrevSection(currentSlug: string): SectionMetadata | null {
  const currentIndex = sections.findIndex((s) => s.slug === currentSlug);
  if (currentIndex <= 0) return null;
  return sections[currentIndex - 1];
}

export function getSectionIndex(slug: string): number {
  return sections.findIndex((s) => s.slug === slug);
}

// Get sections by trigger - useful for showing relevant content based on patient's situation
export function getSectionsByTrigger(trigger: string): SectionMetadata[] {
  return sections.filter(
    (s) =>
      s.timing.triggers?.some((t) =>
        t.toLowerCase().includes(trigger.toLowerCase())
      ),
  );
}

// Get sections useful at a specific time (approximate days after rupture)
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
