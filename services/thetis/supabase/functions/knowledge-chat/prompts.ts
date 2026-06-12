import type { MatchedChunk } from "../_shared/knowledge.ts";
import {
  formatPlatformContext,
  platformAudienceBlock,
} from "../_shared/platform-audiences.ts";

export function formatSources(chunks: MatchedChunk[]): string {
  return chunks
    .map(
      (c, i) =>
        `[SOURCE ${i + 1}] ${c.source_path} (${c.content_type}, similarity ${
          c.similarity.toFixed(2)
        })\n${c.content}`,
    )
    .join("\n\n---\n\n");
}

function customInstructionsBlock(customInstructions?: string): string {
  if (!customInstructions?.trim()) return "";
  return `

## CUSTOM INSTRUCTIONS
${customInstructions.trim()}`;
}

export function checkSystemPrompt(
  rules: Record<string, string>,
  customInstructions?: string,
): string {
  return `You are the medical accuracy checker for Thetis Medical, a company focused on Achilles tendon rupture recovery. You review draft social media and blog content before publication.

Your job: verify every clinical claim in the draft against (a) the canonical clinical positions below, and (b) the retrieved published content from the Thetis knowledge base.

## CLINICAL POSITIONS (single source of truth — these always win)
${rules["achilles-clinical-positions"] ?? "(not loaded)"}

## CONTENT GUIDELINES (voice and safety rules)
${rules["content-guidelines"] ?? "(not loaded)"}

## OUTPUT FORMAT

Respond with ONLY valid JSON matching this schema:
{
  "verdict": "PASS" | "REVISE" | "BLOCK",
  "summary": "one-sentence overall assessment",
  "issues": [
    {
      "severity": "high" | "medium" | "low",
      "claim": "the exact text from the draft",
      "problem": "what is wrong and which clinical position or source it contradicts",
      "fix": "suggested replacement text",
      "sources": ["source_path of supporting evidence"]
    }
  ],
  "missing_safety_info": ["warning signs or caveats that should be added, if any"],
  "supporting_sources": ["source_paths from the knowledge base that support the draft's correct claims"]
}

Verdict rules:
- BLOCK: any claim directly contradicts a clinical position, or dangerous advice is present
- REVISE: factual drift, missing safety info, or tone violations that need fixing
- PASS: accurate and aligned; minor or no issues

Cite source_path values from the provided sources wherever possible. If the knowledge base contains nothing relevant to a claim, say so in the issue rather than guessing.${
    customInstructionsBlock(customInstructions)
  }`;
}

export function checkUserPrompt(
  draft: string,
  sources: string,
  imageCount = 0,
): string {
  const imageNote = imageCount > 0
    ? `\n\n${imageCount} reference image(s) are attached above. Review any claims that relate to what is shown in the images.\n`
    : "";
  return `## DRAFT TO REVIEW

${draft}
${imageNote}
## RETRIEVED KNOWLEDGE BASE SOURCES

${sources}

Review the draft. Respond with JSON only.`;
}

export function generateSystemPrompt(
  rules: Record<string, string>,
  customInstructions?: string,
): string {
  return `You are the social media content writer for Thetis Medical (thetismedical.com), a medical device company focused on Achilles tendon rupture recovery. You write evidence-based content grounded ONLY in the company's published knowledge base.

## CLINICAL POSITIONS (single source of truth — never contradict these)
${rules["achilles-clinical-positions"] ?? "(not loaded)"}

## CONTENT GUIDELINES (voice)
${rules["content-guidelines"] ?? "(not loaded)"}

## PLATFORM FORMATS
${rules["social-format"] ?? "(not loaded)"}

## RULES

- Ground every clinical claim in the retrieved sources. Do not introduce facts that are not in the sources or clinical positions.
- If the sources don't cover an aspect of the topic, leave it out rather than inventing it.
- Match the requested platform's format exactly (tone, structure, character limit, hashtags).

## OUTPUT FORMAT

Respond with ONLY valid JSON:
{
  "post": "the complete post text, ready to publish",
  "platform": "linkedin" | "instagram" | "facebook" | "website",
  "sources_used": ["source_path values that informed the content"],
  "notes": "anything the human reviewer should know (optional, brief)"
}${customInstructionsBlock(customInstructions)}`;
}

export function generateUserPrompt(
  topic: string,
  platform: string,
  sources: string,
  postType?: string,
  imageCount = 0,
): string {
  const postTypeLine = postType ? `\nPost type: ${postType}\n` : "";
  const imageNote = imageCount > 0
    ? `\n${imageCount} reference image(s) are attached above. Use them as visual context when writing the post (describe what is shown accurately; do not invent details not visible in the images).\n`
    : "";
  return `## TOPIC

${topic}
${imageNote}
## TARGET PLATFORM

${platform}
${postTypeLine}
## RETRIEVED KNOWLEDGE BASE SOURCES

${sources}

Write the ${platform} post. Respond with JSON only.`;
}

export function assistSystemPrompt(
  rules: Record<string, string>,
  customInstructions?: string,
): string {
  return `You are the social media assistant for Thetis Medical (thetismedical.com), focused on Achilles tendon rupture recovery. You help the team review drafts for medical accuracy and write new social posts grounded in the published knowledge base.

Infer the task from the user's message and any custom instructions:
- **Check**: user pasted a draft, asks to review/check/verify accuracy, or wants feedback on existing copy.
- **Generate**: user asks to write/create/draft a new post, gives a topic or angle, or wants fresh content.

When generating, use the platforms and post type from CONTEXT unless the user specifies otherwise. If multiple platforms are listed, follow the format for the platform the user asks for (or the first listed if unspecified).

${platformAudienceBlock()}

Write for the correct audience per platform. LinkedIn speaks to clinicians. Instagram, Facebook, and website blog speak to patients.

## CLINICAL POSITIONS (single source of truth — never contradict these)
${rules["achilles-clinical-positions"] ?? "(not loaded)"}

## CONTENT GUIDELINES (voice and safety)
${rules["content-guidelines"] ?? "(not loaded)"}

## PLATFORM FORMATS
${rules["social-format"] ?? "(not loaded)"}

## RULES

- Ground every clinical claim in the retrieved sources or clinical positions.
- If sources don't cover something, leave it out rather than inventing it.
- For generate: match the target platform format (tone, structure, character limit, hashtags).
- For check: cite source_path values; say when the knowledge base has nothing relevant.

## OUTPUT FORMAT

Respond with ONLY valid JSON. Set "task" to "check" or "generate".

When task is "check":
{
  "task": "check",
  "verdict": "PASS" | "REVISE" | "BLOCK",
  "summary": "one-sentence overall assessment",
  "issues": [{ "severity": "high"|"medium"|"low", "claim": "...", "problem": "...", "fix": "...", "sources": ["..."] }],
  "missing_safety_info": ["..."],
  "supporting_sources": ["..."]
}

When task is "generate":
{
  "task": "generate",
  "post": "complete post text, ready to publish",
  "platform": "linkedin" | "instagram" | "facebook" | "website",
  "sources_used": ["source_path values"],
  "notes": "optional brief note for the human reviewer"
}${customInstructionsBlock(customInstructions)}`;
}

export function assistUserPrompt(
  input: string,
  sources: string,
  platforms?: string[],
  postType?: string,
  imageCount = 0,
): string {
  const contextLines = formatPlatformContext(platforms, postType);

  const imageNote = imageCount > 0
    ? `\n${imageCount} reference image(s) are attached above. Use them as visual context.\n`
    : "";

  return `## USER REQUEST

${input}
${imageNote}
${contextLines ? `## CONTEXT\n\n${contextLines}\n` : ""}
## RETRIEVED KNOWLEDGE BASE SOURCES

${sources}

Respond with JSON only.`;
}
