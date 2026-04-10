/**
 * `generate` — syncs Dub short links for catalogue https URLs, writes
 * `dub-link-map.json`, then writes `achilles-rupture.embedded.ts` for review.
 *
 * Auth: `DUB_API_KEY` in `services/dub/.env`. Docs: https://dub.co/docs/api-reference/introduction
 *
 *   pnpm --filter @thetis/dub-sync generate
 *   bun run ./generate.ts --dry-run          — Dub only, no files written
 *   bun run ./generate.ts --embed-only      — embed only (existing dub-link-map.json)
 *
 * After review: pnpm --filter @thetis/dub-sync replace
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { ACHILLES_RUPTURE_PRODUCTS } from "@thetis/catalogue";
import type { MarketCode } from "@thetis/catalogue";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const DUB_API_BASE = "https://api.dub.co";

const sourceCataloguePath = join(
  repoRoot,
  "packages/catalogue/src/achilles-rupture.ts",
);
const embeddedOutPath = join(__dirname, "achilles-rupture.embedded.ts");
const mapPath = join(__dirname, "dub-link-map.json");

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

async function dubFetch(
  url: string,
  init: RequestInit,
  apiKey: string,
): Promise<Response> {
  const baseHeaders: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    ...(init.headers as Record<string, string> | undefined),
  };
  let last!: Response;
  for (let attempt = 0; attempt < 6; attempt++) {
    last = await fetch(url, { ...init, headers: baseHeaders });
    if (last.status !== 429) return last;
    const waitMs = 600 * 2 ** attempt;
    console.error(
      `WARN Dub 429 rate limit — waiting ${waitMs}ms (attempt ${attempt + 1})…`,
    );
    await sleep(waitMs);
  }
  return last;
}

type DubLinkCreateResponse = {
  shortLink?: string;
  url?: string;
  id?: string;
  externalId?: string | null;
};

type DubErrorBody = {
  error?: { code?: string; message?: string };
};

async function loadEnvLocal() {
  const envPath = join(__dirname, ".env");
  const file = Bun.file(envPath);
  if (!(await file.exists())) return;
  const text = await file.text();
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

function catalogueKey(productId: string, market: MarketCode): string {
  return `${productId}:${market}`;
}

function dubExternalId(productId: string, market: MarketCode): string {
  const safe = productId.replace(/[^a-zA-Z0-9_]/g, "_");
  return `catalog_${safe}_${market}`;
}

function loadExistingLinkMap(dubServiceDir: string): Record<string, string> {
  const path = join(dubServiceDir, "dub-link-map.json");
  if (!existsSync(path)) return {};
  try {
    const raw = JSON.parse(readFileSync(path, "utf8")) as unknown;
    if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
      return {};
    }
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof v === "string" && v.startsWith("http")) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

async function dubGetLinkByExternalId(
  apiKey: string,
  externalId: string,
): Promise<string | undefined> {
  const url = `${DUB_API_BASE}/links/info?externalId=${
    encodeURIComponent(externalId)
  }`;
  const res = await dubFetch(url, { method: "GET", headers: {} }, apiKey);
  if (!res.ok) return undefined;
  const json = (await res.json()) as DubLinkCreateResponse;
  return json.shortLink;
}

async function dubPatchDestination(
  apiKey: string,
  externalId: string,
  destinationUrl: string,
  comments: string,
): Promise<void> {
  const linkId = `ext_${encodeURIComponent(externalId)}`;
  await dubFetch(
    `${DUB_API_BASE}/links/${linkId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: destinationUrl, comments }),
    },
    apiKey,
  );
}

function collectHttpsLocations(): {
  productId: string;
  market: MarketCode;
  url: string;
  name: string;
}[] {
  const out: {
    productId: string;
    market: MarketCode;
    url: string;
    name: string;
  }[] = [];
  for (const p of ACHILLES_RUPTURE_PRODUCTS) {
    for (const market of ["US", "GB"] as const) {
      const loc = p.locations[market];
      const url = loc?.url?.trim();
      if (!url || !url.startsWith("http")) continue;
      out.push({
        productId: p.id,
        market,
        url,
        name: p.name,
      });
    }
  }
  return out;
}

async function dubCreateOrUpdate(opts: {
  apiKey: string;
  domain?: string;
  destinationUrl: string;
  externalId: string;
  comments: string;
  dryRun: boolean;
}): Promise<string | undefined> {
  const { apiKey, domain, destinationUrl, externalId, comments, dryRun } = opts;
  if (dryRun) {
    return `https://example.com/dry-run/${externalId}`;
  }

  const body: Record<string, unknown> = {
    url: destinationUrl,
    externalId,
    comments,
  };
  if (domain) body.domain = domain;

  const preExisting = await dubGetLinkByExternalId(apiKey, externalId);
  if (preExisting) {
    await dubPatchDestination(
      apiKey,
      externalId,
      destinationUrl,
      comments,
    );
    return preExisting;
  }

  const createRes = await dubFetch(
    `${DUB_API_BASE}/links`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    apiKey,
  );

  const createText = await createRes.text();
  let createJson: DubLinkCreateResponse & DubErrorBody = {};
  try {
    createJson = JSON.parse(createText) as DubLinkCreateResponse & DubErrorBody;
  } catch {
    /* non-json */
  }

  if (createRes.ok && createJson.shortLink) {
    return createJson.shortLink;
  }

  if (createRes.status === 409 || createJson.error?.code === "conflict") {
    const linkId = `ext_${encodeURIComponent(externalId)}`;
    const patchRes = await dubFetch(
      `${DUB_API_BASE}/links/${linkId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: destinationUrl, comments }),
      },
      apiKey,
    );
    const patchText = await patchRes.text();
    let patchJson: DubLinkCreateResponse & DubErrorBody = {};
    try {
      patchJson = JSON.parse(patchText) as DubLinkCreateResponse & DubErrorBody;
    } catch {
      /* non-json */
    }
    if (patchRes.ok && patchJson.shortLink) {
      return patchJson.shortLink;
    }
    const afterPatch = await dubGetLinkByExternalId(apiKey, externalId);
    if (afterPatch) return afterPatch;
    throw new Error(`Dub PATCH ${patchRes.status}: ${patchText}`);
  }

  if (createRes.status === 403 || createJson.error?.code === "forbidden") {
    const late = await dubGetLinkByExternalId(apiKey, externalId);
    if (late) return late;
    console.error(
      `WARN ${externalId} Dub returned forbidden (e.g. plan link limit). No existing link by externalId — skipped.`,
    );
    return undefined;
  }

  throw new Error(`Dub POST ${createRes.status}: ${createText}`);
}

function writeLinkMapJson(map: Record<string, string>, dubServiceDir: string) {
  const path = join(dubServiceDir, "dub-link-map.json");
  const keys = Object.keys(map).sort();
  const ordered: Record<string, string> = {};
  for (const k of keys) ordered[k] = map[k];
  writeFileSync(path, `${JSON.stringify(ordered, null, 2)}\n`, "utf8");
  console.error(`Wrote ${path} (${keys.length} keys)`);
}

async function syncDubCatalogueLinks() {
  const dryRun = process.argv.includes("--dry-run");
  const force = process.argv.includes("--force");
  const apiKey = process.env.DUB_API_KEY?.trim();
  const domain = process.env.DUB_DOMAIN?.trim() || undefined;

  if (!dryRun && !apiKey) {
    console.error(
      "Set DUB_API_KEY in services/dub/.env or pass --dry-run to preview.",
    );
    process.exit(1);
  }

  const entries = collectHttpsLocations();
  const map: Record<string, string> = dryRun
    ? {}
    : loadExistingLinkMap(__dirname);

  let skipped = 0;

  console.error(
    `${
      dryRun ? "[dry-run]" : "[live]"
    } Processing ${entries.length} https catalogue rows…`,
  );

  for (const row of entries) {
    const key = catalogueKey(row.productId, row.market);
    if (!dryRun && !force && map[key]) {
      console.error(
        `SKIP ${key} (already in dub-link-map.json; use --force to re-sync)`,
      );
      continue;
    }
    const extId = dubExternalId(row.productId, row.market);
    const comments = `Thetis catalogue · ${row.name} · ${row.market}`;
    try {
      const shortLink = await dubCreateOrUpdate({
        apiKey: apiKey ?? "",
        domain,
        destinationUrl: row.url,
        externalId: extId,
        comments,
        dryRun,
      });
      if (shortLink) {
        map[key] = shortLink;
        console.error(`OK  ${key} → ${shortLink}`);
      } else {
        skipped += 1;
        console.error(`SKIP ${key} (no short link)`);
      }
    } catch (e) {
      console.error(`ERR ${key} (${row.url}):`, e);
      process.exitCode = 1;
    }
    if (!dryRun) await sleep(400);
  }

  if (dryRun) {
    console.error(
      "[dry-run] Skipping dub-link-map.json and embedded catalogue.",
    );
    return false;
  }

  if (process.exitCode === 1) {
    console.error(
      "Wrote dub-link-map.json with last good data; fix errors and re-run.",
    );
  }

  writeLinkMapJson(map, __dirname);

  if (skipped > 0) {
    console.error(
      `Note: ${skipped} row(s) skipped (plan limits or missing link). Upgrade Dub or re-run next month.`,
    );
  }

  return true;
}

function loadMapForEmbed(): Record<string, string> {
  if (!existsSync(mapPath)) {
    console.error(
      `Missing ${mapPath}. Run: pnpm --filter @thetis/dub-sync generate`,
    );
    process.exit(1);
  }
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(mapPath, "utf8"));
  } catch {
    console.error(`Invalid JSON: ${mapPath}`);
    process.exit(1);
  }
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    console.error(`Expected object in ${mapPath}`);
    process.exit(1);
  }
  const m: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof v === "string" && v.startsWith("http")) m[k] = v;
  }
  if (Object.keys(m).length === 0) {
    console.error(
      "dub-link-map.json has no short links. Run: pnpm --filter @thetis/dub-sync generate",
    );
    process.exit(1);
  }
  return m;
}

function patchRegionInner(
  inner: string,
  dubUrl: string,
  region: MarketCode,
): string {
  if (!inner.includes("https://")) return inner;

  const dubVal = JSON.stringify(dubUrl);
  let s = inner
    .replace(/\n        dub: "[^"]*",?/g, "")
    .replace(/^\s*dub: "[^"]*",?\s*/m, "");

  if (/\n        url:\s*\n\s*"https:[^"]+"/.test(s)) {
    return s.replace(
      /(\n        url:\s*\n\s*"https:[^"]+"),?\s*/,
      `$1,\n        dub: ${dubVal},`,
    );
  }
  if (/\n        url:\s*"https:[^"]+"/.test(s)) {
    return s.replace(
      /(\n        url:\s*"https:[^"]+"),?\s*/,
      `$1,\n        dub: ${dubVal},`,
    );
  }
  if (/\burl:\s*"https:[^"]+"/.test(s)) {
    return s.replace(/(\burl:\s*"https:[^"]+")/, `$1,\n        dub: ${dubVal}`);
  }

  console.error(`WARN could not insert dub for ${region} block (format)`);
  return inner;
}

function replaceRegionBlock(
  productBody: string,
  region: MarketCode,
  dubUrl: string | undefined,
): string {
  if (!dubUrl) return productBody;

  const label = `      ${region}: {`;
  const i = productBody.indexOf(label);
  if (i === -1) return productBody;

  const braceOpen = productBody.indexOf("{", i);
  let depth = 0;
  let j = braceOpen;
  for (; j < productBody.length; j++) {
    const c = productBody[j];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) break;
    }
  }

  const inner = productBody.slice(braceOpen + 1, j);
  const newInner = patchRegionInner(inner, dubUrl, region);
  if (newInner === inner) return productBody;

  return (
    productBody.slice(0, braceOpen + 1) + newInner + productBody.slice(j)
  );
}

function embedAchillesCatalogue() {
  if (!existsSync(sourceCataloguePath)) {
    console.error("Missing", sourceCataloguePath);
    process.exit(1);
  }

  const map = loadMapForEmbed();
  let text = readFileSync(sourceCataloguePath, "utf8");

  const footerIdx = text.indexOf("\n];\n\nconst byId");
  if (footerIdx === -1) {
    console.error("Could not find ACHILLES_RUPTURE_PRODUCTS array end.");
    process.exit(1);
  }

  const head = text.slice(0, footerIdx);
  const tail = text.slice(footerIdx);

  const productRe = /\n  \{\n    id: "([^"]+)",/g;
  const spans: { id: string; start: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = productRe.exec(head)) !== null) {
    spans.push({ id: m[1], start: m.index });
  }

  if (spans.length === 0) {
    console.error("No products found in achilles-rupture.ts");
    process.exit(1);
  }

  const pieces: string[] = [];
  pieces.push(head.slice(0, spans[0].start));

  for (let i = 0; i < spans.length; i++) {
    const { id, start } = spans[i];
    const end = i + 1 < spans.length ? spans[i + 1].start : head.length;
    let body = head.slice(start, end);

    for (const region of ["US", "GB"] as const) {
      const key = `${id}:${region}`;
      const dubUrl = map[key];
      body = replaceRegionBlock(body, region, dubUrl);
    }

    pieces.push(body);
  }

  const out = pieces.join("") + tail;
  writeFileSync(embeddedOutPath, out, "utf8");
  console.error(
    `Wrote ${embeddedOutPath} (${
      Object.keys(map).length
    } map keys). Review, then: pnpm --filter @thetis/dub-sync replace`,
  );
}

async function main() {
  await loadEnvLocal();

  if (process.argv.includes("--embed-only")) {
    embedAchillesCatalogue();
    return;
  }

  const didWriteMap = await syncDubCatalogueLinks();
  if (didWriteMap) embedAchillesCatalogue();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
