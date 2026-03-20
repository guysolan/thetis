/**
 * Chronological section order from apps/course/src/content/course/sections.ts.
 * Keep in sync when sections change.
 */
const SECTION_SLUGS_ORDER: string[] = [
  "emergency-care",
  "recovery-roadmap",
  "pain-management-throughout-recovery",
  "mental-health-recovery",
  "blood-clot-prevention",
  "first-week-checklist",
  "specialist-appointment",
  "treatment-decision",
  "post-surgery-care",
  "choosing-your-boot",
  "your-walking-boot",
  "boot-adjustment-and-care",
  "boot-progression-protocol",
  "sleeping-with-boot",
  "washing-and-hygiene",
  "crutches-and-mobility",
  "healing-process",
  "nutrition-for-healing",
  "building-strength-in-boot",
  "final-boot-phase",
  "driving-guidelines",
  "post-boot-period",
  "starting-physio",
  "key-exercises",
  "walking-properly",
  "progressive-strengthening",
  "building-cardio",
  "functional-milestones",
  "returning-to-life",
  "six-month-milestone",
  "preventing-rerupture",
  "starting-to-run",
  "plyometrics",
  "return-to-sport",
  "when-things-dont-go-to-plan",
  "new-normal",
  "other-leg",
  "course-completion",
  "course-feedback",
  "appendix-1-faqs",
];

export function getSectionIndex(slug: string): number {
  const i = SECTION_SLUGS_ORDER.indexOf(slug);
  return i >= 0 ? i : SECTION_SLUGS_ORDER.length;
}

/** Extract slug from lesson file path (e.g. "02-early-treatment/choosing-your-boot.tsx" -> "choosing-your-boot") */
export function slugFromLessonFile(lessonFile: string): string {
  const base = lessonFile.split("/").pop() ?? "";
  return base.replace(/\.tsx$/, "");
}

export interface ImageRef {
  imageFilename: string;
  lessonFile: string;
}

/** Sort image refs chronologically by section order from sections.ts */
export function sortBySectionOrder<T extends ImageRef>(refs: T[]): T[] {
  return [...refs].sort((a, b) => {
    const sectionA = getSectionIndex(slugFromLessonFile(a.lessonFile));
    const sectionB = getSectionIndex(slugFromLessonFile(b.lessonFile));
    if (sectionA !== sectionB) return sectionA - sectionB;
    return (
      a.lessonFile.localeCompare(b.lessonFile) || a.imageFilename.localeCompare(b.imageFilename)
    );
  });
}
