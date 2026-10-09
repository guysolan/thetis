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
    "../output/pf-when-to-seek-help-linkedin-mike-doc-v1.png",
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

MATCH THE HOUSE STYLE of the stretching LinkedIn graphic: same clinic room (London windows, plant, wood floor, medical cart), same flat cartoon line-art, same forest-green + sage + cream palette, same typography hierarchy (eyebrow, bold title, subtitle,  cards, dark-green rounded banner, footer line).

CHARACTERS — match mike-and-doc.png EXACTLY:
- Doc: older man, balding with white hair at the sides, white beard, round glasses, Thetis-green scrubs, green crocs, yellow clipboard.
- Mike: 40s, slim, short brown hair, white t-shirt, blue jeans, white sneakers.
- THIS IS PLANTAR FASCIITIS / HEEL PAIN — NOT Achilles rupture. NO walking boot. NO cast. Mike wears normal white sneakers on BOTH feet.

TOPIC:
Eyebrow (small, spaced, dark green):
"PLANTAR FASCIITIS"

Title (large, bold, dark green, perfectly spelled):
"When Is It Time to Seek Further Help?"

Subtitle:
"Most people improve with Level 1. If you're not better after 3 months, talk to a specialist."

MAIN SCENE (upper-middle, the visual hook):
Same bright clinic. Mike sits on a wooden exam stool, one heel slightly favoured, looking concerned but hopeful — he has done the basics, but the pain hasn't settled. Doc stands beside him with the clipboard, reassuring, pointing to a simple wall chart or badge that clearly shows:

LEVEL 1  →  3 MONTHS  →  SPECIALIST REVIEW

A large, easy-to-read "3 MONTHS" marker is the visual centrepiece (calendar page, badge, or chart). This is a checkpoint, not a failure. Warm, professional, not alarming.

Optional small Level 1 / Level 2 labels only — do NOT draw a busy inverted pyramid that crowds the characters.

THREE COMPACT CARDS in a row (or 1x3) below the scene. Short text, perfect spelling:

1. CONFIRM THE DIAGNOSIS
Make sure heel pain is plantar fasciitis

2. ASSESS SEVERITY
Check tissue changes and why it's stuck

3. PLAN THE NEXT STEP
Choose the least invasive option that fits

BOTTOM BANNER — rounded dark-green bar, white text, perfectly spelled:
"Level 2 is a review — not a jump to procedures."

Small footer line:
"A scan may help. An injection is sometimes considered — after reassessment."

DESIGN RULES:
- Perfect spelling. Legible text. No typos. No hashtags. No URLs. No logos.
- Plenty of breathing room. Not cluttered.
- Professional, reassuring patient-education tone.
- Keep Mike and Doc as the visual focus.
- Do not invent extra medical claims or statistics.
- Do not show syringes as the hero — the message is review first, procedures later if needed.`;

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const mikeAndDoc = loadPng("mike-and-doc.png");
    const threeLevels = loadPng("pf-three-levels-of-treatment-source.png");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log("Generating When to Seek Help LinkedIn graphic...");

    const result = await model.generateContent([
        {
            text:
                "CRITICAL character reference: Use 'mike-and-doc.png' EXACTLY for Doc and Mike — same faces, body types, clothing, and illustration quality. Match them precisely. This is plantar fasciitis education: Mike must NOT wear a walking boot.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
            },
        },
        {
            text:
                "Optional hierarchy context only (Level 1 biggest, then Level 2, then surgery). Do NOT copy this pyramid as the main layout. This graphic is about the 3-month specialist-review checkpoint after Level 1.",
        },
        {
            inlineData: {
                mimeType: threeLevels.mimeType,
                data: threeLevels.data,
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
