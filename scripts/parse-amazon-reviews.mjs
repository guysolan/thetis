#!/usr/bin/env node
/**
 * Parse reviews.md (Amazon export) into structured JSON.
 * Usage: node scripts/parse-amazon-reviews.mjs [input] [output]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputPath = process.argv[2] ?? join(root, "reviews.md");
const outputPath = process.argv[3] ?? join(root, "reviews.json");

const COUNTRY_CODES = {
  "United States": "US",
  "United Kingdom": "GB",
  Germany: "DE",
  Canada: "CA",
  Italy: "IT",
  Sweden: "SE",
  Australia: "AU",
  France: "FR",
  Spain: "ES",
};

function normalizeCountryName(name) {
  if (!name) return null;
  return name.replace(/^the\s+/i, "").trim();
}

function countryToCode(countryName) {
  const normalized = normalizeCountryName(countryName);
  return COUNTRY_CODES[normalized] ?? null;
}

const SKIP_LINES =
  /^(Helpful|Report|Customer image|Translate review to English|Translate all reviews to English|(?:\d+|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen|Twenty|\d+) (person|people) found this helpful|Clear filter|\d+ matching customer reviews)$/i;

const STAR_HEADER = /^## (\d) Star$/;
const FROM_COUNTRY = /^From the (.+)$|^From other countries$/;
const RATING_LINE = /^(\d\.\d) out of 5 stars (.+)$/;
const REVIEWED_LINE =
  /^Reviewed in (.+?) on ([A-Za-z]+ \d{1,2}, \d{4})$/;
const STYLE_LINE = /^Style: (.+)$/;
const META_LINE =
  /^(Verified Purchase|Amazon Vine Customer Review of Free Product.*)$/i;

function parseStyle(raw) {
  const style = raw.replace(/Verified Purchase.*$/i, "").trim();
  const match = style.match(/^(Small|Large)\s+(Left|Right)$/i);
  if (!match) {
    return {
      styleRaw: raw,
      size: null,
      side: null,
      verified: /Verified Purchase/i.test(raw),
      vine: /Amazon Vine/i.test(raw),
    };
  }
  return {
    styleRaw: raw,
    size: match[1],
    side: match[2],
    verified: /Verified Purchase/i.test(raw),
    vine: /Amazon Vine/i.test(raw),
  };
}

function parseDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toISOString().slice(0, 10);
}

function mentionsBoot(text) {
  return /\bboot\b|vacoped|aircast|cam boot|walking boot|orthop[aä]edic boot|hospital boot|the boot|night boot|pressure boot|support boot|monsterstiefel|stiefel|ortehe|walker/i.test(
    text,
  );
}

function inferTags(title, body) {
  const text = `${title} ${body}`.toLowerCase();
  const tags = [];
  if (/sleep|schlaf|nacht|night|restful|insomnia|dormir/.test(text)) tags.push("sleep");
  if (/\bboot\b|vacoped|aircast|cam boot|walking boot|stiefel|ortehe/.test(text))
    tags.push("boot-comparison");
  if (/surgeon|doctor|orthop|physio|dr\.|chirurg|sanitätshaus/.test(text))
    tags.push("clinician");
  if (/ruptur|rupture|surgery|post.?op|operat|repair|tear/.test(text))
    tags.push("rupture-recovery");
  if (/comfort|comfortable|uncomfort|pain|pressure|padding|polster/.test(text))
    tags.push("comfort");
  if (/worth|price|expensive|cheap|overpriced|cent wert|preis/.test(text))
    tags.push("value");
  if (/recommend|empfehl|must have|game changer|lifesaver|savior/.test(text))
    tags.push("recommendation");
  if (/vacoped/.test(text)) tags.push("vacoped");
  if (/iwalk|crutch|krücke/.test(text)) tags.push("mobility-aid");
  return tags;
}

function excerpt(body, max = 160) {
  const flat = body.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return flat.slice(0, max - 1).trimEnd() + "…";
}

function slugify(name, date, index) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${base || "anonymous"}-${date || index}`;
}

function parseReviews(content) {
  const lines = content.split("\n");
  const reviews = [];
  let currentStars = null;
  let currentRegion = null;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    const starMatch = line.match(STAR_HEADER);
    if (starMatch) {
      currentStars = Number(starMatch[1]);
      i++;
      continue;
    }

    const fromMatch = line.match(FROM_COUNTRY);
    if (fromMatch) {
      currentRegion =
        fromMatch[0] === "From other countries" ? "other" : fromMatch[1];
      i++;
      continue;
    }

    const ratingMatch = line.match(RATING_LINE);
    if (ratingMatch && i > 0) {
      const prevLine = lines[i - 1]?.trim() ?? "";
      const name =
        prevLine &&
        !prevLine.match(STAR_HEADER) &&
        !prevLine.match(FROM_COUNTRY) &&
        !prevLine.match(RATING_LINE) &&
        !prevLine.match(REVIEWED_LINE) &&
        !SKIP_LINES.test(prevLine) &&
        prevLine !== "Report" &&
        !prevLine.startsWith("#")
          ? prevLine
          : "Anonymous";

      const stars = Math.round(Number(ratingMatch[1]));
      const title = ratingMatch[2].trim();
      i++;

      let country = null;
      let date = null;
      let style = null;
      const bodyLines = [];

      while (i < lines.length) {
        const l = lines[i].trim();

        if (!l) {
          i++;
          if (bodyLines.length > 0 && lines[i]?.trim().match(RATING_LINE)) {
            break;
          }
          if (bodyLines.length > 0 && lines[i]?.trim().match(STAR_HEADER)) {
            break;
          }
          continue;
        }

        if (l.match(STAR_HEADER) || l.match(FROM_COUNTRY)) break;

        const reviewedMatch = l.match(REVIEWED_LINE);
        if (reviewedMatch) {
          country = reviewedMatch[1];
          date = parseDate(reviewedMatch[2]);
          i++;
          continue;
        }

        const styleMatch = l.match(STYLE_LINE);
        if (styleMatch) {
          style = parseStyle(styleMatch[1]);
          i++;
          continue;
        }

        if (META_LINE.test(l)) {
          if (!style) style = parseStyle(l);
          i++;
          continue;
        }

        if (SKIP_LINES.test(l)) {
          i++;
          if (l === "Report") break;
          continue;
        }

        if (l.match(RATING_LINE)) break;

        if (
          bodyLines.length > 0 &&
          i + 1 < lines.length &&
          lines[i + 1].trim().match(RATING_LINE)
        ) {
          break;
        }

        bodyLines.push(l);
        i++;
      }

      const body = bodyLines.join("\n\n").trim();
      const countryCode =
        countryToCode(country) ?? countryToCode(currentRegion) ?? null;

      reviews.push({
        id: slugify(name, date, reviews.length + 1),
        source: "amazon",
        name,
        stars,
        title,
        body,
        excerpt: excerpt(body),
        date,
        country: countryCode,
        countryName: normalizeCountryName(country),
        region: currentRegion,
        ratingSection: currentStars,
        style,
        mentionsBoot: mentionsBoot(`${title} ${body}`),
        tags: inferTags(title, body),
        language:
          countryCode === "DE" || countryCode === "IT" || countryCode === "SE"
            ? countryCode
            : "en",
      });
      continue;
    }

    i++;
  }

  return reviews;
}

function buildSummary(reviews) {
  const byStars = {};
  const byCountry = {};
  const byTag = {};
  let bootMentions = 0;

  for (const r of reviews) {
    byStars[r.stars] = (byStars[r.stars] ?? 0) + 1;
    const c = r.country ?? "unknown";
    byCountry[c] = (byCountry[c] ?? 0) + 1;
    if (r.mentionsBoot) bootMentions++;
    for (const tag of r.tags) {
      byTag[tag] = (byTag[tag] ?? 0) + 1;
    }
  }

  const dates = reviews.filter((r) => r.date).map((r) => r.date).sort();

  return {
    total: reviews.length,
    byStars,
    byCountry,
    byTag,
    bootMentions,
    dateRange: {
      earliest: dates[0] ?? null,
      latest: dates.at(-1) ?? null,
    },
  };
}

const content = readFileSync(inputPath, "utf8");
const reviews = parseReviews(content);

const output = {
  meta: {
    product: "Thetis Achilles Rupture Night Splint",
    sourceFile: "reviews.md",
    exportedAt: new Date().toISOString().slice(0, 10),
    description:
      "Structured Amazon customer reviews exported from reviews.md",
  },
  summary: buildSummary(reviews),
  reviews: reviews.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    return (b.stars ?? 0) - (a.stars ?? 0);
  }),
};

writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(`Parsed ${reviews.length} reviews -> ${outputPath}`);
console.log("Summary:", JSON.stringify(output.summary, null, 2));
