import type { ConditionId } from "./registry";

/** Map a guide page slug (e.g. `guide/weeks-0-1`) to its condition for breadcrumbs. */
export function getConditionIdFromGuideSlug(slug: string): ConditionId {
  if (slug.includes("plantar-fasciitis")) return "plantar-fasciitis";
  if (slug.includes("achilles-tendinitis")) return "achilles-tendinitis";
  if (slug.includes("insertional-achilles-tendonitis")) {
    return "insertional-achilles-tendonitis";
  }
  return "achilles-rupture";
}
