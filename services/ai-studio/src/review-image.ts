import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

/**
 * Image Review and Improvement Service
 *
 * Reviews images for accuracy, safety, style consistency, and compliance with
 * Achilles recovery positions. Generates improved versions when issues are found.
 *
 * Usage:
 * bun src/review-image.ts path/to/image.png [output-name]
 */

// Character and style specifications
const CHARACTER_SPECS = {
    doctor: {
        description: "Doctor in Thetis green scrubs and crocs",
        outfit: "Thetis green scrubs and crocs",
    },
    patient: {
        description: "40-year-old white male, slim, average height",
        outfits: {
            day: "white Stan Smiths, blue jeans, white t-shirt",
            gym: "blue shorts, blue t-shirt, blue trainers",
            bed: "subtle checked navy pyjamas",
            shower: "blue swimming trunks",
        },
    },
};

const STYLE_SPEC =
    "Tintin cartoon style - clean lines, clear colors, Hergé-inspired illustration";

const BOOT_SPECS = {
    vacoped:
        "VACOped boot - hinged, adjustable range of motion, distinctive design with visible hinges",
    aircast:
        "Aircast boot - fixed wedges that are removed over time, simpler design",
};

const SAFETY_RULES = `
CRITICAL SAFETY RULES:
- Foot MUST be in plantarflexion (pointed down) during early recovery phases (weeks 0-12)
- NEVER show foot dorsiflexed (toes up) during boot phase or early recovery
- Wedges MUST be INSIDE the boot, under the heel, not visible outside
- Boot must be worn 24/7 during early phases
- No aggressive stretching shown during recovery phases
`;

const ACCURACY_RULES = `
ACCURACY RULES:
- Boots must match their actual appearance:
  * VACOped: Hinged, adjustable range of motion, distinctive design with visible hinges, ~48° plantarflexion capability
  * Aircast: Fixed wedges that are removed over time, simpler design, ~28-30° plantarflexion initially
- Wedges are removable inserts that go INSIDE the boot under the heel (NOT visible outside)
- Patient should appear normal/proportional (not malformed, correct anatomy)
- Products must be accurately represented (correct colors, shapes, features)
- Crutches should be standard medical crutches (adjustable, rubber tips)
- Night splints should hold foot in plantarflexion (pointed down), NOT dorsiflexion
- Medical equipment must be realistic and appropriate
- No anachronistic or incorrect medical devices
`;

const POSITION_COMPLIANCE = `
POSITION COMPLIANCE (from achilles-recovery-positions.md):
- Non-surgical is first-line treatment
- Boot removal: Week 10-12 (not earlier)
- Early weight-bearing as tolerated from day 1
- Avoid aggressive stretching until fully healed (12-18 months)
- Night splint from boot time (non-op) or 2 weeks post-op
- Heel lifts during transition (0.5-1cm)
- Gradual boot weaning over 1-2 weeks
`;

function getImageAsBase64(
    imagePath: string,
): { mimeType: string; data: string } {
    if (!fs.existsSync(imagePath)) {
        throw new Error(`Image not found: ${imagePath}`);
    }

    const ext = path.extname(imagePath).toLowerCase();
    const fileData = fs.readFileSync(imagePath);
    const base64Data = fileData.toString("base64");

    const mimeType = ext === ".png"
        ? "image/png"
        : ext === ".gif"
        ? "image/gif"
        : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";

    return { mimeType, data: base64Data };
}

function getReferenceImages(inputDir: string): Array<{
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
    return [...images, ...otherImages];
}

async function reviewImage(
    imagePath: string,
    context?: string,
): Promise<{
    issues: string[];
    improvedPrompt: string;
    needsRegeneration: boolean;
}> {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-2.5-flash for vision analysis (supports multimodal input)
    // Available models: gemini-2.5-flash, gemini-2.5-pro, gemini-flash-latest, gemini-pro-latest
    const model = genAI.getGenerativeModel({
        model: "models/gemini-2.5-flash",
    });

    const imageData = getImageAsBase64(imagePath);

    // Get mike-and-doc.png reference for character comparison
    const inputDir = path.join(process.cwd(), "input");
    const mikeAndDocPath = path.join(inputDir, "mike-and-doc.png");
    let mikeAndDocImage: { mimeType: string; data: string } | null = null;

    if (fs.existsSync(mikeAndDocPath)) {
        mikeAndDocImage = getImageAsBase64(mikeAndDocPath);
        console.log(
            "\x1b[36mUsing 'mike-and-doc.png' as character reference for comparison\x1b[0m",
        );
    } else {
        console.log(
            "\x1b[33mWarning: 'mike-and-doc.png' not found in input directory. Character comparison may be less accurate.\x1b[0m",
        );
    }

    const reviewPrompt = `
You are reviewing an image for an Achilles tendon rupture recovery educational resource.

**CRITICAL: You have been provided with 'mike-and-doc.png' as the PRIMARY CHARACTER REFERENCE.**
- Compare ALL characters in the image being reviewed against the characters in 'mike-and-doc.png'
- The doctor must match the doctor from 'mike-and-doc.png' EXACTLY (older man, bald head, white beard, round glasses, green scrubs, green Crocs)
- The patient must match the patient from 'mike-and-doc.png' EXACTLY (young man, short brown hair, slim build, average height)
- Character style, proportions, and level of detail must match 'mike-and-doc.png'

**CRITICAL CHARACTER DETECTION RULES:**
- If the patient character looks like Tintin (quiff hairstyle, round face, distinctive cartoon character appearance) - this is WRONG and must be flagged
- If the patient character looks like any other cartoon character (not matching mike-and-doc.png) - this is WRONG and must be flagged
- The patient should look like a realistic person in cartoon style, NOT like Tintin or any other famous cartoon character
- Compare the patient's face, hair, body proportions, and overall appearance DIRECTLY against the patient in 'mike-and-doc.png'
- If there are ANY differences in facial features, hair style, body proportions, or character design - flag it as an issue

Review this image THOROUGHLY for:

**IMPORTANT: If this is a timeline, infographic, or multi-panel image, check EACH panel/stage individually for all issues below.**

1. **INACCURACIES OR MISREPRESENTATIONS:**
   - Malformed or incorrectly proportioned person (wrong anatomy, distorted body parts)
   - **CRITICAL: Patient wearing TWO boots (one on each foot)** - Patient should only wear ONE boot on the injured foot, the other foot should be in regular shoe/sneaker. Check EVERY panel/stage in timeline images - this is a common error.
   - **CRITICAL: In timeline/infographic images, check EACH stage/panel separately** - Week 0-2, Week 4-6, Week 8, Week 12, Month 12, etc. Each must show only ONE boot on the injured foot.
   - Incorrect product representation:
     * VACOped boot that doesn't look like VACOped (should have visible hinges, adjustable design)
     * Aircast boot that doesn't match (should have fixed wedges, simpler design)
     * Generic boot that doesn't match either specification
   - **Note: Grant (the patient) can wear VACOped, Aircast (black boot), or other boots - all are valid options. Show variety across images to reinforce this message.**
   - Wedges shown OUTSIDE the boot instead of INSIDE (wedges go under heel inside boot)
   - Wrong medical equipment or devices
   - Incorrect boot positioning or angle
   - Products with wrong colors, shapes, or features

2. **DANGERS (CRITICAL - HIGHEST PRIORITY):**
   - Foot shown dorsiflexed (toes up, foot bent upward) when it should be in plantarflexion (pointed down) during recovery phases (weeks 0-12)
   - This is the MOST DANGEROUS error - can mislead patients
   - Aggressive stretching shown during early recovery (weeks 0-12)
   - Unsafe positions or activities
   - Night splint holding foot in dorsiflexion (WRONG - must be plantarflexion)

3. **STYLISTIC ALIGNMENT:**
   - Should be in Tintin cartoon style (Hergé-inspired, clean lines, clear colors, clear line art)
   - Wrong art style (photorealistic, 3D render, different cartoon style, etc.)
   - Inconsistent with Tintin aesthetic

4. **CHARACTER CONSISTENCY:**
   - **CRITICAL: Characters must match 'mike-and-doc.png' EXACTLY** - This is the primary character reference showing the correct doctor and patient appearance, style, and level of detail
   - **CRITICAL: If patient looks like Tintin (quiff hairstyle, round face, distinctive cartoon character) - THIS IS WRONG and must be flagged**
   - **CRITICAL: Patient must look like a realistic person in cartoon style, NOT like Tintin or any famous cartoon character**
   - Doctor: Must be in Thetis green scrubs and crocs ONLY (no other outfits) - match the doctor from 'mike-and-doc.png' EXACTLY
   - Patient: Must match the patient from 'mike-and-doc.png' EXACTLY:
     * Face: Compare facial features directly - nose, eyes, mouth, jawline must match
     * Hair: Short brown hair, styled normally (NOT a quiff like Tintin)
     * Body: Slim build, average height, realistic proportions
     * Age: Appears to be a young adult (not a child, not elderly)
     * Day scenes: white Stan Smiths, blue jeans, white t-shirt
     * Gym scenes: blue shorts, blue t-shirt, blue trainers
     * Bed scenes: subtle checked navy pyjamas
     * Showering/swimming: blue swimming trunks
   - Wrong characters (different age, gender, appearance, looks like Tintin or other cartoon characters) - must match 'mike-and-doc.png' EXACTLY
   - Wrong outfits for the scene context
   - Multiple characters when only doctor and patient should appear
   - Characters don't match the style/level of detail from 'mike-and-doc.png'
   - Patient character looks like Tintin or any other famous cartoon character (WRONG - must look like a realistic person)

5. **POSITION COMPLIANCE:**
   - Contradicts principles from achilles-recovery-positions.md:
     * Non-surgical is first-line (don't show surgery as default)
     * Boot removal: Week 10-12 (not earlier)
     * Early weight-bearing as tolerated from day 1
     * Avoid aggressive stretching until fully healed (12-18 months)
     * Night splint holds foot in plantarflexion (pointed down), NOT dorsiflexion
     * Gradual boot weaning over 1-2 weeks
     * Heel lifts during transition (0.5-1cm)

6. **ADDITIONAL RULES:**
   - Only doctor and patient characters should appear (no extra people)
   - Scenes should be appropriate to recovery phase
   - Medical accuracy in all equipment and positioning
   - No contradictory information or mixed messages

${context ? `\nCONTEXT: ${context}\n` : ""}

Provide a detailed review:
1. List ALL issues found (be thorough - check every aspect)
2. Indicate if the image needs regeneration (true if ANY issues found)
3. If regeneration needed, provide an improved prompt that:
   - Fixes ALL issues found
   - Maintains the original intent and composition
   - Includes all required specifications (style, characters, safety rules)
   - Is detailed enough to generate a correct image

Format your response as JSON:
{
  "issues": ["issue 1", "issue 2", ...],
  "needsRegeneration": true/false,
  "improvedPrompt": "detailed prompt for improved image that fixes all issues"
}
`;

    const parts: Array<
        { text: string } | {
            inlineData: { mimeType: string; data: string };
        }
    > = [];

    // Add mike-and-doc.png reference first if available
    if (mikeAndDocImage) {
        parts.push({
            text:
                "REFERENCE IMAGE: This is 'mike-and-doc.png' showing the CORRECT doctor and patient characters. Compare all characters in the image being reviewed against these reference characters. They must match EXACTLY.",
        });
        parts.push({
            inlineData: {
                mimeType: mikeAndDocImage.mimeType,
                data: mikeAndDocImage.data,
            },
        });
    }

    // Add the image being reviewed
    parts.push({
        text:
            "IMAGE TO REVIEW: Compare the characters in this image against the reference characters from 'mike-and-doc.png'.",
    });
    parts.push({
        inlineData: {
            mimeType: imageData.mimeType,
            data: imageData.data,
        },
    });

    // Add the review prompt
    parts.push({ text: reviewPrompt });

    try {
        const result = await model.generateContent(parts);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response (handle markdown code blocks)
        let jsonText = text.trim();
        if (jsonText.includes("```json")) {
            jsonText = jsonText.split("```json")[1].split("```")[0].trim();
        } else if (jsonText.includes("```")) {
            jsonText = jsonText.split("```")[1].split("```")[0].trim();
        }

        const review = JSON.parse(jsonText);
        return review;
    } catch (error: any) {
        console.error("Error reviewing image:", error.message);
        throw error;
    }
}

async function generateImprovedImage(
    originalPrompt: string,
    issues: string[],
    improvedPrompt: string,
    outputPath: string,
    originalImagePath?: string,
): Promise<void> {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    const inputDir = path.join(process.cwd(), "input");
    const referenceImages = getReferenceImages(inputDir);

    const parts: Array<
        { text: string } | {
            inlineData: { mimeType: string; data: string };
        }
    > = [];

    // Add reference images if available
    if (referenceImages.length > 0) {
        const hasMikeAndDoc = referenceImages.some((img) =>
            img.filename.toLowerCase() === "mike-and-doc.png"
        );

        if (hasMikeAndDoc) {
            parts.push({
                text:
                    "CRITICAL: Use 'mike-and-doc.png' as the PRIMARY character reference. This image shows the exact doctor and patient characters you must use. Match their appearance, style, and level of detail EXACTLY. The doctor is in Thetis green scrubs and crocs. The patient is a 40-year-old white male, slim, average height. Use this reference for ALL character appearances.",
            });
        } else {
            parts.push({
                text:
                    "Use the following reference image(s) to guide the visual style and characters. Maintain consistency with these characters and art style:",
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
    }

    // Add original image for reference if provided
    if (originalImagePath && fs.existsSync(originalImagePath)) {
        const originalImage = getImageAsBase64(originalImagePath);
        parts.push({
            text:
                "This is the original image that needs improvement. Fix the issues while maintaining the overall composition and intent:",
        });
        parts.push({
            inlineData: {
                mimeType: originalImage.mimeType,
                data: originalImage.data,
            },
        });
    }

    // Build the generation prompt
    const hasMikeAndDoc = referenceImages.some((img) =>
        img.filename.toLowerCase() === "mike-and-doc.png"
    );

    const generationPrompt = `
${improvedPrompt}

CRITICAL REQUIREMENTS (MUST FOLLOW):
- Style: ${STYLE_SPEC}
- Characters: ONLY doctor and patient should appear
  ${
        hasMikeAndDoc
            ? "- **USE 'mike-and-doc.png' AS THE PRIMARY CHARACTER REFERENCE** - Match the doctor and patient characters EXACTLY from this image"
            : `- Doctor: ${CHARACTER_SPECS.doctor.description} (${CHARACTER_SPECS.doctor.outfit})
  - Patient: ${CHARACTER_SPECS.patient.description}
    ${
                Object.entries(CHARACTER_SPECS.patient.outfits).map((
                    [scene, outfit],
                ) => `- ${scene}: ${outfit}`).join("\n    ")
            }`
    }
- ${SAFETY_RULES}
- ${ACCURACY_RULES}
- ${POSITION_COMPLIANCE}

Issues to fix:
${issues.map((issue, i) => `${i + 1}. ${issue}`).join("\n")}

IMPORTANT:
- Maintain the original composition and intent
- Fix ALL issues listed above
- Ensure foot position is CORRECT (plantarflexion during recovery, not dorsiflexion)
- ${
        hasMikeAndDoc
            ? "**CRITICAL: Use characters from 'mike-and-doc.png' - match doctor and patient appearance EXACTLY**"
            : "Use correct character outfits for the scene context"
    }
- Match product specifications exactly
- Follow Tintin cartoon style consistently
- Match the level of detail and character style from 'mike-and-doc.png'
- **CRITICAL: Grant should wear ONLY ONE boot on the injured foot. The other foot must be in a regular shoe (white Stan Smiths for day scenes).**
- **IMPORTANT: Grant can wear VACOped, Aircast (black boot), or other boots - show variety across images to reinforce all options are valid.**

Generate an improved version that addresses all issues.
`;

    parts.push({ text: generationPrompt });

    console.log(`\x1b[36mGenerating improved image...\x1b[0m`);

    try {
        const result = await model.generateContent(parts);
        const response = await result.response;

        if (response.candidates && response.candidates.length > 0) {
            const candidate = response.candidates[0];
            const imagePart = candidate.content.parts.find(
                (part: any) => part.inlineData,
            );

            if (imagePart && imagePart.inlineData) {
                const base64Data = imagePart.inlineData.data;
                const buffer = Buffer.from(base64Data, "base64");

                const outputDir = path.dirname(outputPath);
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir, { recursive: true });
                }

                fs.writeFileSync(outputPath, new Uint8Array(buffer));
                console.log(
                    `\x1b[32mSuccess!\x1b[0m Improved image saved to: \x1b[34m${outputPath}\x1b[0m`,
                );
            } else {
                throw new Error("No image data found in response");
            }
        } else {
            throw new Error("No candidates found in response");
        }
    } catch (error: any) {
        console.error(
            "\x1b[31mError generating improved image:\x1b[0m",
            error.message || error,
        );
        throw error;
    }
}

async function main() {
    const imagePath = process.argv[2];
    const outputName = process.argv[3];

    if (!imagePath) {
        console.error("\x1b[31mError: No image path provided.\x1b[0m");
        console.log(
            "Usage: bun src/review-image.ts path/to/image.png [output-name]",
        );
        console.log(
            "\nExample: bun src/review-image.ts ../output/image.png image-improved",
        );
        process.exit(1);
    }

    if (!fs.existsSync(imagePath)) {
        console.error(`\x1b[31mError: Image not found: ${imagePath}\x1b[0m`);
        process.exit(1);
    }

    console.log(`\x1b[36mReviewing image:\x1b[0m ${imagePath}\n`);

    try {
        // Review the image
        const review = await reviewImage(imagePath);

        console.log("\x1b[33m=== REVIEW RESULTS ===\x1b[0m\n");

        if (review.issues.length === 0) {
            console.log(
                "\x1b[32m✓ No issues found! Image is compliant.\x1b[0m",
            );
            return;
        }

        console.log(`\x1b[31mFound ${review.issues.length} issue(s):\x1b[0m\n`);
        review.issues.forEach((issue, i) => {
            console.log(`  ${i + 1}. ${issue}`);
        });

        if (!review.needsRegeneration) {
            console.log(
                "\n\x1b[33mNote: Issues found but regeneration not required.\x1b[0m",
            );
            return;
        }

        console.log("\n\x1b[36m=== GENERATING IMPROVED VERSION ===\x1b[0m\n");

        // Determine output path
        const imageDir = path.dirname(imagePath);
        const imageName = path.basename(imagePath, path.extname(imagePath));
        const ext = path.extname(imagePath);

        let outputFileName: string;
        if (outputName) {
            outputFileName = outputName.endsWith(ext)
                ? outputName
                : `${outputName}${ext}`;
        } else {
            // Generate numbered version (file-2, file-3, etc.)
            let version = 2;
            while (true) {
                const candidate = `${imageName}-${version}${ext}`;
                const candidatePath = path.join(imageDir, candidate);
                if (!fs.existsSync(candidatePath)) {
                    outputFileName = candidate;
                    break;
                }
                version++;
            }
        }

        const outputPath = path.join(imageDir, outputFileName);

        // Generate improved image
        await generateImprovedImage(
            "", // Original prompt not available
            review.issues,
            review.improvedPrompt,
            outputPath,
            imagePath,
        );

        console.log(
            `\n\x1b[32m✓ Review complete! Improved image saved.\x1b[0m`,
        );
    } catch (error: any) {
        console.error(
            "\x1b[31mError:\x1b[0m",
            error.message || error,
        );
        process.exit(1);
    }
}

main().catch(console.error);
