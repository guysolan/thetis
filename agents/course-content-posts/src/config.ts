import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { loadEnv } from "./load-env.js";

loadEnv();

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..", ".."); // agents/course-content-posts/src -> repo root

export const config = {
  notionApiKey: process.env.NOTION_API_KEY!,
  trackerPageId: process.env.NOTION_TRACKER_PAGE_ID || "",
  contentCalendarDbId: process.env.NOTION_CONTENT_CALENDAR_DB_ID ||
    "2415c2ea829a8001983be38e0ccf93df",
  courseContentPath: join(
    ROOT,
    "apps/course/src/content/course/achilles-rupture",
  ),
  courseAssetsPath: join(ROOT, "apps/course/src/assets"),
  blogContentPath: join(ROOT, "apps/website/src/content/blog"),
  blogImagesPath: join(ROOT, "apps/website/public/images/blog"),
  clinicalPositionsPath: join(
    ROOT,
    ".cursor/rules/achilles-clinical-positions.mdc",
  ),
  contentGuidelinesPath: join(ROOT, ".cursor/rules/content-guidelines.mdc"),
  outputDir: join(__dirname, "..", "output"),
};
