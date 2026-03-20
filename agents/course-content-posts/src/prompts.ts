import type { ImageContext } from "./types.js";

export function buildGeneratePrompt(ctx: ImageContext, research: string): string {
  return `You are writing content for Thetis Medical (thetismedical.com), a medical device company focused on Achilles tendon rupture recovery. The audience is patients and clinicians.

## CONTEXT

**Lesson:** ${ctx.lessonTitle}
**Description:** ${ctx.lessonDescription}

**Lesson content:**
${ctx.lessonContent}

**FAQs from lesson:**
${ctx.lessonFaqs}

**Image:** ${ctx.imageFilename} (this image illustrates the topic)

${research ? `**Additional research/sources:**\n${research}` : ""}

## YOUR TASK

Generate content for ALL FOUR platforms. Use the exact section headers below. Write in plain language for patients where appropriate. Follow clinical positions. Be practical and safety-first.

---

## BLOG

Write a full SEO blog post (800-1500 words) with:
- YAML frontmatter: title, status: "draft", description, publishedAt (today), heroImage: "/images/blog/[slug].png", heroAlt, tags, source (if from research), faqs
- Opening paragraph answering the patient's question
- Table of contents
- Key takeaways (4-6 bullets)
- Main H2 sections
- "What This Means for Your Recovery" section
- FAQ section (3-5 questions)
- References

---

## LINKEDIN

Professional tone for orthopaedic surgeons. 1300 chars max.
- Bold title
- Clinical insight, key points
- Discussion question for clinicians
- Hashtags: #AchillesRupture #FootAndAnkle #Orthopaedics #Rehabilitation #SportsMedicine

---

## INSTAGRAM

Patient-facing, punchy. 2200 chars max.
- Short lines, one idea per line
- Timeline or key facts
- Engagement question with emoji at end

---

## FACEBOOK

Community tone for patients. Empathetic, practical.
- Longer paragraphs
- Practical advice
- Community question with emoji at end

---

Output ONLY the four sections (## BLOG, ## LINKEDIN, ## INSTAGRAM, ## FACEBOOK) with the content. No other commentary.`;
}

export function buildResearchPrompt(ctx: ImageContext): string {
  return `Topic: ${ctx.lessonTitle}
Context: ${ctx.lessonDescription}

Based on this Achilles rupture recovery topic, suggest 2-4 additional sources that would strengthen a blog article:
- PubMed/DOI links if you know them
- Key studies or guidelines
- What each source would add

Format as a brief markdown list. If you cannot suggest specific sources, list search queries that would find them.`;
}

export function buildReviewPrompt(
  openaiOutput: string,
  geminiOutput: string,
  clinicalPositions: string,
): string {
  return `You are fact-checking two AI-generated content drafts for an Achilles rupture recovery article.

## CLINICAL POSITIONS (must align)
${clinicalPositions}

## DRAFT A (OpenAI)
${openaiOutput}

## DRAFT B (Gemini)
${geminiOutput}

## YOUR TASK

Review both drafts for:
1. Medical accuracy vs the clinical positions
2. Any claims that contradict the positions
3. Missing warning signs where relevant
4. Tone consistency (patient vs clinician audiences)

Output a structured review:
## ISSUES
- List any factual errors, contradictions, or missing safety info

## RECOMMENDATIONS
- Specific fixes for each draft`;
}

export function buildJudgePrompt(
  openaiOutput: string,
  geminiOutput: string,
  reviewFeedback: string,
): string {
  return `You are synthesizing the best of two content drafts for maximum engagement.

## DRAFT A
${openaiOutput}

## DRAFT B
${geminiOutput}

## REVIEWER FEEDBACK
${reviewFeedback}

## YOUR TASK

For each platform (BLOG, LINKEDIN, INSTAGRAM, FACEBOOK):
1. Identify the strongest elements from each draft
2. Combine them into a single improved version (you may merge, not just pick one)
3. Apply any fixes from the reviewer feedback

Output in this exact format:

## BLOG
[combined blog content]

## LINKEDIN
[combined LinkedIn post]

## INSTAGRAM
[combined Instagram post]

## FACEBOOK
[combined Facebook post]

## FEEDBACK
Brief note on what you took from each draft and why.`;
}
