import { basename } from "node:path";
import type { Chunk } from "../types.ts";
import { read, relToRepo, repoPath, walk } from "../lib/files.ts";
import { extractQAPairs } from "../lib/text.ts";

const FAQ_DIRS = [
  "apps/website/src/sections/FAQs",
  "apps/website/src/content/FAQs",
];

/**
 * Multilingual FAQ files keep per-language arrays in a single object:
 *   const content: Record<Lang, ...> = { en: [...], es: [...], ... }
 * Slice out the `en:` array so we only index English (other languages are
 * translations of the same content).
 */
function englishSlice(source: string): string {
  const enStart = source.search(/\ben:\s*\[/);
  if (enStart === -1) return source; // single-language file
  const nextLang = source.slice(enStart + 3).search(/\b(es|fr|de|it):\s*\[/);
  return nextLang === -1
    ? source.slice(enStart)
    : source.slice(enStart, enStart + 3 + nextLang);
}

/** FAQ Q&A pairs from website FAQ sections (Astro + TSX + TS). */
export function extractWebsiteFaqs(): Chunk[] {
  const chunks: Chunk[] = [];
  const seenQuestions = new Set<string>();

  for (const dir of FAQ_DIRS) {
    const files = walk(repoPath(dir), [".astro", ".tsx", ".ts"]);
    for (const file of files) {
      const source = read(file);
      const pairs = extractQAPairs(englishSlice(source));
      if (pairs.length === 0) continue;

      const sourcePath = relToRepo(file);
      const topic = basename(file).replace(/\.(astro|tsx|ts)$/, "");

      let i = 0;
      for (const qa of pairs) {
        // FAQs repeat across pages; index each question once
        const key = qa.question.toLowerCase();
        if (seenQuestions.has(key)) continue;
        seenQuestions.add(key);

        chunks.push({
          id: `${sourcePath}#faq-${i++}`,
          text: `Q: ${qa.question}\n\nA: ${qa.answer}`,
          metadata: {
            source_path: sourcePath,
            content_type: "faq",
            condition: "achilles-rupture",
            title: topic,
            language: "en",
            canonical: true,
          },
        });
      }
    }
  }

  return chunks;
}
