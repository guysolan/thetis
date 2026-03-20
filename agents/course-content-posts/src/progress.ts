#!/usr/bin/env bun
import { loadEnv } from "./load-env.js";
loadEnv();

import { config } from "./config.js";
import {
  getTrackerContent,
  parseTrackerContent,
  createTrackerPage,
  writeTrackerPageIdToEnv,
  updateTracker,
} from "./notion-tracker.js";
import { scanAllImages } from "./scan-lessons.js";
import { sortBySectionOrder } from "./section-order.js";
import { getDoneFromContentCalendar, getDoneFromBlog } from "./content-calendar.js";

async function main() {
  const imageArg = process.argv[2];
  if (imageArg === "--help" || imageArg === "-h") {
    console.log(`
Usage: bun run progress [image-filename]

  No args: Show progress and next image
  With image: Show context for that image

Examples:
  bun run progress
  bun run progress dvt-vs-pe-leg-to-lungs.png
`);
    return;
  }

  const allRefs = scanAllImages();
  const deduped = Array.from(new Map(allRefs.map((r) => [r.imageFilename, r])).values());
  const uniqueRefs = sortBySectionOrder(deduped).map((r) => [r.imageFilename, r] as const);

  const toDoItems = uniqueRefs.map(([fn, r]) => `${fn} (${r.lessonFile})`);
  let done: string[] = [];
  let toDo: string[] = toDoItems;
  let trackerPageId = config.trackerPageId;

  // Create tracker if missing (requires NOTION_PARENT_PAGE_ID)
  if (!trackerPageId && process.env.NOTION_PARENT_PAGE_ID) {
    console.log("Creating tracker page in Notion...");
    trackerPageId = await createTrackerPage(process.env.NOTION_PARENT_PAGE_ID);
    writeTrackerPageIdToEnv(trackerPageId);
    console.log("Updated .env with NOTION_TRACKER_PAGE_ID=" + trackerPageId);
  }

  if (trackerPageId) {
    try {
      const content = await getTrackerContent(trackerPageId);
      const parsed = parseTrackerContent(content);
      // Merge done from: tracker page + content calendar + published blogs
      const [fromCalendar, fromBlog] = await Promise.all([
        getDoneFromContentCalendar(),
        Promise.resolve(getDoneFromBlog(toDoItems)),
      ]);
      done = [...new Set([...parsed.done, ...fromCalendar, ...fromBlog])];
      toDo = toDoItems.filter((t) => !done.includes(t));
      // Always sync tracker to Notion (handles empty page, new images, etc.)
      await updateTracker(done, toDo, trackerPageId);
    } catch (e) {
      console.warn("Could not read Notion tracker:", e);
    }
  }

  if (imageArg) {
    const match = uniqueRefs.find(([fn]) => fn === imageArg || fn.startsWith(imageArg));
    if (match) {
      const [fn, r] = match;
      console.log(`Image: ${fn}`);
      console.log(`Lesson: ${r.lessonFile}`);
      console.log(`\nRun: bun run generate ${fn}`);
      return;
    }
    console.error("Image not found:", imageArg);
    process.exit(1);
  }

  console.log("\nPROGRESS: " + done.length + "/" + uniqueRefs.length + " images covered\n");
  console.log("DONE:");
  for (const d of done) console.log(`  ✓ ${d}`);
  console.log("\nNEXT (by course order):");
  for (let i = 0; i < Math.min(10, toDo.length); i++) {
    console.log(`  ${i + 1}. ${toDo[i]}`);
  }
  if (toDo.length > 10) console.log("  ... and " + (toDo.length - 10) + " more");

  const next = toDo[0];
  if (next) {
    const fn = next.split(" ")[0];
    console.log("\nNext: bun run generate " + fn);
  }
}

main().catch(console.error);
