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
    "achilles-surgery-evidence-linkedin-mike-doc-v2.png",
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

THIS POST IS ABOUT BALANCING EVIDENCE — not a standard consult lecture. Invent a NEW composition. Do NOT copy the usual layout of: Doc on the left, Mike on a chair, small whiteboard, three identical cards along the bottom, green pill banner.

VISUAL HOOK (the unique idea of this post):
A large, clear BALANCE SCALE in the middle of the London clinic.
- LEFT pan labelled: RE-RUPTURE (surgery can lower this)
- RIGHT pan labelled: COMPLICATIONS (surgery can raise this)
The scale is slightly in motion / thoughtfully balanced — the point is a TRADE-OFF, not a winner.

Doc stands beside the scale, explaining. Mike stands (or perches on a stool) in ONE black walking boot + one white sneaker, looking at the scale, taking it in. Same Mike and Doc as the character reference. Same clinic world (wood floor, plant, London windows) but the SCALE is the centrepiece, not a tiny whiteboard.

TEXT — print these words only. Never print Eyebrow, Title, or Subtitle:

Top: ACHILLES RUPTURE
Title: What Does the Evidence Say About Surgery?
Line under title: Not simply surgery vs no surgery

On or under the scale, short:
Early mobilisation + structured rehab
can make longer-term function comparable

Along the floor or as five small hanging tags (NOT three big numbered cards):
Activity  ·  Rehab capacity  ·  Goals  ·  Preferences  ·  Risk

Bottom line (can be a slim caption, not a huge pill):
The decision is a balance — not a default to operate.

DESIGN:
- Forest-green + cream, flat cartoon line-art, perfect spelling
- No percentages, hashtags, URLs, logos
- No Canva left-photo / right-cards template
- No three equal footer cards with icons
- Characters large enough to read as Mike and Doc`;

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

    console.log("Generating varied surgery-evidence layout...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE ONLY (faces, clothes, clinic world). Do NOT copy this image's sitting-consult composition.",
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
