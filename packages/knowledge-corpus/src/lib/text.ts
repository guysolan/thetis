/**
 * Extraction helpers for pulling prose out of TS/TSX content files
 * (course lessons, week guides) without executing them.
 *
 * The content files are structured block objects whose human-readable text
 * lives in a small set of string fields: intro, text, content, title,
 * question, answer, caption, items.
 */

const STRING_FIELD = (field: string) =>
  new RegExp(
    `${field}:\\s*\\n?\\s*(["'\`])((?:\\\\.|(?!\\1)[^\\\\])*)\\1`,
    "g",
  );

function unescape(s: string): string {
  return s.replace(/\\n/g, "\n").replace(/\\'/g, "'").replace(/\\"/g, '"')
    .replace(/\\`/g, "`");
}

export function extractField(source: string, field: string): string[] {
  const out: string[] = [];
  for (const m of source.matchAll(STRING_FIELD(field))) {
    const text = unescape(m[2]).trim();
    if (text) out.push(text);
  }
  return out;
}

export function extractFirstField(
  source: string,
  field: string,
): string | undefined {
  return extractField(source, field)[0];
}

/** Q&A pairs in the form { question: "...", answer: "..." } */
export function extractQAPairs(
  source: string,
): { question: string; answer: string }[] {
  const pairs: { question: string; answer: string }[] = [];
  const re =
    /question:\s*\n?\s*(["'`])((?:\\.|(?!\1)[^\\])*)\1\s*,\s*\n?\s*answer:\s*\n?\s*(["'`])((?:\\.|(?!\3)[^\\])*)\3/gs;
  for (const m of source.matchAll(re)) {
    pairs.push({
      question: unescape(m[2]).trim(),
      answer: unescape(m[4]).trim(),
    });
  }
  return pairs;
}

/**
 * Flatten the prose of a structured TS/TSX content file in document order.
 * Picks up intro, headings/titles, text/content strings, and list items.
 */
export function flattenStructuredContent(
  source: string,
  skipText?: string,
): string {
  const fields = ["intro", "text", "content", "title", "caption"];
  type Hit = { index: number; text: string; field: string };
  const hits: Hit[] = [];

  for (const field of fields) {
    for (const m of source.matchAll(STRING_FIELD(field))) {
      const text = unescape(m[2]).trim();
      // Skip short labels and obvious non-prose (paths, slugs, css)
      if (text.length < 3) continue;
      if (/^[\w-]+\.(png|jpg|jpeg|svg|webp)$/.test(text)) continue;
      if (text.startsWith("/") || text.startsWith("@/")) continue;
      if (skipText && text === skipText) continue;
      hits.push({ index: m.index ?? 0, text, field });
    }
  }

  // String items inside items: [...] arrays (checklists, bullet lists)
  const itemArrayRe = /items:\s*\[([^\]]*)\]/gs;
  for (const arr of source.matchAll(itemArrayRe)) {
    const inner = arr[1];
    const base = arr.index ?? 0;
    for (const m of inner.matchAll(/(["'`])((?:\\.|(?!\1)[^\\])*)\1/g)) {
      const text = unescape(m[2]).trim();
      if (text.length >= 10) {
        hits.push({
          index: base + (m.index ?? 0),
          text: `- ${text}`,
          field: "item",
        });
      }
    }
  }

  hits.sort((a, b) => a.index - b.index);

  // De-duplicate exact repeats while preserving order
  const seen = new Set<string>();
  const parts: string[] = [];
  for (const h of hits) {
    if (seen.has(h.text)) continue;
    seen.add(h.text);
    parts.push(h.text);
  }
  return parts.join("\n\n");
}

/** Split long text into chunks of roughly maxChars, breaking on paragraph boundaries. */
export function splitText(
  text: string,
  maxChars = 1800,
  minChars = 200,
): string[] {
  if (text.length <= maxChars) return text.trim() ? [text.trim()] : [];
  const paragraphs = text.split(/\n\n+/);
  const chunks: string[] = [];
  let current = "";
  for (const p of paragraphs) {
    if (current && current.length + p.length + 2 > maxChars) {
      chunks.push(current.trim());
      current = p;
    } else {
      current = current ? `${current}\n\n${p}` : p;
    }
  }
  if (current.trim()) {
    // Merge a trailing fragment into the previous chunk if it's tiny
    if (chunks.length > 0 && current.length < minChars) {
      chunks[chunks.length - 1] += `\n\n${current.trim()}`;
    } else {
      chunks.push(current.trim());
    }
  }
  return chunks;
}

/** Strip YAML frontmatter; returns { frontmatter, body }. */
export function splitFrontmatter(
  markdown: string,
): { frontmatter: string; body: string } {
  const m = markdown.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { frontmatter: "", body: markdown };
  return { frontmatter: m[1], body: markdown.slice(m[0].length) };
}

/** Pull a simple scalar value out of YAML frontmatter (handles quoted strings). */
export function frontmatterValue(
  frontmatter: string,
  key: string,
): string | undefined {
  const m = frontmatter.match(
    new RegExp(`^${key}:\\s*(["']?)(.+?)\\1\\s*$`, "m"),
  );
  return m?.[2]?.trim();
}

/** Markdown body split by ## headings into titled sections. */
export function splitByHeadings(
  body: string,
): { heading: string; text: string }[] {
  const sections: { heading: string; text: string }[] = [];
  const parts = body.split(/^## /m);
  // parts[0] is the preamble before the first ## heading
  if (parts[0]?.trim()) sections.push({ heading: "", text: parts[0].trim() });
  for (const part of parts.slice(1)) {
    const nl = part.indexOf("\n");
    const heading = nl === -1 ? part.trim() : part.slice(0, nl).trim();
    const text = nl === -1 ? "" : part.slice(nl + 1).trim();
    if (text) sections.push({ heading, text });
  }
  return sections;
}

/** Extract https URLs (for references metadata). */
export function extractUrls(text: string): string[] {
  const urls = new Set<string>();
  for (const m of text.matchAll(/https?:\/\/[^\s)"'\]<>]+/g)) {
    urls.add(m[0].replace(/[.,;]$/, ""));
  }
  return [...urls];
}
