import type { Chunk } from "../types.ts";
import { extractCourseLessons } from "./course.ts";
import { extractGuides } from "./guides.ts";
import { extractMarkdownArticles } from "./markdown.ts";
import { extractWebsiteFaqs } from "./faqs.ts";
import { extractResearchData } from "./research.ts";
import { extractRules } from "./rules.ts";

export function extractAll(): Chunk[] {
  const all = [
    ...extractRules(),
    ...extractCourseLessons(),
    ...extractGuides(),
    ...extractMarkdownArticles(),
    ...extractWebsiteFaqs(),
    ...extractResearchData(),
  ];

  // Guard against id collisions
  const ids = new Set<string>();
  for (const chunk of all) {
    if (ids.has(chunk.id)) {
      throw new Error(`Duplicate chunk id: ${chunk.id}`);
    }
    ids.add(chunk.id);
  }

  return all;
}

export {
  extractCourseLessons,
  extractGuides,
  extractMarkdownArticles,
  extractResearchData,
  extractRules,
  extractWebsiteFaqs,
};
