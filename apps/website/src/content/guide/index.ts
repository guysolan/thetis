// Guide section exports and configuration
import type { GuideMetadata, GuideContent } from "@/components/guide/types";

// Import all guide sections
import * as week01 from "./week-0-1";
import * as weeks13 from "./weeks-1-3";
import * as weeks46 from "./weeks-4-6";
import * as weeks79 from "./weeks-7-9";
import * as weeks1012 from "./weeks-10-12";
import * as weeks1325 from "./weeks-13-25";
import * as week26Plus from "./week-26-plus";

export interface GuideSection {
  metadata: GuideMetadata;
  content: GuideContent;
}

export const guideSections: GuideSection[] = [
  { metadata: week01.metadata, content: week01.content },
  { metadata: weeks13.metadata, content: weeks13.content },
  { metadata: weeks46.metadata, content: weeks46.content },
  { metadata: weeks79.metadata, content: weeks79.content },
  { metadata: weeks1012.metadata, content: weeks1012.content },
  { metadata: weeks1325.metadata, content: weeks1325.content },
  { metadata: week26Plus.metadata, content: week26Plus.content },
];

export const guidePhases = guideSections.map(s => ({
  slug: s.metadata.slug,
  title: s.metadata.title,
  description: s.metadata.description,
  weekRange: s.metadata.weekRange,
  highlights: s.metadata.highlights,
}));

export function getGuideBySlug(slug: string): GuideSection | undefined {
  return guideSections.find(s => s.metadata.slug === slug);
}

export function getNextGuide(currentSlug: string): GuideMetadata | undefined {
  const currentIndex = guideSections.findIndex(s => s.metadata.slug === currentSlug);
  if (currentIndex >= 0 && currentIndex < guideSections.length - 1) {
    return guideSections[currentIndex + 1].metadata;
  }
  return undefined;
}

export function getPrevGuide(currentSlug: string): GuideMetadata | undefined {
  const currentIndex = guideSections.findIndex(s => s.metadata.slug === currentSlug);
  if (currentIndex > 0) {
    return guideSections[currentIndex - 1].metadata;
  }
  return undefined;
}
