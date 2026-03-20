#!/usr/bin/env bun
import { loadEnv } from "./load-env.js";
loadEnv();

import { mkdir, writeFile, readFileSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "./config.js";
import { getImageContext } from "./scan-lessons.js";
import { callOpenAI, callGemini, callAnthropic } from "./models.js";
import {
  buildGeneratePrompt,
  buildResearchPrompt,
  buildReviewPrompt,
  buildJudgePrompt,
} from "./prompts.js";
import { parseGeneratedOutput } from "./parse-output.js";
import { getTrackerContent, updateTracker, parseTrackerContent } from "./notion-tracker.js";
import { scanAllImages } from "./scan-lessons.js";
import { sortBySectionOrder } from "./section-order.js";
import { pushToNotion } from "./push-to-notion.js";

async function main() {
  const imageArg = process.argv[2];
  if (!imageArg) {
    console.error("Usage: bun run generate <image-filename>");
    console.error("Example: bun run generate dvt-vs-pe-leg-to-lungs.png");
    process.exit(1);
  }

  const ctx = getImageContext(imageArg);
  if (!ctx) {
    console.error("Image not found or not used in any lesson:", imageArg);
    process.exit(1);
  }

  const runId = `${new Date().toISOString().slice(0, 10)}-${ctx.imageFilename.replace(/\.[^.]+$/, "")}`;
  const outputDir = join(config.outputDir, runId);
  await mkdir(outputDir, { recursive: true });
  await mkdir(join(outputDir, "final"), { recursive: true });

  const clinicalPositions = config.clinicalPositionsPath
    ? readFileSync(config.clinicalPositionsPath, "utf-8")
    : "";
  const contentGuidelines = config.contentGuidelinesPath
    ? readFileSync(config.contentGuidelinesPath, "utf-8")
    : "";

  console.log(`\n[1/5] RESEARCH — Suggesting sources...`);
  const researchPrompt = buildResearchPrompt(ctx);
  const research = await callAnthropic(researchPrompt);
  await writeFile(join(outputDir, "1-research.md"), research, "utf-8");
  console.log(`      ✓ Saved to 1-research.md`);

  console.log(`\n[2/5] GENERATE — OpenAI + Gemini in parallel...`);
  const genPrompt = buildGeneratePrompt(ctx, research);
  const [openaiOut, geminiOut] = await Promise.all([
    callOpenAI(genPrompt, { imagePath: ctx.imageExists ? ctx.imagePath : undefined }),
    callGemini(genPrompt, { imagePath: ctx.imageExists ? ctx.imagePath : undefined }),
  ]);
  await writeFile(join(outputDir, "2-generate-openai.md"), openaiOut, "utf-8");
  await writeFile(join(outputDir, "2-generate-gemini.md"), geminiOut, "utf-8");
  console.log(`      ✓ OpenAI done | ✓ Gemini done`);

  console.log(`\n[3/5] REVIEW — Fact-checking with Anthropic...`);
  const reviewPrompt = buildReviewPrompt(openaiOut, geminiOut, clinicalPositions);
  const review = await callAnthropic(reviewPrompt);
  await writeFile(join(outputDir, "4-review-factcheck.md"), review, "utf-8");
  console.log(`      ✓ Saved to 4-review-factcheck.md`);

  console.log(`\n[4/5] JUDGE — Synthesizing best of both...`);
  const judgePrompt = buildJudgePrompt(openaiOut, geminiOut, review);
  const judgeOut = await callAnthropic(judgePrompt);
  await writeFile(join(outputDir, "5-judge-synthesize.md"), judgeOut, "utf-8");
  const final = parseGeneratedOutput(judgeOut);
  console.log(`      ✓ Synthesized`);

  for (const [platform, content] of Object.entries(final)) {
    if (content) {
      await writeFile(join(outputDir, "final", `${platform}.md`), content, "utf-8");
    }
  }

  console.log(`\n[5/5] PUSH — To Notion and repo...`);
  const notionIds: string[] = [];
  const courseImageRef = `${ctx.imageFilename} (${ctx.lessonFile})`;
  for (const platform of ["linkedin", "instagram", "facebook"] as const) {
    const text = final[platform];
    if (text) {
      const title = extractTitle(text, ctx.lessonTitle);
      const id = await pushToNotion(title, platform, text, { courseImageRef });
      if (id) notionIds.push(id);
    }
  }

  // Blog to repo
  const blog = final.blog;
  if (blog) {
    const slug = ctx.imageFilename.replace(/\.[^.]+$/, "").replace(/\s+/g, "-");
    const blogPath = join(config.blogContentPath, `${slug}.md`);
    await writeFile(blogPath, blog, "utf-8");
    console.log(`      ✓ Blog saved to apps/website/src/content/blog/${slug}.md`);
    if (ctx.imageExists) {
      const destPath = join(config.blogImagesPath, ctx.imageFilename);
      await mkdir(config.blogImagesPath, { recursive: true });
      copyFileSync(ctx.imagePath, destPath);
      console.log(`      ✓ Image copied to public/images/blog/`);
    }
  }

  // Update tracker (chronological order from sections.ts)
  const allRefs = scanAllImages();
  const deduped = Array.from(new Map(allRefs.map((r) => [r.imageFilename, r])).values());
  const allItems = sortBySectionOrder(deduped).map((r) => `${r.imageFilename} (${r.lessonFile})`);
  const trackerContent = await getTrackerContent();
  const parsed = parseTrackerContent(trackerContent);
  const item = `${ctx.imageFilename} (${ctx.lessonFile})`;
  const newDone = [...new Set([...parsed.done, item])];
  const newToDo = allItems.filter((t) => !newDone.includes(t));
  await updateTracker(newDone, newToDo);
  console.log(`      ✓ Tracker updated`);

  await writeFile(
    join(outputDir, "7-summary.md"),
    `# Run Summary\n\nImage: ${ctx.imageFilename}\nLesson: ${ctx.lessonFile}\n\nNotion IDs: ${notionIds.join(", ")}\n`,
    "utf-8",
  );

  console.log(`\nDone! Output: ${outputDir}`);
}

function extractTitle(text: string, fallback: string): string {
  const firstLine = text.split("\n")[0].trim();
  if (firstLine.length > 10 && firstLine.length < 120) return firstLine.replace(/^#+\s*/, "");
  return fallback;
}

main().catch(console.error);
