---
name: Migrate achilles-rupture article → website blog
description: Transforms legacy articles in apps/achilles-rupture/src/content/articles/ into SEO-ready posts in apps/website/src/content/blog/ (MD or MDX + co-located components). Use when porting draft/aggregator content to thetismedical.com/blog.
tools: Read, Write, Grep, WebSearch, WebFetch
---

# Migrate achilles-rupture article → website blog

## Goal

Turn a source file under `apps/achilles-rupture/src/content/articles/` into a post that matches the **live Thetis Medical blog** pattern (see `apps/website/src/content/blog/aircast-vs-vacoped.md`): correct frontmatter for `apps/website/src/content.config.ts`, patient-focused structure, internal links to `/blog/` and `/FAQs/`, FAQs in YAML (for FAQPage JSON-LD), and no scraper/SEO cruft.

**Output URL shape:** `https://thetismedical.com/blog/[slug]` where `[slug]` is the entry **`id`** from the blog collection (for a file `blog/my-post.md`, `id` is `my-post`).

## When to use which format

| Situation | Output |
|-----------|--------|
| Prose, tables, standard Markdown images, optional raw HTML (e.g. `<iframe>`), no imports | `apps/website/src/content/blog/[slug].md` |
| React components (charts, video wrapper, accordion FAQs, client islands) or cleaner embeds than raw HTML | `apps/website/src/content/blog/[slug].mdx` **plus** co-located helpers under `apps/website/src/content/blog/[slug]/` |

**Folder convention (MDX):** Keep the **entry file at the blog root** — `[slug].mdx` — so the URL stays `/blog/[slug]`. Put components in `blog/[slug]/MyComponent.tsx` and import with `./[slug]/MyComponent` (same pattern as `7-best-physical-therapy-exercises-for-achilles-rupture-recovery.mdx` on achilles-rupture, but the **mdx file names the URL**).

Avoid `blog/[slug]/index.mdx` unless routing is deliberately changed: it produces an `id` like `[slug]/index`, not `[slug]`.

## Source → destination mapping

### Frontmatter

Read `apps/website/src/content.config.ts` and emit only allowed fields:

- **title** — SEO title (primary keyword near the front; fewer than about 60 characters).
- **description** — Meta description; compelling, patient-facing; **150–160 characters**.
- **status** — `"draft"` until reviewed; otherwise `"published"`.
- **publishedAt** — `YYYY-MM-DD` (coerce-friendly). Migrate from source if present; normalize `"Feb 5 2025"`-style strings to ISO.
- **updatedAt** — Optional; `YYYY-MM-DD` when substantially edited.
- **heroImage** — Prefer `/images/blog/[slug].png` (or `.jpg`). Place asset in `apps/website/public/images/blog/`. If source has a broken/placeholder URL (e.g. `undefined` in path), omit or replace after sourcing a proper image.
- **heroAlt** — Descriptive alt text (accessibility + image SEO).
- **tags** — **Only** these enums: `treatment`, `equipment`, `recovery`, `surgery`, `rehabilitation`, `prevention`, `research`. Map legacy tags (e.g. `science`) → `research` where appropriate.
- **source** (optional) — Primary evidence: `title`, `url`, `authors` for the main paper or guideline.
- **faqs** (optional array) — Each `{ question, answer }`. Plain text or minimal inline Markdown in answers; layout emits FAQPage schema from this (see `BlogPostLayout.astro`). **Do not** paste raw JSON-LD blobs into the body.

Omit achilles-rupture-only fields from website posts unless needed elsewhere: `type`, `audience` (not in website schema).

### Body structure (SEO + reader experience)

Follow the structure in `aircast-vs-vacoped.md` and `.cursor/commands/seo-blog-post.md`:

1. **Opening** — First paragraph answers the main patient question in plain language; primary keyword in the first ~100 words. **No duplicate H1** — title is already the page H1 in `BlogPostLayout.astro`.
2. **`## Contents`** — Linked list of every `##` section (anchor links).
3. **`## Key Takeaways`** — 4–6 bullets; scannable; align with `.cursor/rules/achilles-clinical-positions.mdc` and `.cursor/rules/content-guidelines.mdc`.
4. **Main `##` sections** — Clear H2s; short paragraphs; tables where they help (boot comparison, heel-lift phases, etc.).
5. **`## What This Means for Your Recovery`** (or equivalent) — Concrete actions; internal links to course, splint, FAQs as relevant.
6. **`## Frequently Asked Questions`** — Repeat FAQs in prose as `###` questions (matches published pattern) while keeping `faqs` in frontmatter for schema.
7. **`## References`** — Numbered, with links (E-E-A-T).

Voice: surgeon talking to a patient; direct; define jargon; safety and red flags where relevant.

### Cleanup: remove or replace scraper / legacy artifacts

- Lines like `###### sbb-itb-...` — **delete**.
- Trailing `{"@context":... FAQPage ...}` JSON — **delete**; FAQs belong in frontmatter + human-readable section.
- `::: @iframe <url>` — **replace** with either:
  - a plain HTML figure + iframe in `.md`, or
  - a small MDX component (e.g. `YouTubeEmbed.tsx`) under `blog/[slug]/` for consistent aspect ratio and lazy loading.
- `::: @figure ![alt](url){alt}` — normalise to standard Markdown image `![alt](url)` or MDX component if layout control is needed.
- Broken image URLs — fix or remove before publish.

### Internal links

Rewrite legacy `https://achilles-rupture.com/articles/...` (and similar) to the **thetismedical.com** site:

- Prefer **relative** paths: `/blog/[slug]` for migrated posts, `/FAQs/...`, `/course`, `/achilles-rupture-splint`, `/guide/...` as appropriate.
- If a target post is not migrated yet, use the best existing Thetis page or a reputable external clinician-facing link; do not leave dead achilles-rupture.com links when a Thetis equivalent exists.

### Clinical consistency

All treatment and rehab claims must align with `.cursor/rules/achilles-clinical-positions.mdc`. If the source article contradicts (e.g. overstates surgery), **edit the copy** to match positions and keep nuance (“protocols vary by country/clinician”).

## Workflow (for the agent)

1. Read the **source** `.md` / `.mdx` from `apps/achilles-rupture/src/content/articles/`.
2. Choose **`[slug]`** — usually the source filename without extension; keep kebab-case; ensure it does not collide with existing `apps/website/src/content/blog/*`.
3. Decide **`.md` vs `.mdx`** using the table above.
4. Draft **frontmatter** (draft status + placeholder hero path if image not ready).
5. Rewrite body to Thetis blog structure; strip cruft; fix links; add TOC and takeaways.
6. **Extract FAQs** into `faqs:` and mirror in `## Frequently Asked Questions`.
7. Add **hero image** to `public/images/blog/` when available; set `heroAlt`.
8. **Optional:** run `pnpm --filter @thetis/website build` from repo root to validate schema and MDX imports.

## Infrastructure reference

- Blog schema: `apps/website/src/content.config.ts`
- Layout + Article/FAQ JSON-LD: `apps/website/src/layouts/BlogPostLayout.astro`
- Routes: `apps/website/src/pages/blog/[...slug].astro`
- Companion voice + SEO detail: `.cursor/commands/seo-blog-post.md`

## Example sources

- Plain markdown export: `apps/achilles-rupture/src/content/articles/impact-of-heel-height-on-achilles-recovery.md`
- MDX + imports: `apps/achilles-rupture/src/content/articles/global-trends-in-achilles-rupture.mdx`
- MDX + sibling folder: `apps/achilles-rupture/src/content/articles/7-best-physical-therapy-exercises-for-achilles-rupture-recovery.mdx`

**Gold-standard output example:** `apps/website/src/content/blog/aircast-vs-vacoped.md`
