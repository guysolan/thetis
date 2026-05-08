import type { ImageMetadata } from "astro";
import type { ReactNode } from "react";
import type { ConditionId } from "../conditions/registry";

export interface BaseRoute {
  slug: string;
  title: Record<string, string>;
  description: Record<string, string>;
  slugTranslations?: Record<string, string>;
  legacySlugs?: string[];
  icon?: string | ReactNode;
  variant?: "default" | "outline";
  image?: ImageMetadata;
  tags?: Array<{ words: string; color: string }>;
  subQuestions?: Record<string, Record<string, string>>;
  /** Recovery condition this route belongs to (FAQs, guide hubs) */
  conditionId?: ConditionId;
}

export interface Route {
  href: string;
  title: string;
  description: string;
  icon?: ReactNode;
  variant?: "default" | "outline";
  image?: ImageMetadata;
  tags?: Array<{ words: string; color: string }>;
  lang: string;
  slug: string;
}
