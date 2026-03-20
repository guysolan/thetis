import { Client } from "@notionhq/client";
import { config } from "./config.js";

const notion = new Client({ auth: config.notionApiKey });

const PLATFORM_OPTIONS: Record<string, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
};

export async function pushToNotion(
  title: string,
  platform: "linkedin" | "instagram" | "facebook",
  content: string,
  options?: { courseImageRef?: string },
): Promise<string | null> {
  try {
    const platformName = PLATFORM_OPTIONS[platform] || platform;

    const properties: Record<string, unknown> = {
      "Content name": {
        title: [{ type: "text", text: { content: title.slice(0, 2000) } }],
      },
      Status: {
        status: { name: "Ready for review" },
      },
      Category: {
        select: { name: "Course Post" },
      },
      Platform: {
        multi_select: [{ name: platformName }],
      },
      "Creation date": {
        date: { start: new Date().toISOString().slice(0, 10) },
      },
    };
    // Link to course image for progress sync. Add "Course Image" (text) property to your Notion DB.
    if (options?.courseImageRef) {
      properties["Course Image"] = {
        rich_text: [{ type: "text", text: { content: options.courseImageRef } }],
      };
    }

    let id: string;
    try {
      const result = await notion.pages.create({
        parent: { database_id: config.contentCalendarDbId },
        properties,
      });
      id = result.id;
    } catch (e: any) {
      // Retry without Course Image if property doesn't exist in DB
      if (options?.courseImageRef && e?.body?.code === "validation_error") {
        delete properties["Course Image"];
        const result = await notion.pages.create({
          parent: { database_id: config.contentCalendarDbId },
          properties,
        });
        id = result.id;
      } else {
        throw e;
      }
    }

    // Add content as child blocks - split by double newlines for paragraphs
    const paragraphs = content
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const blocks = paragraphs.slice(0, 50).map((p) => ({
      object: "block" as const,
      type: "paragraph" as const,
      paragraph: {
        rich_text: [{ type: "text" as const, text: { content: p.slice(0, 2000) } }],
      },
    }));

    if (blocks.length > 0) {
      await notion.blocks.children.append({
        block_id: id,
        children: blocks as any,
      });
    }

    console.log(`      ✓ ${platformName}: ${title.slice(0, 50)}...`);
    return id;
  } catch (e) {
    console.error(`      ✗ ${platform} failed:`, e);
    return null;
  }
}
