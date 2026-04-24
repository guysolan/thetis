/**
 * Cleans the negative keyword list for the Achilles rupture splint campaign.
 *
 * Two operations are performed:
 *
 * 1. REMOVE entirely — keywords that represent high-intent buyer searches for
 *    an Achilles rupture splint/boot (leaving them as negatives would block
 *    potential customers from seeing the ad).
 *
 * 2. CONVERT to EXACT match — keywords that are currently PHRASE match but
 *    are the product's own category terms (e.g. "night splint"). As a phrase
 *    negative they block every search containing those words, including
 *    "night splint for achilles rupture". Converting to exact limits the block
 *    to the bare two-word query only.
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

    // ── Achilles + splint/ferula (direct product searches) ────────────────────
    /achilles.{0,40}splint/i,
    /splint.{0,40}achilles/i,
    /ferula.{0,40}(aquiles|tendon)/i,
    /(aquiles|tendon).{0,40}ferula/i,

    // ── Achilles + boot (product searches — walking boot for ATR) ─────────────
    /achilles.{0,40}boot/i,
    /boot.{0,40}achilles/i,
    /\bboot for (torn|ruptured|broken) (achilles|tendon)\b/i,

    // ── Spanish/French: orthopedic boot for Achilles / tendon ─────────────────
    /bota\b.{0,40}(aquiles|tendon)/i,
    /(aquiles|tendon).{0,40}\bbota\b/i,
    /botte\b.{0,40}(achille|tendon)/i,
    /(achille|tendon).{0,40}\bbotte\b/i,

    // ── Night splint specifically for Achilles ────────────────────────────────
    /night\s+splint.{0,40}achilles/i,
    /achilles.{0,40}night\s+splint/i,

    // ── Achilles rupture protocol / non-surgical treatment products ───────────
    /berlin\s+protocol\s+achilles/i,
    /achilles\s+protocol\s+non.?surgical/i,
    /non.?surgical\s+achilles.{0,30}recovery/i,
    /alternative\s+to\s+walking\s+boot/i,
    /vacoped\s+alternative/i,

    // ── Achilles wedge insole (accessory for the boot) ────────────────────────
    /achilles\s+wedge\s+insole/i,

    // ── Post-op / surgery Achilles — patient who just had surgery needs the product
    /achilles.{0,40}post.?op/i,
    /post.?op.{0,40}achilles/i,
    /post.{0,10}(operacion|operação|cirugia|cirurgia).{0,40}(aquiles|achilles|tendon)/i,
    /rehabilitaci[oó]n.{0,20}(cirug|post).{0,30}(aquiles|tendon)/i,
    /operaci[oó]n.{0,20}(tendon|aquiles)/i,

    // ── "achilles pop recovery" — person who just felt the rupture pop ─────────
    /achilles\s+pop\s+recovery/i,

    // ── Achilles + rupture / ruptured / ruptures ──────────────────────────────
    /achilles.{0,60}ruptur/i,
    /ruptur.{0,60}achilles/i,
    // Spanish/French: rotura, ruptura, rompimiento
    /rotura.{0,60}(aquiles|tendon|talon)/i,
    /(aquiles|tendon|talon).{0,60}rotura/i,
    /ruptura.{0,60}(aquiles|tendon)/i,
    /(aquiles|tendon).{0,60}ruptura/i,
    /rompimiento.{0,60}(aquiles|tendon)/i,
    /rupture\s+(partielle|du\s+tendon)/i,

    // ── Achilles + torn / tearing ─────────────────────────────────────────────
    /achilles.{0,60}torn/i,
    /torn.{0,60}achilles/i,
    /tearing.{0,60}achilles/i,
    /achilles.{0,60}tearing/i,
    // "tore achilles", "tore his/my/their achilles"
    /\btore\b.{0,40}achilles/i,
    /achilles.{0,40}\btore\b/i,
    // Spanish: roto (torn), desgarro (tear/rupture)
    /tendon\s+de\s+aquiles\s+roto/i,
    /desgarro.{0,40}(aquiles|tendon)/i,
    /(aquiles|tendon).{0,40}desgarro/i,

    // ── Achilles + tear / tears ───────────────────────────────────────────────
    /achilles.{0,60}\btears?\b/i,
    /\btears?\b.{0,60}achilles/i,
    // "tear achilles tendon", "tear in achilles", "longitudinal tear achilles" etc.
    /\btear\b.{0,60}achilles/i,
    /achilles.{0,60}\btear\b/i,
    // compound spelling e.g. "achillestear"
    /achillestear/i,
];

// ---------------------------------------------------------------------------
// CONVERT TO EXACT — change match type from PHRASE → EXACT.
// These are product-category terms. As phrase negatives they block every
// search containing the phrase, including buyer searches that append
// "for achilles rupture". Converting to exact limits the block to the
// bare phrase only.
// ---------------------------------------------------------------------------

const CONVERT_TO_EXACT_PATTERNS: RegExp[] = [
    // Generic "night splint" — the product category itself
    /^a?\s*night\s+splints?$/i,
    /^night\s+splint\s+pillow$/i,
    /^night\s+splint\s+socks?$/i,
    /^night\s+splint\s+boots?$/i,
    /^night\s+sock\s+splint$/i,
    /^night\s+resting\s+splint$/i,
    /^night\s+leg\s+splint$/i,
    /^night\s+heel\s+splints?$/i,
    /^night\s+time\s+splints?$/i,
    /^night\s+fighter\s+splint$/i,
    /^night\s+afo$/i,
    /^foot\s+night\s+splint$/i,
    /^calf\s+night\s+splint$/i,
    /^heel\s+night\s+splint$/i,
    /^sleep\s+splint$/i,
    /^resting\s+splint$/i,
    /^resting\s+afo$/i,
    /^splint\s+worn\s+at\s+night$/i,
    /^wearing\s+a\s+night\s+splint$/i,
    /^wear\s+night\s+splints?$/i,
    /^adjustable\s+night\s+splint$/i,
    /^posterior\s+night\s+splint/i,
    /^dorsal\s+night\s+splint$/i,
    /^dorsiflexion\s+night\s+(sock|splint)$/i,
    /^dorsal\s+spur\s+treatment$/i,

    // Night splint with pharmacy / retailer — likely a buyer comparing options
    /^night\s+splint\s+(nhs|uk|walgreens|walmart|near\s+me)$/i,
    /^pharmacy\s+night\s+splint$/i,
    /^cvs\s+night\s+splint$/i,
    /^where\s+(can\s+i\s+buy|to\s+buy)\s+(a\s+)?night\s+splint/i,
    /^night\s+splints\s+near\s+me$/i,

    // Night splint brand names (buyer searches — exact block is safer than phrase)
    /^azmed\s+night\s+splint$/i,
    /^powerstep\s+night\s+splint$/i,
    /^deroyal\s+night\s+splint$/i,
    /^vive\s+hard\s+night\s+splint$/i,
    /^mars\s+wellness\s+night\s+splint$/i,
    /^darco\s+night\s+splint$/i,
    /^alphabrace\s+night\s+splint$/i,
    /^cascade\s+night\s+splints?$/i,
    /^coreline\s+posterior\s+adjustable\s+night\s+splint$/i,
    /^exoform\s+night\s+splint$/i,
    /^dorsiwedge\s+night\s+splint$/i,
    /^l4397\s+night\s+splint$/i,
    /^l1930\s+night\s+splint$/i,
    /^pfs\s+night\s+splint$/i,
    /^quanquer\s+night\s+splint$/i,
    /^ovation\s+hybrid\s+night\s+splint/i,
    /^kafo\s+night\s+splint$/i,
    /^nite\s+splint$/i,
    /^night\s+splinter$/i,

    // "How does a night splint work" / "are night splints effective"
    // — buyer research queries; phrase match incorrectly blocks Achilles variations
    /^how\s+(does\s+(a\s+)?night\s+splint|do\s+night\s+splints)\s+work$/i,
    /^are\s+night\s+splints\s+effective$/i,
    /^what\s+are\s+night\s+splints\s+used\s+for$/i,

    // Strassburg sock — another night-splint brand (used for plantar fasciitis,
    // not Achilles rupture, so exact block is appropriate)
    /^strassburg\s+(sock|socks|splint|night\s+sock)$/i,
    /^(where\s+(can\s+i\s+)?buy|where\s+to\s+buy)\s+strassburg\s+sock$/i,
    /^strassburg\s+sock\s+(regular|where\s+to\s+buy)$/i,

    // ── Dangerous single-word phrase negatives ────────────────────────────────
    // As phrase match these block ANY search containing the word, e.g.
    // "splint" blocks "achilles rupture splint", "tendon" blocks
    // "achilles tendon splint recovery", etc.
    /^splint$/i,
    /^tendons?$/i,
    /^orthosis$/i,
    /^orthotics?$/i,
    /^equinus$/i,
    /^calcaneus$/i,

    // ── "adjustable splints" — phrase blocks "adjustable achilles splints" ─────
    /^adjustable splints$/i,
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
    `searches containing the phrase (e.g. "night splint for achilles rupture").`,
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
