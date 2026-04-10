#!/usr/bin/env node
import { cmdInspectBatch } from "./commands/inspect-batch.js";
import { cmdPagesPerformance } from "./commands/pages-performance.js";
import { cmdSitemaps } from "./commands/sitemaps.js";
import { cmdSites } from "./commands/sites.js";

function usage(): void {
  console.log(`@thetis/search-console

Usage:
  pnpm --filter @thetis/search-console sites [--verify]
  pnpm --filter @thetis/search-console sitemaps [--submit <feedUrl>]
  pnpm --filter @thetis/search-console inspect-batch [--file path] [--out out.jsonl] [--format jsonl|csv] [--max N] [--delay-ms N]
  pnpm --filter @thetis/search-console pages-performance [--start YYYY-MM-DD] [--end YYYY-MM-DD] [--row-limit N] [--min-impressions N] [--out path.csv]

Environment:
  GOOGLE_APPLICATION_CREDENTIALS   Optional; overrides default key file
  (default) ./search-console-service-account-key.json in package dir (gitignored)
  SEARCH_CONSOLE_SITE_URL            e.g. https://thetismedical.com/

Scopes:
  Read-only commands use webmasters.readonly. sitemaps --submit uses webmasters (read/write).
`);
}

async function main(): Promise<void> {
  const [, , cmd, ...args] = process.argv;
  if (!cmd || cmd === "-h" || cmd === "--help") {
    usage();
    process.exit(cmd ? 0 : 1);
  }

  try {
    switch (cmd) {
      case "sites":
        await cmdSites(args);
        break;
      case "sitemaps":
        await cmdSitemaps(args);
        break;
      case "inspect-batch":
        await cmdInspectBatch(args);
        break;
      case "pages-performance":
        await cmdPagesPerformance(args);
        break;
      default:
        console.error(`Unknown command: ${cmd}`);
        usage();
        process.exit(1);
    }
  } catch (e) {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  }
}

void main();
