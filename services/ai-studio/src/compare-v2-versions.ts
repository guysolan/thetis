import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { reviewImage, type ReviewResult } from "./review-image-helpers";
import { loadEnv } from "./load-env";

// Load environment variables from .env file
loadEnv();

/**
 * Compare original and v2 versions of images
 * Updates content files if v2 is better
 */

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Map images to their context files
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

async function main() {
    const assetsDir = path.join(
        process.cwd(),
        "../../apps/course/src/assets",
    );
    const contentDir = path.join(
        process.cwd(),
        "../../apps/course/src/content/course/standard",
    );
    const reviewsDir = path.join(process.cwd(), "reviews");

    if (!process.env.OPENAI_API_KEY) {
        console.error(
            "\x1b[31mError: OPENAI_API_KEY is not set.\x1b[0m",
        );
        process.exit(1);
    }

    // Find all v2 images
    const v2Files = fs
        .readdirSync(assetsDir)
        .filter((file) => file.includes("-v2."))
        .map((file) => {
            const originalName = file.replace("-v2", "");
            return {
                v2File: file,
                originalFile: originalName,
                v2Path: path.join(assetsDir, file),
                originalPath: path.join(assetsDir, originalName),
            };
        });

    if (v2Files.length === 0) {
        console.log("\x1b[33mNo v2 images found.\x1b[0m");
        process.exit(0);
    }

    console.log(
        `\x1b[36mFound ${v2Files.length} v2 image(s) to compare\x1b[0m\n`,
    );

    const comparisons: Array<{
        filename: string;
        originalScore: number;
        v2Score: number;
        improved: boolean;
        contextFiles: string[];
    }> = [];

    // Load original review scores
    const originalReviews = new Map<string, ReviewResult>();
    for (const reviewFile of fs.readdirSync(reviewsDir)) {
        if (reviewFile.endsWith("-review.json")) {
            const reviewPath = path.join(reviewsDir, reviewFile);
            const review: ReviewResult = JSON.parse(
                fs.readFileSync(reviewPath, "utf-8"),
            );
            const filename = path.basename(review.imagePath);
            originalReviews.set(filename, review);
        }
    }

    // Review v2 versions
    for (let i = 0; i < v2Files.length; i++) {
        const item = v2Files[i];
        const filename = path.basename(item.originalPath);
        const contextFiles = imageToContextMap[filename] || [];

        console.log(
            `\x1b[36m[${i + 1}/${v2Files.length}] Comparing:\x1b[0m ${filename}`,
        );

        // Load context
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

        // Get original score
        const originalReview = originalReviews.get(filename);
        const originalScore = originalReview?.overallScore || 0;

        try {
            // Review v2 version
            const v2Review = await reviewImage(openai, item.v2Path, context);
            const v2Score = v2Review.overallScore;
            const improved = v2Score > originalScore;

            comparisons.push({
                filename,
                originalScore,
                v2Score,
                improved,
                contextFiles,
            });

            const scoreColor = improved ? "\x1b[32m" : "\x1b[33m";
            const arrow = improved ? "↑" : "↓";
            console.log(
                `  Original: ${originalScore}/10 → V2: ${scoreColor}${v2Score}/10${arrow}\x1b[0m`,
            );

            // Save v2 review
            const v2ReviewPath = path.join(
                reviewsDir,
                `${path.basename(item.v2Path, path.extname(item.v2Path))}-review.json`,
            );
            fs.writeFileSync(
                v2ReviewPath,
                JSON.stringify(v2Review, null, 2),
            );

            // Add delay
            if (i < v2Files.length - 1) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        } catch (error: any) {
            console.error(
                `\x1b[31mError reviewing ${item.v2Path}: ${error.message}\x1b[0m`,
            );
        }
    }

    // Summary
    console.log("\n" + "=".repeat(80));
    console.log("\x1b[1mCOMPARISON SUMMARY\x1b[0m");
    console.log("=".repeat(80));

    const improved = comparisons.filter((c) => c.improved);
    const sameOrWorse = comparisons.filter((c) => !c.improved);

    console.log(`\n\x1b[32mImproved (${improved.length}):\x1b[0m`);
    improved.forEach((c) => {
        console.log(
            `  • ${c.filename}: ${c.originalScore} → ${c.v2Score} (+${(c.v2Score - c.originalScore).toFixed(1)})`,
        );
    });

    if (sameOrWorse.length > 0) {
        console.log(`\n\x1b[33mSame or worse (${sameOrWorse.length}):\x1b[0m`);
        sameOrWorse.forEach((c) => {
            const diff = c.v2Score - c.originalScore;
            console.log(
                `  • ${c.filename}: ${c.originalScore} → ${c.v2Score} (${diff >= 0 ? "+" : ""}${diff.toFixed(1)})`,
            );
        });
    }

    // Update content files for improved images
    if (improved.length > 0) {
        console.log("\n\x1b[36mUpdating content files...\x1b[0m");
        for (const comp of improved) {
            for (const contextFile of comp.contextFiles) {
                const contextPath = path.join(contentDir, contextFile);
                if (fs.existsSync(contextPath)) {
                    let content = fs.readFileSync(contextPath, "utf-8");
                    const escapedFilename = comp.filename.replace(
                        /[.*+?^${}()|[\]\\]/g,
                        "\\$&",
                    );

                    // Find the import statement
                    const importPattern = new RegExp(
                        `(import\\s+\\w+\\s+from\\s+["']\\.\\.\\/\\.\\.\\/\\.\\.\\/assets\\/)${escapedFilename}(["'];?)`,
                    );

                    if (importPattern.test(content)) {
                        // Get the variable name from the import
                        const importMatch = content.match(
                            new RegExp(
                                `import\\s+(\\w+)\\s+from\\s+["']\\.\\.\\/\\.\\.\\/\\.\\.\\/assets\\/${escapedFilename}["'];`,
                            ),
                        );

                        if (importMatch) {
                            const v2Filename = comp.filename.replace(
                                /\.(png|jpg|jpeg|webp)$/,
                                "-v2.$1",
                            );

                            // Replace the import path to point to v2
                            content = content.replace(
                                importPattern,
                                `$1${v2Filename}$2`,
                            );

                            fs.writeFileSync(contextPath, content);
                            console.log(
                                `  \x1b[32m✓ Updated: ${contextFile} (${comp.filename} → ${v2Filename})\x1b[0m`,
                            );
                        }
                    }
                }
            }
        }
    }

    // Save comparison summary
    const summaryPath = path.join(
        reviewsDir,
        `v2-comparison-${Date.now()}.json`,
    );
    fs.writeFileSync(
        summaryPath,
        JSON.stringify(comparisons, null, 2),
    );
    console.log(`\n\x1b[32mComparison summary saved to:\x1b[0m ${summaryPath}`);
}

main().catch(console.error);
