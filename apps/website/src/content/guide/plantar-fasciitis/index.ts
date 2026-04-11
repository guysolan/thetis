import type { GuideContent, GuideMetadata } from "@/components/guide/types";
import * as stage1 from "./stage-1";
import * as stage2 from "./stage-2";
import * as stage3 from "./stage-3";
import * as stage4 from "./stage-4";
import * as stage5 from "./stage-5";

export interface GuideSection {
  metadata: GuideMetadata;
  content: GuideContent;
}

export const plantarFasciitisGuideSections: GuideSection[] = [
  { metadata: stage1.metadata, content: stage1.content },
  { metadata: stage2.metadata, content: stage2.content },
  { metadata: stage3.metadata, content: stage3.content },
  { metadata: stage4.metadata, content: stage4.content },
  { metadata: stage5.metadata, content: stage5.content },
];

export interface GuideNavPhase {
  slug: string;
  title: string;
  shortTitle: string;
}

export const plantarFasciitisGuideNavPhases: GuideNavPhase[] =
  plantarFasciitisGuideSections.map((s) => ({
    slug: `guide/plantar-fasciitis/${s.metadata.slug}`,
    title: s.metadata.weekRange,
    shortTitle: s.metadata.phaseSubtitle,
  }));

export interface ConditionGuideHubPhase {
  slug: string;
  week: string;
  title: string;
  description: string;
  highlights: string[];
  color: string;
}

export const plantarFasciitisGuideHubPhases: ConditionGuideHubPhase[] =
  plantarFasciitisGuideSections.map((s) => ({
    slug: `guide/plantar-fasciitis/${s.metadata.slug}`,
    week: s.metadata.weekRange,
    title: s.metadata.hubCardTitle ?? s.metadata.title,
    description: s.metadata.description,
    highlights: s.metadata.highlights,
    color: s.metadata.timelineColor ?? "bg-neutral-500",
  }));
