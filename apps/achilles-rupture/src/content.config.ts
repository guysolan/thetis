import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const PageSchema = z.object({
	title: z.string(),
	description: z.string(),
	publishedAt: z.coerce.date().optional(),
	updatedAt: z.coerce.date().optional(),
	heroImage: z.string().optional(),
	status: z.enum(["draft", "published"]),
	audience: z.array(z.enum(["patient", "clinician"])),
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

const article = defineCollection({
	loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
	schema: PageSchema,
});

export const collections = { article };
