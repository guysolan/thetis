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
    "achilles-beyond-independent-walking-linkedin-mike-doc-v1.png",
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

THIS POST: Independent walking after Achilles rupture is a milestone, not the end of rehab. The tendon has not regained its old capacity. Patients may still have weak push-off, calf weakness, poor balance, or trouble with more activity. Next: calf strength, balance, more walking demand, watch symptoms. Higher activity only when ready. Everyday walking is one stage of a longer process. Do not print months or percentages.

DO NOT COPY:
- Indoor heel-to-toe footprint walkway with the boot on a bench
- Hospital ward, Doc kneeling at a boot, crutches
- Park garden gate, outdoor track finish lines, hop-test HEALED/READY board
- Ultrasound room, loading slider, gym floor circles, labelled clinic stairs, kitchen, consult lecture, balance scale

NEW SETTING — a neighbourhood PARK PATH / pavement: trees, pale sky, a simple path that continues around a gentle bend. NO Big Ben. NO red bus. NO indoor gait tape. NO hospital bed.

NEW COMPOSITION — visual hook is a PASSED MILESTONE:
Mike has just walked past a small wooden post labelled WALKING. He walks independently in two white sneakers, white t-shirt, blue jeans — no boot, no crutches. He looks able to walk, but the path continues ahead.

Further along the path, two short posts (not finish-line banners):
STRENGTH
BALANCE

DOC: older, balding, white hair at sides, full white beard, round glasses, Thetis-green scrubs, GREEN CROCS, yellow clipboard. He walks beside Mike, pointing forward along the path — the work is not finished. Coaching, not lecturing.

TEXT — print these words only. Never print Eyebrow, Title, or Subtitle:

Top: ACHILLES RECOVERY
Title: Independent Walking Is Not the End
Line under title: Everyday walking is one stage

Path posts, spelled exactly:
WALKING
STRENGTH
BALANCE

Slim bottom caption:
The tendon still needs more than a normal walk.

DESIGN:
- Forest-green + cream, flat cartoon line-art, perfect spelling
- No percentages, hashtags, URLs, logos
- No Canva left-photo / right-cards template
- No three equal icon cards along the bottom
- No giant comedy props
- No walking boot on Mike. No crutches.
- Do not use two track banners or a closed garden gate.`;

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

    console.log("Generating beyond-independent-walking path graphic...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE ONLY: Match Doc and Mike faces, bodies, and clothing from this image EXACTLY. Doc: balding, white hair at sides, white beard, round glasses, green scrubs, green crocs. New setting: outdoor neighbourhood path. Do not copy this consult-room composition.",
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
