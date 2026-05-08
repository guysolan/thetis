/**
 * Barrel file – re-exports shared types from section-types.ts and the Achilles
 * course as the default so every existing consumer keeps working unchanged.
 *
 * Per-course data:
 *   achilles-rupture/sections.ts
 *   plantar-fasciitis/sections.ts   (coming soon)
 */

// Shared types & utilities
export type {
  SectionMetadata,
  SectionStatus,
  TimingSuggestion,
} from "./section-types";
export { createSection, numberSections } from "./section-types";

// Achilles course as the default (backward compat)
export {
  getNextSection,
  getPrevSection,
  getSectionBySlug,
  getSectionIndex,
  getSectionsByApproximateDays,
  getSectionsByCourseType,
  getSectionsByTrigger,
  sections,
  slugToChapter,
} from "./achilles-rupture/sections";
