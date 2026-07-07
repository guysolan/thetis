import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { loadEnv } from "./load-env";

loadEnv();

/**
 * Content-graphic generator.
 *
 * Generates a single square social/educational graphic in the Thetis
 * "Achilles Rupture Recovery" house style, using ONE explicit style +
 * character reference image (so Grant and the bearded doctor stay
 * consistent) instead of dumping every image in the input folder.
 *
 * Usage:
 *   bun src/generate-graphic.ts "<prompt>" "<output-filename>.png" [style-reference.png ...]
 *
 * Reference paths are resolved relative to the ai-studio root, so you can
 * point at existing output graphics, e.g.:
 *   bun src/generate-graphic.ts "..." "out.png" \
 *     output/achilles-rupture-recovery-course-aircast-mike-accurate-v8-benefits.png
 */

function loadImage(refPath: string): { mimeType: string; data: string } {
    const ext = path.extname(refPath).toLowerCase();
    const mimeType = ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".webp"
        ? "image/webp"
        : "image/png";
    const data = fs.readFileSync(refPath).toString("base64");
    return { mimeType, data };
}

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        console.error(
            "\x1b[31mError: GOOGLE_GENERATIVE_AI_API_KEY is not set.\x1b[0m",
        );
        process.exit(1);
    }

    let prompt = process.argv[2];
    // If the prompt argument points to an existing file, read the prompt from
    // it. This avoids shell-quoting problems with long multi-line prompts.
    if (prompt && fs.existsSync(prompt)) {
        prompt = fs.readFileSync(prompt, "utf-8");
        console.log("\x1b[33mPrompt loaded from file.\x1b[0m");
    }
    if (!prompt) {
        console.error("\x1b[31mError: No prompt provided.\x1b[0m");
        console.log(
            'Usage: bun src/generate-graphic.ts "<prompt-or-prompt-file>" "<output-filename>.png" [style-reference.png ...]',
        );
        process.exit(1);
    }

    const outputFileName = process.argv[3] || `graphic-${Date.now()}.png`;
    const referenceArgs = process.argv.slice(4);

    const root = process.cwd();
    const outputDir = path.join(root, "output");
    const outputPath = path.join(outputDir, outputFileName);

    const referenceImages: Array<{ mimeType: string; data: string }> = [];
    for (const ref of referenceArgs) {
        const resolved = path.isAbsolute(ref) ? ref : path.join(root, ref);
        if (!fs.existsSync(resolved)) {
            console.error(
                `\x1b[31mError: Reference image not found at ${resolved}\x1b[0m`,
            );
            process.exit(1);
        }
        referenceImages.push(loadImage(resolved));
        console.log(`\x1b[33mStyle reference:\x1b[0m ${ref}`);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log(
        `\x1b[36mGenerating graphic:\x1b[0m -> ${outputFileName}`,
    );

    const parts: Array<
        { text: string } | { inlineData: { mimeType: string; data: string } }
    > = [];

    if (referenceImages.length > 0) {
        parts.push({
            text:
                "Use the following reference image(s) to lock in the EXACT house style and recurring characters: the same patient 'Grant' (a 40-year-old white male, slim, average height, short brown hair, friendly) and, if shown, the same older bearded doctor in a white coat over Thetis-green scrubs. Match the illustration style, line weight, Thetis forest-green (#2F5D45 / #4A6B5C) and sage palette, clean educational look, and overall polish EXACTLY.",
        });
        for (const img of referenceImages) {
            parts.push({ inlineData: img });
        }
    }

    parts.push({ text: prompt });

    try {
        const result = await model.generateContent(parts);
        const response = await result.response;

        const candidate = response.candidates?.[0];
        const imagePart = candidate?.content.parts.find(
            (p: any) => p.inlineData,
        );

        if (!imagePart || !imagePart.inlineData) {
            console.error("No image data found in the response.");
            return;
        }

        const buffer = Buffer.from(imagePart.inlineData.data, "base64");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(outputPath, new Uint8Array(buffer));
        console.log(
            `\x1b[32mSuccess!\x1b[0m Saved: \x1b[34m${outputPath}\x1b[0m`,
        );
    } catch (error: any) {
        console.error(
            "\x1b[31mError during generation:\x1b[0m",
            error.message || error,
        );
    }
}

main().catch(console.error);
