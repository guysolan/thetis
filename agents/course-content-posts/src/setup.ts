#!/usr/bin/env bun
import { loadEnv } from "./load-env.js";
loadEnv();

import { Client } from "@notionhq/client";
import { config } from "./config.js";
import { scanAllImages } from "./scan-lessons.js";
import { updateTracker } from "./notion-tracker.js";
import { sortBySectionOrder } from "./section-order.js";

async function main() {
  const parentId = process.env.NOTION_PARENT_PAGE_ID;
  if (!parentId) {
    console.log(`
Setup: Create the Image Tracker page in Notion

1. Create a new page in your Notion workspace (or in the same space as your Content Calendar)
2. Name it "Course Image Tracker" or similar
3. Copy the page ID from the URL:
   https://notion.so/YourWorkspace/PAGE_ID?v=...
   The PAGE_ID is the 32-char hex string
4. Add to .env:
   NOTION_TRACKER_PAGE_ID=<that-id>

5. Run: bun run setup
   (This will populate the tracker with all course images)

Alternatively, if you want this script to CREATE the tracker page:
   Add NOTION_PARENT_PAGE_ID=<parent-page-id> to .env
   Then run: bun run setup
`);
    return;
  }

  const notion = new Client({ auth: config.notionApiKey });

  if (!config.trackerPageId) {
    // Create the tracker page
    const { id } = await notion.pages.create({
      parent: { page_id: parentId },
      properties: {
        title: {
          title: [{ type: "text", text: { content: "Course Image Tracker" } }],
        },
      },
    });
    console.log(`Created tracker page: ${id}`);
    console.log(`Add to .env: NOTION_TRACKER_PAGE_ID=${id}`);
    return;
  }

  // Populate with all images (chronological order from sections.ts)
  const allRefs = scanAllImages();
  const deduped = Array.from(new Map(allRefs.map((r) => [r.imageFilename, r])).values());
  const toDo = sortBySectionOrder(deduped).map((r) => `${r.imageFilename} (${r.lessonFile})`);
  await updateTracker([], toDo);
  console.log(`Populated tracker with ${toDo.length} images`);
}

main().catch(console.error);
