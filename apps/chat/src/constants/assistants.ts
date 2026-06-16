import type { Platform } from "@/api/knowledge";
import type { PostType } from "@/constants/post-types";

export type AssistantPreset = {
  slug: string;
  title: string;
  subtitle: string;
  settingName: string;
  platforms: Platform[];
  postType: PostType;
  placeholder: string;
  emptyHint: string;
};

export const CAROUSEL_IDEAS_ASSISTANT: AssistantPreset = {
  slug: "carousel-ideas",
  title: "Carousel ideas",
  subtitle: "Brainstorm hooks and slide arcs",
  settingName: "ATR Carousel Ideas — IG/FB",
  platforms: ["instagram", "facebook"],
  postType: "patient_education",
  placeholder: "e.g. Give me 5 carousel ideas for the boot phase…",
  emptyHint:
    "Ask for carousel ideas — hooks, answer summaries, and slide arcs. Copy a chosen idea into Carousel Content to write full slides.",
};

export const CAROUSEL_CONTENT_ASSISTANT: AssistantPreset = {
  slug: "carousel-content",
  title: "Carousel content",
  subtitle: "Full slides from an approved idea",
  settingName: "ATR Carousel Content — IG/FB",
  platforms: ["instagram", "facebook"],
  postType: "patient_education",
  placeholder: "Paste an idea brief or describe the hook and answer…",
  emptyHint:
    "Paste an idea from Carousel Ideas (or describe hook + answer) to generate full slide copy, visuals, and captions.",
};

export const ASSISTANT_PRESETS = [
  CAROUSEL_IDEAS_ASSISTANT,
  CAROUSEL_CONTENT_ASSISTANT,
] as const;
