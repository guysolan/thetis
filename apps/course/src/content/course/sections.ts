// Import all course sections from topic folders
import { metadata as emergencyCare } from "./standard/emergency/emergency-care";
import { metadata as bloodClotPrevention } from "./standard/emergency/blood-clot-prevention";
import { metadata as homeSetup } from "./standard/emergency/home-setup";

import { metadata as specialistAppointment } from "./standard/treatment/specialist-appointment";
import { metadata as treatmentDecision } from "./standard/treatment/treatment-decision";

import { metadata as choosingYourBoot } from "./standard/boot/choosing-your-boot";
import { metadata as yourWalkingBoot } from "./standard/boot/your-walking-boot";
import { metadata as livingWithBoot } from "./standard/boot/living-with-boot";
import { metadata as sleepManagement } from "./standard/boot/sleep-management";
import { metadata as healingProcess } from "./standard/boot/healing-process";
import { metadata as wedgeRemoval } from "./standard/boot/wedge-removal";
import { metadata as walkingProgress } from "./standard/boot/walking-progress";
import { metadata as commonChallenges } from "./standard/boot/common-challenges";
import { metadata as finalBootPhase } from "./standard/boot/final-boot-phase";

import { metadata as bootTransition } from "./standard/transition/boot-transition";
import { metadata as postBootChallenges } from "./standard/transition/post-boot-challenges";
import { metadata as scarManagement } from "./standard/transition/scar-management";

import { metadata as prePhysioPrep } from "./standard/physiotherapy/pre-physio-prep";
import { metadata as startingPhysio } from "./standard/physiotherapy/starting-physio";
import { metadata as keyExercises } from "./standard/physiotherapy/key-exercises";
import { metadata as walkingProperly } from "./standard/physiotherapy/walking-properly";
import { metadata as progressiveStrengthening } from "./standard/physiotherapy/progressive-strengthening";

import { metadata as buildingCardio } from "./standard/recovery/building-cardio";
import { metadata as functionalMilestones } from "./standard/recovery/functional-milestones";
import { metadata as returningToLife } from "./standard/recovery/returning-to-life";
import { metadata as nutritionForHealing } from "./standard/recovery/nutrition-for-healing";
import { metadata as swimmingAndWaterActivities } from "./standard/recovery/swimming-and-water-activities";

import { metadata as startingToRun } from "./standard/advanced/starting-to-run";
import { metadata as plyometrics } from "./standard/advanced/plyometrics";

import { metadata as sixMonthMilestone } from "./standard/long-term/six-month-milestone";
import { metadata as preventingRerupture } from "./standard/long-term/preventing-rerupture";
import { metadata as newNormal } from "./standard/long-term/new-normal";
import { metadata as whenThingsDontGoToPlan } from "./standard/long-term/when-things-dont-go-to-plan";

import { metadata as firstWeekChecklist } from "./standard/practical/first-week-checklist";
import { metadata as practicalLife } from "./standard/practical/practical-life";
import { metadata as mentalHealthRecovery } from "./standard/practical/mental-health-recovery";
import { metadata as drivingGuidelines } from "./standard/practical/driving-guidelines";
import { metadata as painManagementThroughoutRecovery } from "./standard/practical/pain-management-throughout-recovery";

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
  // Legacy fields for backward compatibility (deprecated)
  week?: number;
  day?: number;
  days_after_rupture?: number;
  email_number?: number;
}

// Map slugs to their chapter (folder name)
const slugToChapter: Record<string, string> = {
  // Emergency
  "emergency-care": "emergency",
  "blood-clot-prevention": "emergency",
  "home-setup": "emergency",
  // Treatment
  "first-week-checklist": "practical",
  "specialist-appointment": "treatment",
  "treatment-decision": "treatment",
  // Boot
  "choosing-your-boot": "boot",
  "your-walking-boot": "boot",
  "living-with-boot": "boot",
  "sleep-management": "boot",
  "healing-process": "boot",
  "wedge-removal": "boot",
  "walking-progress": "boot",
  "common-challenges": "boot",
  "final-boot-phase": "boot",
  // Transition
  "boot-transition": "transition",
  "post-boot-challenges": "transition",
  "scar-management": "transition",
  // Physiotherapy
  "pre-physio-prep": "physiotherapy",
  "starting-physio": "physiotherapy",
  "key-exercises": "physiotherapy",
  "walking-properly": "physiotherapy",
  "progressive-strengthening": "physiotherapy",
  // Recovery
  "building-cardio": "recovery",
  "functional-milestones": "recovery",
  "returning-to-life": "recovery",
  "nutrition-for-healing": "recovery",
  "swimming-and-water-activities": "recovery",
  // Advanced
  "starting-to-run": "advanced",
  "plyometrics": "advanced",
  // Long-term
  "six-month-milestone": "long-term",
  "preventing-rerupture": "long-term",
  "new-normal": "long-term",
  "when-things-dont-go-to-plan": "long-term",
  // Practical
  "practical-life": "practical",
  "mental-health-recovery": "practical",
  "driving-guidelines": "practical",
  "pain-management-throughout-recovery": "practical",
};

// Helper to create section with timing information
function createSection(
  slug: string,
  title: string,
  description: string,
  timing: TimingSuggestion,
  status: SectionStatus = "drafting",
  // Legacy fields for backward compatibility
  week?: number,
  day?: number,
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
    // Legacy fields
    week,
    day,
    days_after_rupture: week !== undefined && day !== undefined
      ? week * 7 + day
      : undefined,
    email_number: 0, // Will be set when section_number is calculated
  };
}

// Sections ordered logically, with timing suggestions for when each lesson is useful
// Section numbers are auto-calculated from array position (index + 1)
const sectionsWithoutNumbers: Omit<SectionMetadata, "section_number">[] = [
  // EMERGENCY CARE - Immediate needs
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
    0,
    0,
  ),
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
    0,
    1,
  ),
  createSection(
    "home-setup",
    homeSetup.title,
    homeSetup.description,
    {
      when_useful: "Within first few days - set up your recovery space",
      triggers: ["when you get home from A&E", "before you need to rest"],
      approximate_days: 3,
    },
    homeSetup.status || "drafting",
    0,
    3,
  ),

  // TREATMENT DECISION - Early decisions
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
    1,
    0,
  ),
  createSection(
    "specialist-appointment",
    specialistAppointment.title,
    specialistAppointment.description,
    {
      when_useful:
        "Before your specialist appointment - prepare questions and know what to expect",
      triggers: ["when appointment is scheduled", "1-3 weeks after injury"],
      approximate_days: 10,
    },
    specialistAppointment.status || "drafting",
    1,
    3,
  ),
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
    2,
    0,
  ),

  // BOOT & EQUIPMENT - Boot-related content (useful when you get your boot)
  createSection(
    "choosing-your-boot",
    choosingYourBoot.title,
    choosingYourBoot.description,
    {
      when_useful:
        "When choosing or receiving your boot - understand your options",
      triggers: ["when boot is prescribed", "if buying boot privately"],
      approximate_days: 2,
    },
    choosingYourBoot.status || "drafting",
    0,
    2,
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
    2,
    4,
  ),
  createSection(
    "living-with-boot",
    livingWithBoot.title,
    livingWithBoot.description,
    {
      when_useful:
        "Once you're wearing your boot regularly - practical daily life tips",
      triggers: [
        "when boot becomes daily routine",
        "when struggling with hygiene",
      ],
      approximate_days: 21,
    },
    livingWithBoot.status || "drafting",
    3,
    0,
  ),
  createSection(
    "sleep-management",
    sleepManagement.title,
    sleepManagement.description,
    {
      when_useful:
        "When struggling with sleep in your boot - usually weeks 2-6",
      triggers: [
        "when struggling to sleep",
        "when boot is disrupting sleep",
        "when considering night splint",
      ],
      approximate_days: 14,
    },
    sleepManagement.status || "drafting",
    2,
    0,
  ),
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
    4,
    0,
  ),
  createSection(
    "wedge-removal",
    wedgeRemoval.title,
    wedgeRemoval.description,
    {
      when_useful:
        "When starting wedge removal protocol - usually around week 5",
      triggers: [
        "when clinician says to remove wedges",
        "when protocol allows wedge removal",
      ],
      approximate_days: 35,
    },
    wedgeRemoval.status || "drafting",
    5,
    0,
  ),
  createSection(
    "walking-progress",
    walkingProgress.title,
    walkingProgress.description,
    {
      when_useful:
        "When progressing to full weight-bearing - usually around week 6",
      triggers: [
        "when allowed to bear full weight",
        "when transitioning off crutches",
      ],
      approximate_days: 42,
    },
    walkingProgress.status || "drafting",
    6,
    0,
  ),
  createSection(
    "common-challenges",
    commonChallenges.title,
    commonChallenges.description,
    {
      when_useful: "During boot phase - when facing common problems",
      triggers: [
        "when experiencing swelling",
        "when having skin issues",
        "when struggling mentally",
      ],
      approximate_days: 49,
    },
    commonChallenges.status || "drafting",
    7,
    0,
  ),
  createSection(
    "final-boot-phase",
    finalBootPhase.title,
    finalBootPhase.description,
    {
      when_useful: "Approaching boot removal - usually around week 8",
      triggers: [
        "when removing final wedges",
        "when preparing for boot removal",
      ],
      approximate_days: 56,
    },
    finalBootPhase.status || "drafting",
    8,
    0,
  ),

  // PRACTICAL LIFE - Life management
  createSection(
    "practical-life",
    practicalLife.title,
    practicalLife.description,
    {
      when_useful:
        "When returning to work or normal activities - usually weeks 7-9",
      triggers: [
        "when planning return to work",
        "when resuming social activities",
      ],
      approximate_days: 70,
    },
    practicalLife.status || "drafting",
    10,
    0,
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
    0,
    0,
  ),
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
    10,
    0,
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
    0,
    0,
  ),

  // TRANSITION - Moving out of boot
  createSection(
    "boot-transition",
    bootTransition.title,
    bootTransition.description,
    {
      when_useful: "When transitioning out of boot - usually around week 10-12",
      triggers: [
        "when clinician says to remove boot",
        "when preparing to walk in shoes",
      ],
      approximate_days: 74,
    },
    bootTransition.status || "drafting",
    10,
    4,
  ),
  createSection(
    "post-boot-challenges",
    postBootChallenges.title,
    postBootChallenges.description,
    {
      when_useful: "After boot removal - managing new challenges",
      triggers: [
        "when boot is removed",
        "when experiencing stiffness",
        "when struggling with walking",
      ],
      approximate_days: 98,
    },
    postBootChallenges.status || "drafting",
    14,
    0,
  ),
  createSection(
    "scar-management",
    scarManagement.title,
    scarManagement.description,
    {
      when_useful:
        "After boot removal or surgery - when wounds are fully healed (usually weeks 2-3 post-surgery or week 12-14)",
      triggers: [
        "when wounds are healed",
        "when scar is visible",
        "when starting scar care",
      ],
      approximate_days: 84,
    },
    scarManagement.status || "drafting",
    12,
    0,
  ),

  // PHYSIOTHERAPY - Rehab content
  createSection(
    "pre-physio-prep",
    prePhysioPrep.title,
    prePhysioPrep.description,
    {
      when_useful: "Before starting physiotherapy - prepare for rehab",
      triggers: ["when physio is scheduled", "when preparing for rehab"],
      approximate_days: 63,
    },
    prePhysioPrep.status || "drafting",
    9,
    0,
  ),
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
    11,
    0,
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
    12,
    0,
  ),
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
    13,
    0,
  ),
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
    15,
    0,
  ),

  // RECOVERY - Building function
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
    17,
    1,
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
    4,
    0,
  ),
  createSection(
    "swimming-and-water-activities",
    swimmingAndWaterActivities.title,
    swimmingAndWaterActivities.description,
    {
      when_useful:
        "When ready for swimming - usually week 12-14 (once wounds healed)",
      triggers: [
        "when wounds are healed",
        "when cleared for swimming",
        "when wanting cardio exercise",
      ],
      approximate_days: 84,
    },
    swimmingAndWaterActivities.status || "drafting",
    12,
    0,
  ),
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
    20,
    0,
  ),
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
    22,
    6,
  ),

  // ADVANCED ACTIVITIES - Higher level activities
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
    28,
    4,
  ),
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
    31,
    3,
  ),

  // LONG-TERM - Long-term recovery
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
    25,
    5,
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
    26,
    2,
  ),
  createSection(
    "new-normal",
    newNormal.title,
    newNormal.description,
    {
      when_useful: "Long-term perspective - understanding your new normal",
      triggers: [
        "when wondering about long-term",
        "when adjusting to new normal",
      ],
      approximate_days: 210,
    },
    newNormal.status || "drafting",
    30,
    0,
  ),
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
    34,
    2,
  ),
];

// Auto-calculate section_number from array position and set email_number
export const sections: SectionMetadata[] = sectionsWithoutNumbers.map(
  (section, index) => ({
    ...section,
    section_number: index + 1,
    email_number: index + 1,
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

// Legacy function for backward compatibility
export function getSectionByWeekDay(
  week: number,
  day: number,
): SectionMetadata | undefined {
  return sections.find((s) => s.week === week && s.day === day);
}

export function formatWeekDay(week: number, day: number): string {
  if (week === 0) {
    return `Day ${day}`;
  }
  if (day === 0) {
    return `Week ${week}`;
  }
  return `Week ${week}, Day ${day}`;
}
