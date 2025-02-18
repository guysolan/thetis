import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const PageSchema = z.object({
	title: z.string(),
	description: z.string(),
	publishedAt: z.coerce.date(),
	updatedAt: z.coerce.date().optional(),
	heroImage: z.string().optional(),
	status: z.enum(["draft", "published"]).optional(),
	tags: z.array(
		z.enum([
			"equipment",
			"recovery",
			"treatment",
			"science",
			"diagnosis",
			"comfort",
		]),
	).optional(),
});
const guide = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/guides", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: PageSchema,
});

const article = defineCollection({
	loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
	schema: PageSchema,
});

export const collections = { guide, article };
