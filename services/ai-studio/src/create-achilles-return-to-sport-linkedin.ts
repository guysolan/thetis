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
    "achilles-return-to-sport-testing-linkedin-mike-doc-v1.png",
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

THIS POST: An Achilles tendon can heal without the patient being ready to perform at their previous level. Everyday walking is not sport readiness. Return to sport is a progressive process: strength, tendon capacity, functional testing, and the demands of the sport. Do not print percentages or study numbers.

DO NOT COPY:
- Outdoor running track with two finish-line banners (Everyday Activity / High-Demand Sport)
- Treatment-room plinth with a too-little / controlled / too-much slider
- Hospital corridor walk, gym floor circles, labelled clinic stairs, kitchen, park gate, consult room, balance scale

NEW SETTING — indoor FUNCTIONAL TESTING GYM: rubber floor, a hop-test mat or taped landing box, a wall mirror, modest gym kit. Cream and forest-green. No Big Ben. No red bus. No outdoor track.

NEW COMPOSITION — visual hook is a large wall CLIPBOARD / clearance board with two stamps:

HEALED   (ticked)
READY    (empty box — not yet)

Under READY, four short lines spelled exactly:
Strength
Capacity
Testing
Sport

Mike stands on the hop-test mat in a ready athletic stance, white t-shirt, blue jeans, ONE black walking boot and one white sneaker. He looks able to walk, but Doc is holding him at the test — not cleared. Unused calendar or "week 12" paper is crossed out on the floor, small.

DOC: older, balding, white hair at sides, full white beard, round glasses, Thetis-green scrubs, GREEN CROCS, yellow clipboard. He points at the empty READY box. Coaching, not lecturing.

TEXT — print these words only. Never print Eyebrow, Title, or Subtitle:

Top: ACHILLES RUPTURE
Title: Return to Sport Is More Than Healing
Line under title: Healed is not the same as ready

Board:
HEALED
READY
Strength
Capacity
Testing
Sport

Slim bottom caption:
Everyday walking is not sport clearance.

DESIGN:
- Same Mike and Doc faces/clothes as the character reference
- Forest-green + cream, flat cartoon line-art, perfect spelling
- No percentages, hashtags, URLs, logos
- No Canva left-photo / right-cards template
- No three equal icon cards along the bottom
- No giant comedy props
- No track finish-line banners
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

    console.log("Generating return-to-sport testing-gym graphic...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE ONLY: Match Doc and Mike faces, bodies, and clothing from this image EXACTLY. Doc: balding, white hair at sides, white beard, round glasses, green scrubs, green crocs. New setting: indoor testing gym. Do not copy this consult-room composition.",
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
