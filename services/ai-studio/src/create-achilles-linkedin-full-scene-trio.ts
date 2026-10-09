import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnv } from "./load-env";

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.resolve(__dirname, "../input");
const outputDir = path.resolve(__dirname, "../output");

function loadPng(filename: string, dir = inputDir) {
    const filePath = path.join(dir, filename);
    return {
        mimeType: "image/png" as const,
        data: fs.readFileSync(filePath).toString("base64"),
        filename,
    };
}

const houseStyle = `
HOUSE STYLE — match the attached STYLE infographic (full illustrated clinic, NOT a left-photo / right-cards template):
- One square 1:1 LinkedIn image (~1080x1080).
- Title sits ON the clinic scene at the top (not a separate sage header bar with a boxed photo).
- Doc and Mike are LARGE in the room, same London clinic (wood floor, plant, Big Ben / red bus windows, medical cart).
- Compact info cards along the BOTTOM of the scene, then a dark-green rounded banner.
- Forest-green + cream. Flat cartoon line-art.
- Perfect spelling. No hashtags, URLs, logos, no extra text on screens.

CHARACTERS from mike-and-doc.png EXACTLY:
- Doc: older, balding, white hair at sides, white beard, round glasses, Thetis-green scrubs, green crocs, yellow clipboard.
- Mike: 40s, slim, short brown hair, white t-shirt, blue jeans.

DO NOT make a Canva-style split layout (illustration in a rounded rectangle on the left, stacked white cards on the right). The whole graphic is one illustrated room.
`;

const variants = [
    {
        filename: "achilles-treatment-not-one-size-linkedin-mike-doc-v3.png",
        prompt: `Create a LinkedIn infographic.

THIS IS ACHILLES RUPTURE. Mike sits on a wooden chair with ONE black walking boot on the injured foot and a white sneaker on the other. Doc explains options — shared decision, not selling surgery.

Eyebrow: ACHILLES RUPTURE
Title: Not One-Size-Fits-All
Subtitle: Which treatment is right for this patient?

Whiteboard behind them, short labels:
SURGERY  |  NON-SURGICAL
Patient first

THREE bottom cards:
1. SURGERY — May lower re-rupture risk. Adds wound risk.
2. NON-SURGICAL — Avoids operative risk. Needs rehab commitment.
3. THE PERSON — Age, goals, health, injury, preference.

Banner: Shared decision-making — not the same pathway for every rupture.

${houseStyle}`,
    },
    {
        filename: "achilles-early-mobilisation-linkedin-mike-doc-v3.png",
        prompt: `Create a LinkedIn infographic.

THIS IS ACHILLES RUPTURE REHAB. Mike is standing / taking a careful step in ONE black walking boot; other foot a white sneaker. Doc coaches him — controlled movement, not rushing.

Eyebrow: ACHILLES REHABILITATION
Title: Recovery Isn't Only Protection
Subtitle: Early movement — without rushing the repair

Whiteboard:
PROTECT  →  LOAD  →  REBUILD

THREE bottom cards:
1. PROTECT — Guard the healing tendon
2. LOAD — Increase demand slowly
3. REBUILD — Restore strength and function

Banner: Early mobilisation is not the same as rushing recovery.
Small line under: Too much upward ankle motion too early can lengthen the tendon.

${houseStyle}`,
    },
    {
        filename: "achilles-return-to-sport-vs-function-linkedin-mike-doc-v3.png",
        prompt: `Create a LinkedIn infographic.

THIS IS LATER ACHILLES RECOVERY. Mike has NO walking boot. White sneakers on BOTH feet. He looks stronger but not fully match-fit — Doc is assessing return-to-sport readiness (maybe a calf raise or single-leg stance). Serious, encouraging, not a party.

Eyebrow: ACHILLES RUPTURE
Title: Sport Is Not the Same as Function
Subtitle: Walking without pain is not clearance for sport

Whiteboard:
~80% return to activity
10-30% weaker push-off at 1 year

THREE bottom cards:
1. STRENGTH — Calf and tendon capacity
2. SKILL — Elastic, sport-specific movement
3. MINDSET — Psychological readiness

Banner: Return to sport is a process — not a single date.

${houseStyle}`,
    },
];

async function generateOne(
    model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]>,
    mikeAndDoc: ReturnType<typeof loadPng>,
    styleRef: ReturnType<typeof loadPng>,
    variant: (typeof variants)[number],
) {
    console.log(`Generating ${variant.filename}...`);
    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE: Match Doc and Mike EXACTLY from this image.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
            },
        },
        {
            text:
                "LAYOUT / STYLE REFERENCE: Copy this FULL-SCENE infographic structure (title over the clinic, characters in the room, cards along the bottom, green banner). Do NOT copy its plantar fasciitis wording. Do NOT turn it into a left-image / right-cards template.",
        },
        {
            inlineData: {
                mimeType: styleRef.mimeType,
                data: styleRef.data,
            },
        },
        { text: variant.prompt },
    ]);

    const response = await result.response;
    const imagePart = response.candidates?.[0]?.content?.parts?.find(
        (part: { inlineData?: { data?: string } }) => part.inlineData?.data,
    );
    if (!imagePart?.inlineData?.data) {
        throw new Error(`No image for ${variant.filename}`);
    }
    const outPath = path.join(outputDir, variant.filename);
    fs.writeFileSync(outPath, Buffer.from(imagePart.inlineData.data, "base64"));
    console.log(`Saved ${outPath}`);
}

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const mikeAndDoc = loadPng("mike-and-doc.png");
    const styleRef = loadPng(
        "pf-when-to-seek-help-linkedin-mike-doc-v2.png",
        outputDir,
    );

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
        generationConfig: {
            // @ts-expect-error imageConfig is supported by Gemini image models
            imageConfig: { aspectRatio: "1:1" },
        },
    });

    fs.mkdirSync(outputDir, { recursive: true });
    for (const variant of variants) {
        await generateOne(model, mikeAndDoc, styleRef, variant);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
