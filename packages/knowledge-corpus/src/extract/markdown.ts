import { basename } from "node:path";
import type { Chunk, Condition, ContentType } from "../types.ts";
import { read, relToRepo, repoPath, walk } from "../lib/files.ts";
import {
  extractQAPairs,
  extractUrls,
  frontmatterValue,
  splitByHeadings,
  splitFrontmatter,
  splitText,
} from "../lib/text.ts";

interface MarkdownSource {
  dir: string;
  contentType: ContentType;
  defaultCondition: Condition;
}

const SOURCES: MarkdownSource[] = [
  {
    dir: "apps/website/src/content/blog",
    contentType: "blog",
    defaultCondition: "achilles-rupture",
  },
  {
    dir: "apps/website/src/content/articles/recovery-phases",
    contentType: "article",
    defaultCondition: "achilles-rupture",
  },
  {
    dir: "apps/achilles-rupture/src/content/articles",
    contentType: "article",
    defaultCondition: "achilles-rupture",
  },
];

/** Strip MDX import/export lines and JSX component tags, keep prose. */
function stripMdx(body: string): string {
  return body
    .replace(/^import\s.+$/gm, "")
    .replace(/^export\s.+$/gm, "")
    .replace(/<[A-Z][\w.]*[^>]*\/>/g, "")
    .replace(/<\/?[A-Z][\w.]*[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Markdown frontmatter FAQ blocks: `- question: ... answer: ...` */
function extractFrontmatterFaqs(
  frontmatter: string,
): { question: string; answer: string }[] {
  const pairs: { question: string; answer: string }[] = [];
  const re =
    /-\s*question:\s*(["']?)(.+?)\1\s*\n\s*answer:\s*(["']?)([\s\S]+?)\3\s*(?=\n\s*-\s*question:|\n\w|$)/g;
  for (const m of frontmatter.matchAll(re)) {
    pairs.push({ question: m[2].trim(), answer: m[4].trim() });
  }
  return pairs;
}

export function extractMarkdownArticles(): Chunk[] {
  const chunks: Chunk[] = [];

  for (const src of SOURCES) {
    const files = walk(repoPath(src.dir), [".md", ".mdx"]);
    for (const file of files) {
      const raw = read(file);
      const { frontmatter, body } = splitFrontmatter(raw);

      const sourcePath = relToRepo(file);
      const title = frontmatterValue(frontmatter, "title") ??
        basename(file).replace(/\.(md|mdx)$/, "");
      const status = frontmatterValue(frontmatter, "status");
      // Skip explicit drafts; published and unstated statuses are indexed
      if (status === "draft") continue;

      const conditionId = frontmatterValue(frontmatter, "conditionId");
      const condition = (conditionId as Condition) || src.defaultCondition;

      const cleanBody = stripMdx(body);
      const references = extractUrls(frontmatter + "\n" + cleanBody);

      const base = {
        source_path: sourcePath,
        content_type: src.contentType,
        condition,
        title,
        language: "en",
        canonical: true,
        ...(references.length ? { references } : {}),
      };

      let ordinal = 0;
      for (const section of splitByHeadings(cleanBody)) {
        // Skip navigation/reference boilerplate
        if (/^(contents|references)$/i.test(section.heading)) continue;
        for (const text of splitText(section.text)) {
          const headingPrefix = section.heading
            ? `## ${section.heading}\n\n`
            : "";
          chunks.push({
            id: `${sourcePath}#body-${ordinal++}`,
            text: `# ${title}\n\n${headingPrefix}${text}`,
            metadata: base,
          });
        }
      }

      const faqs = [
        ...extractFrontmatterFaqs(frontmatter),
        ...extractQAPairs(raw),
      ];
      const seen = new Set<string>();
      let faqIdx = 0;
      for (const qa of faqs) {
        if (seen.has(qa.question)) continue;
        seen.add(qa.question);
        chunks.push({
          id: `${sourcePath}#faq-${faqIdx++}`,
          text: `Q: ${qa.question}\n\nA: ${qa.answer}`,
          metadata: { ...base, content_type: "faq" },
        });
      }
    }
  }

  return chunks;
}
