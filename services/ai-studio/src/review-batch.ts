import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { reviewImage, type ReviewResult } from "./review-image-helpers";
import { loadEnv } from "./load-env";

// Load environment variables from .env file
loadEnv();

/**
 * Batch Image Review Script
 *
 * Reviews multiple images in a directory
 *
 * Usage:
 *   bun src/review-batch.ts <directory-path> [context-file]
 *
 * Examples:
 *   bun src/review-batch.ts ../apps/course/src/assets
 *   bun src/review-batch.ts ../apps/achilles-rupture/public/images/lecture
 */

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
    const directoryPath = process.argv[2];
    const contextPath = process.argv[3];

    if (!directoryPath) {
        console.error("\x1b[31mError: No directory path provided.\x1b[0m");
        console.log(
            "Usage: bun src/review-batch.ts <directory-path> [context-file]",
        );
        process.exit(1);
    }

    if (!fs.existsSync(directoryPath)) {
        console.error(
            `\x1b[31mError: Directory not found: ${directoryPath}\x1b[0m`,
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

    // Find all image files
    const supportedExtensions = [".png", ".jpg", ".jpeg", ".webp"];
    const files = fs.readdirSync(directoryPath);
    const imageFiles = files
        .filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return supportedExtensions.includes(ext);
        })
        .map((file) => path.join(directoryPath, file));

    if (imageFiles.length === 0) {
        console.error(
            `\x1b[31mNo image files found in: ${directoryPath}\x1b[0m`,
        );
        process.exit(1);
    }

    console.log(
        `\x1b[36mFound ${imageFiles.length} image(s) to review\x1b[0m\n`,
    );

    let context: string | undefined;
    if (contextPath) {
        if (fs.existsSync(contextPath)) {
            context = fs.readFileSync(contextPath, "utf-8");
            console.log(`\x1b[36mUsing context from:\x1b[0m ${contextPath}\n`);
        }
    }

    const reviews: Array<{ path: string; score: number }> = [];
    const outputDir = path.join(process.cwd(), "reviews");

    for (let i = 0; i < imageFiles.length; i++) {
        const imagePath = imageFiles[i];
        console.log(
            `\x1b[36m[${i + 1}/${imageFiles.length}] Reviewing:\x1b[0m ${
                path.basename(imagePath)
            }`,
        );

        try {
            const review = await reviewImage(openai, imagePath, context);
            reviews.push({ path: imagePath, score: review.overallScore });

            // Save individual review
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            const outputPath = path.join(
                outputDir,
                `${
                    path.basename(imagePath, path.extname(imagePath))
                }-review.json`,
            );
            fs.writeFileSync(outputPath, JSON.stringify(review, null, 2));

            // Brief summary
            const scoreColor = review.overallScore >= 8
                ? "\x1b[32m"
                : review.overallScore >= 6
                ? "\x1b[33m"
                : "\x1b[31m";
            console.log(
                `  ${scoreColor}Score: ${review.overallScore}/10\x1b[0m\n`,
            );

            // Add delay to avoid rate limits (1 second between requests)
            if (i < imageFiles.length - 1) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        } catch (error: any) {
            console.error(
                `\x1b[31mError reviewing ${imagePath}:\x1b[0m ${error.message}`,
            );
        }
    }

    // Summary
    console.log("\n" + "=".repeat(80));
    console.log("\x1b[1mBATCH REVIEW SUMMARY\x1b[0m");
    console.log("=".repeat(80));
    console.log(`Total images reviewed: ${reviews.length}`);
    const avgScore = reviews.reduce((sum, r) => sum + r.score, 0) /
        reviews.length;
    console.log(`Average score: ${avgScore.toFixed(1)}/10`);

    const highQuality = reviews.filter((r) => r.score >= 8).length;
    const mediumQuality = reviews.filter(
        (r) => r.score >= 6 && r.score < 8,
    ).length;
    const lowQuality = reviews.filter((r) => r.score < 6).length;

    console.log(`\n\x1b[32mHigh quality (8+):\x1b[0m ${highQuality}`);
    console.log(`\x1b[33mMedium quality (6-7.9):\x1b[0m ${mediumQuality}`);
    console.log(`\x1b[31mLow quality (<6):\x1b[0m ${lowQuality}`);

    if (lowQuality > 0) {
        console.log("\n\x1b[31mImages needing attention:\x1b[0m");
        reviews
            .filter((r) => r.score < 6)
            .forEach((r) => {
                console.log(`  • ${path.basename(r.path)} (${r.score}/10)`);
            });
    }

    // Save summary
    const summaryPath = path.join(
        outputDir,
        `batch-review-${Date.now()}.json`,
    );
    fs.writeFileSync(
        summaryPath,
        JSON.stringify(
            {
                reviews,
                summary: { avgScore, highQuality, mediumQuality, lowQuality },
            },
            null,
            2,
        ),
    );
    console.log(`\n\x1b[32mSummary saved to:\x1b[0m ${summaryPath}`);
}

main().catch(console.error);
