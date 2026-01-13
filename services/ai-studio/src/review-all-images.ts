import { execSync } from "child_process";
import path from "path";
import fs from "fs";

/**
 * Batch review all images in the course assets directory
 *
 * Usage:
 * bun src/review-all-images.ts [course-assets-path]
 */

const COURSE_ASSETS_PATH = process.argv[2] || "../../apps/course/src/assets";

function getAllImages(dir: string): string[] {
    if (!fs.existsSync(dir)) {
        console.error(`Directory not found: ${dir}`);
        return [];
    }

    const files = fs.readdirSync(dir);
    const imageExtensions = [".png", ".jpg", ".jpeg", ".webp"];

    return files
        .filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        })
        .map((file) => path.join(dir, file));
}

async function main() {
    const assetsDir = path.resolve(process.cwd(), COURSE_ASSETS_PATH);
    const images = getAllImages(assetsDir);

    if (images.length === 0) {
        console.log(`No images found in ${assetsDir}`);
        return;
    }

    console.log(`Found ${images.length} images to review:\n`);
    images.forEach((img, i) => {
        console.log(`${i + 1}. ${path.basename(img)}`);
    });

    console.log(`\nReviewing images...\n`);

    for (const imagePath of images) {
        const relativePath = path.relative(process.cwd(), imagePath);
        console.log(`\n${"=".repeat(60)}`);
        console.log(`Reviewing: ${path.basename(imagePath)}`);
        console.log(`${"=".repeat(60)}\n`);

        try {
            execSync(`bun src/review-image.ts "${imagePath}"`, {
                stdio: "inherit",
                cwd: process.cwd(),
            });
        } catch (error) {
            console.error(`\nError reviewing ${path.basename(imagePath)}`);
            // Continue with next image
        }
    }

    console.log(`\n${"=".repeat(60)}`);
    console.log(`Review complete!`);
    console.log(`${"=".repeat(60)}\n`);
}

main().catch(console.error);
