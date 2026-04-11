// Guide section exports and configuration (Achilles rupture — SSOT for phases)
import type { GuideContent, GuideMetadata } from "@/components/guide/types";

import * as week01 from "./achilles-rupture/week-0-1";
import * as weeks13 from "./achilles-rupture/weeks-1-3";
import * as weeks46 from "./achilles-rupture/weeks-4-6";
import * as weeks79 from "./achilles-rupture/weeks-7-9";
import * as weeks1012 from "./achilles-rupture/weeks-10-12";
import * as weeks1325 from "./achilles-rupture/weeks-13-25";
import * as week26Plus from "./achilles-rupture/week-26-plus";

export interface GuideSection {
  metadata: GuideMetadata;
  content: GuideContent;
}

/** Achilles rupture recovery guide — ordered sections */
export const achillesRuptureGuideSections: GuideSection[] = [
  { metadata: week01.metadata, content: week01.content },
  { metadata: weeks13.metadata, content: weeks13.content },
  { metadata: weeks46.metadata, content: weeks46.content },
  { metadata: weeks79.metadata, content: weeks79.content },
  { metadata: weeks1012.metadata, content: weeks1012.content },
  { metadata: weeks1325.metadata, content: weeks1325.content },
  { metadata: week26Plus.metadata, content: week26Plus.content },
];

export interface GuideNavPhase {
  /** Full URL segment e.g. guide/weeks-0-1 */
  slug: string;
  title: string;
  shortTitle: string;
}

/** Sticky nav / prev-next for ATR guide article layout */
export const achillesRuptureGuideNavPhases: GuideNavPhase[] =
  achillesRuptureGuideSections.map((s) => ({
    slug: `guide/${s.metadata.slug}`,
    title: s.metadata.weekRange,
    shortTitle: s.metadata.phaseSubtitle,
  }));

export interface AchillesRuptureGuideHubPhase {
  slug: string;
  week: string;
  title: string;
  description: string;
  highlights: string[];
  color: string;
}

/** Timeline cards on the Achilles rupture learn hub (`/learn/achilles-rupture`) */
export const achillesRuptureGuideHubPhases: AchillesRuptureGuideHubPhase[] =
  achillesRuptureGuideSections.map((s) => ({
    slug: `guide/${s.metadata.slug}`,
    week: s.metadata.weekRange,
    title: s.metadata.hubCardTitle ?? s.metadata.title,
    description: s.metadata.description,
    highlights: s.metadata.highlights,
    color: s.metadata.timelineColor ?? "bg-neutral-500",
  }));

/** Short slugs + copy for FAQ timeline “detailed guides” links */
export const achillesRuptureFaqTimelinePhases = achillesRuptureGuideSections
  .map(
    (s) => ({
      slug: s.metadata.slug,
      title: s.metadata.title,
      description: s.metadata.description,
    }),
  );

/** @deprecated Use achillesRuptureGuideSections */
export const guideSections = achillesRuptureGuideSections;

export const guidePhases = achillesRuptureGuideSections.map((s) => ({
  slug: s.metadata.slug,
  title: s.metadata.title,
  description: s.metadata.description,
  weekRange: s.metadata.weekRange,
  highlights: s.metadata.highlights,
}));
