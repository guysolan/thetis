/**
 * Extract HTTP(S) URLs from plain lines, CSV first column, or GSC export.
 */
export function parseUrlListLines(lines: string[]): string[] {
  const urls: string[] = [];
  const seen = new Set<string>();

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;

    let candidate = line;
    if (line.includes(",")) {
      const first = line.split(",")[0]?.replace(/^"|"$/g, "").trim() ?? "";
      if (first.startsWith("http://") || first.startsWith("https://")) {
        candidate = first;
      } else if (line.match(/^https?:\/\//)) {
        candidate = line.split(",")[0]!.replace(/^"|"$/g, "").trim();
      }
    }

    if (candidate.toLowerCase() === "url") continue;

    const m = candidate.match(/https?:\/\/[^\s"'<>]+/i);
    const url = m ? m[0].replace(/[,;]+$/, "") : candidate;

    if (!url.startsWith("http://") && !url.startsWith("https://")) continue;
    if (seen.has(url)) continue;
    seen.add(url);
    urls.push(url);
  }

  return urls;
}
