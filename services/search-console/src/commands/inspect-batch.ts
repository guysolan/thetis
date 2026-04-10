import fs from "fs";
import { getSearchConsole } from "../client.js";
import { getSiteUrl } from "../site-url.js";
import { parseUrlListLines } from "../parse-url-list.js";

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function getArg(
  args: string[],
  flag: string,
  def?: string,
): string | undefined {
  const i = args.indexOf(flag);
  if (i >= 0 && args[i + 1]) return args[i + 1];
  return def;
}

function getArgNumber(args: string[], flag: string, def: number): number {
  const v = getArg(args, flag);
  if (v === undefined) return def;
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
}

function flattenInspection(
  url: string,
  data: Record<string, unknown> | undefined,
): Record<string, string | number | boolean | null> {
  const row: Record<string, string | number | boolean | null> = { url };
  if (!data?.inspectionResult) {
    row.error = "no_inspection_result";
    return row;
  }
  const ir = data.inspectionResult as Record<string, unknown>;

  const idx = ir.indexStatusResult as Record<string, unknown> | undefined;
  if (idx) {
    row.indexVerdict = (idx.verdict as string) ?? null;
    row.coverageState = (idx.coverageState as string) ?? null;
    row.robotsTxtState = (idx.robotsTxtState as string) ?? null;
    row.indexingState = (idx.indexingState as string) ?? null;
    row.pageFetchState = (idx.pageFetchState as string) ?? null;
    row.lastCrawlTime = (idx.lastCrawlTime as string) ?? null;
    const canonical = idx.userCanonical as string | undefined;
    const googleCanon = idx.googleCanonical as string | undefined;
    row.userCanonical = canonical ?? null;
    row.googleCanonical = googleCanon ?? null;
  }

  const mob = ir.mobileUsabilityResult as Record<string, unknown> | undefined;
  if (mob?.verdict) row.mobileUsabilityVerdict = mob.verdict as string;

  return row;
}

function rowToJsonl(
  row: Record<string, string | number | boolean | null>,
): string {
  return `${JSON.stringify(row)}\n`;
}

const CSV_COLUMNS = [
  "url",
  "indexVerdict",
  "coverageState",
  "robotsTxtState",
  "indexingState",
  "pageFetchState",
  "lastCrawlTime",
  "userCanonical",
  "googleCanonical",
  "mobileUsabilityVerdict",
  "error",
] as const;

function rowToCsv(
  row: Record<string, string | number | boolean | null>,
): string {
  return `${CSV_COLUMNS.map((h) => csvEscape(row[h])).join(",")}\n`;
}

function csvEscape(v: string | number | boolean | null | undefined): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function loadProcessedUrls(
  outPath: string,
  format: "jsonl" | "csv",
): Set<string> {
  const done = new Set<string>();
  if (!fs.existsSync(outPath)) return done;
  const text = fs.readFileSync(outPath, "utf8");
  if (format === "jsonl") {
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!t) continue;
      try {
        const o = JSON.parse(t) as { url?: string };
        if (o.url) done.add(o.url);
      } catch {
        /* skip */
      }
    }
  } else {
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!t) continue;
      const firstComma = t.indexOf(",");
      const u = (firstComma >= 0 ? t.slice(0, firstComma) : t).replace(
        /^"|"$/g,
        "",
      ).trim();
      if (u && u !== "url" && u.startsWith("http")) done.add(u);
    }
  }
  return done;
}

async function readAllInput(file?: string): Promise<string[]> {
  if (file) {
    const text = fs.readFileSync(file, "utf8");
    return text.split(/\r?\n/);
  }

  if (!process.stdin.isTTY) {
    const chunks: string[] = [];
    for await (const chunk of process.stdin) {
      chunks.push(String(chunk));
    }
    return chunks.join("").split(/\r?\n/);
  }

  throw new Error(
    "Provide --file path or pipe URL list on stdin (one URL per line).",
  );
}

export async function cmdInspectBatch(args: string[]): Promise<void> {
  const file = getArg(args, "--file");
  const outPath = getArg(args, "--out") ?? "output/inspect-batch.jsonl";
  const format = (getArg(args, "--format", "jsonl") ?? "jsonl") as
    | "jsonl"
    | "csv";
  if (format !== "jsonl" && format !== "csv") {
    throw new Error('--format must be "jsonl" or "csv"');
  }

  const maxCalls = getArgNumber(args, "--max", 500);
  const delayMs = getArgNumber(args, "--delay-ms", 1100);

  const siteUrl = getSiteUrl();
  const lines = await readAllInput(file);
  let urls = parseUrlListLines(lines);
  const processed = loadProcessedUrls(outPath, format);
  urls = urls.filter((u) => !processed.has(u));

  if (urls.length === 0) {
    console.error(
      "No new URLs to inspect (all present in --out or input empty).",
    );
    return;
  }

  const dir = outPath.includes("/")
    ? outPath.slice(0, outPath.lastIndexOf("/"))
    : ".";
  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const api = getSearchConsole("readonly");
  let count = 0;

  const fileExists = fs.existsSync(outPath);
  let csvHeaderWritten = fileExists && format === "csv";

  if (format === "csv" && !csvHeaderWritten) {
    fs.appendFileSync(
      outPath,
      `${CSV_COLUMNS.map((h) => csvEscape(h)).join(",")}\n`,
    );
    csvHeaderWritten = true;
  }

  for (const url of urls) {
    if (count >= maxCalls) {
      console.error(
        `Stopped after --max ${maxCalls} API calls (${
          urls.length - count
        } URLs remaining). Re-run to resume.`,
      );
      break;
    }

    try {
      const res = await api.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl,
        },
      });

      const row = flattenInspection(url, res.data as Record<string, unknown>);

      if (format === "jsonl") {
        fs.appendFileSync(outPath, rowToJsonl(row));
      } else {
        fs.appendFileSync(outPath, rowToCsv(row));
      }

      count++;
      console.error(`[${count}/${Math.min(maxCalls, urls.length)}] ${url}`);
    } catch (e) {
      const errRow: Record<string, string | number | boolean | null> = {
        url,
        error: e instanceof Error ? e.message : String(e),
      };
      if (format === "jsonl") {
        fs.appendFileSync(outPath, rowToJsonl(errRow));
      } else {
        fs.appendFileSync(outPath, rowToCsv(errRow));
      }
      console.error(`[error] ${url}: ${errRow.error}`);
    }

    await sleep(delayMs);
  }

  console.error(`Wrote ${count} result(s) to ${outPath}`);
}
