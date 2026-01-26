import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { formatReview, reviewImage } from "./review-image-helpers";
import { loadEnv } from "./load-env";

// Load environment variables from .env file
loadEnv();

/**
 * Image Quality Review Script for Medical/Educational Content
 *
 * Reviews images for:
 * - Medical/anatomical accuracy
 * - Stylistic consistency
 * - Patient-friendliness and clarity
 * - Alignment with course content (if provided)
 *
 * Usage:
 *   bun src/review-image.ts <image-path> [context-file]
 *
 * Examples:
 *   bun src/review-image.ts ../apps/course/src/assets/seated-calf-raise-week-12.png
 *   bun src/review-image.ts ../apps/achilles-rupture/public/images/lecture/39m22s.png ../apps/course/src/content/course/standard/week-12-day-0-key-exercises.tsx
 */

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
    const imagePath = process.argv[2];
    const contextPath = process.argv[3];

    if (!imagePath) {
        console.error("\x1b[31mError: No image path provided.\x1b[0m");
        console.log(
            "Usage: bun src/review-image.ts <image-path> [context-file]",
        );
        console.log("\nExamples:");
        console.log(
            "  bun src/review-image.ts ../apps/course/src/assets/seated-calf-raise-week-12.png",
        );
        console.log(
            "  bun src/review-image.ts ../apps/achilles-rupture/public/images/lecture/39m22s.png ../apps/course/src/content/course/standard/week-12-day-0-key-exercises.tsx",
        );
        process.exit(1);
    }

    if (!process.env.OPENAI_API_KEY) {
        console.error(
            "\x1b[31mError: OPENAI_API_KEY is not set.\x1b[0m",
        );
        console.log(
            "Please create a .env file in services/ai-studio/ with:",
        );
        console.log("  OPENAI_API_KEY=your-key-here");
        process.exit(1);
    }

    let context: string | undefined;
    if (contextPath) {
        if (!fs.existsSync(contextPath)) {
            console.warn(
                `\x1b[33mWarning: Context file not found: ${contextPath}\x1b[0m`,
            );
        } else {
            context = fs.readFileSync(contextPath, "utf-8");
            console.log(`\x1b[36mUsing context from:\x1b[0m ${contextPath}`);
        }
    }

    try {
        console.log(`\x1b[36mReviewing image:\x1b[0m ${imagePath}`);
        const review = await reviewImage(openai, imagePath, context);
        console.log(formatReview(review));

        // Save review to JSON file
        const outputDir = path.join(process.cwd(), "reviews");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const outputPath = path.join(
            outputDir,
            `${path.basename(imagePath, path.extname(imagePath))}-review.json`,
        );
        fs.writeFileSync(outputPath, JSON.stringify(review, null, 2));
        console.log(
            `\x1b[32mReview saved to:\x1b[0m ${outputPath}`,
        );
    } catch (error: any) {
        console.error("\x1b[31mError:\x1b[0m", error.message);
        process.exit(1);
    }
}

main().catch(console.error);
