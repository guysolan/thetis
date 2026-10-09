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
    "thetis-linkedin-1000-followers-mike-doc-v1.png",
);

function loadPng(dir: string, filename: string) {
    const filePath = path.join(dir, filename);
    return {
        mimeType: "image/png" as const,
        data: fs.readFileSync(filePath).toString("base64"),
        filename,
    };
}

const prompt = `Create a single square 1:1 LinkedIn celebration graphic (~1080x1080). Clean, professional, readable as a thumbnail.

HOUSE STYLE — match the character and clinic references EXACTLY:
- Same flat cartoon line-art, same forest-green (#0c4a36 / Thetis primary teal-green) + sage + cream palette.
- Same modern London clinic: wood floor, plant, windows with a hint of London (Big Ben / red bus), medical cart softly in the background.
- Doc: older man, balding with white hair at the sides, full white beard, round black glasses, Thetis-green V-neck scrubs, green crocs, yellow clipboard, pen in pocket.
- Mike: 40s, slim, short brown hair, white t-shirt, blue jeans. For THIS graphic he wears white sneakers on BOTH feet — NO walking boot, NO cast. This is a community celebration, not an injury scene.

TONE: Warm, professional, grateful. LinkedIn milestone — not a party poster. No balloons, no champagne, no party hats, no confetti explosion. A quiet, proud clinic moment.

LAYOUT:

Top eyebrow (small, spaced, dark green sans-serif):
"THETIS MEDICAL"

Hero number — the visual centrepiece, huge, bold, perfectly spelled:
"1,000"

Directly under the number, slightly smaller but still bold:
"FOLLOWERS"

Subtitle:
"Thank you for being part of our community."

MAIN SCENE (middle):
Doc and Mike stand together in the clinic, facing the viewer, clearly celebrating this milestone.
- Doc on the left, clipboard in one hand, other hand in a warm thumbs-up or open welcoming gesture.
- Mike on the right, friendly smile, standing comfortably.
- Between or just behind them, a simple sage/cream rounded badge or small clinic whiteboard that also shows "1,000" so the number is unmissable even as a tiny LinkedIn thumbnail.
- Plenty of breathing room. Characters are the emotional focus; the number is the information focus.

BOTTOM BANNER — rounded dark-green bar, white text, perfectly spelled:
"Sharing useful, evidence-informed recovery information."

Small footer line under the banner:
"This is only the beginning."

DESIGN RULES:
- Perfect spelling. Legible text. No typos. No hashtags. No URLs. No logos. No LinkedIn logo.
- Do not write "10000" or "10,000" or "100" — it is exactly "1,000" with a comma.
- Do not invent extra slogans.
- Professional patient-education house style, just warmer than a typical clinical infographic.
- No lime green, no neon. Thetis forest-green / sage / cream only.`;

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const mikeAndDoc = loadPng(inputDir, "mike-and-doc.png");
    const docFront = loadPng(outputDir, "doc-solo-front.png");
    const mikeFront = loadPng(outputDir, "mike-solo-front.png");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "models/gemini-3-pro-image-preview",
    });

    console.log("Generating 1,000 followers LinkedIn graphic...");

    const result = await model.generateContent([
        {
            text:
                "CRITICAL character + clinic reference: Use this image EXACTLY for Doc and Mike — same faces, body types, clothing style, illustration quality, and clinic room. Match them precisely.",
        },
        {
            inlineData: {
                mimeType: mikeAndDoc.mimeType,
                data: mikeAndDoc.data,
            },
        },
        {
            text:
                "Isolated Doc reference — same man, front view. Use this face and body for Doc. He still wears green scrubs, green crocs, yellow clipboard.",
        },
        {
            inlineData: {
                mimeType: docFront.mimeType,
                data: docFront.data,
            },
        },
        {
            text:
                "Isolated Mike reference — same man, front view. Use this face and body for Mike. For this celebration graphic: white sneakers on BOTH feet, NO walking boot.",
        },
        {
            inlineData: {
                mimeType: mikeFront.mimeType,
                data: mikeFront.data,
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
