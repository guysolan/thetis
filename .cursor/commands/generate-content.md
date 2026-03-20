---
name: Generate Content for Next Course Image
description: Check progress, pick next image, run the 5-stage pipeline (research, generate, review, judge, push) and push to Notion.
tools: Read, RunTerminalCmd
---

# Generate Content for Next Course Image

Run the content generation pipeline for the next uncovered course image.

## Steps

### 1. Check Progress

```bash
cd agents/course-content-posts && bun run progress
```

This reads the Notion Image Tracker and outputs:
- How many images are done
- The next image to process

### 2. Run the Pipeline

```bash
cd agents/course-content-posts && bun run generate <image-filename>
```

Example:
```bash
bun run generate dvt-vs-pe-leg-to-lungs.png
```

The pipeline:
1. **Research** — Anthropic suggests additional sources
2. **Generate** — OpenAI + Gemini produce blog, LinkedIn, Instagram, Facebook (in parallel)
3. **Review** — Anthropic fact-checks both against clinical positions
4. **Judge** — Anthropic synthesises best of both per platform
5. **Push** — Creates 3 Notion pages, saves blog to repo, updates tracker

### 3. Output

Each run creates `agents/course-content-posts/output/YYYY-MM-DD-<image>/`:
- `1-research.md`
- `2-generate-openai.md`, `2-generate-gemini.md`
- `4-review-factcheck.md`
- `5-judge-synthesize.md`
- `final/blog.md`, `final/linkedin.md`, etc.
- `7-summary.md`

Present the output path to the user so they can review.

## Prerequisites

- `.env` in `agents/course-content-posts/` with:
  - OPENAI_API_KEY
  - GOOGLE_GENERATIVE_AI_API_KEY
  - ANTHROPIC_API_KEY
  - NOTION_API_KEY
  - NOTION_TRACKER_PAGE_ID (create a blank page in Notion, copy ID from URL)

- Run `bun run setup` once to populate the tracker (or create the page manually and add images to To Do)

## Format Reference

- Blog: [seo-blog-post.md](.cursor/commands/seo-blog-post.md)
- LinkedIn/Instagram/Facebook: See existing posts in `services/notion/output/` (e.g. the-achilles-sleep-struggle.md, aircast-vs-vacoped-in-achilles-rupture-care.md)
