import type { GeneratedContent } from "./types.js";

const SECTIONS = ["BLOG", "LINKEDIN", "INSTAGRAM", "FACEBOOK"] as const;

export function parseGeneratedOutput(text: string): GeneratedContent {
  const result: Partial<GeneratedContent> = {};
  for (let i = 0; i < SECTIONS.length; i++) {
    const section = SECTIONS[i];
    const nextSection = SECTIONS[i + 1];
    const regex = new RegExp(
      `## ${section}\\s*\\n([\\s\\S]*?)(?=## ${nextSection}|## FEEDBACK|$)`,
      "i",
    );
    const match = text.match(regex);
    result[section.toLowerCase() as keyof GeneratedContent] = match ? match[1].trim() : "";
  }
  return result as GeneratedContent;
}
