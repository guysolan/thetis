/**
 * Cleans the negative keyword list for the Achilles rupture splint campaign.
 *
 * Two operations are performed:
 *
 * 1. REMOVE entirely — keywords that represent high-intent buyer searches for
 *    an Achilles rupture splint/boot (leaving them as negatives would block
 *    potential customers from seeing the ad).
 *
 * 2. CONVERT to EXACT match — dangerous single-word PHRASE negatives (e.g.
 *    "tendon") that block every search containing the word. Converting to
 *    exact limits the block to the bare query only.
 *
 * All negatives containing splint/splints, night/nite/nights, aircast, wedges,
 * achilles (incl. typos), plantarflexion, rupture/torn/tear, thompson, boot,
 * surgery/operation, conservative treatment, orthosis/ortesis, or brace/braces
 * are removed entirely.
 *
 * Run:  npx ts-node remove-innappropriate.ts
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface KeywordRow {
    keyword_text: string;
    match_type: string;
}

// ---------------------------------------------------------------------------
// REMOVE — delete these from the negative list entirely.
// They are buying-intent searches for the Achilles rupture splint or its
// direct competitors / companion products.
// ---------------------------------------------------------------------------

const REMOVE_PATTERNS: RegExp[] = [
    // ── VACOped brand family (the primary Achilles-rupture recovery boot) ──────
    // No closing \b so all variants (vacoped, vacopeds, vacopedes, etc.) match
    /\bvacoped/i,
    /\bvacocast/i,
    /\bvacotalus/i,
    /\bvacoboot/i,
    /\bvacboot/i,
    /\bvaco\s?ped/i,
    /\boped\s?vacoped/i,
    /\boped\s?vacocast/i,
    /\boped\s?vacotalus/i,
    /\boped\s?medical/i,

    // ── Aircast — competitor walking boot brand ───────────────────────────────
    /\baircast/i,
    /\bair\s?cast/i,

    // ── Any splint/splints or night/nite/nights — product category terms ─────
    /\bsplint/i, // splint, splints, splinting, etc.
    /\bnights?\b/i,
    /\bnite\b/i,
    /\bnight/i, // nightsock, nighttime, etc.

    // ── Achilles spellings (incl. common typos) + French achille ─────────────
    /\bachill/i,
    /\bacilles/i,
    /\baquiles/i,
    /\bachikes/i,

    // ── Injury / treatment terms — high-intent ATR buyer searches ─────────────
    /wedge/i,
    /\bplantar\s?flex/i,
    /ruptur/i, // rupture, ruptured, ruptura — not \r (carriage return in JS)
    /\brotura/i,
    /\brompimiento/i,
    /\bdesgarro/i,
    /\btorn\b/i,
    /\btore\b/i,
    /\btearing\b/i,
    /\btear/i, // tear, tears, tearing; incl. compound spellings
    /\bthompson/i,
    /boot/i, // boot, boots, legboot, walking boot
    /\bbota\b/i,
    /\bbotte/i,
    /\bsurg/i, // surgery, surgical, surgeon
    /\bcirug/i, // cirugía, cirugia
    /\boperat/i, // operation, operacion, operative
    /\bconservativ/i,

    // ── VACOped alternatives / protocol (buyer intent) ────────────────────────
    /berlin\s+protocol/i,
    /non.?surgical.{0,30}achill/i,
    /alternative\s+to\s+walking\s+boot/i,
    /vacoped\s+alternative/i,

    // ── Ferula (Spanish splint) + tendon ────────────────────────────────────
    /\bferula/i,

    // ── Orthosis / brace — product category terms ─────────────────────────────
    /orthosis/i,
    /ortesis/i,
    /brace/i, // brace, braces, footbrace, anklebraces, etc.
];

// ---------------------------------------------------------------------------
// CONVERT TO EXACT — change match type from PHRASE → EXACT.
// These are product-category terms. As phrase negatives they block every
// search containing the phrase, including buyer searches that append
// "for achilles rupture". Converting to exact limits the block to the
// bare phrase only.
// ---------------------------------------------------------------------------

const CONVERT_TO_EXACT_PATTERNS: RegExp[] = [
    // Strassburg sock — plantar fasciitis brand, not Achilles rupture
    /^strassburg\s+(sock|socks)$/i,
    /^(where\s+(can\s+i\s+)?buy|where\s+to\s+buy)\s+strassburg\s+sock$/i,
    /^strassburg\s+sock\s+(regular|where\s+to\s+buy)$/i,

    // ── Dangerous single-word phrase negatives ────────────────────────────────
    // As phrase match these block ANY search containing the word, e.g.
    // "tendon" blocks "achilles tendon splint recovery", etc.
    /^tendons?$/i,
    /^orthotics?$/i,
    /^equinus$/i,
    /^calcaneus$/i,
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function matchesAny(text: string, patterns: RegExp[]): boolean {
    return patterns.some((re) => re.test(text));
}

function parseCSV(content: string): KeywordRow[] {
    const lines = content.split("\n").filter((l) => l.trim() !== "");
    const [_header, ...rows] = lines;
    return rows.map((line) => {
        const commaIdx = line.lastIndexOf(",");
        return {
            keyword_text: line.slice(0, commaIdx).trim(),
            match_type: line.slice(commaIdx + 1).trim(),
        };
    });
}

function toCSV(rows: KeywordRow[]): string {
    const header = "keyword_text,match_type";
    const body = rows.map((r) => `${r.keyword_text},${r.match_type}`).join(
        "\n",
    );
    return `${header}\n${body}\n`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const INPUT_FILE = path.join(
    __dirname,
    "Negative Keyword Details Report (1).csv",
);
const OUTPUT_FILE = path.join(
    __dirname,
    "Negative Keyword Details Report (cleaned).csv",
);
const TXT_FILE = path.join(
    __dirname,
    "Negative Keyword Details Report (cleaned).txt",
);
const LOG_FILE = path.join(__dirname, "cleaning-log.txt");

const raw = fs.readFileSync(INPUT_FILE, "utf8");
const keywords = parseCSV(raw);

const removed: KeywordRow[] = [];
const converted: KeywordRow[] = [];
const kept: KeywordRow[] = [];

for (const kw of keywords) {
    const text = kw.keyword_text;

    if (matchesAny(text, REMOVE_PATTERNS)) {
        removed.push(kw);
        // Do not add to output
    } else if (
        kw.match_type === "PHRASE" &&
        matchesAny(text, CONVERT_TO_EXACT_PATTERNS)
    ) {
        converted.push(kw);
        kept.push({ keyword_text: text, match_type: "EXACT" });
    } else {
        kept.push(kw);
    }
}

// Write cleaned CSV
fs.writeFileSync(OUTPUT_FILE, toCSV(kept), "utf8");

// Write Google Ads formatted .txt  ("phrase" or [exact])
const txtLines = kept.map((r) => {
    if (r.match_type === "EXACT") return `[${r.keyword_text}]`;
    return `"${r.keyword_text}"`;
});
fs.writeFileSync(TXT_FILE, txtLines.join("\n") + "\n", "utf8");

// Write human-readable log
const logLines: string[] = [
    `Negative Keyword Cleaning Log`,
    `Run: ${new Date().toISOString()}`,
    `Input:  ${keywords.length} keywords`,
    `Output: ${kept.length} keywords`,
    ``,
    `═══════════════════════════════════════════════════════`,
    `REMOVED (${removed.length} keywords deleted from negative list)`,
    `These were blocking potential buyers of the Achilles rupture splint.`,
    `═══════════════════════════════════════════════════════`,
    ...removed.map((k) => `  - "${k.keyword_text}"  [${k.match_type}]`),
    ``,
    `═══════════════════════════════════════════════════════`,
    `CONVERTED TO EXACT (${converted.length} keywords changed PHRASE → EXACT)`,
    `These are product-category terms. As phrase negatives they blocked all`,
    `searches containing the phrase (e.g. "achilles tendon recovery").`,
    `Exact match limits the block to the bare phrase only.`,
    `═══════════════════════════════════════════════════════`,
    ...converted.map((k) => `  ~ "${k.keyword_text}"  PHRASE → EXACT`),
];

fs.writeFileSync(LOG_FILE, logLines.join("\n"), "utf8");

console.log(`✓ Cleaned CSV written to: ${path.basename(OUTPUT_FILE)}`);
console.log(`✓ Formatted TXT written to: ${path.basename(TXT_FILE)}`);
console.log(`✓ Log written to:           ${path.basename(LOG_FILE)}`);
console.log(`\nSummary:`);
console.log(`  Input keywords  : ${keywords.length}`);
console.log(`  Removed         : ${removed.length}`);
console.log(`  Converted EXACT : ${converted.length}`);
console.log(`  Output keywords : ${kept.length}`);
