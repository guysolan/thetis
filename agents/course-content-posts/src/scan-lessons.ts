import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "./config.js";
import type { ImageContext } from "./types.js";

interface ImageRef {
  imageFilename: string;
  lessonFile: string;
}

export function scanAllImages(): ImageRef[] {
  const refs: ImageRef[] = [];
  const dir = config.courseContentPath;
  if (!existsSync(dir)) return refs;

  function walk(d: string, prefix: string) {
    const entries = readdirSync(d, { withFileTypes: true });
    for (const e of entries) {
      const rel = prefix ? `${prefix}/${e.name}` : e.name;
      if (e.isDirectory()) {
        walk(join(d, e.name), rel);
      } else if (e.name.endsWith(".tsx")) {
        const content = readFileSync(join(d, e.name), "utf-8");
        const imports = content.matchAll(/import\s+\w+\s+from\s+["']@\/assets\/([^"']+)["']/g);
        for (const m of imports) {
          refs.push({ imageFilename: m[1], lessonFile: rel });
        }
      }
    }
  }
  walk(dir, "");
  return refs;
}

export function getImageContext(imageFilename: string): ImageContext | null {
  const refs = scanAllImages();
  const ref = refs.find((r) => r.imageFilename === imageFilename);
  if (!ref) return null;

  const lessonPath = join(config.courseContentPath, ref.lessonFile);
  if (!existsSync(lessonPath)) return null;

  const content = readFileSync(lessonPath, "utf-8");
  const metadata = extractMetadata(content);
  const imagePath = join(config.courseAssetsPath, imageFilename);
  const imageExists = existsSync(imagePath);

  return {
    imagePath,
    imageFilename,
    lessonFile: ref.lessonFile,
    lessonTitle: metadata.title,
    lessonDescription: metadata.description,
    lessonContent: flattenContent(content),
    lessonFaqs: extractFaqs(content),
    imageExists,
  };
}

function extractMetadata(content: string): { title: string; description: string } {
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const descMatch = content.match(/description:\s*["']([^"']+)["']/);
  return {
    title: titleMatch?.[1] || "Unknown",
    description: descMatch?.[1] || "",
  };
}

function extractFaqs(content: string): string {
  const faqMatches = content.matchAll(
    /question:\s*["']([^"']+)["']\s*,\s*answer:\s*["']([^"']+)["']/g,
  );
  const faqs: string[] = [];
  for (const m of faqMatches) {
    faqs.push(`Q: ${m[1]}\nA: ${m[2]}`);
  }
  return faqs.join("\n\n");
}

function flattenContent(content: string): string {
  const parts: string[] = [];
  // Intro
  const introMatch = content.match(/intro:\s*\n?\s*["']((?:[^"']|\\.)*)["']/s);
  if (introMatch) parts.push(introMatch[1].replace(/\\n/g, "\n"));
  // Any content: "..." or text: "..." strings (capture multi-line)
  const textMatches = content.matchAll(/(?:content|text):\s*["']((?:[^"']|\\.)*)["']/g);
  for (const m of textMatches) {
    const t = m[1].replace(/\\n/g, "\n").trim();
    if (t.length > 20 && t.length < 1000) parts.push(t);
  }
  return parts.join("\n\n").slice(0, 5000);
}
