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
    "achilles-early-mobilisation-linkedin-mike-doc-v4.png",
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

THIS POST: Achilles rupture rehab has moved beyond prolonged immobilisation. Early, controlled mobilisation and progressive loading help limit atrophy, keep motion, and support recovery. Early does NOT mean aggressive. Protect the healing tendon. Control ankle movement and loading in the early weeks.

DO NOT COPY these existing graphics:
- Hospital corridor walk with a rail, unused cast, wheelchair, and REST ONLY sign
- Physio gym with three floor circles labelled PROTECT / LOAD / FUNCTION
- London consult room with three footer cards
- Balance scale, track finish lines, labelled clinic stairs, kitchen heel raise, park gate

NEW SETTING — a small TREATMENT ROOM with a cream plinth (exam table). Simple window with trees (no Big Ben, no red bus). Wooden floor. A plant. No parallel bars. No wheelchair. No gym equipment.

NEW COMPOSITION — visual hook is a horizontal LOADING SLIDER on the wall behind the plinth, like a volume bar:

TOO LITTLE    CONTROLLED    TOO MUCH

A forest-green marker sits on CONTROLLED (the middle). Too little = prolonged rest. Too much = aggressive. The point is the middle.

Mike sits on the plinth, legs forward, ONE black walking boot and one white sneaker. Doc stands at the boot, both hands gently guiding the ankle through a SMALL controlled range — coaching, not stretching hard. Same characters as the reference.

DOC: older, balding, white hair at sides, full white beard, round glasses, Thetis-green scrubs, GREEN CROCS, yellow clipboard on the plinth beside him.

TEXT — print these words only. Never print Eyebrow, Title, or Subtitle:

Top: ACHILLES REHABILITATION
Title: Early Mobilisation
Line under title: Controlled. Not aggressive.

Slider labels, spelled exactly:
TOO LITTLE
CONTROLLED
TOO MUCH

Slim bottom caption:
Protect the tendon. Load at the right stage.

DESIGN:
- Forest-green + cream, flat cartoon line-art, perfect spelling
- No percentages, study numbers, hashtags, URLs, logos
- No Canva left-photo / right-cards template
- No three equal icon cards along the bottom
- No floating words around Mike's head
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

    console.log("Generating early-mobilisation treatment-room graphic...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE ONLY: Match Doc and Mike faces, bodies, and clothing from this image EXACTLY. Doc: balding, white hair at sides, white beard, round glasses, green scrubs, green crocs. New setting: treatment room with a plinth. Do not copy this consult-room composition.",
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
