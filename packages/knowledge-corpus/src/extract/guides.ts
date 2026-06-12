import { basename, dirname } from "node:path";
import type { Chunk, Condition } from "../types.ts";
import { read, relToRepo, repoPath, walk } from "../lib/files.ts";
import {
  extractFirstField,
  extractQAPairs,
  flattenStructuredContent,
  splitText,
} from "../lib/text.ts";

const GUIDE_CONDITIONS: Condition[] = [
  "achilles-rupture",
  "plantar-fasciitis",
  "achilles-tendinitis",
  "insertional-achilles-tendonitis",
];

/** Week/stage guides: apps/website/src/content/guide/<condition>/<stage>.ts */
export function extractGuides(): Chunk[] {
  const chunks: Chunk[] = [];

  for (const condition of GUIDE_CONDITIONS) {
    const files = walk(repoPath("apps/website/src/content/guide", condition), [
      ".ts",
    ]);
    for (const file of files) {
      if (basename(file) === "index.ts") continue;
      const source = read(file);
      if (!source.includes("export const content")) continue;

      const sourcePath = relToRepo(file);
      const title = extractFirstField(source, "title") ?? basename(file, ".ts");
      const phase = basename(file, ".ts");

      const base = {
        source_path: sourcePath,
        content_type: "guide" as const,
        condition,
        title,
        phase,
        language: "en",
        canonical: true,
      };

      const prose = flattenStructuredContent(source, title);
      splitText(prose).forEach((text, i) => {
        chunks.push({
          id: `${sourcePath}#body-${i}`,
          text: `# ${title}\n\n${text}`,
          metadata: base,
        });
      });

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
