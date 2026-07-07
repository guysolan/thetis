import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { loadEnv } from "./load-env";

loadEnv();

/**
 * Uniform recovery-icon rebuilder.
 *
 * Produces a perfectly CONSISTENT icon set:
 *   - White background, NO sage / green fill.
 *   - A single thin dark-green circular OUTLINE that is byte-for-byte identical
 *     across every icon (same stroke width, diameter, position).
 *   - The dark-green line-art symbol, recolored to one exact green, scaled to a
 *     fixed bounding box and centered with identical padding inside the ring.
 *
 * Why two stages: letting the image model draw the ring gives inconsistent
 * circle sizes/thicknesses. Instead the model only draws the inner SYMBOL, then
 * `sharp` composites it onto a programmatically-drawn ring so geometry is exact.
 *
 * Stage 1 (AI): for each source icon, generate a symbol-only PNG (no circle) into
 *   output/icons-symbols/. Skipped if the symbol already exists (use --regen to
 *   force regeneration).
 * Stage 2 (sharp): tint -> trim -> scale -> center -> overlay ring -> save into
 *   output/icons-outline/.
 *
 * Usage:
 *   bun src/rebuild-icons.ts [icon-filename.png] [--regen]
 */

const SOURCE_DIR = path.join(process.cwd(), "output", "icons");
const SYMBOL_DIR = path.join(process.cwd(), "output", "icons-symbols");
const OUTPUT_DIR = path.join(process.cwd(), "output", "icons-outline");

// Uniform geometry (all values in px on a square canvas).
const CANVAS = 1024;
const RING_RADIUS = 486; // centerline radius of the outline ring
const RING_STROKE = 6; // ring thickness
const ICON_BOX = 520; // longest side of the symbol's bounding box
const GREEN = "#446452"; // exact dark green sampled from the existing icon set

const SYMBOL_PROMPT = [
    "Look at the reference image. It shows a circular badge with a single line-art symbol inside it.",
    "",
    "Your task: redraw ONLY the inner SYMBOL (the object/illustration), nothing else.",
    "",
    "STRICT RULES:",
    "- Output ONLY the symbol itself. Do NOT draw any circle, ring, badge, border, frame, or background shape.",
    "- Pure WHITE background. No fill of any kind behind the symbol.",
    "- Draw the symbol as clean flat LINE ART in a single dark green color. Even stroke weight, slightly rounded stroke ends. No shading, no gradients, no textures, no double outlines.",
    "- Keep the SAME subject, composition, pose and key details as the reference symbol.",
    "- Center the symbol in the frame with comfortable margins so no part is cut off.",
    "- One symbol only. No text, no labels, no numbers, no shadows, no extra elements.",
    "- Square, high-resolution output.",
].join("\n");

function mimeForExt(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === ".png") return "image/png";
    if (ext === ".webp") return "image/webp";
    if (ext === ".gif") return "image/gif";
    return "image/jpeg";
}

async function generateSymbol(
    model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]>,
    fileName: string,
): Promise<boolean> {
    const sourcePath = path.join(SOURCE_DIR, fileName);
    const symbolPath = path.join(SYMBOL_DIR, fileName);
    const sourceData = fs.readFileSync(sourcePath).toString("base64");

    const parts = [
        { text: SYMBOL_PROMPT },
        { inlineData: { mimeType: mimeForExt(sourcePath), data: sourceData } },
        {
            text:
                "Redraw ONLY the inner symbol from the image above. No circle, no ring, no background — just the dark green line-art symbol on pure white, centered.",
        },
    ];

    console.log(`\x1b[36m  Generating symbol:\x1b[0m ${fileName}`);
    const result = await model.generateContent(parts);
    const response = await result.response;
    const imagePart = response.candidates?.[0]?.content.parts.find(
        (p: { inlineData?: { data: string } }) => p.inlineData,
    );

    if (!imagePart?.inlineData) {
        console.error(`\x1b[31m    No symbol returned for ${fileName}\x1b[0m`);
        return false;
    }

    if (!fs.existsSync(SYMBOL_DIR)) fs.mkdirSync(SYMBOL_DIR, { recursive: true });
    fs.writeFileSync(
        symbolPath,
        new Uint8Array(Buffer.from(imagePart.inlineData.data, "base64")),
    );
    return true;
}

function ringSvg(): Buffer {
    return Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS}" height="${CANVAS}">` +
            `<circle cx="${CANVAS / 2}" cy="${CANVAS / 2}" r="${RING_RADIUS}" ` +
            `fill="none" stroke="${GREEN}" stroke-width="${RING_STROKE}"/></svg>`,
    );
}

/**
 * Composite a symbol-only PNG onto the uniform ring with exact scale + centering.
 */
async function composeIcon(fileName: string): Promise<void> {
    const symbolPath = path.join(SYMBOL_DIR, fileName);
    const outputPath = path.join(OUTPUT_DIR, fileName);

    // Trim the symbol down to its content bounding box on a white background.
    const trimmed = await sharp(symbolPath)
        .flatten({ background: "#ffffff" })
        .trim({ background: "#ffffff", threshold: 12 })
        .toBuffer();

    // Scale so the longest side matches ICON_BOX (uniform visual size).
    const resized = await sharp(trimmed)
        .resize(ICON_BOX, ICON_BOX, { fit: "inside" })
        .flatten({ background: "#ffffff" })
        .toBuffer();
    const meta = await sharp(resized).metadata();
    const tw = meta.width ?? ICON_BOX;
    const th = meta.height ?? ICON_BOX;

    // Build a single-channel alpha mask from line darkness (white -> transparent,
    // ink -> opaque). `normalise` stretches the darkest stroke to full opacity so
    // every icon ends up the exact same solid green regardless of how dark the
    // generated symbol happened to be; anti-aliased edges stay smooth.
    const mask = await sharp(resized)
        .greyscale()
        .negate()
        .normalise()
        .extractChannel(0)
        .raw()
        .toBuffer({ resolveWithObject: true });

    // Recolor the symbol to the exact uniform green using that mask as alpha.
    const solid = await sharp({
        create: {
            width: tw,
            height: th,
            channels: 3,
            background: GREEN,
        },
    })
        .png()
        .toBuffer();
    const iconRGBA = await sharp(solid)
        .joinChannel(mask.data, {
            raw: {
                width: mask.info.width,
                height: mask.info.height,
                channels: 1,
            },
        })
        .png()
        .toBuffer();

    const left = Math.round((CANVAS - tw) / 2);
    const top = Math.round((CANVAS - th) / 2);

    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    await sharp({
        create: {
            width: CANVAS,
            height: CANVAS,
            channels: 4,
            background: "#ffffff",
        },
    })
        .composite([
            { input: ringSvg(), left: 0, top: 0 },
            { input: iconRGBA, left, top },
        ])
        .png()
        .toFile(outputPath);

    console.log(`\x1b[32m  Saved:\x1b[0m \x1b[34m${outputPath}\x1b[0m`);
}

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        console.error(
            "\x1b[31mError: GOOGLE_GENERATIVE_AI_API_KEY is not set.\x1b[0m",
        );
        process.exit(1);
    }
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`\x1b[31mError: Source dir not found: ${SOURCE_DIR}\x1b[0m`);
        process.exit(1);
    }

    const args = process.argv.slice(2);
    const regen = args.includes("--regen");
    const single = args.find((a) => !a.startsWith("--"));
    const files = single
        ? [single]
        : fs
            .readdirSync(SOURCE_DIR)
            .filter((f) => f.toLowerCase().endsWith(".png"))
            .sort();

    if (files.length === 0) {
        console.error("\x1b[31mNo .png icons found to rebuild.\x1b[0m");
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log(
        `\x1b[36mRebuilding ${files.length} icon(s) -> ${OUTPUT_DIR}\x1b[0m\n`,
    );

    let ok = 0;
    for (const fileName of files) {
        try {
            const symbolPath = path.join(SYMBOL_DIR, fileName);
            const needsSymbol = regen || !fs.existsSync(symbolPath);
            if (needsSymbol) {
                const generated = await generateSymbol(model, fileName);
                if (!generated) continue;
            } else {
                console.log(
                    `\x1b[33m  Using cached symbol:\x1b[0m ${fileName}`,
                );
            }
            await composeIcon(fileName);
            ok += 1;
        } catch (error: unknown) {
            const err = error as { message?: string };
            console.error(
                `\x1b[31m  Error on ${fileName}:\x1b[0m`,
                err.message || error,
            );
        }
    }

    console.log(
        `\n\x1b[32mDone.\x1b[0m ${ok}/${files.length} uniform icons in ${OUTPUT_DIR}`,
    );
}

main().catch(console.error);
