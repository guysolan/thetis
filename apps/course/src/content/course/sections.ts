export type SectionStatus = "todo" | "drafting" | "drafting";

export interface SectionMetadata {
  slug: string;
  title: string;
  description: string;
  week: number;
  day: number;
  section_number: number;
  days_after_rupture: number; // Calculated as week * 7 + day
  email_number: number;
  course_type: "standard" | "premium";
  status: SectionStatus;
}

// Helper to create section with auto-calculated days_after_rupture
function createSection(
  section_number: number,
  week: number,
  day: number,
  slug: string,
  title: string,
  description: string,
  status: SectionStatus = "todo",
): SectionMetadata {
  return {
    slug,
    title,
    description,
    week,
    day,
    section_number,
    days_after_rupture: week * 7 + day,
    email_number: section_number,
    course_type: "standard",
    status,
  };
}

export const sections: SectionMetadata[] = [
  // Week 0: Days 0, 1, 3
  createSection(
    1,
    0,
    0,
    "week-0-day-0-emergency-care",
    "Emergency Care & Initial Assessment",
    "What just happened, A&E expectations, and immediate first steps",
    "drafting",
  ),
  createSection(
    2,
    0,
    1,
    "week-0-day-1-blood-clot-prevention",
    "Blood Clot Prevention - Critical Information",
    "Understanding DVT/PE risk and blood thinners",
    "drafting",
  ),
  createSection(
    3,
    0,
    3,
    "week-0-day-3-home-setup",
    "Setting Up Your Recovery Station",
    "Home setup, elevation, ice protocol, and survival tips",
    "drafting",
  ),

  // Week 1: Days 0, 3
  createSection(
    4,
    1,
    0,
    "week-1-day-0-first-week-checklist",
    "Week 1 Checklist & What's Normal",
    "Normal vs concerning symptoms, questions for clinic, essential purchases",
    "drafting",
  ),
  createSection(
    5,
    1,
    3,
    "week-1-day-3-specialist-appointment",
    "Your Specialist Appointment",
    "What to expect at orthopaedics, physical examination, and imaging",
    "drafting",
  ),

  // Week 2: Days 0, 4
  createSection(
    6,
    2,
    0,
    "week-2-day-0-treatment-decision",
    "Surgery vs Non-Surgical Treatment",
    "Understanding your options, UKSTAR trial findings, and making your decision",
    "drafting",
  ),
  createSection(
    7,
    2,
    4,
    "week-2-day-4-your-walking-boot",
    "Your Walking Boot - The Foundation",
    "Aircast vs VACOped, fitting your boot, and understanding wedges",
    "drafting",
  ),

  // Week 3: Day 0
  createSection(
    8,
    3,
    0,
    "week-3-day-0-living-with-boot",
    "Living with Your Boot",
    "Walking with crutches, weight-bearing, and 24/7 protection",
  ),

  // Week 4: Day 0
  createSection(
    9,
    4,
    0,
    "week-4-day-0-healing-process",
    "Understanding Your Healing Tendon",
    "The proliferative phase, tendon length, and why patience matters",
  ),

  // Week 5: Day 0
  createSection(
    10,
    5,
    0,
    "week-5-day-0-wedge-removal",
    "Wedge Removal Protocol",
    "When and how to remove wedges, angle progression, and what to expect",
  ),

  // Week 6: Day 0
  createSection(
    11,
    6,
    0,
    "week-6-day-0-walking-progress",
    "Walking Progress & Night Splint",
    "Full weight-bearing, improving gait, and transitioning to night splint",
  ),

  // Week 7: Day 0
  createSection(
    12,
    7,
    0,
    "week-7-day-0-common-challenges",
    "Managing Common Challenges",
    "Swelling, skin care, hot foot, and mental health during recovery",
  ),

  // Week 8: Day 0
  createSection(
    13,
    8,
    0,
    "week-8-day-0-final-boot-phase",
    "The Final Boot Phase",
    "Remodelling phase, tendon strength, and removing final wedges",
  ),

  // Week 9: Day 0
  createSection(
    14,
    9,
    0,
    "week-9-day-0-pre-physio-prep",
    "Preparing for Physiotherapy",
    "What physio will involve, finding the right physiotherapist, and gentle exercises",
  ),

  // Week 10: Days 0, 4
  createSection(
    15,
    10,
    0,
    "week-10-day-0-practical-life",
    "Practical Life at Weeks 7-9",
    "Returning to work, driving guidelines, and social activities",
  ),
  createSection(
    16,
    10,
    4,
    "week-10-day-4-boot-transition",
    "Leaving Your Boot Behind",
    "When it's safe, first steps in shoes, and choosing the right footwear",
  ),

  // Week 11: Day 0
  createSection(
    17,
    11,
    0,
    "week-11-day-0-starting-physio",
    "Starting Physiotherapy",
    "First session expectations, early goals, and the importance of consistency",
  ),

  // Week 12: Day 0
  createSection(
    18,
    12,
    0,
    "week-12-day-0-key-exercises",
    "The 7 Best Exercises for This Phase",
    "Towel stretch, heel raises, resistance bands, and balance training",
  ),

  // Week 13: Day 0
  createSection(
    19,
    13,
    0,
    "week-13-day-0-walking-properly",
    "Re-Learning to Walk Properly",
    "Heel-to-toe pattern, correcting limping, and gait analysis",
  ),

  // Week 14: Day 0
  createSection(
    20,
    14,
    0,
    "week-14-day-0-post-boot-challenges",
    "Managing Post-Boot Challenges",
    "Stiffness, swelling, and why you shouldn't stretch aggressively",
  ),

  // Week 15: Day 0
  createSection(
    21,
    15,
    0,
    "week-15-day-0-progressive-strengthening",
    "Progressive Strengthening Begins",
    "Single-leg heel raises, eccentric drops, and resistance training",
  ),

  // Week 17: Day 1 (day 120 = week 17, day 1)
  createSection(
    22,
    17,
    1,
    "week-17-day-1-building-cardio",
    "Building Cardio Without Risk",
    "Swimming, stationary bike, elliptical, and walking as exercise",
  ),

  // Week 20: Day 0
  createSection(
    23,
    20,
    0,
    "week-20-day-0-functional-milestones",
    "The Functional Milestones",
    "Pain-free walking, 25+ heel raises, balance tests, and stairs",
  ),

  // Week 22: Day 6 (day 160 = week 22, day 6)
  createSection(
    24,
    22,
    6,
    "week-22-day-6-returning-to-life",
    "Returning to Normal Life",
    "Work, driving, household tasks, and nutrition for tendon health",
  ),

  // Week 25: Day 5 (day 180 = week 25, day 5)
  createSection(
    25,
    25,
    5,
    "week-25-day-5-six-month-milestone",
    "The 6-Month Milestone",
    "Where your tendon is now, return-to-sport criteria, and psychological readiness",
  ),

  // Week 26: Day 2
  createSection(
    26,
    26,
    2,
    "week-26-day-2-preventing-rerupture",
    "Preventing Re-Rupture",
    "Risk factors, ongoing strengthening, warm-up protocols, and warning signs",
  ),

  // Week 28: Day 4 (day 200 = week 28, day 4)
  createSection(
    27,
    28,
    4,
    "week-28-day-4-starting-to-run",
    "Starting to Run Again",
    "Walk-jog progression, proper technique, surface selection, and avoiding pitfalls",
  ),

  // Week 30: Day 0
  createSection(
    28,
    30,
    0,
    "week-30-day-0-new-normal",
    "Life After Achilles Rupture",
    "Your tendon will always be different, managing expectations, and long-term care",
  ),

  // Week 31: Day 3 (day 220 = week 31, day 3)
  createSection(
    29,
    31,
    3,
    "week-31-day-3-plyometrics",
    "Plyometric Training and Jumping",
    "When to start, progression from pogo jumps to sport-specific training",
  ),

  // Week 34: Day 2 (day 240 = week 34, day 2)
  createSection(
    30,
    34,
    2,
    "week-34-day-2-when-things-dont-go-to-plan",
    "When Things Don't Go to Plan",
    "Not progressing, tendon elongation, and when to seek further opinion",
  ),

  // Week 38: Day 4 (day 270 = week 38, day 4)
  createSection(
    31,
    38,
    4,
    "week-38-day-4-full-recovery",
    "Full Recovery & Beyond",
    "Final thoughts, ongoing maintenance, and celebrating your journey",
  ),
];

// Validate no duplicate days_after_rupture
const daysSet = new Set<number>();
for (const section of sections) {
  if (daysSet.has(section.days_after_rupture)) {
    console.error(
      `Duplicate days_after_rupture: ${section.days_after_rupture} in section ${section.slug}`,
    );
  }
  daysSet.add(section.days_after_rupture);
}

// Helper functions
export function getSectionBySlug(slug: string): SectionMetadata | undefined {
  return sections.find((s) => s.slug === slug);
}

export function getSectionByWeekDay(
  week: number,
  day: number,
): SectionMetadata | undefined {
  return sections.find((s) => s.week === week && s.day === day);
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

export function formatWeekDay(week: number, day: number): string {
  if (week === 0) {
    return `Day ${day}`;
  }
  if (day === 0) {
    return `Week ${week}`;
  }
  return `Week ${week}, Day ${day}`;
}
