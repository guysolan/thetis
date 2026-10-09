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
    "../output/pf-gastroc-recession-linkedin-mike-doc-v1.png",
);

function loadPng(filename: string) {
    const filePath = path.join(inputDir, filename);
    return {
        mimeType: "image/png" as const,
        data: fs.readFileSync(filePath).toString("base64"),
        filename,
    };
}

const prompt = `Create a single square 1:1 LinkedIn educational infographic (~1080x1080). Clean, professional, readable as a thumbnail.

MATCH THE HOUSE STYLE of the Thetis plantar-fasciitis LinkedIn series (clinic + cards + banner):
- Same London clinic: wood floor, plant, windows with Big Ben / red bus, medical cart softly in the background.
- Same flat cartoon line-art, forest-green + sage + cream palette.
- Same typography hierarchy: small eyebrow, bold title, subtitle, three cards, dark-green rounded banner, footer line.

CHARACTERS — match mike-and-doc.png EXACTLY:
- Doc: older man, balding with white hair at the sides, white beard, round glasses, Thetis-green scrubs, green crocs, yellow clipboard nearby.
- Mike: 40s, slim, short brown hair, white t-shirt. In the exam he may have jeans rolled or shorts so the calf is visible. White sneakers off to the side or on the other foot.
- THIS IS PLANTAR FASCIITIS / HEEL PAIN — NOT Achilles rupture. NO walking boot. NO cast. NO blood. NO open surgery. NO scalpels.

TOPIC:
Eyebrow (small, spaced, dark green):
"GASTROCNEMIUS RECESSION"

Title (large, bold, dark green, perfectly spelled):
"When Is Calf Release Appropriate?"

Subtitle:
"For persistent heel pain with confirmed gastrocnemius tightness — after non-operative care."

MAIN SCENE (upper-middle, the visual hook):
Same bright clinic. Mike sits or lies on the exam couch. Doc is performing a Silfverskiold-style calf test: comparing ankle dorsiflexion with the knee straight versus the knee bent. Professional, calm, educational — not alarming.

On a simple whiteboard or wall chart next to them, a clean two-state diagram only (no busy anatomy table):
KNEE STRAIGHT → limited upward ankle motion
KNEE BENT → motion improves
= isolated gastrocnemius tightness

Optional tiny chain labels on the chart: CALF → ACHILLES → HEEL → FASCIA
Do NOT copy a 5-level surgical anatomy poster. Do NOT show operating-theatre scenes.

THREE COMPACT CARDS in a row below the scene. Short text, perfect spelling:

1. CONFIRMED TIGHTNESS
Isolated gastrocnemius contracture

2. NON-OP NOT ENOUGH
After thorough conservative care

3. REDUCE FASCIAL STRAIN
Improve dorsiflexion through the chain

BOTTOM BANNER — rounded dark-green bar, white text, perfectly spelled:
"Select for calf contracture — not plantar fasciitis alone."

Small footer line:
"Evidence is encouraging, but still moderate and mixed."

DESIGN RULES:
- Perfect spelling. Legible text. No typos. No hashtags. No URLs. No logos.
- Spell "Silfverskiold" exactly that way if you label the test (no extra letters).
- Plenty of breathing room. Not cluttered.
- Professional clinician-education tone.
- Keep Mike and Doc as the visual focus.
- Do not invent statistics, percentages, or study names.`;

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

    console.log("Generating gastrocnemius recession LinkedIn graphic...");

    const result = await model.generateContent([
        {
            text:
                "CRITICAL character reference: Use 'mike-and-doc.png' EXACTLY for Doc and Mike — same faces, body types, clothing style, and illustration quality. This is plantar fasciitis education: Mike must NOT wear a walking boot.",
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
