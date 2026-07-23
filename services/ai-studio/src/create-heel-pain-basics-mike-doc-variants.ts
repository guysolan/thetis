import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnv } from "./load-env";

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.resolve(__dirname, "../input");
const outputDir = path.resolve(__dirname, "../output");

function loadPng(filename: string) {
    const filePath = path.join(inputDir, filename);
    return {
        mimeType: "image/png" as const,
        data: fs.readFileSync(filePath).toString("base64"),
        filename,
    };
}

type Variant = {
    filename: string;
    label: string;
    prompt: string;
};

const sharedRules = `
DESIGN RULES (all versions):
- Square 1:1 LinkedIn infographic (~1080x1080)
- EXACT characters from mike-and-doc.png: Doc (older white beard, glasses, Thetis green scrubs + green crocs) and Mike/Grant (40s, slim, short brown hair, white tee, jeans)
- Flat cartoon house style, Thetis forest-green + sage palette
- Perfect spelling, legible text, no hashtags/URLs/logos
- Plantar heel pain education — NO big walking boot on Mike
- Professional, reassuring patient-education tone
`;

const variants: Variant[] = [
    {
        filename: "pf-heel-pain-basics-matter-most-linkedin-mike-doc-v2-side-cards.png",
        label: "v2 side cards",
        prompt: `Create a LinkedIn infographic.

TITLE: "Heel Pain Recovery: Why the Basics Matter Most"
SUBTITLE: "Recovery begins with the fundamentals — not shortcuts."

LAYOUT: Split composition.
LEFT (~45%): Doc standing, pointing at Mike who sits on a stool listening. Soft clinic background.
RIGHT (~55%): Three stacked horizontal cards (not a pyramid):

Card 1 (green accent): LEVEL 1 · FOUNDATION
"Daily exercises, load management, and the core treatments that help most patients."

Card 2 (amber accent): LEVEL 2 · FURTHER TREATMENT
"Additional options if a thorough trial of Level 1 hasn't improved enough."

Card 3 (muted red accent): LEVEL 3 · SURGERY
"Reserved for the small number who still have significant symptoms after conservative care."

BOTTOM banner: "Don't skip the foundation. Advanced treatments work best after the basics."

${sharedRules}`,
    },
    {
        filename: "pf-heel-pain-basics-matter-most-linkedin-mike-doc-v3-steps.png",
        label: "v3 ascending steps",
        prompt: `Create a LinkedIn infographic.

TITLE: "Heel Pain Recovery: Why the Basics Matter Most"
SUBTITLE: "Most people recover without jumping to injections or surgery."

LAYOUT: Doc and Mike in the lower-left of a soft clinic scene. On the right, a large ascending staircase / stepped path graphic (3 big steps):

Bottom wide step (green): LEVEL 1 FOUNDATION — Daily exercises · Load management · Core treatments
Middle step (gold): LEVEL 2 FURTHER TREATMENT — Extra options after a consistent Level 1 trial
Top small step (coral): LEVEL 3 SURGERY — Rare · after appropriate conservative care

Doc points up the steps. Mike looks encouraged.

BOTTOM: "One of the biggest mistakes is skipping the foundation."
Footer: "Build good habits. Progress step by step. Give healing time."

${sharedRules}`,
    },
    {
        filename: "pf-heel-pain-basics-matter-most-linkedin-mike-doc-v4-whiteboard-close.png",
        label: "v4 whiteboard close-up",
        prompt: `Create a LinkedIn infographic — closer, more character-focused.

TITLE at top: "Why the Basics Matter Most"
Small eyebrow above title: "HEEL PAIN RECOVERY"

MAIN SCENE fills most of the frame: Doc and Mike close to camera beside a whiteboard. Doc gesturing to a clean 3-level inverted pyramid on the board:

LEVEL 1 FOUNDATION (largest green band): Daily exercises · Load management · Core treatments
LEVEL 2 FURTHER TREATMENT (yellow band): Options if Level 1 wasn't enough
LEVEL 3 SURGERY (red tip): Rare — after conservative care

Warm expressions. Clinic softly blurred behind them.

BOTTOM dark-green pill: "Advanced treatments are rarely a shortcut."
Small line under: "They're most effective after the basics are done consistently."

${sharedRules}`,
    },
    {
        filename: "pf-heel-pain-basics-matter-most-linkedin-mike-doc-v5-habit-focus.png",
        label: "v5 habit focus",
        prompt: `Create a LinkedIn infographic focused on habits + the 3 levels.

TITLE: "Heel Pain Recovery: Why the Basics Matter Most"
SUBTITLE: "It's rarely about finding a miracle treatment."

TOP BAND: Doc explaining to Mike (smaller characters, left side).

CENTER: Three large numbered circles in a row with icons:
1 FOUNDATION — stretching / load icon — "Daily habits that help most"
2 FURTHER TREATMENT — plus / medical icon — "If Level 1 isn't enough"
3 SURGERY — scalpel icon — "Rare last step"

BOTTOM sage box with quote-style text:
"Heel pain recovery is about building good habits, progressing step by step, and giving your body time to heal."

Tagline: "Don't skip the foundation."

${sharedRules}`,
    },
];

async function generateVariant(
    model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]>,
    mikeAndDoc: ReturnType<typeof loadPng>,
    threeLevels: ReturnType<typeof loadPng>,
    variant: Variant,
) {
    console.log(`\nGenerating ${variant.label}...`);

    const result = await model.generateContent([
        {
            text:
                "CRITICAL: Match Doc and Mike/Grant EXACTLY from mike-and-doc.png — same faces, bodies, clothing, illustration style.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
            },
        },
        {
            text:
                "Optional hierarchy reference (Level 1 biggest → Level 3 smallest). Adapt freely to the layout described — do not copy this diagram literally.",
        },
        {
            inlineData: {
                mimeType: threeLevels.mimeType,
                data: threeLevels.data,
            },
        },
        { text: variant.prompt },
    ]);

    const response = await result.response;
    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(
        (part: { inlineData?: { data?: string } }) => part.inlineData?.data,
    );

    if (!imagePart?.inlineData?.data) {
        console.error(`No image for ${variant.label}`);
        return null;
    }

    const outputPath = path.join(outputDir, variant.filename);
    fs.writeFileSync(
        outputPath,
        Buffer.from(imagePart.inlineData.data, "base64"),
    );
    console.log(`Saved ${outputPath}`);
    return outputPath;
}

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

    fs.mkdirSync(outputDir, { recursive: true });

    const saved: string[] = [];
    for (const variant of variants) {
        const out = await generateVariant(
            model,
            mikeAndDoc,
            threeLevels,
            variant,
        );
        if (out) saved.push(out);
    }

    console.log(`\nDone. Created ${saved.length}/${variants.length} versions:`);
    for (const p of saved) console.log(` - ${path.basename(p)}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
