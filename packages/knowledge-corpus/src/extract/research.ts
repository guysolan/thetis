import type { Chunk } from "../types.ts";
import { exists, read, relToRepo, repoPath } from "../lib/files.ts";
import { extractUrls } from "../lib/text.ts";

/**
 * Structured research evidence with sources (DOI/registry studies).
 * Each country/study entry becomes one citation-bearing chunk.
 */
export function extractResearchData(): Chunk[] {
  const chunks: Chunk[] = [];

  const opOrNot = repoPath(
    "apps/website/src/components/research/op-or-not/data.json",
  );
  if (exists(opOrNot)) {
    const sourcePath = relToRepo(opOrNot);
    try {
      const data = JSON.parse(read(opOrNot)) as Record<string, unknown>[];
      data.forEach((entry, i) => {
        const text = jsonEntryToText(entry);
        if (!text) return;
        chunks.push({
          id: `${sourcePath}#${i}`,
          text:
            `Research evidence — Achilles rupture surgical rates and incidence:\n\n${text}`,
          metadata: {
            source_path: sourcePath,
            content_type: "research",
            condition: "achilles-rupture",
            title: `Surgery rates: ${String(entry.country ?? `entry ${i}`)}`,
            language: "en",
            canonical: true,
            references: extractUrls(JSON.stringify(entry)),
          },
        });
      });
    } catch {
      // unparseable data file — skip rather than fail the whole sync
    }
  }

  const incidenceSources = repoPath(
    "apps/website/src/components/research/incidence/sources.json",
  );
  if (exists(incidenceSources)) {
    const sourcePath = relToRepo(incidenceSources);
    try {
      const data = JSON.parse(read(incidenceSources));
      const entries: Record<string, unknown>[] = Array.isArray(data)
        ? data
        : Object.values(data);
      entries.forEach((entry, i) => {
        const text = jsonEntryToText(entry);
        if (!text) return;
        chunks.push({
          id: `${sourcePath}#${i}`,
          text: `Research source — Achilles rupture incidence:\n\n${text}`,
          metadata: {
            source_path: sourcePath,
            content_type: "research",
            condition: "achilles-rupture",
            title: "Incidence research sources",
            language: "en",
            canonical: true,
            references: extractUrls(JSON.stringify(entry)),
          },
        });
      });
    } catch {
      // skip
    }
  }

  return chunks;
}

/** Render a JSON object as readable indented key-value text. */
function jsonEntryToText(entry: unknown, indent = ""): string {
  if (entry === null || entry === undefined) return "";
  if (typeof entry !== "object") return String(entry);
  const lines: string[] = [];
  for (const [key, value] of Object.entries(entry as Record<string, unknown>)) {
    const label = key.replace(/_/g, " ");
    if (value !== null && typeof value === "object") {
      lines.push(`${indent}${label}:`);
      lines.push(jsonEntryToText(value, indent + "  "));
    } else {
      lines.push(`${indent}${label}: ${String(value)}`);
    }
  }
  return lines.join("\n");
}
