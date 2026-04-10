/**
 * One-off / optional: rewrite article https:// links to Dub when they match
 * @thetis/catalogue. Run from repo root:
 *   bun run apps/achilles-rupture/scripts/rewrite-article-catalogue-links.ts
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { resolvedCatalogueOutboundHref } from "@thetis/catalogue";

const __dirname = dirname(fileURLToPath(import.meta.url));
const articlesDir = join(__dirname, "..", "src", "content", "articles");

function guessRegion(url: string): "us" | "gb" {
  const u = url.toLowerCase();
  if (
    u.includes("amazon.co.uk") ||
    u.includes("oped-uk.com") ||
    u.includes("limboproducts.co.uk") ||
    u.includes("medicalsupplies.co.uk")
  ) {
    return "gb";
  }
  return "us";
}

const URL_RE = /https:\/\/[^\s"'<>)\]]+/g;

function rewriteFile(path: string) {
  const before = readFileSync(path, "utf8");
  const after = before.replace(URL_RE, (raw) => {
    const trimmed = raw.replace(/[),.;]+$/, "");
    const suffix = raw.slice(trimmed.length);
    const next = resolvedCatalogueOutboundHref(trimmed, guessRegion(trimmed));
    return next === trimmed ? raw : next + suffix;
  });
  if (after !== before) {
    writeFileSync(path, after, "utf8");
    console.error(`Updated ${path}`);
  }
}

function walk(dir: string) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (/\.(md|mdx)$/.test(name.name)) rewriteFile(p);
  }
}

walk(articlesDir);
console.error("Done.");
