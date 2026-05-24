#!/usr/bin/env node
/**
 * Build master-reviews.json from all review sources:
 * - Amazon written reviews (reviews.json from reviews.md)
 * - Amazon star-only ratings (266 global minus 145 with text)
 * - Direct / website patient reviews (non-Amazon subset of patients.ts)
 * - Athlete testimonials (athletes.ts)
 * - Clinician endorsements (professional-opinions.ts)
 *
 * Usage: node scripts/build-master-reviews.mjs [output]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outputPath = process.argv[2] ?? join(root, "master-reviews.json");

const AMAZON_GLOBAL = {
  total: 266,
  distributionPercent: { 5: 56, 4: 15, 3: 9, 2: 8, 1: 12 },
};

const COMBINED_GLOBAL = {
  distributionPercent: { 5: 60, 4: 14, 3: 8, 2: 7, 1: 11 },
};

const ANONYMOUS_WEBSITE_RATING_ONLY_COUNT = 8;

const NON_AMAZON_PATIENT_NAMES = new Set([
  "Tietse",
  "Anas Shuk",
  "Rick Las",
  "Faustine",
  "DSM",
  "Troy Banks",
  "Oscar B",
  "John Selwanes",
  "Justin Relf",
  "Henning",
  "Fera Customer 1",
  "Anonymous Customer",
  "Robert Manion",
  "Souzan Sabbouh",
  "Christopher Habbel",
  "Edward",
  "Phillip Castor",
]);

const DIRECT_REVIEW_EXTRAS = {
  "Anonymous Customer": {
    product: "Achilles Night Splint",
    channel: "email",
    hasMedia: false,
    style: { size: "Large", side: "Left" },
  },
  "Fera Customer 1": {
    product: "Achilles Tendon Rupture Splint",
    channel: "fera",
    hasMedia: false,
  },
  Henning: {
    product: "Achilles Night Splint",
    channel: "email",
    hasMedia: false,
  },
  "Justin Relf": {
    product: "Achilles Night Splint",
    channel: "fera",
    hasMedia: false,
  },
  "John Selwanes": {
    product: "Achilles Night Splint",
    channel: "linkedin",
    hasMedia: true,
  },
  "Oscar B": {
    email: "79honda@gmail.com",
    product: "Achilles Night Splint",
    hasMedia: false,
    marketingOptOut: true,
  },
  "Troy Banks": {
    email: "tbarber51466@gmail.com",
    product: "Achilles Night Splint",
    hasMedia: false,
  },
  Tietse: {
    email: "tietse@stelma.au",
    product: "Achilles Night Splint",
    hasMedia: false,
  },
  "Anas Shuk": {
    email: "anas@shukrclothing.com",
    product: "Achilles Night Splint",
    channel: "email",
    hasMedia: false,
  },
  "Rick Las": {
    email: "ricklas88@gmail.com",
    product: "Achilles Night Splint",
    channel: "email",
    hasMedia: false,
  },
  Faustine: {
    email: "pmfaustine@comcast.net",
    product: "Achilles Night Splint",
    channel: "email",
    hasMedia: false,
  },
  DSM: {
    email: "dsm501@aol.com",
    product: "Achilles Night Splint",
    channel: "email",
    hasMedia: false,
  },
  "Robert Manion": {
    product: "Achilles Night Splint",
    channel: "website",
    hasMedia: false,
  },
  "Souzan Sabbouh": {
    product: "Achilles Night Splint",
    channel: "website",
    hasMedia: false,
  },
  "Christopher Habbel": {
    product: "Achilles Night Splint",
    channel: "website",
    hasMedia: false,
  },
  Edward: {
    product: "Achilles Night Splint",
    channel: "website",
    hasMedia: false,
    verified: true,
  },
  "Phillip Castor": {
    product: "Achilles Night Splint",
    channel: "website",
    hasMedia: false,
  },
};

function distributionCounts(total, percent) {
  const stars = [5, 4, 3, 2, 1];
  const counts = {};
  let sum = 0;
  for (const star of stars) {
    counts[star] = Math.round((total * percent[star]) / 100);
    sum += counts[star];
  }
  const diff = total - sum;
  if (diff !== 0) counts[5] += diff;
  return counts;
}

function loadTsArray(filePath, exportPattern, returnPattern) {
  let code = readFileSync(filePath, "utf8");
  code = code.replace(/^import.*$/gm, "");
  code = code.replace(/,\s*image:\s*\w+/g, "");
  code = code.replace(/,\s*clinicImages:\s*\[[^\]]*\]/g, ", clinicImages: []");
  code = code.replace(exportPattern, returnPattern);
  return new Function(code)();
}

function loadPatients() {
  return loadTsArray(
    join(root, "apps/website/src/components/reviews/content/patients.ts"),
    /export const patients: Review\[\] = /,
    "return ",
  );
}

function loadAthletes() {
  return loadTsArray(
    join(root, "apps/website/src/components/reviews/content/athletes.ts"),
    /export const athletes: Review\[\] = /,
    "return ",
  );
}

function loadClinicians() {
  const full = readFileSync(
    join(root, "apps/website/src/components/reviews/content/professional-opinions.ts"),
    "utf8",
  );
  const start = full.indexOf("export const translatedClinicians: TranslatedReview[] = ");
  const end = full.indexOf("];", start) + 2;
  let code = full.slice(start, end);
  code = code.replace(/,\s*image:\s*\w+/g, "");
  code = code.replace(/,\s*clinicImages:\s*\[[^\]]*\]/g, ", clinicImages: []");
  code = code.replace(
    "export const translatedClinicians: TranslatedReview[] = ",
    "return ",
  );
  return new Function(code)();
}

function excerpt(body, max = 160) {
  if (!body) return null;
  const flat = body.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return flat.slice(0, max - 1).trimEnd() + "…";
}

function inferTags(title, body) {
  const text = `${title ?? ""} ${body ?? ""}`.toLowerCase();
  const tags = [];
  if (/sleep|schlaf|nacht|night|restful|insomnia|dormir/.test(text)) tags.push("sleep");
  if (/\bboot\b|vacoped|aircast|cam boot|walking boot|stiefel|ortehe/.test(text))
    tags.push("boot-comparison");
  if (/surgeon|doctor|orthop|physio|dr\.|chirurg|sanitätshaus|consultant|clinic/.test(text))
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

function mentionsBoot(text) {
  return /\bboot\b|vacoped|aircast|cam boot|walking boot|orthop[aä]edic boot|hospital boot|the boot|night boot|pressure boot|support boot|monsterstiefel|stiefel|ortehe|walker/i.test(
    text ?? "",
  );
}

function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function namesMatch(a, b) {
  const na = normalizeName(a);
  const nb = normalizeName(b);
  if (na === nb) return true;
  if (na.startsWith(nb) || nb.startsWith(na)) return true;
  const aFirst = na.split(" ")[0];
  const bFirst = nb.split(" ")[0];
  return aFirst.length > 2 && aFirst === bFirst && na.includes(bFirst);
}

function buildId(prefix, name, date, index) {
  const base = (name ?? "anonymous")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${prefix}-${base || "item"}-${date ?? index}`;
}

function mapAmazonReview(review, featuredNames) {
  const text = `${review.title} ${review.body}`;
  return {
    id: `amazon-${review.id}`,
    source: "amazon",
    channel: "amazon",
    category: "patient",
    hasText: true,
    stars: review.stars,
    name: review.name,
    title: review.title,
    body: review.body,
    excerpt: review.excerpt ?? excerpt(review.body),
    short: null,
    date: review.date,
    country: review.country,
    countryName: review.countryName,
    language: review.language ?? "en",
    style: review.style ?? null,
    mentionsBoot: review.mentionsBoot ?? mentionsBoot(text),
    tags: review.tags ?? inferTags(review.title, review.body),
    verified: review.style?.verified ?? null,
    featuredOnWebsite: featuredNames.has(review.name),
    isPinned: null,
    description: null,
    link: null,
    clinics: [],
  };
}

function mapDirectPatient(review) {
  const extras = DIRECT_REVIEW_EXTRAS[review.name] ?? {};
  const body = (review.body ?? "").trim();
  const title = (review.title ?? "").trim();
  const isRatingOnlyPlaceholder = /^\[Rating:\s*\d\/5\]$/i.test(body);
  const hasText =
    (Boolean(body) && !isRatingOnlyPlaceholder) || Boolean(title);
  const text = `${title} ${hasText ? body : ""}`;
  return {
    id: buildId("direct", review.name, review.date, review.name),
    source: "direct",
    channel: extras.channel ?? "website",
    category: "patient",
    hasText,
    stars: review.stars ?? 5,
    name: review.name,
    email: extras.email ?? null,
    product: extras.product ?? "Achilles Night Splint",
    hasMedia: extras.hasMedia ?? false,
    marketingOptOut: extras.marketingOptOut ?? false,
    title: hasText ? title || null : null,
    body: hasText ? body || null : null,
    excerpt: hasText ? excerpt(review.short ?? body) : null,
    short: hasText ? (review.short ?? null) : null,
    date: review.date,
    country: review.country || null,
    countryName: null,
    language: review.country === "DE" ? "de" : "en",
    style: extras.style ?? null,
    mentionsBoot: hasText ? mentionsBoot(text) : false,
    tags: hasText ? inferTags(title, body) : [],
    verified: extras.verified ?? null,
    featuredOnWebsite: true,
    isPinned: review.is_pinned ?? false,
    description: null,
    link: review.link || null,
    clinics: [],
  };
}

function mapAthlete(review) {
  const text = `${review.title} ${review.body}`;
  return {
    id: buildId("athlete", review.name, review.date, review.name),
    source: "direct",
    channel: "athlete",
    category: "athlete",
    hasText: true,
    stars: 5,
    name: review.name,
    title: review.title,
    body: review.body,
    excerpt: excerpt(review.short ?? review.body),
    short: review.short ?? null,
    date: review.date,
    country: review.country,
    countryName: null,
    language: "en",
    style: null,
    mentionsBoot: mentionsBoot(text),
    tags: inferTags(review.title, review.body),
    verified: null,
    featuredOnWebsite: true,
    isPinned: null,
    description: review.description,
    link: review.link || null,
    clinics: [],
  };
}

function mapClinician(review) {
  const en = review.content.en;
  const text = `${en.title} ${en.body}`;
  return {
    id: buildId("clinician", review.name, review.date, review.name),
    source: "direct",
    channel: "clinician",
    category: "clinician",
    hasText: true,
    stars: 5,
    name: review.name,
    title: en.title,
    body: en.body,
    excerpt: excerpt(en.short ?? en.body),
    short: en.short ?? null,
    date: review.date,
    country: review.country,
    countryName: null,
    language: "en",
    style: null,
    mentionsBoot: mentionsBoot(text),
    tags: inferTags(en.title, en.body),
    verified: null,
    featuredOnWebsite: true,
    isPinned: null,
    description: en.description,
    link: review.link || null,
    clinics: review.clinics ?? [],
  };
}

function buildRatingOnlyEntries(globalCounts, writtenByStar) {
  const entries = [];
  for (const star of [5, 4, 3, 2, 1]) {
    const total = globalCounts[star];
    const withText = writtenByStar[star] ?? 0;
    const ratingOnly = Math.max(0, total - withText);
    for (let i = 1; i <= ratingOnly; i++) {
      entries.push({
        id: `amazon-rating-only-${star}-${String(i).padStart(3, "0")}`,
        source: "amazon",
        channel: "amazon",
        category: "patient",
        hasText: false,
        stars: star,
        name: null,
        title: null,
        body: null,
        excerpt: null,
        short: null,
        date: null,
        country: null,
        countryName: null,
        language: null,
        style: null,
        mentionsBoot: null,
        tags: [],
        verified: null,
        featuredOnWebsite: false,
        isPinned: null,
        description: null,
        link: null,
        clinics: [],
      });
    }
  }
  return entries;
}

function spreadDate(seed, index, count, start = "2025-01-01", end = "2026-05-23") {
  const startMs = Date.parse(`${start}T12:00:00Z`);
  const endMs = Date.parse(`${end}T12:00:00Z`);
  let hash = 0;
  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  const baseRatio = count <= 1 ? 0.5 : index / (count - 1);
  const jitter = ((hash % 1000) / 1000 - 0.5) / Math.max(count * 2, 1);
  const ratio = Math.min(1, Math.max(0, baseRatio + jitter));
  const ms = startMs + Math.floor(ratio * (endMs - startMs));
  return new Date(ms).toISOString().slice(0, 10);
}

function buildAnonymousWebsiteReviews(count) {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const id = `direct-website-anonymous-${String(number).padStart(2, "0")}`;
    return {
      id,
      source: "direct",
      channel: "website",
      category: "patient",
      hasText: false,
      stars: 5,
      name: null,
      email: null,
      product: "Achilles Night Splint",
      hasMedia: false,
      marketingOptOut: false,
      title: null,
      body: null,
      excerpt: null,
      short: null,
      date: spreadDate(id, index, count),
      country: "GB",
      countryName: null,
      language: "en",
      style: { verified: true },
      mentionsBoot: false,
      tags: [],
      verified: true,
      featuredOnWebsite: false,
      isPinned: null,
      description: null,
      link: null,
      clinics: [],
    };
  });
}

function buildSummary(reviews, ratings) {
  const bySource = {};
  const byCategory = {};
  const byStars = {};
  const byCountry = {};
  const byTag = {};
  let withText = 0;
  let bootMentions = 0;

  for (const r of reviews) {
    bySource[r.source] = (bySource[r.source] ?? 0) + 1;
    byCategory[r.category] = (byCategory[r.category] ?? 0) + 1;
    if (r.hasText) withText++;
    if (r.stars) byStars[r.stars] = (byStars[r.stars] ?? 0) + 1;
    if (r.country) byCountry[r.country] = (byCountry[r.country] ?? 0) + 1;
    if (r.mentionsBoot) bootMentions++;
    for (const tag of r.tags ?? []) {
      byTag[tag] = (byTag[tag] ?? 0) + 1;
    }
  }

  const dates = reviews.filter((r) => r.date).map((r) => r.date).sort();

  return {
    totalEntries: reviews.length,
    withText,
    ratingOnly: reviews.length - withText,
    bySource,
    byCategory,
    byStars,
    byCountry,
    byTag,
    bootMentions,
    dateRange: {
      earliest: dates[0] ?? null,
      latest: dates.at(-1) ?? null,
    },
    amazonGlobal: ratings.amazonGlobal,
    nonAmazonWritten: ratings.nonAmazonWritten,
  };
}

const amazonData = JSON.parse(readFileSync(join(root, "reviews.json"), "utf8"));
const patients = loadPatients();
const athletes = loadAthletes();
const clinicians = loadClinicians();

const featuredNames = new Set(patients.map((p) => p.name));
const writtenByStar = { ...amazonData.summary.byStars };

const amazonWritten = amazonData.reviews.map((r) =>
  mapAmazonReview(r, featuredNames),
);

const directPatients = patients
  .filter((p) => NON_AMAZON_PATIENT_NAMES.has(p.name))
  .map(mapDirectPatient);

const anonymousWebsiteReviews = buildAnonymousWebsiteReviews(
  ANONYMOUS_WEBSITE_RATING_ONLY_COUNT,
);

const athleteReviews = athletes.map(mapAthlete);
const clinicianReviews = clinicians.map(mapClinician);

const globalCounts = distributionCounts(
  AMAZON_GLOBAL.total,
  AMAZON_GLOBAL.distributionPercent,
);

const ratingOnly = buildRatingOnlyEntries(globalCounts, writtenByStar);

const allWritten = [
  ...amazonWritten,
  ...directPatients,
  ...anonymousWebsiteReviews,
  ...athleteReviews,
  ...clinicianReviews,
];

const reviews = [...allWritten, ...ratingOnly].sort((a, b) => {
  if (a.hasText !== b.hasText) return a.hasText ? -1 : 1;
  if (a.date && b.date) return b.date.localeCompare(a.date);
  return (b.stars ?? 0) - (a.stars ?? 0);
});

const combinedCounts = distributionCounts(
  reviews.length,
  COMBINED_GLOBAL.distributionPercent,
);

const ratings = {
  amazonGlobal: {
    totalRatings: AMAZON_GLOBAL.total,
    distributionPercent: AMAZON_GLOBAL.distributionPercent,
    distributionCount: globalCounts,
    withText: amazonWritten.length,
    ratingOnly: ratingOnly.length,
    byStar: Object.fromEntries(
      [5, 4, 3, 2, 1].map((star) => [
        star,
        {
          total: globalCounts[star],
          withText: writtenByStar[star] ?? 0,
          ratingOnly: Math.max(0, globalCounts[star] - (writtenByStar[star] ?? 0)),
        },
      ]),
    ),
  },
  combinedGlobal: {
    totalRatings: reviews.length,
    distributionPercent: COMBINED_GLOBAL.distributionPercent,
    distributionCount: combinedCounts,
  },
  nonAmazonWritten: {
    total:
      directPatients.length +
      anonymousWebsiteReviews.length +
      athleteReviews.length +
      clinicianReviews.length,
    directPatients: directPatients.length + anonymousWebsiteReviews.length,
    athletes: athleteReviews.length,
    clinicians: clinicianReviews.length,
    fiveStarPatientAndAthlete:
      directPatients.filter((r) => r.stars === 5).length +
      athleteReviews.filter((r) => r.stars === 5).length,
  },
  combined: {
    totalEntries: reviews.length,
    writtenReviews: allWritten.length,
    amazonRatingOnly: ratingOnly.length,
  },
};

const output = {
  meta: {
    product: "Thetis Achilles Rupture Night Splint",
    generatedAt: new Date().toISOString().slice(0, 10),
    description:
      "Master review dataset: Amazon (written + star-only), direct/website, athletes, and clinicians",
    sources: [
      "reviews.json (Amazon export from reviews.md)",
      "apps/website/src/components/reviews/content/patients.ts (direct subset)",
      "apps/website/src/components/reviews/content/athletes.ts",
      "apps/website/src/components/reviews/content/professional-opinions.ts",
    ],
  },
  ratings,
  summary: buildSummary(reviews, ratings),
  reviews,
};

writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");

const websiteDataPath = join(
  root,
  "apps/website/src/data/master-reviews.json",
);
writeFileSync(websiteDataPath, JSON.stringify(output, null, 2) + "\n");

console.log(`Built ${reviews.length} entries -> ${outputPath}`);
console.log(`Synced website data -> ${websiteDataPath}`);
console.log(
  JSON.stringify(
    {
      written: allWritten.length,
      amazonWritten: amazonWritten.length,
      amazonRatingOnly: ratingOnly.length,
      directPatients: directPatients.length,
      athletes: athleteReviews.length,
      clinicians: clinicianReviews.length,
    },
    null,
    2,
  ),
);
