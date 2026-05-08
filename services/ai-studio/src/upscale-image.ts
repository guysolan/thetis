import fs from "fs";
import path from "path";
import sharp from "sharp";

/**
 * Upscale (or normalize) an image for crisp Full HD-style presentation.
 *
 * Default: if width < 1920, resize to width 1920 (preserves aspect ratio, Lanczos3).
 * Optional mild sharpening after resize to reduce soft edges from enlargement.
 *
 * Usage:
 * bun src/upscale-image.ts <input-path> [output-path.png] [--width 1920] [--no-sharpen]
 */

function parseArgs(argv: string[]): {
    input: string;
    output?: string;
    targetWidth: number;
    sharpen: boolean;
} {
    const positional: string[] = [];
    let targetWidth = 1920;
    let sharpen = true;
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i];
        if (a === "--width" && argv[i + 1]) {
            targetWidth = Math.max(1, parseInt(argv[i + 1], 10) || 1920);
            i++;
            continue;
        }
        if (a === "--no-sharpen") {
            sharpen = false;
            continue;
        }
        if (a.startsWith("--")) continue;
        positional.push(a);
    }
    const input = positional[0];
    const output = positional[1];
    return { input, output, targetWidth, sharpen };
}

async function main() {
    const { input, output, targetWidth, sharpen } = parseArgs(process.argv);
    if (!input) {
        console.error("\x1b[31mError: No input image path.\x1b[0m");
        console.log(
            "Usage: bun src/upscale-image.ts <input> [output.png] [--width 1920] [--no-sharpen]",
        );
        process.exit(1);
    }
    if (!fs.existsSync(input)) {
        console.error(`\x1b[31mError: File not found: ${input}\x1b[0m`);
        process.exit(1);
    }

    const base = path.basename(input, path.extname(input));
    const outPath = output
        ? path.isAbsolute(output)
            ? output
            : path.join(process.cwd(), "output", output)
        : path.join(process.cwd(), "output", `${base}-${targetWidth}w-hd.png`);

    const meta = await sharp(input).metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    console.log(`\x1b[36mInput:\x1b[0m ${input}`);
    console.log(`\x1b[36mSize:\x1b[0m ${w}×${h}px`);

    let pipeline = sharp(input).rotate();

    if (w > 0 && w < targetWidth) {
        pipeline = pipeline.resize({
            width: targetWidth,
            kernel: sharp.kernel.lanczos3,
            withoutEnlargement: false,
        });
        console.log(
            `\x1b[36mResize:\x1b[0m upscale width → ${targetWidth}px (aspect preserved, Lanczos3)`,
        );
    } else if (w >= targetWidth) {
        console.log(
            `\x1b[33mSkip resize:\x1b[0m width ${w}px already ≥ ${targetWidth}px`,
        );
    }

    if (sharpen) {
        pipeline = pipeline.sharpen(0.8, 1, 2);
        console.log(`\x1b[36mSharpen:\x1b[0m mild (post-scale)`);
    }

    const outDir = path.dirname(outPath);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(outPath);

    const outMeta = await sharp(outPath).metadata();
    console.log(
        `\x1b[32mSaved:\x1b[0m ${outPath} (\x1b[34m${outMeta.width}×${outMeta.height}px\x1b[0m)`,
    );
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
