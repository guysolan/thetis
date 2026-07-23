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
    "../output/pf-heel-pain-basics-matter-most-linkedin-mike-doc-v1.png",
);

function loadPng(filename: string) {
    const filePath = path.join(inputDir, filename);
    return {
        mimeType: "image/png" as const,
        data: fs.readFileSync(filePath).toString("base64"),
        filename,
    };
}

const prompt = `Create a single square 1:1 LinkedIn educational infographic (1080x1080), clean and professional, matching the EXACT house style of the character reference: same older bearded doctor ("Doc") in Thetis-green scrubs (or white coat over green scrubs) and green crocs, same friendly patient "Mike/Grant" (40-year-old white male, slim, short brown hair, white t-shirt, jeans). Same flat cartoon line-art illustration style, same Thetis forest-green and sage palette, same modern clinic feel.

TOPIC — follow this LinkedIn post closely:

Title at top, large bold dark green sans-serif:
"Heel Pain Recovery: Why the Basics Matter Most"

Thin green divider under the title.

Short subtitle:
"Recovery begins with the fundamentals — not shortcuts."

MAIN SCENE (center, hero illustration):
Doc stands beside a whiteboard or chart, pointing warmly at a clear 3-level pyramid / stepped ladder diagram. Mike sits on an exam stool listening, looking hopeful (not scared). Mike may have one heel slightly favored or a casual shoe — this is plantar heel pain education, NOT Achilles rupture, so do NOT put him in a big walking boot unless subtle.

On the whiteboard / chart, show the three levels clearly with correct spelling:

LEVEL 1 — FOUNDATION (largest / most important band)
Daily exercises · Load management · Core treatments

LEVEL 2 — FURTHER TREATMENT (smaller band)
Additional options if Level 1 wasn't enough

LEVEL 3 — SURGERY (smallest tip)
Rare — only after appropriate conservative care

Emphasize visually that Level 1 is the foundation (biggest section). Doc is teaching Mike why not to skip the basics.

BOTTOM BANNER — sage/dark green rounded bar with clear white or dark text:
"Don't skip the foundation. Advanced treatments work best after the basics."

Small footer line:
"Build good habits. Progress step by step. Give healing time."

DESIGN RULES:
- Text must be perfectly legible, correctly spelled, no typos.
- No hashtags, no URLs, no logos.
- Plenty of breathing room; readable as a LinkedIn thumbnail.
- Professional, reassuring patient-education tone.
- Keep Mike and Doc as the visual focus alongside the 3-level chart.
- Soft clean clinic background (light sage / off-white), not cluttered.`;

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

    console.log("Generating Mike + Doc LinkedIn graphic...");

    const result = await model.generateContent([
        {
            text:
                "CRITICAL character reference: Use 'mike-and-doc.png' EXACTLY for Doc and Mike/Grant — same faces, body types, clothing style, and illustration quality. Match them precisely.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
            },
        },
        {
            text:
                "Reference for the three-level treatment hierarchy idea (inverted pyramid / funnel — Level 1 biggest, Level 3 smallest). Adapt into a clean LinkedIn infographic with Mike and Doc, using the post wording — not a copy of this exact diagram.",
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
