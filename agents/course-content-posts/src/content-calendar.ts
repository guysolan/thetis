import { Client } from "@notionhq/client";
import { config } from "./config.js";
import { readdirSync, existsSync } from "node:fs";

const notion = new Client({ auth: config.notionApiKey });

function extractRichText(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { rich_text?: Array<{ plain_text?: string }> };
  const arr = p.rich_text;
  if (!Array.isArray(arr)) return "";
  return arr
    .map((t) => t.plain_text ?? "")
    .join("")
    .trim();
}

/**
 * Query the Content Calendar for entries with Category = "Course Post".
 * Each image has 4 posts (LinkedIn, Instagram, Facebook, etc.). We extract
 * "Course Image" property to get the image ref. Add "Course Image" (text) to your DB.
 */
export async function getDoneFromContentCalendar(): Promise<string[]> {
  const done: string[] = [];
  try {
    let cursor: string | undefined;
    do {
      const response = await notion.databases.query({
        database_id: config.contentCalendarDbId,
        filter: {
          property: "Category",
          select: { equals: "Course Post" },
        },
        start_cursor: cursor,
        page_size: 100,
      });
      for (const page of response.results as any[]) {
        const props = page.properties ?? {};
        const courseImage = extractRichText(props["Course Image"]);
        if (courseImage) done.push(courseImage);
      }
      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
    } while (cursor);
  } catch (e) {
    // Property may not exist or DB may not be accessible
  }
  return [...new Set(done)];
}

/**
 * Derive done from published blog posts. Only used as fallback - many blogs aren't done yet.
 * Matches when blog slug equals image slug (exact) or is a prefix (e.g. aircast-vs-vacoped → aircast-vs-vacoped-comparison).
 */
export function getDoneFromBlog(allItems: string[]): string[] {
  const blogDir = config.blogContentPath;
  if (!existsSync(blogDir)) return [];
  const done: string[] = [];
  const files = readdirSync(blogDir);
  const blogSlugs = files.filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
  for (const item of allItems) {
    const match = item.match(/^(.+?)\s+\((.+)\)$/);
    if (!match) continue;
    const imageFilename = match[1];
    const imageSlug = imageFilename.replace(/\.[^.]+$/, "");
    const matched =
      blogSlugs.includes(imageSlug) ||
      blogSlugs.some((blogSlug) => imageSlug === blogSlug || imageSlug.startsWith(blogSlug + "-"));
    if (matched) done.push(item);
  }
  return done;
}
