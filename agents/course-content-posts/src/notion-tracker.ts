import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { config } from "./config.js";
import { scanAllImages } from "./scan-lessons.js";
import { sortBySectionOrder } from "./section-order.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const notion = new Client({ auth: config.notionApiKey });
const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getTrackerContent(pageId?: string): Promise<string> {
  const id = pageId || config.trackerPageId;
  if (!id) return "";
  try {
    const md = await n2m.pageToMarkdown(id);
    return n2m.toMarkdownString(md).parent || "";
  } catch {
    return "";
  }
}

export async function updateTracker(
  done: string[],
  toDo: string[],
  pageId?: string,
): Promise<void> {
  const id = pageId || config.trackerPageId;
  if (!id) return;
  await updatePageContent(id, done, toDo);
}

function toRichText(content: string): { type: "text"; text: { content: string } }[] {
  // Notion rich_text content max 2000 chars per element
  const parts: { type: "text"; text: { content: string } }[] = [];
  let remaining = content;
  while (remaining.length > 0) {
    const chunk = remaining.slice(0, 2000);
    remaining = remaining.slice(2000);
    parts.push({ type: "text", text: { content: chunk } });
  }
  return parts;
}

async function updatePageContent(pageId: string, done: string[], toDo: string[]): Promise<void> {
  const { results } = await notion.blocks.children.list({ block_id: pageId });
  for (const block of results) {
    await notion.blocks.delete({ block_id: block.id });
  }

  const blocks: object[] = [
    {
      object: "block",
      type: "heading_2",
      heading_2: { rich_text: toRichText("Done") },
    },
  ];
  if (done.length === 0) {
    blocks.push({
      object: "block",
      type: "paragraph",
      paragraph: { rich_text: toRichText("(none yet)") },
    });
  } else {
    for (const item of done) {
      blocks.push({
        object: "block",
        type: "to_do",
        to_do: {
          rich_text: toRichText(item),
          checked: true,
        },
      });
    }
  }
  blocks.push({
    object: "block",
    type: "heading_2",
    heading_2: { rich_text: toRichText("To Do (by course order)") },
  });
  for (const item of toDo) {
    blocks.push({
      object: "block",
      type: "to_do",
      to_do: {
        rich_text: toRichText(item),
        checked: false,
      },
    });
  }

  for (let i = 0; i < blocks.length; i += 100) {
    const chunk = blocks.slice(i, i + 100);
    await notion.blocks.children.append({
      block_id: pageId,
      children: chunk as any,
    });
  }
}

export function parseTrackerContent(content: string): { done: string[]; toDo: string[] } {
  const done: string[] = [];
  const toDo: string[] = [];
  let inDone = false;
  let inToDo = false;
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## Done")) {
      inDone = true;
      inToDo = false;
      continue;
    }
    if (trimmed.startsWith("## To Do")) {
      inDone = false;
      inToDo = true;
      continue;
    }
    // Strip optional leading "- " (notion-to-md outputs that) - we only want [ ] / [x]
    const normalized = trimmed.replace(/^-\s*/, "");
    const match = normalized.match(/^\[([ xX])\]\s*(.+)$/);
    if (match) {
      const item = match[2].trim();
      if (/x/i.test(match[1])) done.push(item);
      else toDo.push(item);
    }
  }
  return { done, toDo };
}

export async function createTrackerPage(parentPageId: string): Promise<string> {
  const allRefs = scanAllImages();
  const deduped = Array.from(new Map(allRefs.map((r) => [r.imageFilename, r])).values());
  const sorted = sortBySectionOrder(deduped);
  const toDo = sorted.map((r) => `${r.imageFilename} (${r.lessonFile})`);

  const { id } = await notion.pages.create({
    parent: { page_id: parentPageId },
    properties: {
      title: {
        title: [{ type: "text", text: { content: "Course Image Tracker" } }],
      },
    },
  });

  await updateTracker([], toDo, id);
  return id;
}

export function writeTrackerPageIdToEnv(pageId: string): void {
  const envPath = join(__dirname, "..", ".env");

  let content = "";
  try {
    content = readFileSync(envPath, "utf-8");
  } catch {
    content = "";
  }

  const line = `NOTION_TRACKER_PAGE_ID=${pageId}`;
  if (content.includes("NOTION_TRACKER_PAGE_ID=")) {
    content = content.replace(/NOTION_TRACKER_PAGE_ID=.*/m, line);
  } else {
    content = content.trimEnd() + (content ? "\n" : "") + line + "\n";
  }
  writeFileSync(envPath, content);
  process.env.NOTION_TRACKER_PAGE_ID = pageId;
}
