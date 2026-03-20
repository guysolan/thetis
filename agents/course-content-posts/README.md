# Course Content Posts Agent

Generates blog + social posts (LinkedIn, Instagram, Facebook) from course images using OpenAI, Gemini, and Anthropic. 5-stage pipeline with full visibility.

## Setup

1. Copy `.env.example` to `.env` and add your API keys
2. Either:
   - **Option A:** Create a blank page in Notion, copy its ID, add as `NOTION_TRACKER_PAGE_ID`. Run `bun run setup` to populate.
   - **Option B:** Add `NOTION_PARENT_PAGE_ID` (a Notion page under which to create the tracker). Run `bun run progress` — it will create the tracker, populate it, and update `.env` with `NOTION_TRACKER_PAGE_ID`.

## Commands

- `bun run progress` — Show done vs to-do, next image
- `bun run generate <image>` — Run full pipeline for one image
- `bun run setup` — Populate tracker (requires NOTION_PARENT_PAGE_ID to create page)

## Pipeline

1. Research — Anthropic suggests sources
2. Generate — OpenAI + Gemini produce all 4 (blog, LinkedIn, Instagram, Facebook)
3. Review — Anthropic fact-checks
4. Judge — Anthropic synthesises best of both
5. Push — Notion + blog repo + tracker update

Output: `output/YYYY-MM-DD-<image>/`
