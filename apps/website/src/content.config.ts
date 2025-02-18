import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const article = defineCollection({
	// Load Markdown and MDX files in the `src/content/articles/` directory.
	loader: glob({
		base: "./src/content/articles",
		pattern: "**/*.{md,mdx}",
	}),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.enum(["equipment", "science", "guides", "news"])),
	}),
});

export const collections = { article };
