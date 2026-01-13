import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { loadEnv } from "./load-env";

// Load environment variables from .env file
loadEnv();

/**
 * Google Gemini Image Generation Service
 *
 * Usage:
 * bun src/index.ts "your prompt here" "output-filename.png"
 *
 * Reference images in the `input/` folder will be automatically included
 * to guide the style and characters in the generated image.
 */

function getInputImages(inputDir: string): Array<{
    mimeType: string;
    data: string;
    filename: string;
}> {
    if (!fs.existsSync(inputDir)) {
        return [];
    }

    const supportedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
    const files = fs.readdirSync(inputDir);

    const images: Array<{ mimeType: string; data: string; filename: string }> =
        [];
    const otherImages: Array<
        { mimeType: string; data: string; filename: string }
    > = [];

    // Prioritize mike-and-doc.png as the primary character reference
    const primaryReference = "mike-and-doc.png";

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!supportedExtensions.includes(ext)) continue;

        const filePath = path.join(inputDir, file);
        const fileData = fs.readFileSync(filePath);
        const base64Data = fileData.toString("base64");

        const mimeType = ext === ".png"
            ? "image/png"
            : ext === ".gif"
            ? "image/gif"
            : ext === ".webp"
            ? "image/webp"
            : "image/jpeg";

        const imageData = { mimeType, data: base64Data, filename: file };

        if (file.toLowerCase() === primaryReference.toLowerCase()) {
            images.unshift(imageData); // Add mike-and-doc.png first
        } else {
            otherImages.push(imageData);
        }
    }

    // Add mike-and-doc.png first, then other images
    const allImages = [...images, ...otherImages];

    allImages.forEach((img) => {
        console.log(`\x1b[33mReference image:\x1b[0m ${img.filename}`);
    });

    return allImages;
}

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        console.error(
            "\x1b[31mError: GOOGLE_GENERATIVE_AI_API_KEY is not set.\x1b[0m",
        );
        console.log(
            "Please create a .env file in services/ai-studio/ with:",
        );
        console.log("  GOOGLE_GENERATIVE_AI_API_KEY=your-key-here");
        console.log("Get one at: https://aistudio.google.com/app/apikey");
        process.exit(1);
    }

    const prompt = process.argv[2];
    if (!prompt) {
        console.error("\x1b[31mError: No prompt provided.\x1b[0m");
        console.log(
            'Usage: bun src/index.ts "A high-quality image of an Achilles tendon recovery"',
        );
        process.exit(1);
    }

    const outputFileName = process.argv[3] || `gen-${Date.now()}.png`;
    const outputDir = path.join(process.cwd(), "output");
    const inputDir = path.join(process.cwd(), "input");
    const outputPath = path.join(outputDir, outputFileName);

    const genAI = new GoogleGenerativeAI(apiKey);

    // Using Gemini 3 Pro Image Preview
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    // Load reference images from input folder
    const referenceImages = getInputImages(inputDir);

    if (referenceImages.length > 0) {
        console.log(
            `\x1b[36mUsing ${referenceImages.length} reference image(s) to guide generation\x1b[0m`,
        );
    } else {
        console.log(
            "\x1b[90mNo reference images found in input/ folder (optional)\x1b[0m",
        );
    }

    console.log(`\x1b[36mGenerating image for:\x1b[0m "${prompt}"`);

    try {
        // Build content parts: reference images first, then prompt
        const parts: Array<
            { text: string } | {
                inlineData: { mimeType: string; data: string };
            }
        > = [];

        // Add reference images with instruction
        if (referenceImages.length > 0) {
            const hasMikeAndDoc = referenceImages.some((img) =>
                img.filename.toLowerCase() === "mike-and-doc.png"
            );

            if (hasMikeAndDoc) {
                parts.push({
                    text:
                        "CRITICAL: Use 'mike-and-doc.png' as the PRIMARY character reference. This image shows the exact doctor and patient characters you must use. Match their appearance, style, and level of detail EXACTLY. The doctor is in Thetis green scrubs and crocs. The patient (Grant) is a 40-year-old white male, slim, average height. Use this reference for ALL character appearances.\n\nIMPORTANT: Grant can wear VACOped, Aircast (black boot), or other boots - all are valid treatment options. Show variety across different images to reinforce that all boot types are acceptable. Grant should ONLY wear ONE boot on the injured foot - the other foot must be in a regular shoe (white Stan Smiths for day scenes).",
                });
            } else {
                parts.push({
                    text:
                        "Use the following reference image(s) to guide the visual style and characters. Maintain consistency with these characters and art style:\n\nIMPORTANT: The patient (Grant) can wear VACOped, Aircast (black boot), or other boots - all are valid treatment options. Grant should ONLY wear ONE boot on the injured foot - the other foot must be in a regular shoe.",
                });
            }

            for (const img of referenceImages) {
                parts.push({
                    inlineData: {
                        mimeType: img.mimeType,
                        data: img.data,
                    },
                });
            }

            if (hasMikeAndDoc) {
                parts.push({
                    text:
                        `Now generate an image based on this prompt. CRITICAL: Use the characters from 'mike-and-doc.png' EXACTLY - same doctor, same patient (Grant), same style, same level of detail. Match their appearance precisely.\n\nIMPORTANT: Grant can wear VACOped, Aircast (black boot), or other boots - all are valid treatment options. Grant should ONLY wear ONE boot on the injured foot - the other foot must be in a regular shoe (white Stan Smiths for day scenes).\n\n${prompt}`,
                });
            } else {
                parts.push({
                    text:
                        `Now generate an image based on this prompt, using the reference style and characters above.\n\nIMPORTANT: The patient (Grant) can wear VACOped, Aircast (black boot), or other boots - all are valid treatment options. Grant should ONLY wear ONE boot on the injured foot - the other foot must be in a regular shoe.\n\n${prompt}`,
                });
            }
        } else {
            parts.push({
                text:
                    `IMPORTANT: If generating characters, use 'mike-and-doc.png' from the input folder as the character reference. The doctor is in Thetis green scrubs and crocs. The patient is a 40-year-old white male, slim, average height.\n\n${prompt}`,
            });
        }

        // Generate content
        const result = await model.generateContent(parts);
        const response = await result.response;

        // Check if we have candidates in the response
        if (response.candidates && response.candidates.length > 0) {
            const candidate = response.candidates[0];

            // Find the image part in the response
            const imagePart = candidate.content.parts.find(
                (part: any) => part.inlineData,
            );

            if (imagePart && imagePart.inlineData) {
                const base64Data = imagePart.inlineData.data;
                const buffer = Buffer.from(base64Data, "base64");

                // Ensure output directory exists
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir, { recursive: true });
                }

                fs.writeFileSync(outputPath, new Uint8Array(buffer));
                console.log(
                    `\x1b[32mSuccess!\x1b[0m Image saved to: \x1b[34m${outputPath}\x1b[0m`,
                );
            } else {
                console.error("No image data found in the response parts.");
                console.log(
                    "Response parts:",
                    JSON.stringify(candidate.content.parts, null, 2),
                );
            }
        } else {
            console.error("No candidates found in the response.");
            console.log("Full response:", JSON.stringify(response, null, 2));
        }
    } catch (error: any) {
        console.error(
            "\x1b[31mError during generation:\x1b[0m",
            error.message || error,
        );
        if (error.response) {
            console.log(
                "Response data:",
                JSON.stringify(error.response, null, 2),
            );
        }
    }
}

main().catch(console.error);
