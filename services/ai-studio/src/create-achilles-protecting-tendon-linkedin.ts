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
    "achilles-protecting-healing-tendon-linkedin-mike-doc-v1.png",
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

THIS POST: After Achilles repair, early weight-bearing matters — but the first weeks are about PROTECTING the healing tendon. Follow the protocol. Keep the ankle in the right position in the boot. Progress load carefully. Watch pain and swelling. Do not progress by the calendar alone. Tendon elongation is the risk if people rush.

DO NOT COPY:
- Ultrasound room with a probe on the calf
- Treatment-room loading slider (too little / controlled / too much)
- Gym floor circles PROTECT / LOAD / FUNCTION
- Hospital corridor with unused cast and wheelchair
- Hop-test gym, outdoor track, labelled clinic stairs, kitchen, park gate, consult lecture, balance scale

NEW SETTING — a HOSPITAL WARD / recovery room: a simple cream hospital bed, wooden or pale floor, a window with trees (NO Big Ben, NO red bus). Quiet. Not a gym. Not an imaging suite.

NEW COMPOSITION — visual hook is the FIRST CAREFUL STEP:
Mike stands beside the bed with crutches, taking a small, cautious step. White t-shirt, blue jeans, ONE black walking boot (toes pointing slightly down / protected) and one white sneaker. Concentrated, not rushing.

DOC kneels or stoops at the boot, one hand checking the boot angle / ankle position, yellow clipboard on the bed. Older, balding, white hair at sides, full white beard, round glasses, Thetis-green scrubs, GREEN CROCS. Coaching protection, not waving at a whiteboard.

On the bed sheet or a small card on the bed rail, four short words spelled exactly:
Protocol
Position
Load
Swelling

TEXT — print these words only. Never print Eyebrow, Title, or Subtitle:

Top: ACHILLES RUPTURE
Title: Protecting the Healing Tendon
Line under title: Early weight-bearing still needs care

Slim bottom caption:
Progress the protocol — not the calendar.

DESIGN:
- Forest-green + cream, flat cartoon line-art, perfect spelling
- No percentages, hashtags, URLs, logos
- No Canva left-photo / right-cards template
- No three equal icon cards along the bottom
- No giant comedy props
- Show the boot clearly. Do not put Mike in two boots or a cast.
- Doc must be at the boot, not standing in a lecture pose.`;

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

    console.log("Generating protecting-the-tendon ward graphic...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE ONLY: Match Doc and Mike faces, bodies, and clothing from this image EXACTLY. Doc: balding, white hair at sides, white beard, round glasses, green scrubs, green crocs. New setting: hospital ward. Do not copy this consult-room composition.",
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
