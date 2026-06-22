import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { loadEnv } from "./load-env";

// Load environment variables from .env file
loadEnv();

function mimeForExt(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === ".png") return "image/png";
    if (ext === ".gif") return "image/gif";
    if (ext === ".webp") return "image/webp";
    return "image/jpeg";
}

function loadImagePart(filePath: string): {
    inlineData: { mimeType: string; data: string };
} {
    const buf = fs.readFileSync(filePath);
    return {
        inlineData: {
            mimeType: mimeForExt(filePath),
            data: buf.toString("base64"),
        },
    };
}

function parseRefArgs(argv: string[]): {
    outputFileName?: string;
    refPaths: string[];
} {
    const refPaths: string[] = [];
    let outputFileName: string | undefined;
    const tail = argv.slice(4);
    let i = 0;
    while (i < tail.length) {
        const a = tail[i];
        if (a === "--ref" && tail[i + 1]) {
            refPaths.push(tail[i + 1]);
            i += 2;
            continue;
        }
        if (a?.startsWith("--ref=")) {
            refPaths.push(a.slice("--ref=".length));
            i += 1;
            continue;
        }
        if (a && !a.startsWith("--")) {
            outputFileName = a;
            i += 1;
            continue;
        }
        i += 1;
    }
    return { outputFileName, refPaths };
}

/**
 * Image Fix/Modification Service
 *
 * Takes an image and makes minor modifications based on a description.
 *
 * Usage:
 * bun src/fix-image.ts <input-image-path> "fix description" [output-filename.png] [--ref path/to/reference.png ...]
 *
 * Examples:
 * bun src/fix-image.ts output/image.png "fix the text label to say 'Plantarflexion' instead of 'Plantar flexion'"
 * bun src/fix-image.ts output/image.png "remove the small artifact in the top right corner"
 * bun src/fix-image.ts output/image.png "make the spring illustration slightly tighter" output/fixed-image.png
 */

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

    const inputImagePath = process.argv[2];
    if (!inputImagePath) {
        console.error("\x1b[31mError: No input image path provided.\x1b[0m");
        console.log(
            'Usage: bun src/fix-image.ts <input-image-path> "fix description" [output-filename.png]',
        );
        console.log(
            '\nExample: bun src/fix-image.ts output/image.png "fix the text label"',
        );
        process.exit(1);
    }

    const fixDescription = process.argv[3];
    if (!fixDescription) {
        console.error(
            "\x1b[31mError: No fix description provided.\x1b[0m",
        );
        console.log(
            'Usage: bun src/fix-image.ts <input-image-path> "fix description" [output-filename.png]',
        );
        console.log(
            '\nExample: bun src/fix-image.ts output/image.png "fix the text label"',
        );
        process.exit(1);
    }

    // Check if input file exists
    if (!fs.existsSync(inputImagePath)) {
        console.error(
            `\x1b[31mError: Input image not found: ${inputImagePath}\x1b[0m`,
        );
        process.exit(1);
    }

    const { outputFileName: tailOut, refPaths } = parseRefArgs(process.argv);
    for (const ref of refPaths) {
        if (!fs.existsSync(ref)) {
            console.error(`\x1b[31mError: Reference not found: ${ref}\x1b[0m`);
            process.exit(1);
        }
    }

    const outputFileName = tailOut ||
        path.basename(inputImagePath, path.extname(inputImagePath)) +
            "-fixed" +
            path.extname(inputImagePath);
    const outputDir = path.join(process.cwd(), "output");
    const cwd = process.cwd();
    const outputPath = path.isAbsolute(outputFileName)
        ? outputFileName
        : outputFileName.startsWith("." + path.sep) ||
                outputFileName.startsWith(".." + path.sep) ||
                outputFileName.startsWith("../") ||
                outputFileName.startsWith(".\\")
        ? path.resolve(cwd, outputFileName)
        : path.join(outputDir, outputFileName);

    // Read input image
    const imageData = fs.readFileSync(inputImagePath);
    const base64Data = imageData.toString("base64");
    const ext = path.extname(inputImagePath).toLowerCase();
    const mimeType = ext === ".png"
        ? "image/png"
        : ext === ".gif"
        ? "image/gif"
        : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";

    const genAI = new GoogleGenerativeAI(apiKey);

    // Using Gemini 3 Pro Image Preview for image editing
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log(`\x1b[36mFixing image:\x1b[0m ${inputImagePath}`);
    console.log(`\x1b[36mFix description:\x1b[0m "${fixDescription}"`);
    if (refPaths.length > 0) {
        console.log(
            `\x1b[36mReference image(s):\x1b[0m ${refPaths.join(", ")}`,
        );
    }

    try {
        const parts: Array<
            { text: string } | {
                inlineData: { mimeType: string; data: string };
            }
        > = [];

        if (refPaths.length > 0) {
            parts.push({
                text:
                    "The following image(s) are MATERIAL / TEXTURE REFERENCE ONLY. Copy the specified surface finish, color, and structural pattern from the reference — not the product shape, layout, or subject matter.",
            });
            for (const refPath of refPaths) {
                parts.push(loadImagePart(refPath));
            }
        }

        parts.push({
            inlineData: {
                mimeType,
                data: base64Data,
            },
        });

        const refClause = refPaths.length > 0
            ? "\n- Use the REFERENCE image(s) only for the material/texture described in the fix. Do not copy their product geometry or scene.\n"
            : "";

        parts.push({
            text:
                `Make a very minor modification to the LAST image above (the content image): ${fixDescription}
${refClause}
Important:
- Keep everything else exactly the same
- Only make the specific small fix requested
- Maintain the same style, colors, and overall composition
- Preserve all other details unchanged
- If the content image is a photograph, keep it photorealistic — do not convert to illustration or cartoon`,
        });

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

                const outDir = path.dirname(outputPath);
                if (!fs.existsSync(outDir)) {
                    fs.mkdirSync(outDir, { recursive: true });
                }

                fs.writeFileSync(outputPath, new Uint8Array(buffer));
                console.log(
                    `\x1b[32mSuccess!\x1b[0m Fixed image saved to: \x1b[34m${outputPath}\x1b[0m`,
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
            "\x1b[31mError during image fix:\x1b[0m",
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
