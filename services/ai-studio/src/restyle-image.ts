import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { loadEnv } from "./load-env";

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

/**
 * Parses argv after the style description (index 4+).
 * Supports: optional output basename, `--ref <path>` (repeatable, style),
 * `--product-ref <path>` (repeatable, device / product geometry),
 * and `--character-ref <path>` (repeatable, patient / character likeness).
 */
function parseTailArgs(argv: string[]): {
    outputFileName?: string;
    styleRefPaths: string[];
    productRefPaths: string[];
    characterRefPaths: string[];
} {
    const styleRefPaths: string[] = [];
    const productRefPaths: string[] = [];
    const characterRefPaths: string[] = [];
    let outputFileName: string | undefined;
    const tail = argv.slice(4);
    let i = 0;
    while (i < tail.length) {
        const a = tail[i];
        if (a === "--ref" && tail[i + 1]) {
            styleRefPaths.push(tail[i + 1]);
            i += 2;
            continue;
        }
        if (a?.startsWith("--ref=")) {
            styleRefPaths.push(a.slice("--ref=".length));
            i += 1;
            continue;
        }
        if (a === "--product-ref" && tail[i + 1]) {
            productRefPaths.push(tail[i + 1]);
            i += 2;
            continue;
        }
        if (a?.startsWith("--product-ref=")) {
            productRefPaths.push(a.slice("--product-ref=".length));
            i += 1;
            continue;
        }
        if (a === "--character-ref" && tail[i + 1]) {
            characterRefPaths.push(tail[i + 1]);
            i += 2;
            continue;
        }
        if (a?.startsWith("--character-ref=")) {
            characterRefPaths.push(a.slice("--character-ref=".length));
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
    return { outputFileName, styleRefPaths, productRefPaths, characterRefPaths };
}

/**
 * Restyle / reinterpret an existing image (cartoon, illustration, etc.).
 *
 * Unlike fix-image.ts (minor edits only), this is for full visual style changes
 * while keeping layout, text meaning, and educational intent.
 *
 * Usage:
 * bun src/restyle-image.ts <input-image-path> "style instructions" [output-filename.png] [--character-ref mike.png ...] [--product-ref device.jpg ...] [--ref path/to/style.png ...]
 *
 * Example (match Achilles course Tintin-style diagrams; run from services/ai-studio):
 * bun src/restyle-image.ts ../../apps/course/src/assets/chronic-heel-pain-common-self-limiting.png "Match reference style exactly." out.png --ref ../../apps/course/src/assets/dvt-signs-symptoms-tintin-v6.png
 *
 * Workflow: save drafts under this package's output/ (e.g. my-slide-tintin-style.png). Copy into
 * apps/course only when you are ready to ship the lesson change.
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
        process.exit(1);
    }

    const inputImagePath = process.argv[2];
    if (!inputImagePath) {
        console.error("\x1b[31mError: No input image path provided.\x1b[0m");
        console.log(
            'Usage: bun src/restyle-image.ts <input-image-path> "style instructions" [output-filename.png]',
        );
        process.exit(1);
    }

    const styleDescription = process.argv[3];
    if (!styleDescription) {
        console.error(
            "\x1b[31mError: No style instructions provided.\x1b[0m",
        );
        console.log(
            'Usage: bun src/restyle-image.ts <input-image-path> "style instructions" [output.png] [--character-ref char.png ...] [--product-ref product.jpg ...] [--ref style-ref.png ...]',
        );
        process.exit(1);
    }

    if (!fs.existsSync(inputImagePath)) {
        console.error(
            `\x1b[31mError: Input image not found: ${inputImagePath}\x1b[0m`,
        );
        process.exit(1);
    }

    const { outputFileName: tailOut, styleRefPaths, productRefPaths, characterRefPaths } =
        parseTailArgs(
            process.argv,
        );
    for (const ref of styleRefPaths) {
        if (!fs.existsSync(ref)) {
            console.error(`\x1b[31mError: Style reference not found: ${ref}\x1b[0m`);
            process.exit(1);
        }
    }
    for (const ref of productRefPaths) {
        if (!fs.existsSync(ref)) {
            console.error(
                `\x1b[31mError: Product reference not found: ${ref}\x1b[0m`,
            );
            process.exit(1);
        }
    }
    for (const ref of characterRefPaths) {
        if (!fs.existsSync(ref)) {
            console.error(
                `\x1b[31mError: Character reference not found: ${ref}\x1b[0m`,
            );
            process.exit(1);
        }
    }

    const outputFileName = tailOut ||
        path.basename(inputImagePath, path.extname(inputImagePath)) +
            "-restyled" +
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
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log(`\x1b[36mRestyling image:\x1b[0m ${inputImagePath}`);
    console.log(`\x1b[36mInstructions:\x1b[0m "${styleDescription}"`);
    if (characterRefPaths.length > 0) {
        console.log(
            `\x1b[36mCharacter reference(s):\x1b[0m ${characterRefPaths.join(", ")}`,
        );
    }
    if (productRefPaths.length > 0) {
        console.log(
            `\x1b[36mProduct reference(s):\x1b[0m ${productRefPaths.join(", ")}`,
        );
    }
    if (styleRefPaths.length > 0) {
        console.log(
            `\x1b[36mStyle reference(s):\x1b[0m ${styleRefPaths.join(", ")}`,
        );
    }

    const parts: Array<
        { text: string } | {
            inlineData: { mimeType: string; data: string };
        }
    > = [];

    if (characterRefPaths.length > 0) {
        parts.push({
            text:
                "The following image(s) are CHARACTER REFERENCE for the PATIENT (Mike / Grant) only. Match face, hair, skin tone, body proportions, and casual clothing (e.g. white t-shirt) when drawing the patient performing the scene. Do not copy the doctor, room layout, or medical equipment from the reference unless the instructions explicitly ask for them.",
        });
        for (const refPath of characterRefPaths) {
            parts.push(loadImagePart(refPath));
        }
    }

    if (productRefPaths.length > 0) {
        parts.push({
            text:
                "The following image(s) are PRODUCT REFERENCE ONLY. Copy accurate device geometry: silhouette, rigid vs soft parts, strap count and routing, colors, and how much of the foot/heel is left open. Do not substitute a different category of device (for example do not turn a dorsal night splint into a walking boot, posterior shell, or sandal with a full sole unless the product reference clearly shows that). These are not general-purpose style references.",
        });
        for (const refPath of productRefPaths) {
            parts.push(loadImagePart(refPath));
        }
    }

    if (styleRefPaths.length > 0) {
        parts.push({
            text:
                "The following image(s) define the TARGET VISUAL STYLE ONLY (line weight, color palette, paper/background texture, character rendering if any, typography personality). Do not copy their layout or subject matter.",
        });
        for (const refPath of styleRefPaths) {
            parts.push(loadImagePart(refPath));
        }
    }

    parts.push({
        inlineData: { mimeType, data: base64Data },
    });

    const refClause = styleRefPaths.length > 0
        ? "\n- Match the TARGET VISUAL STYLE reference image(s) as closely as possible: outlines, fills, shading simplicity, background texture, and title/body font personality.\n"
        : "";
    const productClause = productRefPaths.length > 0
        ? "\n- If PRODUCT REFERENCE images appear above, follow them for the specified device even when the content image shows a different or wrong design. Translate the product photo into the target illustration style while keeping mechanical design faithful.\n"
        : "";
    const characterClause = characterRefPaths.length > 0
        ? "\n- If CHARACTER REFERENCE images appear above, the patient in the scene must read unmistakably as the same person (Mike / Grant) from that reference. Keep the pose and action from the content image; only substitute likeness and clothing consistency as instructed.\n"
        : "";

    parts.push({
        text: `Redraw the LAST image above (the content image) in a new visual style.

Style / creative direction: ${styleDescription}
${refClause}${productClause}${characterClause}
Hard requirements:
- Preserve the same information architecture as the LAST (content) image: section order, relative placement of text vs graphics, hierarchy (title vs body), and any diagrams/charts that carry meaning (e.g. funnel shapes, arrows, color bands).
- Keep every line of on-image text accurate: same words, punctuation, and numbers unless the style direction above explicitly asks to change copy. Redraw letterforms to match the new visual style.
- Do NOT add new topics, panels, characters, or diseases that are not in the source image. Do NOT import layout or subject matter from the style reference — only its drawing style.
- Replace photographic realism (if present) with the requested illustrated look. If the source is already a flat diagram, restyle shapes and colors while keeping the same structure and labels.
- Output a single final image.`,
    });

    try {
        const result = await model.generateContent(parts);
        const response = await result.response;

        if (response.candidates && response.candidates.length > 0) {
            const candidate = response.candidates[0];
            const imagePart = candidate.content.parts.find(
                (part: { inlineData?: { data: string } }) => part.inlineData,
            );

            if (imagePart?.inlineData) {
                const outB64 = imagePart.inlineData.data;
                const buffer = Buffer.from(outB64, "base64");
                const outDir = path.dirname(outputPath);
                if (!fs.existsSync(outDir)) {
                    fs.mkdirSync(outDir, { recursive: true });
                }
                fs.writeFileSync(outputPath, new Uint8Array(buffer));
                console.log(
                    `\x1b[32mSuccess!\x1b[0m Saved: \x1b[34m${outputPath}\x1b[0m`,
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
    } catch (error: unknown) {
        const err = error as { message?: string; response?: unknown };
        console.error(
            "\x1b[31mError during restyle:\x1b[0m",
            err.message || error,
        );
        if (err.response) {
            console.log(
                "Response data:",
                JSON.stringify(err.response, null, 2),
            );
        }
    }
}

main().catch(console.error);
