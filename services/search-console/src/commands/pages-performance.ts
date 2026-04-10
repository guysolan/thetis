import fs from "fs";
import { getSearchConsole } from "../client.js";
import { getSiteUrl } from "../site-url.js";

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

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function csvEscape(s: string | number): string {
  const v = String(s);
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

/**
 * Search Analytics: dimension page, for prioritizing legacy URLs by impressions.
 */
export async function cmdPagesPerformance(args: string[]): Promise<void> {
  const end = getArg(args, "--end")
    ? new Date(getArg(args, "--end")!)
    : new Date();
  const start = getArg(args, "--start")
    ? new Date(getArg(args, "--start")!)
    : new Date(end.getTime() - 90 * 24 * 60 * 60 * 1000);

  const rowLimit = getArgNumber(args, "--row-limit", 25000);
  const minImpressions = getArgNumber(args, "--min-impressions", 0);
  const outPath = getArg(args, "--out");

  const siteUrl = getSiteUrl();
  const api = getSearchConsole("readonly");

  const res = await api.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: formatDate(start),
      endDate: formatDate(end),
      dimensions: ["page"],
      rowLimit,
      dataState: "all",
    },
  });

  const rows = res.data.rows ?? [];
  const header = ["page", "clicks", "impressions", "ctr", "position"];

  const lines = [header.map(csvEscape).join(",")];

  for (const r of rows) {
    const imp = r.impressions ?? 0;
    if (imp < minImpressions) continue;
    const keys = r.keys ?? [];
    const page = keys[0] ?? "";
    lines.push(
      [
        csvEscape(page),
        r.clicks ?? 0,
        imp,
        r.ctr ?? 0,
        r.position ?? 0,
      ].join(","),
    );
  }

  const csv = `${lines.join("\n")}\n`;
  if (outPath) {
    const dir = outPath.includes("/")
      ? outPath.slice(0, outPath.lastIndexOf("/"))
      : "";
    if (dir && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(outPath, csv, "utf8");
    console.error(`Wrote ${lines.length - 1} row(s) to ${outPath}`);
  } else {
    process.stdout.write(csv);
  }
}
