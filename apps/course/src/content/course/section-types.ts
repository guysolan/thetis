/**
 * Shared types and utilities for all course modules.
 * Import from here in per-course sections files to avoid circular deps.
 */

export type SectionStatus = "todo" | "drafting";

export interface TimingSuggestion {
  when_useful: string;
  triggers?: string[];
  approximate_days?: number;
}

export interface SectionMetadata {
  slug: string;
  title: string;
  description: string;
  section_number: number;
  chapter: string;
  course_type: "standard" | "premium";
  status: SectionStatus;
  timing: TimingSuggestion;
}

export function createSection(
  slug: string,
  title: string,
  description: string,
  timing: TimingSuggestion,
  slugToChapter: Record<string, string>,
  courseType: SectionMetadata["course_type"] = "standard",
  status: SectionStatus = "drafting",
): Omit<SectionMetadata, "section_number"> {
  const chapter = slugToChapter[slug] || "unknown";
  return {
    slug,
    title,
    description,
    chapter,
    course_type: courseType,
    status,
    timing,
  };
}

export function numberSections(
  raw: Omit<SectionMetadata, "section_number">[],
): SectionMetadata[] {
  return raw.map((s, i) => ({ ...s, section_number: i + 1 }));
}
