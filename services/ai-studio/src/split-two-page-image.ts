import fs from "fs";
import path from "path";
import sharp from "sharp";

/**
 * Split a 2-page side-by-side image into page-1 (left) and page-2 (right).
 *
 * Usage:
 * bun src/split-two-page-image.ts <input-path> [output-prefix]
 *
 * Examples:
 * bun src/split-two-page-image.ts output/pf-stretching-exercises-two-page.png
 * bun src/split-two-page-image.ts output/pf-stretching-exercises-two-page.png output/pf-stretching-exercises
 */

function resolveOutputPrefix(inputPath: string, outputPrefixArg?: string): string {
    if (outputPrefixArg) {
        if (path.isAbsolute(outputPrefixArg)) return outputPrefixArg;
        return path.join(process.cwd(), outputPrefixArg);
    }

    const base = path.basename(inputPath, path.extname(inputPath));
    return path.join(process.cwd(), "output", `${base}-split`);
}

async function main() {
    const inputPath = process.argv[2];
    if (!inputPath) {
        console.error("\x1b[31mError: No input image path provided.\x1b[0m");
        console.log(
            "Usage: bun src/split-two-page-image.ts <input-path> [output-prefix]",
        );
        process.exit(1);
    }

    if (!fs.existsSync(inputPath)) {
        console.error(`\x1b[31mError: File not found: ${inputPath}\x1b[0m`);
        process.exit(1);
    }

    const outputPrefix = resolveOutputPrefix(inputPath, process.argv[3]);
    const outputDir = path.dirname(outputPrefix);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const meta = await sharp(inputPath).metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    if (!width || !height) {
        console.error("\x1b[31mError: Could not read image dimensions.\x1b[0m");
        process.exit(1);
    }

    const halfWidth = Math.floor(width / 2);
    const leftPath = `${outputPrefix}-page-1.png`;
    const rightPath = `${outputPrefix}-page-2.png`;

    await sharp(inputPath)
        .extract({ left: 0, top: 0, width: halfWidth, height })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toFile(leftPath);

    await sharp(inputPath)
        .extract({ left: halfWidth, top: 0, width: width - halfWidth, height })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toFile(rightPath);

    console.log(`\x1b[36mInput:\x1b[0m ${inputPath}`);
    console.log(`\x1b[36mSize:\x1b[0m ${width}x${height}`);
    console.log(`\x1b[32mSaved:\x1b[0m ${leftPath}`);
    console.log(`\x1b[32mSaved:\x1b[0m ${rightPath}`);
}

main().catch((error) => {
    console.error("\x1b[31mError splitting image:\x1b[0m", error);
    process.exit(1);
});
