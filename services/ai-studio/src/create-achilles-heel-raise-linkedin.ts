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
    "achilles-heel-raise-strength-linkedin-mike-doc-v4.png",
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

THIS POST: After Achilles rupture, heel raises are not just another exercise. They rebuild calf and Achilles strength. Start around 12–16 weeks once the patient can walk without crutches. Progress DOUBLE-LEG → SINGLE-LEG. The goal is not simply to finish repetitions. It is to restore the tendon’s ability to handle walking, then running, then higher-level activity.

NEW SETTING — a bright HOME KITCHEN / hallway: cream walls, wooden floor, a simple kitchen counter or windowsill Mike can hold, a plant, a window with trees and sky. NO Big Ben. NO red bus. NO clinic stairwell with labelled rehab steps. NO outdoor running track. NO consult room. NO gym floor circles. NO balance scale.

NEW COMPOSITION — SIDE VIEW / PROFILE of a heel raise. This is the visual hook. We see Mike from the side so the lifted heels are obvious.

On a LARGE, readable wall board, three lines spelled EXACTLY (LEG has 3 letters, never LEGG; RUN has 3 letters, never RUNN):
DOUBLE-LEG
SINGLE-LEG
WALK / RUN

Mike is in PROFILE, MID double-leg HEEL RAISE. He stands on the balls of both feet. BOTH heels are high off the floor. His body is slightly risen. White t-shirt, blue jeans, two white sneakers. Unused black walking boot on the floor by the plant. One hand on the counter. He is NOT standing flat. He is NOT marching.

DOC CHARACTER (critical): older man, balding with white hair at the sides, full white beard, round glasses, Thetis-green scrubs, GREEN CROCS, yellow clipboard. He stands beside Mike spotting the raise, coaching — not lecturing at a whiteboard. Do not cover the wall labels.

TEXT — print these words only. Never print Eyebrow, Title, or Subtitle:

Top: ACHILLES REHABILITATION
Title: Strength Before Return
Line under title: Heel raises rebuild the calf and Achilles

Wall tags:
DOUBLE-LEG
SINGLE-LEG
WALK / RUN

Slim bottom caption:
The goal is not the reps — it is what the tendon can handle next.

DESIGN:
- Same Mike and Doc faces/clothes as the character reference
- Forest-green + cream, flat cartoon line-art, perfect spelling
- No percentages, hashtags, URLs, logos
- No Canva left-photo / right-cards template
- No three equal icon cards along the bottom
- No giant comedy props
- No labelled clinic stairs (PROTECT / MOBILITY / STRENGTH / BALANCE / FUNCTION)
- No track finish lines
- Unused walking boot on the floor only. Mike wears two white sneakers.
- BOTH heels must be visibly lifted. Do not show a marching or kicking pose.`;

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

    console.log("Generating heel-raise strength graphic...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE ONLY: Match Doc and Mike faces, bodies, and clothing from this image EXACTLY. Doc: balding, white hair at sides, white beard, round glasses, green scrubs, green crocs. Change the SETTING to a home kitchen. Draw Mike in SIDE VIEW on tiptoe doing a heel raise. Spell DOUBLE-LEG and SINGLE-LEG with one G only. Do not copy this consult-room composition.",
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
