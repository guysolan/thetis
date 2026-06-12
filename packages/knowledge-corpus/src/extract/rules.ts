import type { Chunk } from "../types.ts";
import { exists, read, relToRepo, repoPath } from "../lib/files.ts";
import { splitFrontmatter } from "../lib/text.ts";

const RULE_FILES = [
  ".cursor/rules/achilles-clinical-positions.mdc",
  ".cursor/rules/content-guidelines.mdc",
  ".cursor/rules/social-format.mdc",
];

/**
 * Governance rules stored in the DB so Edge Functions can inject them into
 * every prompt without filesystem access. Single chunk per file (they are
 * always loaded whole, never retrieved by similarity).
 */
export function extractRules(): Chunk[] {
  const chunks: Chunk[] = [];

  for (const rel of RULE_FILES) {
    const abs = repoPath(rel);
    if (!exists(abs)) continue;
    const { body } = splitFrontmatter(read(abs));
    const sourcePath = relToRepo(abs);
    chunks.push({
      id: `${sourcePath}#0`,
      text: body.trim(),
      metadata: {
        source_path: sourcePath,
        content_type: "rule",
        condition: "general",
        title: sourcePath.split("/").pop()!.replace(".mdc", ""),
        language: "en",
        canonical: true,
      },
    });
  }

  return chunks;
}
