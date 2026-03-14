import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
if (!NOTION_API_KEY) {
	throw new Error("NOTION_API_KEY not set in .env");
}

const DATABASE_ID = "2415c2ea829a8001983be38e0ccf93df";
const OUTPUT_DIR = join(import.meta.dir, "output");

const notion = new Client({ auth: NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

interface PostMeta {
	id: string;
	title: string;
	status: string;
	category: string;
	author: string;
	platforms: string[];
	publishDate: string | null;
	creationDate: string | null;
	postUrl: string | null;
	usefulLikes: number | null;
}

function extractText(richText: Array<{ plain_text: string }>): string {
	return richText.map((t) => t.plain_text).join("");
}

function extractPageMeta(page: any): PostMeta {
	const props = page.properties;
	const title = extractText(props["Content name"]?.title ?? []);
	const status = props.Status?.status?.name ?? "Unknown";
	const category = props.Category?.select?.name ?? "";
	const author = props.Author?.select?.name ?? "";
	const platforms = (props.Platform?.multi_select ?? []).map(
		(p: any) => p.name,
	);
	const publishDate = props["Publish date"]?.date?.start ?? null;
	const creationDate = props["Creation date"]?.date?.start ?? null;
	const postUrl = props["Post URL"]?.url ?? null;
	const usefulLikes = props["Useful Likes"]?.number ?? null;

	return {
		id: page.id,
		title,
		status,
		category,
		author,
		platforms,
		publishDate,
		creationDate,
		postUrl,
		usefulLikes,
	};
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80);
}

function toFrontmatter(meta: PostMeta): string {
	const lines = [
		"---",
		`title: "${meta.title.replace(/"/g, '\\"')}"`,
		`status: "${meta.status}"`,
		`notion_id: "${meta.id}"`,
	];
	if (meta.category) lines.push(`category: "${meta.category}"`);
	if (meta.author) lines.push(`author: "${meta.author}"`);
	if (meta.platforms.length)
		lines.push(`platforms:\n${meta.platforms.map((p) => `  - "${p}"`).join("\n")}`);
	if (meta.publishDate) lines.push(`publish_date: "${meta.publishDate}"`);
	if (meta.creationDate) lines.push(`creation_date: "${meta.creationDate}"`);
	if (meta.postUrl) lines.push(`post_url: "${meta.postUrl}"`);
	if (meta.usefulLikes != null)
		lines.push(`useful_likes: ${meta.usefulLikes}`);
	lines.push("---");
	return lines.join("\n");
}

async function fetchAllPages(): Promise<any[]> {
	const pages: any[] = [];
	let cursor: string | undefined;
	let pageNum = 0;

	do {
		pageNum++;
		console.log(`  Fetching page ${pageNum}...`);
		const response: any = await notion.databases.query({
			database_id: DATABASE_ID,
			start_cursor: cursor,
			page_size: 100,
		});
		pages.push(...response.results);
		cursor = response.has_more ? response.next_cursor : undefined;
	} while (cursor);

	return pages;
}

async function fetchPageContent(pageId: string): Promise<string> {
	try {
		const mdBlocks = await n2m.pageToMarkdown(pageId);
		const mdString = n2m.toMarkdownString(mdBlocks);
		return mdString.parent || "";
	} catch (err) {
		console.warn(`  Warning: Could not fetch content for ${pageId}:`, err);
		return "";
	}
}

async function main() {
	console.log("Pulling posts from Notion Content Calendar...\n");

	console.log("Fetching all pages from database...");
	const pages = await fetchAllPages();
	console.log(`Found ${pages.length} posts\n`);

	await mkdir(OUTPUT_DIR, { recursive: true });

	const manifest: PostMeta[] = [];

	for (let i = 0; i < pages.length; i++) {
		const meta = extractPageMeta(pages[i]);
		manifest.push(meta);

		if (!meta.title.trim()) {
			console.log(`[${i + 1}/${pages.length}] Skipping empty title`);
			continue;
		}

		const slug = slugify(meta.title);
		const filename = `${slug}.md`;

		console.log(
			`[${i + 1}/${pages.length}] ${meta.title} (${meta.status})`,
		);

		const content = await fetchPageContent(pages[i].id);
		const frontmatter = toFrontmatter(meta);
		const markdown = `${frontmatter}\n\n${content}`;

		await writeFile(join(OUTPUT_DIR, filename), markdown, "utf-8");
	}

	await writeFile(
		join(OUTPUT_DIR, "_manifest.json"),
		JSON.stringify(manifest, null, 2),
		"utf-8",
	);

	console.log(`\nDone! ${manifest.length} posts saved to ${OUTPUT_DIR}`);
	console.log(`Manifest: ${join(OUTPUT_DIR, "_manifest.json")}`);

	const byStatus: Record<string, number> = {};
	for (const m of manifest) {
		byStatus[m.status] = (byStatus[m.status] || 0) + 1;
	}
	console.log("\nBy status:");
	for (const [status, count] of Object.entries(byStatus).sort(
		(a, b) => b[1] - a[1],
	)) {
		console.log(`  ${status}: ${count}`);
	}
}

main().catch(console.error);
