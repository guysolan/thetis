import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		heroAlt: z.string().optional(),
		status: z.enum(["draft", "published"]),
		tags: z
			.array(
				z.enum([
					"treatment",
					"equipment",
					"recovery",
					"surgery",
					"rehabilitation",
					"prevention",
					"research",
				]),
			)
			.optional(),
		source: z
			.object({
				title: z.string().optional(),
				url: z.string().url().optional(),
				authors: z.string().optional(),
			})
			.optional(),
		faqs: z
			.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				}),
			)
			.optional(),
	}),
});

export const collections = { blog };
