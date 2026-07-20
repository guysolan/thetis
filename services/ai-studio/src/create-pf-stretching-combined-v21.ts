import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnv } from "./load-env";

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const inputDir = path.join(root, "input");
const outputPath = path.join(
    root,
    "output/pf-plantar-fasciitis-guide-stretching-exercises-worksheet-combined-achilles-style-v21.png",
);

function loadPng(relativePath: string) {
    const filePath = path.join(root, relativePath);
    return {
        mimeType: "image/png" as const,
        data: fs.readFileSync(filePath).toString("base64"),
    };
}

const prompt = `Create ONE original patient-education infographic (landscape or wide square), Thetis Achilles-course cartoon style: clean Tintin-like outlines, warm cream paper background, subtle flat color, crisp readable sans-serif text.

Title centered at top:
"Plantar Fasciitis: a guide to Stretching Exercises"

Use ONE consistent patient character in every panel — Mike: slim white male ~40, short brown hair, white t-shirt, blue jeans. Match the CHARACTER REFERENCE likeness.

Layout: TWO columns (page 1 left, page 2 right), thin vertical divider. Use the LAYOUT REFERENCE only for pose ideas / panel placement — DO NOT copy its lettering or line art. Write fresh instructional copy with the same clinical meaning (paraphrase; do not quote the source handout verbatim).

LEFT COLUMN panels (top to bottom):
1) Seated toe / arch stretch — sit on chair, foot on opposite knee, pull toes and ball of foot toward shin. Hold 10 seconds × 10, 2–3× daily.
2) Towel calf/arch stretch — sit with leg straight, towel looped over foot including toes, pull toward you. Hold 10 seconds × 10, 2–3× daily. (May show a small kneeling towel setup as an alternate.)
3) Ice note (text-focused): wrap ice pack in a cloth; never ice bare skin; 20 minutes, 2–3× daily.
4) Easy tibialis / arch raise — both feet tip-toes, lift arches. 10–15 reps, 3× daily.
5) Harder single-leg tip-toe — stand tall, one leg lifted, raise heel to tip-toe, lower to ~1 inch off floor and hold 2 seconds. 10–15 reps, 3× daily.

RIGHT COLUMN panels (top to bottom):
1) Balance — stand on one foot; progress to eyes closed; aim for 30 seconds; practice a couple of minutes; 3× daily.
2) Wall calf stretch (label "1") — lean into wall, back knee straight, heel on floor; feel stretch up back of leg. Hold 10 seconds × 10, 2–3× daily.
3) Foot roll massage (label "2") — seated, roll arch over a can or bottle. ~20 minutes, 3× daily.
4) Step stretch (label "3") — heels hang off bottom step edge; stretch back of leg. Hold 10 seconds × 10, 2–3× daily.

Design rules:
- Legible text, correct spelling, no typos
- No logos, hashtags, URLs, or watermarks
- Professional physiotherapy handout look
- Output a single final image`;

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const mike = loadPng("input/mike-and-doc.png");
    const layout = loadPng(
        "output/pf-plantar-fasciitis-guide-stretching-exercises-worksheet-combined-achilles-style-v20.png",
    );
    const style = loadPng("input/pf-comb-achilles-sample-simple-layout.png");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log("Generating combined Achilles-style stretching worksheet v21...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE for Mike/patient only — match face, hair, body, white t-shirt / jeans look:",
        },
        { inlineData: mike },
        {
            text:
                "STYLE REFERENCE only (line weight, cream paper, flat color). Not for subject matter:",
        },
        { inlineData: style },
        {
            text:
                "LAYOUT REFERENCE only for panel arrangement ideas. Do NOT copy its exact text or artwork — create an original redraw with paraphrased instructions:",
        },
        { inlineData: layout },
        { text: prompt },
    ]);

    const response = await result.response;
    const candidate = response.candidates?.[0];
    console.log("finishReason:", candidate?.finishReason);

    const imagePart = candidate?.content?.parts?.find(
        (part: { inlineData?: { data: string } }) => part.inlineData,
    );

    if (!imagePart?.inlineData) {
        console.error(
            "No image returned. Parts:",
            candidate?.content?.parts?.map((p) => Object.keys(p)),
        );
        console.error(
            "promptFeedback:",
            JSON.stringify(response.promptFeedback, null, 2),
        );
        process.exit(1);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(
        outputPath,
        Buffer.from(imagePart.inlineData.data, "base64"),
    );
    console.log("Saved:", outputPath);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
