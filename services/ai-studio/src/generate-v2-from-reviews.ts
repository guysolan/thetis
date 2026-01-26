import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { loadEnv } from "./load-env";
import type { ReviewResult } from "./review-image-helpers";

// Load environment variables from .env file
loadEnv();

/**
 * Generate v2 versions of low-rated images based on existing reviews
 * Uses the existing index.ts script for image generation
 *
 * Usage:
 *   bun src/generate-v2-from-reviews.ts [threshold]
 *
 * Examples:
 *   bun src/generate-v2-from-reviews.ts
 *   bun src/generate-v2-from-reviews.ts 7
 */

const LOW_SCORE_THRESHOLD = parseFloat(process.argv[2]) || 7;

// Map images to their context files for generating improved prompts
const imageToContextMap: Record<string, string[]> = {
    "boot-angle-progression.png": ["week-2-day-4-your-walking-boot.tsx"],
    "aircast-boot-with-wedges.png": ["week-2-day-4-your-walking-boot.tsx"],
    "vacoped-boot-standalone.jpeg": ["week-2-day-4-your-walking-boot.tsx"],
    "boot-fitting-guide.png": ["week-2-day-4-your-walking-boot.tsx"],
    "boot-force-comparison.png": ["week-2-day-4-your-walking-boot.tsx"],
    "snap-rupture-experience.jpeg": ["week-0-day-0-emergency-care.tsx"],
    "achilles-rope-ends-pointed-down.png": ["week-0-day-0-emergency-care.tsx"],
    "how-ruptures-happen.png": ["week-0-day-0-emergency-care.tsx"],
    "seated-calf-raise-week-12.png": ["week-12-day-0-key-exercises.tsx"],
    "standing-two-foot-calf-raise-week-12.png": ["week-12-day-0-key-exercises.tsx"],
    "single-leg-heel-raise-week-12.png": ["week-12-day-0-key-exercises.tsx"],
    "towel-stretch-week-12.png": ["week-12-day-0-key-exercises.tsx"],
    "resistance-band-exercise-week-12.png": ["week-12-day-0-key-exercises.tsx"],
    "balance-training-week-12.png": ["week-12-day-0-key-exercises.tsx"],
    "ankle-pumps-circles-week-12.png": ["week-12-day-0-key-exercises.tsx"],
    "isom-overcoming-seated-calf.png": ["week-15-day-0-progressive-strengthening.tsx"],
    "isom-yielding-standing-seated.png": ["week-15-day-0-progressive-strengthening.tsx"],
    "tendon-strength-timeline.png": ["week-8-day-0-final-boot-phase.tsx"],
    "when-to-remove-boot.png": ["week-8-day-0-final-boot-phase.tsx"],
    "re-rupture-risk-timeline.png": ["week-8-day-0-final-boot-phase.tsx", "week-4-day-0-healing-process.tsx", "week-26-day-2-preventing-rerupture.tsx"],
    "protected-walking-after-boot.png": ["week-8-day-0-final-boot-phase.tsx", "week-10-day-4-boot-transition.tsx"],
    "rehab-protocol-timeline.png": ["week-9-day-0-pre-physio-prep.tsx"],
    "phase-1-exercises-overview.png": ["week-9-day-0-pre-physio-prep.tsx"],
    "exercise-load-progression.png": ["week-9-day-0-pre-physio-prep.tsx"],
    "phase-2-goals.png": ["week-11-day-0-starting-physio.tsx"],
    "normal-vs-urgent-week-7.png": ["week-7-day-0-common-challenges.tsx"],
    "force-through-tendon-walking.png": ["week-6-day-0-walking-progress.tsx"],
    "wedge-removal-progression.png": ["week-5-day-0-wedge-removal.tsx"],
    "tendon-healing-timeline.png": ["week-4-day-0-healing-process.tsx"],
    "tendon-stiffness-after-rupture.png": ["week-4-day-0-healing-process.tsx"],
    "thetis-night-splint.png": ["week-3-day-0-living-with-boot.tsx"],
    "even-up.jpg": ["week-3-day-0-living-with-boot.tsx"],
    "soft-crutch-handles.jpg": ["week-3-day-0-living-with-boot.tsx"],
    "merino-socks.webp": ["week-3-day-0-living-with-boot.tsx"],
    "antifungal.jpg": ["week-3-day-0-living-with-boot.tsx"],
    "surgery-vs-non-surgical-outcomes.png": ["week-2-day-0-treatment-decision.tsx"],
    "practical-life-week-10.png": ["week-10-day-0-practical-life.tsx"],
    "thompson-test.png": ["week-1-day-3-specialist-appointment.tsx"],
    "normal-vs-urgent-symptoms.png": ["week-1-day-0-first-week-checklist.tsx"],
    "proper-elevation-ankle-above-heart.png": ["week-0-day-3-home-setup.tsx"],
    "bathroom-safety-achilles-crutches.png": ["week-0-day-3-home-setup.tsx"],
    "dvt-vs-pe-leg-to-lungs.png": ["week-0-day-1-blood-clot-prevention.tsx"],
};

function buildPromptFromReview(
    review: ReviewResult,
    context?: string,
): string {
    const imageName = path.basename(review.imagePath);
    const basePrompt = `An improved version of ${imageName} for an Achilles tendon rupture recovery course.`;

    const improvements = review.patientFriendliness.improvements.join(", ");
    const recommendations = review.recommendations.join(" ");
    const issues = review.accuracy.issues.join(" ");

    let prompt = basePrompt;

    if (context) {
        prompt += ` Based on the course content context,`;
    }

    if (issues) {
        prompt += ` Address these issues: ${issues}.`;
    }

    if (improvements) {
        prompt += ` Include these improvements: ${improvements}.`;
    }

    if (recommendations) {
        prompt += ` Follow these recommendations: ${recommendations}.`;
    }

    prompt += ` Make it more accurate, clearer, and patient-friendly. Add labels, annotations, and visual aids as needed. Ensure it matches the course content exactly.`;

    return prompt;
}

async function main() {
    const reviewsDir = path.join(process.cwd(), "reviews");
    const contentDir = path.join(
        process.cwd(),
        "../../apps/course/src/content/course/standard",
    );
    const assetsDir = path.join(
        process.cwd(),
        "../../apps/course/src/assets",
    );

    if (!fs.existsSync(reviewsDir)) {
        console.error(
            `\x1b[31mError: Reviews directory not found: ${reviewsDir}\x1b[0m`,
        );
        console.log("Please run review-batch.ts first to generate reviews.");
        process.exit(1);
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        console.error(
            "\x1b[31mError: GOOGLE_GENERATIVE_AI_API_KEY is not set.\x1b[0m",
        );
        console.log(
            "Please create a .env file in services/ai-studio/ with:",
        );
        console.log("  GOOGLE_GENERATIVE_AI_API_KEY=your-key-here");
        process.exit(1);
    }

    // Find all review files
    const reviewFiles = fs
        .readdirSync(reviewsDir)
        .filter((file) => file.endsWith("-review.json"))
        .map((file) => path.join(reviewsDir, file));

    if (reviewFiles.length === 0) {
        console.error(
            `\x1b[31mNo review files found in: ${reviewsDir}\x1b[0m`,
        );
        process.exit(1);
    }

    console.log(
        `\x1b[36mFound ${reviewFiles.length} review file(s)\x1b[0m\n`,
    );

    const lowRatedImages: Array<{
        filename: string;
        review: ReviewResult;
        context?: string;
        prompt: string;
    }> = [];

    // Read reviews and identify low-rated images
    for (const reviewFile of reviewFiles) {
        try {
            const reviewContent = fs.readFileSync(reviewFile, "utf-8");
            const review: ReviewResult = JSON.parse(reviewContent);

            if (review.overallScore < LOW_SCORE_THRESHOLD) {
                const filename = path.basename(review.imagePath);
                const contextFiles = imageToContextMap[filename] || [];

                // Load context from related files
                let context: string | undefined;
                if (contextFiles.length > 0) {
                    const contextContents = contextFiles
                        .map((cf) => {
                            const contextPath = path.join(contentDir, cf);
                            if (fs.existsSync(contextPath)) {
                                return fs.readFileSync(contextPath, "utf-8");
                            }
                            return null;
                        })
                        .filter((c) => c !== null);
                    if (contextContents.length > 0) {
                        context = contextContents.join("\n\n---\n\n");
                    }
                }

                const prompt = buildPromptFromReview(review, context);

                lowRatedImages.push({
                    filename,
                    review,
                    context,
                    prompt,
                });
            }
        } catch (error: any) {
            console.warn(
                `\x1b[33mWarning: Could not parse review file ${reviewFile}: ${error.message}\x1b[0m`,
            );
        }
    }

    if (lowRatedImages.length === 0) {
        console.log(
            `\x1b[32mNo images found with score < ${LOW_SCORE_THRESHOLD}\x1b[0m`,
        );
        process.exit(0);
    }

    console.log(
        `\x1b[33mFound ${lowRatedImages.length} image(s) needing v2 versions:\x1b[0m\n`,
    );
    lowRatedImages.forEach((item) => {
        console.log(
            `  • ${item.filename} (${item.review.overallScore}/10)`,
        );
    });
    console.log();

    // Generate v2 versions using existing index.ts script
    for (let i = 0; i < lowRatedImages.length; i++) {
        const item = lowRatedImages[i];
        const originalExt = path.extname(item.filename);
        const baseName = path.basename(item.filename, originalExt);
        const v2Filename = `${baseName}-v2${originalExt}`;

        console.log(
            `\x1b[36m[${i + 1}/${lowRatedImages.length}] Generating v2:\x1b[0m ${item.filename}`,
        );
        console.log(`  \x1b[90mOutput: ${v2Filename}\x1b[0m`);

        try {
            // Use the existing index.ts script to generate the image
            const command = `bun src/index.ts "${item.prompt}" "${v2Filename}"`;
            execSync(command, {
                cwd: process.cwd(),
                stdio: "inherit",
            });

            // Copy generated image to assets folder
            const outputPath = path.join(process.cwd(), "output", v2Filename);
            const assetsPath = path.join(assetsDir, v2Filename);

            if (fs.existsSync(outputPath)) {
                fs.copyFileSync(outputPath, assetsPath);
                console.log(
                    `  \x1b[32m✓ Saved to: ${assetsPath}\x1b[0m\n`,
                );
            } else {
                console.warn(
                    `  \x1b[33mWarning: Generated file not found at ${outputPath}\x1b[0m\n`,
                );
            }

            // Add delay between generations
            if (i < lowRatedImages.length - 1) {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        } catch (error: any) {
            console.error(
                `  \x1b[31mError generating v2 for ${item.filename}: ${error.message}\x1b[0m\n`,
            );
        }
    }

    console.log("\x1b[32m✓ V2 generation complete!\x1b[0m");
}

main().catch(console.error);
