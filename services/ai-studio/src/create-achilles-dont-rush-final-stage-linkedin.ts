import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnv } from "./load-env";

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.resolve(__dirname, "../input");
const outputDir = path.resolve(__dirname, "../output");
const outputPath = path.join(
    outputDir,
    "achilles-dont-rush-final-stage-linkedin-mike-doc-v1.png",
);

function loadPng(filename: string) {
    const filePath = path.join(inputDir, filename);
    return {
        mimeType: "image/png" as const,
        data: fs.readFileSync(filePath).toString("base64"),
        filename,
    };
}

const prompt = `Create a single square 1:1 LinkedIn infographic (~1080x1080).

THIS POST: After Achilles rupture, do not rush the final stage. Knowing when the tendon is ready for more is hard. Later-stage work (single-leg balance, stairs, progressive walking) bridges basic rehab and everyday life or sport. Ready is NOT a week number. Strength, mobility, control and load tolerance all matter. Progress the individual patient.

NEW SETTING — a neighbourhood PARK with a wooden garden GATE on a path. Grass, trees, pale sky. Beyond the half-closed gate, a path continues toward distant park stairs. NO Big Ben. NO red bus. NO consult room. NO clinic stairwell with labelled rehab steps. NO home kitchen. NO running-track finish lines. NO gym floor circles. NO balance scale.

NEW COMPOSITION — visual hook is the GATE as a checkpoint, not a finish line.
- THIS SIDE of the gate (near us): rehab / control
- THROUGH the gate: higher-level activity
The gate is HALF CLOSED. Doc’s hand is on the latch — not opening it yet.

On the gate, four short words only, spelled exactly:
Strength
Mobility
Control
Load

Mike stands on THIS side of the gate, doing a SINGLE-LEG BALANCE: one white sneaker on the path, the other foot lifted. White t-shirt, blue jeans. Unused black walking boot sits on a park bench. Concentrated, steady, not rushing through.

DOC CHARACTER (critical): older man, balding with white hair at the sides, full white beard, round glasses, Thetis-green scrubs, GREEN CROCS, yellow clipboard. He stands at the latch, coaching patience. Do not cover the gate words.

TEXT — print these words only. Never print Eyebrow, Title, or Subtitle:

Top: ACHILLES REHABILITATION
Title: Do Not Rush the Final Stage
Line under title: Ready is not a week number

Gate words:
Strength
Mobility
Control
Load

Slim bottom caption:
Progress the person — not the calendar.

DESIGN:
- Same Mike and Doc faces/clothes as the character reference
- Forest-green + cream, flat cartoon line-art, perfect spelling
- No percentages, hashtags, URLs, logos
- No Canva left-photo / right-cards template
- No three equal icon cards along the bottom
- No giant comedy props
- No labelled clinic stairs
- No two track banners saying Everyday Activity and High-Demand Sport
- Spell Strength, Mobility, Control, Load exactly. One word per line.`;

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const mikeAndDoc = loadPng("mike-and-doc.png");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
        generationConfig: {
            // @ts-expect-error imageConfig is supported by Gemini image models
            imageConfig: { aspectRatio: "1:1" },
        },
    });

    console.log("Generating do-not-rush final-stage graphic...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE ONLY: Match Doc and Mike faces, bodies, and clothing from this image EXACTLY. Doc: balding, white hair at sides, white beard, round glasses, green scrubs, green crocs. Change the SETTING to a park with a garden gate. Do not copy this consult-room composition. Spell every word correctly.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
            },
        },
        { text: prompt },
    ]);

    const response = await result.response;
    const imagePart = response.candidates?.[0]?.content?.parts?.find(
        (part: { inlineData?: { data?: string } }) => part.inlineData?.data,
    );

    if (!imagePart?.inlineData?.data) {
        console.error("No image returned");
        console.log(JSON.stringify(response, null, 2));
        process.exit(1);
    }

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(
        outputPath,
        Buffer.from(imagePart.inlineData.data, "base64"),
    );
    console.log(`Created ${outputPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
