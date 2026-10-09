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
    "achilles-rehab-timeline-steps-linkedin-mike-doc-v1.png",
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

THIS POST: Achilles rupture rehab is not a random list of exercises. It is the RIGHT exercise at the RIGHT STAGE. Progression: protection → mobility → strength → balance → functional activity. Early weeks protect the healing tendon. Later stages rebuild strength, mobility and function. Do not rush stretching or loading.

NEW SETTING — a bright CLINIC STAIRWELL / rehab stairs: wide wooden or cream training steps, a forest-green handrail, a high window with trees and sky (NO Big Ben, NO red bus). Not a consult room. Not an outdoor running track. Not a gym with three floor circles labelled PROTECT / LOAD / FUNCTION. Not a balance scale.

NEW COMPOSITION — visual hook is FIVE WIDE STEPS rising left to right, used as a rehab TIMELINE. Each step has a short label on the riser:

PROTECT
MOBILITY
STRENGTH
BALANCE
FUNCTION

Tiny optional captions on the treads (keep short, perfect spelling):
Walking
Band work
Heel raises
Single-leg
Stairs

Mike stands on the STRENGTH step, mid-rehab: white t-shirt, blue jeans, ONE black walking boot and one white sneaker, one hand on the rail, starting a careful double-leg heel raise. Hopeful, concentrated. He is NOT at the top yet.

DOC CHARACTER (critical): older man, balding with white hair at the sides, full white beard, round glasses, Thetis-green scrubs, GREEN CROCS, yellow clipboard. He stands on the floor beside the stairs, pointing up to BALANCE as the next stage. Coaching, not lecturing at a whiteboard. Do not stand in front of any step label.

TEXT — print these words only. Never print Eyebrow, Title, or Subtitle:

Top: ACHILLES REHABILITATION
Title: The Right Exercise at the Right Stage
Line under title: Protection. Mobility. Strength. Balance. Function.

Slim bottom caption:
Early weeks protect the tendon. Later stages rebuild strength.

DESIGN:
- Same Mike and Doc faces/clothes as the character reference
- Forest-green + cream, flat cartoon line-art, perfect spelling
- No percentages, hashtags, URLs, logos
- No Canva left-photo / right-cards template
- No three equal icon cards along the bottom
- No giant comedy props
- No outdoor track finish lines
- No gym floor dots labelled PROTECT / LOAD / FUNCTION
- All step labels fully visible
- Show the boot clearly. Do not put Mike in two boots or a cast.`;

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

    console.log("Generating rehab-timeline stairs graphic...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE ONLY: Match Doc and Mike faces, bodies, and clothing from this image EXACTLY. Doc: balding, white hair at sides, white beard, round glasses, green scrubs, green crocs. Change the SETTING to a clinic stairwell with wide rehab steps. Do not copy this consult-room composition. Do not hide step labels behind people.",
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
