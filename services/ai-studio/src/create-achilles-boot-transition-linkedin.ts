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
    "achilles-boot-transition-gait-linkedin-mike-doc-v1.png",
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

THIS POST: The walking boot comes off after Achilles rupture. That is a milestone, but the next job is restoring a natural walk. People may limp, load one side more, or fail to push off. Rehab is not just wearing the boot less. Restore heel-to-toe, even weight, then increase activity. Respect the healing tendon.

DO NOT COPY:
- Hospital ward with Doc kneeling at a raised boot and a crutch
- Ultrasound scan room
- Gym floor circles PROTECT / LOAD / FUNCTION
- Treatment-room slider, track finish lines, hop-test board, labelled stairs, kitchen, park gate, consult lecture, balance scale

NEW SETTING — a GAIT LAB / physio walkway: pale floor with a taped walking lane, a chair or bench on the side, a window with trees (NO Big Ben, NO red bus). Not a hospital bed. Not an imaging room.

NEW COMPOSITION — visual hook is HEEL-TO-TOE footprints on the walkway:

HEEL  →  TOE

Three or four clear footprint pairs on the lane. Mike is mid-step in TWO white sneakers, white t-shirt, blue jeans, rolling from heel toward toe on the injured side. The unused black walking boot sits on the bench — the boot phase is over.

DOC: older, balding, white hair at sides, full white beard, round glasses, Thetis-green scrubs, GREEN CROCS, yellow clipboard. He watches the gait from the side, pointing at the heel-to-toe prints. Coaching the walk, not lecturing at a whiteboard.

TEXT — print these words only. Never print Eyebrow, Title, or Subtitle:

Top: ACHILLES RECOVERY
Title: The Boot Comes Off. What Comes Next?
Line under title: Walking without a boot is not the whole job

On the floor prints, spelled exactly:
HEEL
TOE

Slim bottom caption:
Restore the walk — then increase activity.

DESIGN:
- Forest-green + cream, flat cartoon line-art, perfect spelling
- No percentages, hashtags, URLs, logos
- No Canva left-photo / right-cards template
- No three equal icon cards along the bottom
- No giant comedy props
- No crutches. No hospital bed.
- Mike wears two sneakers. Boot is only on the bench.`;

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

    console.log("Generating boot-transition gait graphic...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE ONLY: Match Doc and Mike faces, bodies, and clothing from this image EXACTLY. Doc: balding, white hair at sides, white beard, round glasses, green scrubs, green crocs. New setting: gait walkway. Do not copy this consult-room composition.",
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
