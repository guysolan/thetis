---
name: SEO Blog Post from LinkedIn
description: Turns a LinkedIn post + image into a full SEO-optimised blog article for thetismedical.com/blog/. Input is a LinkedIn post and an image. Output is a published .md/.mdx article.
tools: WebFetch, WebSearch, Read, Write, Edit
---

# SEO Blog Post from LinkedIn Post

## What You'll Be Given

1. **A LinkedIn post** -- short, punchy, research-based (like the Aircast vs VACOped example below)
2. **An image** -- the graphic from the LinkedIn post to use as the hero image

## What You'll Produce

A full SEO-optimised blog article at `apps/website/src/content/blog/` (renders at thetismedical.com/blog/) targeting **Achilles rupture patients** (not clinicians, not LinkedIn audience).

## Workflow

### Step 1: Extract the Core Topic

Read the LinkedIn post. Identify:

- The medical topic (e.g. "Aircast vs VACOped", "MIS vs open repair", "blood thinners after ATR")
- The source research (look for DOIs, journal names, author names)
- The key claims and data points

### Step 2: Keyword Research

Search the web for the topic to find:

- **Primary keyword**: What would a patient Google? (e.g. "aircast vs vacoped achilles rupture", "do I need surgery for achilles rupture")
- **Secondary keywords**: Related patient searches (People Also Ask, long-tail variations)
- **Competitor content**: What's already ranking? How long is it? What do they cover?
- **Content gap**: What can we cover better or differently?

Target keywords patients actually search -- not clinician jargon. Patients search "do I need blood thinners after achilles rupture" not "VTE prophylaxis in ATR management."

### Step 3: Find the Source Research

If the LinkedIn post references a study:

- Fetch the actual paper (use WebFetch on the DOI/URL)
- Extract key findings, sample size, methodology, limitations
- Find 2-3 additional supporting references via WebSearch

If no study is referenced, search for the best available evidence on the topic.

**Don't stop at one source.** Most articles should cite 3-5 references. Search for additional studies, meta-analyses, clinical guidelines, or patient resources that strengthen the article's credibility and cover angles the LinkedIn post didn't. More sources = stronger E-E-A-T.

### Step 4: Write the Article

**Frontmatter:**

```yaml
---
title: "[SEO title -- primary keyword near the front, under 60 chars]"
status: "draft"
description: "[Compelling meta description with keyword + patient benefit, 150-160 chars]"
publishedAt: "[today's date in 'YYYY-MM-DD' format]"
heroImage: "/images/blog/[slug].jpg"
heroAlt: "[Descriptive alt text for the hero image]"
tags: [relevant tags from: treatment, equipment, recovery, surgery, rehabilitation, prevention, research]
source:
  title: "[Paper title or source name]"
  url: "[DOI or source URL]"
  authors: "[Author names]"
---
```

Schema is defined in `apps/website/src/content.config.ts`. The blog collection uses the `glob` loader from `src/content/blog/`.

**Structure (follow this pattern):**

1. **Opening paragraph** -- Directly answer the patient's question in plain language. Put the primary keyword in the first 100 words. No preamble. Example: "If you've ruptured your Achilles tendon, you'll likely be given a walking boot. The two main options are the Aircast and the VACOped. Here's what you need to know about each."

2. **Table of Contents** -- Markdown links to each H2 section.

3. **Key Takeaways** -- 4-6 bullet points summarising the article. Patients scan; give them the answer early. Format for featured snippet capture (short, complete sentences).

4. **Main content sections (H2s)** -- Each covering a distinct subtopic. Use:
   - **Comparison tables** where relevant (great for featured snippets)
   - **Short paragraphs** (2-4 sentences max)
   - **Bullet lists** for scanning
   - **Bold key phrases** patients are looking for

5. **What This Means for Your Recovery** -- The "so what" section. Practical, actionable advice for the patient. This is where we differentiate from clinical summaries.

6. **FAQ section** -- 3-5 questions targeting People Also Ask queries. Use `<details>` or direct H3s for schema eligibility.

7. **References** -- Properly cited sources with links. This is critical for E-E-A-T.

### Step 5: Save the Image

Copy the provided image to `apps/website/public/images/blog/` with a descriptive filename matching the article slug.

### Step 6: Internal Linking

Add 2-4 contextual internal links to:

- Other blog posts in `/blog/`
- FAQ pages at `/FAQs/[topic]`
- Guide pages at `/guide/[phase]`
- The Thetis splint page `/achilles-rupture-splint` (if sleeping or boot comfort is mentioned)
- The course page `/course` (if rehabilitation or recovery is discussed)

Use natural anchor text, not "click here."

## Voice and Tone

Follow `.cursor/rules/content-guidelines.mdc`:

- **Write for patients, not clinicians.** The LinkedIn post targets professionals; the blog targets someone who just ruptured their Achilles and is scared.
- **Plain language.** "blood clot in the leg" not "DVT" (define acronyms on first use).
- **Direct and honest.** "No-one really knows the best duration" is fine.
- **Practical.** "Most patients will use whatever boot their hospital provides" is more helpful than a 500-word comparison the patient can't act on.
- **Safety-first.** Always include warning signs where relevant.

## Clinical Consistency

Follow `.cursor/rules/achilles-clinical-positions.mdc` for all medical positions. If the LinkedIn post contradicts a position (e.g. recommends surgery as first-line), align to the positions file and note the nuance.

## SEO Checklist

Before saving the article:

- [ ] Title under 60 chars with primary keyword near the front
- [ ] Meta description 150-160 chars with keyword + patient benefit
- [ ] Primary keyword in first 100 words
- [ ] H2s include secondary keywords naturally
- [ ] At least one comparison table (if topic allows)
- [ ] FAQ section with 3-5 patient questions
- [ ] 2-4 internal links to other articles/pages
- [ ] 3-5 external links to research sources (don't rely on a single study)
- [ ] Image has descriptive alt text
- [ ] Article is 800-2000 words (match competitor length)
- [ ] No jargon without inline explanation
- [ ] Warning signs included where medically relevant

## Example Input

**LinkedIn post:**

> **Aircast vs VACOped in Achilles Rupture Care**
>
> Walking boots are a key component of early Achilles rupture management.
> Two of the most commonly used are Aircast and VACOped.
>
> **Aircast:** Uses removable heel wedges to control ankle angle. Lightweight and widely available. Simple progression as wedges are removed.
>
> **VACOped:** Uses an adjustable hinge mechanism. Allows controlled range of motion. Often considered more dynamic but heavier and more expensive.
>
> In practice, outcomes depend far more on protocol adherence and rehabilitation progression than the specific boot used.

**Image:** aircast-vs-vacoped-comparison.png

## Output Location

Save the article as `apps/website/src/content/blog/[slug].md` (or `.mdx` if React components are needed).

The article will render at `thetismedical.com/blog/[slug]`.

## Infrastructure Reference

- **Content collection**: `apps/website/src/content.config.ts` (blog collection with glob loader)
- **Blog post layout**: `apps/website/src/layouts/BlogPostLayout.astro` (Article schema, hero image, source citation, CourseCTA + NightSplintAdvert)
- **Blog listing page**: `apps/website/src/pages/blog/index.astro` (shows published posts sorted by date)
- **Blog post page**: `apps/website/src/pages/blog/[...slug].astro` (renders individual posts)
- **Images**: `apps/website/public/images/blog/`

## Example

See `apps/achilles-rupture/src/content/articles/aircast-vs-vacoped.mdx` for a reference article produced from a LinkedIn post (on the older achilles-rupture.com blog).
