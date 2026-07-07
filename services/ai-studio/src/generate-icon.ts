import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { loadEnv } from "./load-env";

loadEnv();

/**
 * Single-icon generator.
 *
 * Generates ONE icon that matches the style of
 * `input/icon-style-reference.png` — a sage-green circular badge
 * with a darker green line-art icon inside.
 *
 * Usage:
 *   bun src/generate-icon.ts "<icon description>" "<output-filename>.png" [content-reference.png]
 *
 * Example:
 *   bun src/generate-icon.ts "a walking boot / medical CAM boot, side view" "icon-boot.png" thetis-night-splint-boot-reference.png
 */

const REFERENCE_FILENAME = "icon-style-reference.png";

const STYLE_PROMPT = [
    "Generate a SINGLE circular icon badge that matches the EXACT visual style of the reference image.",
    "",
    "STRICT STYLE RULES — match the reference image precisely:",
    "- Circular badge with a soft sage / muted pale-green fill (approx. #D8E3D7 / sage 100).",
    "- Inside the circle, a SINGLE simple flat line-art illustration in a darker forest / Thetis green (approx. #4A6B5C / forest 600).",
    "- Line art is clean, even-weight strokes, slightly rounded ends — no shading, no gradients, no textures.",
    "- Minimalist, modern, friendly. Educational / medical-app aesthetic.",
    "- Generous padding between the icon and the circle edge.",
    "- ONE icon only, centered, on a pure white background outside the circle.",
    "- Output is a square image, the icon occupies roughly the center 80%.",
    "- No text, no labels, no numbers, no decorative elements outside the circle.",
    "- Do NOT include any other icons from the reference — only generate the ONE icon described below.",
].join("\n");

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        console.error(
            "\x1b[31mError: GOOGLE_GENERATIVE_AI_API_KEY is not set.\x1b[0m",
        );
        process.exit(1);
    }

    const iconDescription = process.argv[2];
    if (!iconDescription) {
        console.error("\x1b[31mError: No icon description provided.\x1b[0m");
        console.log(
            'Usage: bun src/generate-icon.ts "<icon description>" "<output-filename>.png" [content-reference.png]',
        );
        process.exit(1);
    }

    const outputFileName = process.argv[3] || `icon-${Date.now()}.png`;
    const contentReferenceFilename = process.argv[4];
    const outputDir = path.join(process.cwd(), "output", "icons");
    const inputDir = path.join(process.cwd(), "input");
    const referencePath = path.join(inputDir, REFERENCE_FILENAME);
    const outputPath = path.join(outputDir, outputFileName);

    if (!fs.existsSync(referencePath)) {
        console.error(
            `\x1b[31mError: Reference image not found at ${referencePath}\x1b[0m`,
        );
        process.exit(1);
    }

    const referenceData = fs.readFileSync(referencePath).toString("base64");

    let contentReferenceData: string | null = null;
    if (contentReferenceFilename) {
        const contentReferencePath = path.join(
            inputDir,
            contentReferenceFilename,
        );
        if (!fs.existsSync(contentReferencePath)) {
            console.error(
                `\x1b[31mError: Content reference image not found at ${contentReferencePath}\x1b[0m`,
            );
            process.exit(1);
        }
        contentReferenceData = fs
            .readFileSync(contentReferencePath)
            .toString("base64");
        console.log(
            `\x1b[33mContent reference:\x1b[0m ${contentReferenceFilename}`,
        );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log(
        `\x1b[36mGenerating icon:\x1b[0m "${iconDescription}" -> ${outputFileName}`,
    );

    const parts: Array<
        { text: string } | { inlineData: { mimeType: string; data: string } }
    > = [
        { text: STYLE_PROMPT },
        { inlineData: { mimeType: "image/png", data: referenceData } },
    ];

    if (contentReferenceData) {
        parts.push({
            text:
                "Use the next image ONLY as the subject/content reference — match its composition, pose, and key details (what the object looks like, angle, proportions). Do NOT copy its colors, shading, or illustration style. Convert the subject into the sage-green circle + dark-green line-art icon style shown in the first reference.",
        });
        parts.push({
            inlineData: { mimeType: "image/png", data: contentReferenceData },
        });
    }

    parts.push({
        text:
            `Now generate ONE icon — same style, same colors, same circular sage-green badge, same dark-green line art — depicting:\n\n${iconDescription}\n\nReminder: ONE icon only, centered in the circle, no text, no logos, no brand labels, no extra elements.`,
    });

    try {
        const result = await model.generateContent(parts);
        const response = await result.response;

        if (!response.candidates || response.candidates.length === 0) {
            console.error("No candidates in response.");
            return;
        }

        const imagePart = response.candidates[0].content.parts.find(
            (p: any) => p.inlineData,
        );

        if (!imagePart || !imagePart.inlineData) {
            console.error("No image in response.");
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
