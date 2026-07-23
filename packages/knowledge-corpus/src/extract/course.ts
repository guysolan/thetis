import { basename, dirname } from "node:path";
import type { Chunk, Condition } from "../types.ts";
import { read, relToRepo, repoPath, walk } from "../lib/files.ts";
import {
  extractFirstField,
  extractQAPairs,
  flattenStructuredContent,
  splitText,
} from "../lib/text.ts";

const COURSE_ROOT = repoPath("apps/course/src/content/course");

const CONDITIONS: Condition[] = ["achilles-rupture", "plantar-fasciitis"];

/** Course lessons: apps/course/src/content/course/<condition>/<phase>/<lesson>.tsx */
export function extractCourseLessons(): Chunk[] {
  const chunks: Chunk[] = [];

  for (const condition of CONDITIONS) {
    const files = walk(repoPath("apps/course/src/content/course", condition), [
      ".tsx",
    ]);
    for (const file of files) {
      const source = read(file);
      // Only lesson files export metadata + content
      if (
        !source.includes("export const metadata") ||
        !source.includes("export const content")
      ) {
        continue;
      }

      const sourcePath = relToRepo(file);
      const title = extractFirstField(source, "title") ??
        basename(file, ".tsx");
      const phase = basename(dirname(file));

      const base = {
        source_path: sourcePath,
        content_type: "lesson" as const,
        condition,
        title,
        phase,
        language: "en",
        canonical: true,
      };

      // Lesson prose, in document order, split into retrieval-sized chunks
      const prose = flattenStructuredContent(source, title);
      splitText(prose).forEach((text, i) => {
        chunks.push({
          id: `${sourcePath}#body-${i}`,
          text: `# ${title}\n\n${text}`,
          metadata: base,
        });
      });

      // One chunk per FAQ — high retrieval value
      extractQAPairs(source).forEach((qa, i) => {
        chunks.push({
          id: `${sourcePath}#faq-${i}`,
          text: `Q: ${qa.question}\n\nA: ${qa.answer}`,
          metadata: { ...base, content_type: "faq" },
        });
      });
    }
  }

  return chunks;
}
