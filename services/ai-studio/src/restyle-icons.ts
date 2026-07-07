import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { loadEnv } from "./load-env";

loadEnv();

/**
 * Batch icon restyler.
 *
 * Recreates every recovery icon in `output/icons/` with a new, cleaner style:
 *   - NO solid light-green background fill.
 *   - Clean WHITE background.
 *   - A thin DARK GREEN circular OUTLINE only (no filled circle).
 *   - The existing dark-green line-art icon, perfectly centered inside the circle.
 *   - Same minimalist, medical, rounded-stroke style and line weight.
 *
 * Each source icon is used as a content reference so the subject (chair, clipboard,
 * boot, etc.) is preserved while only the style/background is changed.
 *
 * Usage:
 *   bun src/restyle-icons.ts [single-icon-filename.png]
 *
 * With no argument it restyles ALL .png icons in output/icons/.
 * Output is written to output/icons-outline/ (originals are left untouched).
 */

const SOURCE_DIR = path.join(process.cwd(), "output", "icons");
const OUTPUT_DIR = path.join(process.cwd(), "output", "icons-outline");

const STYLE_PROMPT = [
    "Recreate the icon shown in the reference image in a refreshed, cleaner style.",
    "",
    "STRICT STYLE RULES:",
    "- REMOVE the solid light / sage green background fill completely. There must be NO filled circle.",
    "- Use a clean PURE WHITE background.",
    "- Draw a single THIN DARK GREEN circular OUTLINE (a ring, approx. #4A6B5C / forest green), even stroke weight, not filled.",
    "- Keep the SAME subject / icon from the reference image (same object, pose, composition, key details).",
    "- Redraw the icon in DARK GREEN (approx. #4A6B5C) flat line art — clean, even-weight strokes, slightly rounded stroke ends. No shading, no gradients, no textures.",
    "- Center the icon PERFECTLY inside the circular outline, with generous, balanced padding between the icon and the ring.",
    "- Minimalist, modern, professional medical / rehabilitation healthcare aesthetic.",
    "- Maintain consistent line weight, rounded stroke style, and spacing matching a cohesive icon set.",
    "- ONE icon only. No text, no labels, no numbers, no shadows, no extra decorative elements.",
    "- Output a square, high-resolution image. White (or transparent) background outside the ring.",
].join("\n");

function mimeForExt(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === ".png") return "image/png";
    if (ext === ".webp") return "image/webp";
    if (ext === ".gif") return "image/gif";
    return "image/jpeg";
}

async function restyleOne(
    model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]>,
    fileName: string,
): Promise<boolean> {
    const sourcePath = path.join(SOURCE_DIR, fileName);
    const outputPath = path.join(OUTPUT_DIR, fileName);

    const sourceData = fs.readFileSync(sourcePath).toString("base64");

    const parts = [
        { text: STYLE_PROMPT },
        {
            inlineData: { mimeType: mimeForExt(sourcePath), data: sourceData },
        },
        {
            text:
                "The image above is the SUBJECT reference. Keep its icon/subject exactly, but apply the new style: white background, thin dark green circular outline only (no green fill), dark green centered line art.",
        },
    ];

    console.log(`\x1b[36mRestyling:\x1b[0m ${fileName}`);

    const result = await model.generateContent(parts);
    const response = await result.response;

    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content.parts.find(
        (p: { inlineData?: { data: string } }) => p.inlineData,
    );

    if (!imagePart?.inlineData) {
        console.error(`\x1b[31m  No image returned for ${fileName}\x1b[0m`);
        return false;
    }

    const buffer = Buffer.from(imagePart.inlineData.data, "base64");
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    fs.writeFileSync(outputPath, new Uint8Array(buffer));
    console.log(`\x1b[32m  Saved:\x1b[0m \x1b[34m${outputPath}\x1b[0m`);
    return true;
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

    const single = process.argv[2];
    const files = single
        ? [single]
        : fs
            .readdirSync(SOURCE_DIR)
            .filter((f) => f.toLowerCase().endsWith(".png"))
            .sort();

    if (files.length === 0) {
        console.error("\x1b[31mNo .png icons found to restyle.\x1b[0m");
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log(
        `\x1b[36mRestyling ${files.length} icon(s) -> ${OUTPUT_DIR}\x1b[0m\n`,
    );

    let ok = 0;
    for (const fileName of files) {
        try {
            const success = await restyleOne(model, fileName);
            if (success) ok += 1;
        } catch (error: unknown) {
            const err = error as { message?: string };
            console.error(
                `\x1b[31m  Error on ${fileName}:\x1b[0m`,
                err.message || error,
            );
        }
    }

    console.log(
        `\n\x1b[32mDone.\x1b[0m ${ok}/${files.length} icons restyled into ${OUTPUT_DIR}`,
    );
}

main().catch(console.error);
