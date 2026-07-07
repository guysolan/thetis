import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { loadEnv } from "./load-env";

loadEnv();

/**
 * Base-image graphic generator.
 *
 * Generates a new graphic that must faithfully reuse a specific BASE image
 * (e.g. a real product photo) as the source of truth for the device / scene,
 * rather than the recurring-character house style used by generate-graphic.ts.
 *
 * The first reference is the BASE (preserve device geometry, colour, branding,
 * lighting, realism). Any additional references are extra context only.
 *
 * Usage:
 *   bun src/generate-from-base.ts <base-image> "<prompt-or-prompt-file>" "<output.png>" [extra-ref.png ...]
 *
 * Paths resolve relative to the ai-studio root.
 */

function loadImage(refPath: string): { mimeType: string; data: string } {
    const ext = path.extname(refPath).toLowerCase();
    const mimeType = ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".webp"
        ? "image/webp"
        : ext === ".gif"
        ? "image/gif"
        : "image/png";
    return { mimeType, data: fs.readFileSync(refPath).toString("base64") };
}

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        console.error(
            "\x1b[31mError: GOOGLE_GENERATIVE_AI_API_KEY is not set.\x1b[0m",
        );
        process.exit(1);
    }

    const root = process.cwd();
    const baseArg = process.argv[2];
    if (!baseArg) {
        console.error("\x1b[31mError: No base image provided.\x1b[0m");
        console.log(
            'Usage: bun src/generate-from-base.ts <base-image> "<prompt-or-file>" "<output.png>" [extra-ref.png ...]',
        );
        process.exit(1);
    }
    const basePath = path.isAbsolute(baseArg) ? baseArg : path.join(root, baseArg);
    if (!fs.existsSync(basePath)) {
        console.error(`\x1b[31mError: Base image not found at ${basePath}\x1b[0m`);
        process.exit(1);
    }

    let prompt = process.argv[3];
    if (prompt && fs.existsSync(prompt)) {
        prompt = fs.readFileSync(prompt, "utf-8");
        console.log("\x1b[33mPrompt loaded from file.\x1b[0m");
    }
    if (!prompt) {
        console.error("\x1b[31mError: No prompt provided.\x1b[0m");
        process.exit(1);
    }

    const outputFileName = process.argv[4] || `graphic-${Date.now()}.png`;
    const extraRefArgs = process.argv.slice(5);

    const outputDir = path.join(root, "output");
    const outputPath = path.join(outputDir, outputFileName);

    const extraRefs: Array<{ mimeType: string; data: string }> = [];
    for (const ref of extraRefArgs) {
        const resolved = path.isAbsolute(ref) ? ref : path.join(root, ref);
        if (!fs.existsSync(resolved)) {
            console.error(
                `\x1b[31mError: Reference image not found at ${resolved}\x1b[0m`,
            );
            process.exit(1);
        }
        extraRefs.push(loadImage(resolved));
        console.log(`\x1b[33mExtra reference:\x1b[0m ${ref}`);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log(`\x1b[36mBase image:\x1b[0m ${baseArg}`);
    console.log(`\x1b[36mGenerating graphic:\x1b[0m -> ${outputFileName}`);

    const parts: Array<
        { text: string } | { inlineData: { mimeType: string; data: string } }
    > = [];

    parts.push({
        text:
            "The next image is the BASE PRODUCT REFERENCE. It is a real photo of the exact medical device to depict. Reproduce this device faithfully in every panel: same silhouette and shape, same teal / seafoam-green moulded plastic shell, same black Velcro straps and routing, the small white 'Thetis Medical' label, and the same realistic photographic look, skin tone and white bedsheet setting. Do NOT redesign the device, change its colour, or swap it for a different boot. Keep it photorealistic.",
    });
    parts.push({ inlineData: loadImage(basePath) });

    for (const img of extraRefs) {
        parts.push({ inlineData: img });
    }

    parts.push({ text: prompt });

    try {
        const result = await model.generateContent(parts);
        const response = await result.response;
        const candidate = response.candidates?.[0];
        const imagePart = candidate?.content.parts.find(
            (p: { inlineData?: { data: string } }) => p.inlineData,
        );
        if (!imagePart?.inlineData) {
            console.error("No image data found in the response.");
            return;
        }
        const buffer = Buffer.from(imagePart.inlineData.data, "base64");
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(outputPath, new Uint8Array(buffer));
        console.log(
            `\x1b[32mSuccess!\x1b[0m Saved: \x1b[34m${outputPath}\x1b[0m`,
        );
    } catch (error: unknown) {
        const err = error as { message?: string };
        console.error(
            "\x1b[31mError during generation:\x1b[0m",
            err.message || error,
        );
    }
}

main().catch(console.error);
