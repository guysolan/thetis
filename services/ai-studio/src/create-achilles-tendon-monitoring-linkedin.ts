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
    "achilles-tendon-monitoring-swe-linkedin-mike-doc-v2.png",
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

THIS POST: What if we could measure Achilles tendon recovery more objectively? Shear wave elastography (SWE) is an emerging ultrasound tool that can quantify tendon elasticity. Research tracked elasticity rising over recovery. It might help individualise rehab, alongside time, symptoms and functional testing. It is emerging — not standard care. Do not invent numbers. Do not print percentages.

DO NOT COPY:
- Hop-test gym with HEALED / READY clipboard
- Outdoor track finish lines
- Treatment-room loading slider (too little / controlled / too much)
- Corridor walk, gym floor circles, labelled stairs, kitchen, park gate, consult lecture, balance scale

NEW SETTING — a small IMAGING / ULTRASOUND ROOM: cream walls, wooden floor, a treatment plinth, a cartoon ultrasound machine with a simple screen. Window with trees (no Big Ben, no red bus). Quiet, clinical, uncluttered.

NEW COMPOSITION — visual hook is the SCAN of the ACHILLES TENDON, not the calf.
Mike lies prone. White t-shirt. Jeans ROLLED UP to the knee on the injured leg so the calf, Achilles, and heel are bare. The injured foot hangs slightly off the end of the plinth or is turned so the back of the ankle is obvious. The black walking boot is on the floor.

CRITICAL: Doc's scanning hand holds a small ultrasound probe directly on the ACHILLES TENDON — the thick cord on the back of the ankle, immediately ABOVE THE HEEL. Not on the calf. Not on the jeans. Not mid-shin. The probe touches the tendon just above the heel bone.

The ultrasound SCREEN is large and readable. It shows a simple cartoon rising line graph, not a realistic medical scan. Labels on the screen, spelled exactly:
Elasticity
Early → Later

A small side note on the machine, spelled exactly:
Emerging tool

DOC: older, balding, white hair at sides, full white beard, round glasses, Thetis-green scrubs, GREEN CROCS. Focused, explaining the screen. Not a mad scientist. No giant comedy probe.

TEXT — print these words only. Never print Eyebrow, Title, or Subtitle:

Top: ACHILLES REHABILITATION
Title: Monitoring Tendon Recovery
Line under title: More than time and symptoms

Screen:
Elasticity
Early → Later
Emerging tool

Slim bottom caption:
Objective data can help — it is still emerging.

DESIGN:
- Forest-green + cream, flat cartoon line-art, perfect spelling
- No percentages, hashtags, URLs, logos
- No Canva left-photo / right-cards template
- No three equal icon cards along the bottom
- Do not write Shear Wave Elastography on the image (too easy to misspell). The graph and "Emerging tool" are enough.
- Do not show two boots or a cast on Mike.
- The probe must be on the Achilles above the heel. If it sits on the calf, the image is wrong.`;

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const mikeAndDoc = loadPng("mike-and-doc.png");
    const layoutRefPath = path.join(
        outputDir,
        "achilles-tendon-monitoring-swe-linkedin-mike-doc-v1.png",
    );
    const layoutRef = {
        mimeType: "image/png" as const,
        data: fs.readFileSync(layoutRefPath).toString("base64"),
    };
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
        generationConfig: {
            // @ts-expect-error imageConfig is supported by Gemini image models
            imageConfig: { aspectRatio: "1:1" },
        },
    });

    console.log("Generating tendon-monitoring ultrasound graphic...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE ONLY: Match Doc and Mike faces, bodies, and clothing from this image EXACTLY. Doc: balding, white hair at sides, white beard, round glasses, green scrubs, green crocs.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
            },
        },
        {
            text:
                "LAYOUT REFERENCE: Keep this same ultrasound room, titles, graph, and characters. The problem is the probe is on the CALF. Redraw so the probe is on the ACHILLES TENDON just above the heel. Roll the jeans up. Show the heel and tendon.",
        },
        {
            inlineData: {
                mimeType: layoutRef.mimeType,
                data: layoutRef.data,
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
