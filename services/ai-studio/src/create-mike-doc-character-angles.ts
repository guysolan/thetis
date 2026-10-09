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

const sharedStyle = `
STYLE — match mike-and-doc.png EXACTLY:
- Same flat cartoon line-art house style, same line weight, same level of detail, same colours.
- Soft cream / off-white studio background. No clinic clutter. No windows. No extra people. No text. No logos. No labels.
- Full body visible with a little padding. Square 1:1 image.
- ONE character only. Do not include the other character anywhere.

DOC (when generating Doc):
- Older man, balding with white hair at the sides, full white beard and moustache, round black-framed glasses.
- Thetis forest-green V-neck scrubs (top + trousers), dark green crocs, yellow clipboard in one hand, pen in chest pocket.
- Friendly, calm, professional expression.

MIKE (when generating Mike):
- 40-year-old slim white male, short neat brown hair, white short-sleeve t-shirt, blue jeans.
- Right foot in a bulky black walking boot to just below the knee. Left foot in a white Stan Smith sneaker.
- Friendly, attentive expression. Same face and body as the patient in the reference.
`;

type Shot = {
    filename: string;
    label: string;
    prompt: string;
};

const shots: Shot[] = [
    {
        filename: "doc-solo-front.png",
        label: "Doc — front",
        prompt: `Draw ONLY Doc, alone.
CAMERA: straight-on front view, looking at the camera. Full body standing, feet planted.
Pose: clipboard in left hand at his side, right hand relaxed. Slight warm smile.
${sharedStyle}
Do NOT draw Mike. Do NOT crop the head or feet.`,
    },
    {
        filename: "doc-solo-three-quarter.png",
        label: "Doc — three-quarter",
        prompt: `Draw ONLY Doc, alone.
CAMERA: three-quarter view matching the original reference — body angled, facing toward the right of frame.
Pose: standing, yellow clipboard in left hand, right index finger raised as if explaining something.
${sharedStyle}
Do NOT draw Mike. Do NOT crop the head or feet.`,
    },
    {
        filename: "doc-solo-profile.png",
        label: "Doc — side profile",
        prompt: `Draw ONLY Doc, alone.
CAMERA: true side profile, facing right. Full body standing. Classic character-sheet profile (nose, glasses, beard silhouette clear).
Pose: clipboard held at his side. Neutral friendly expression.
${sharedStyle}
Do NOT draw Mike. Do NOT crop the head or feet.`,
    },
    {
        filename: "doc-solo-back.png",
        label: "Doc — back three-quarter",
        prompt: `Draw ONLY Doc, alone.
CAMERA: three-quarter from behind, over his right shoulder, still showing a hint of the side of his face/glasses. Full body standing.
Pose: clipboard in left hand. We see the back of the green scrubs, white hair at the sides, green crocs.
${sharedStyle}
Do NOT draw Mike. Do NOT crop the head or feet.`,
    },
    {
        filename: "mike-solo-front.png",
        label: "Mike — front",
        prompt: `Draw ONLY Mike (the patient), alone.
CAMERA: straight-on front view, looking at the camera. Full body standing, weight slightly on the uninjured left leg.
Pose: arms relaxed at his sides, friendly attentive expression.
${sharedStyle}
Do NOT draw Doc. Do NOT crop the head or feet.`,
    },
    {
        filename: "mike-solo-three-quarter.png",
        label: "Mike — three-quarter seated",
        prompt: `Draw ONLY Mike (the patient), alone.
CAMERA: three-quarter view matching the original reference — seated on a simple wooden chair, body angled, facing toward the left of frame.
Pose: sitting, pleasant attentive expression, hands resting on his thighs. Right walking boot visible, left white sneaker visible.
${sharedStyle}
Do NOT draw Doc. Do NOT crop the head or feet.`,
    },
    {
        filename: "mike-solo-profile.png",
        label: "Mike — side profile",
        prompt: `Draw ONLY Mike (the patient), alone.
CAMERA: true side profile, facing left. Full body standing. Classic character-sheet profile (nose, hair, boot silhouette clear).
Pose: standing, arms relaxed. Right walking boot on the far/near leg so the boot shape reads clearly.
${sharedStyle}
Do NOT draw Doc. Do NOT crop the head or feet.`,
    },
    {
        filename: "mike-solo-back.png",
        label: "Mike — back three-quarter",
        prompt: `Draw ONLY Mike (the patient), alone.
CAMERA: three-quarter from behind, over his left shoulder, still showing a hint of the side of his face. Full body standing.
Pose: standing, we see the back of the white t-shirt, short brown hair, blue jeans, black walking boot on the right foot, white sneaker on the left.
${sharedStyle}
Do NOT draw Doc. Do NOT crop the head or feet.`,
    },
    {
        filename: "doc-character-turnaround.png",
        label: "Doc — turnaround sheet",
        prompt: `Create a character turnaround sheet of ONLY Doc from mike-and-doc.png.
Four full-body poses in a single horizontal row on a clean cream background, evenly spaced, same scale, same ground line:
1. Front view
2. Three-quarter view (clipboard, pointing, matching the original)
3. Side profile
4. Back view

Same man in every pose: balding white hair, white beard, round glasses, green scrubs, green crocs, yellow clipboard.
No text, no labels, no Mike, no clinic furniture.
${sharedStyle}`,
    },
    {
        filename: "mike-character-turnaround.png",
        label: "Mike — turnaround sheet",
        prompt: `Create a character turnaround sheet of ONLY Mike (the patient) from mike-and-doc.png.
Four full-body poses in a single horizontal row on a clean cream background, evenly spaced, same scale, same ground line:
1. Front view standing
2. Three-quarter seated on a wooden chair (matching the original)
3. Side profile standing
4. Back view standing

Same man in every pose: short brown hair, white t-shirt, blue jeans, black walking boot on the RIGHT foot, white sneaker on the LEFT foot.
No text, no labels, no Doc, no clinic clutter.
${sharedStyle}`,
    },
];

async function generateShot(
    model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]>,
    mikeAndDoc: ReturnType<typeof loadPng>,
    shot: Shot,
) {
    console.log(`\nGenerating ${shot.label}...`);

    const result = await model.generateContent([
        {
            text:
                "CRITICAL character reference: Use this image EXACTLY for faces, body types, clothing, colours, and illustration quality. You will isolate ONE character and redraw them alone from a new camera angle. Match them precisely. Do not invent a new design.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
            },
        },
        { text: shot.prompt },
    ]);

    const response = await result.response;
    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(
        (part: { inlineData?: { data?: string } }) => part.inlineData?.data,
    );

    if (!imagePart?.inlineData?.data) {
        console.error(`No image for ${shot.label}`);
        return null;
    }

    const outputPath = path.join(outputDir, shot.filename);
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
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    fs.mkdirSync(outputDir, { recursive: true });

    const only = process.argv[2];
    const toRun = only
        ? shots.filter((s) => s.filename.includes(only) || s.label.toLowerCase().includes(only.toLowerCase()))
        : shots;

    if (toRun.length === 0) {
        console.error(`No shots matched "${only}"`);
        process.exit(1);
    }

    const saved: string[] = [];
    for (const shot of toRun) {
        const out = await generateShot(model, mikeAndDoc, shot);
        if (out) saved.push(out);
    }

    console.log(`\nDone. Created ${saved.length}/${toRun.length}:`);
    for (const p of saved) console.log(` - ${path.basename(p)}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
