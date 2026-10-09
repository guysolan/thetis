import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnv } from "./load-env";

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.resolve(__dirname, "../input");
const outputPath = path.resolve(
    __dirname,
    "../output/pf-prp-evidence-linkedin-mike-doc-v1.png",
);

function loadImage(filename: string) {
    const filePath = path.join(inputDir, filename);
    const ext = path.extname(filename).toLowerCase();
    const mimeType = ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : "image/png";
    return {
        mimeType: mimeType as "image/png" | "image/jpeg",
        data: fs.readFileSync(filePath).toString("base64"),
        filename,
    };
}

const prompt = `Create a single square 1:1 LinkedIn infographic (~1080x1080) that clinicians will SAVE and COMMENT on.

GOAL: Recreate the attached "Doc with syringe" illustration into a meaningful Thetis graphic. The current photo-illustration looks like an endorsement. The post's point is the OPPOSITE: PRP sounds promising, but the evidence for chronic plantar fasciitis is weak, inconsistent, and not currently recommended.

HOUSE STYLE — match the Thetis PF LinkedIn series:
- Forest-green + sage + cream. Flat cartoon line-art.
- Same London clinic feel as mike-and-doc.png (wood floor, plant, window hint of London), uncluttered.
- Perfect spelling. No hashtags, URLs, logos.

CHARACTERS — match mike-and-doc.png EXACTLY:
- Doc: older, balding, white hair at sides, white beard, round glasses, Thetis-green scrubs, green crocs. Thoughtful, not manic. NO "mad scientist" grin. A normal-sized syringe is OK in his hand (not giant, not scary). PRP in the syringe should look straw-gold / amber plasma, NOT bright cartoon blood-red.
- Mike: 40s, slim, short brown hair, white t-shirt, blue jeans, white sneakers. NO walking boot. NO cast.
- THIS IS PLANTAR FASCIITIS — not Achilles rupture.

LAYOUT (high contrast, readable as a tiny LinkedIn thumbnail):

TOP BAR:
Eyebrow: "PLANTAR FASCIITIS"
Title: "PRP: What Does the Evidence Really Tell Us?"
Subtitle: "Biologically plausible. Clinically unconvincing."

MAIN SCENE (upper-middle):
Same clinic. Mike looks hopeful, asking about a "quick injection". Doc holds a modest PRP syringe but is counselling caution — pointing at a simple whiteboard, not selling the needle.

Whiteboard (short, perfect spelling):
PRP
Potential ≠ proof
Not currently recommended

THREE COMPACT CARDS in a row:

1. SOUNDS PROMISING
Growth factors, healing story

2. EVIDENCE IS WEAK
Small trials, mixed methods

3. BASICS FIRST
Don't skip stretching and load care

BOTTOM BANNER — dark-green rounded bar, white text:
"PRP may have potential. The evidence is still limited."

Clinician hook underneath:
"How do you handle a patient who asks for PRP?"

DESIGN RULES:
- Do not invent statistics, percentages, or study names.
- Do not show needles going into a heel. No blood spray. No giant comedy syringe.
- Do not make PRP look like a miracle or like a scam — honest uncertainty.
- Plenty of breathing room. Not cluttered.
- Spell "PRP" and "plantar fasciitis" correctly.`;

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const mikeAndDoc = loadImage("mike-and-doc.png");
    const source = loadImage("pf-prp-syringe-doc-source.jpg");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
        generationConfig: {
            // @ts-expect-error imageConfig is supported by Gemini image models
            imageConfig: { aspectRatio: "1:1" },
        },
    });

    console.log("Generating PRP evidence LinkedIn graphic...");

    const result = await model.generateContent([
        {
            text:
                "CHARACTER REFERENCE: Use Doc and Mike from this image EXACTLY. No walking boot on Mike.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
            },
        },
        {
            text:
                "SOURCE MOOD TO AVOID: this cheerful giant-syringe picture looks like an endorsement. Keep Doc recognisable, but restyle into a cautious evidence conversation with Mike. Smaller realistic syringe. Straw-gold PRP, not bright red blood.",
        },
        {
            inlineData: {
                mimeType: source.mimeType,
                data: source.data,
            },
        },
        { text: prompt },
    ]);

    const response = await result.response;
    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(
        (part: { inlineData?: { data?: string } }) => part.inlineData?.data,
    );

    if (!imagePart?.inlineData?.data) {
        console.error("No image returned");
        console.log(JSON.stringify(response, null, 2));
        process.exit(1);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
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
