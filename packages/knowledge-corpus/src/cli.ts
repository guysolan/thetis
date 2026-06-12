#!/usr/bin/env bun
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { extractAll } from "./extract/index.ts";
import { REPO_ROOT } from "./lib/files.ts";
import { loadEnv } from "./lib/load-env.ts";

await loadEnv();

const command = process.argv[2];

switch (command) {
  case "extract": {
    const chunks = extractAll();
    const outPath = join(import.meta.dirname, "..", "corpus.json");
    writeFileSync(outPath, JSON.stringify(chunks, null, 2));
    console.log(`Wrote ${chunks.length} chunks to ${outPath}`);
    printStats(chunks);
    break;
  }
  case "stats": {
    printStats(extractAll());
    break;
  }
  case "sync": {
    // Lazy import so extract/stats work without installed deps
    const { sync } = await import("./sync.ts");
    await sync();
    break;
  }
  default:
    console.log("Usage: bun run src/cli.ts <extract|stats|sync>");
    console.log("  extract  Write all chunks to corpus.json for inspection");
    console.log("  stats    Print chunk counts by source/type");
    console.log("  sync     Embed and upsert changed chunks to Supabase");
    process.exit(command ? 1 : 0);
}

function printStats(chunks: ReturnType<typeof extractAll>) {
  console.log(`\nRepo root: ${REPO_ROOT}`);
  console.log(`Total chunks: ${chunks.length}\n`);

  const byType = new Map<string, number>();
  const byApp = new Map<string, number>();
  for (const c of chunks) {
    byType.set(
      c.metadata.content_type,
      (byType.get(c.metadata.content_type) ?? 0) + 1,
    );
    const app = c.metadata.source_path.split("/").slice(0, 2).join("/");
    byApp.set(app, (byApp.get(app) ?? 0) + 1);
  }
  console.log("By content type:");
  for (const [type, count] of [...byType].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${type.padEnd(10)} ${count}`);
  }
  console.log("\nBy source:");
  for (const [app, count] of [...byApp].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${app.padEnd(40)} ${count}`);
  }
}
